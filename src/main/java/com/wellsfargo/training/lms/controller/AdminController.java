package com.wellsfargo.training.lms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.lms.exception.ResourceNotFoundException;
import com.wellsfargo.training.lms.model.Item;
import com.wellsfargo.training.lms.service.ItemService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private ItemService iservice;
	
	@PostMapping("/items")
	public ResponseEntity<Item> saveItem(@Validated @RequestBody Item item) {
		try {
			Item i = iservice.saveItem(item);
			return ResponseEntity.status(HttpStatus.CREATED).body(i);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@GetMapping("/items")
	public ResponseEntity<List<Item>> getAllItems() {
		try {
			List<Item> items = iservice.listAllItems();
			return ResponseEntity.ok(items);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@GetMapping("/items/{id}")
	public ResponseEntity<Item> getItemById(@PathVariable(value="id") Integer id)
	throws ResourceNotFoundException {
		Item i = iservice.getSingleItem(id).
				orElseThrow(() -> new ResourceNotFoundException("Item Not Found For This ID: "+id));
		return ResponseEntity.ok().body(i);
	}
	
	@PutMapping("/items/{id}")
	public ResponseEntity<Item> updateItem(@PathVariable(value="id") Integer id,
			@Validated @RequestBody Item i)
	throws ResourceNotFoundException {
		Item item = iservice.getSingleItem(id).
				orElseThrow(() -> new ResourceNotFoundException("Item Not Found For This ID: "+id));
		
		// update product with new values
		item.setDescription(i.getDescription());
		item.setStatus(i.getStatus());
		item.setCategory(i.getCategory());
		item.setValue(i.getValue());
		item.setMake(i.getMake());
		
		final Item updatedItem = iservice.saveItem(item);
		return ResponseEntity.ok().body(updatedItem);
	}
	
	@DeleteMapping("/items/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteItem(@PathVariable(value="id") Integer id)
		throws ResourceNotFoundException {
		iservice.getSingleItem(id).
		orElseThrow(() -> new ResourceNotFoundException("Item Not Found For This ID: "+id));
		
		iservice.deleteItem(id);
		
		Map<String, Boolean> response = new HashMap<String, Boolean>();
		response.put("Deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
