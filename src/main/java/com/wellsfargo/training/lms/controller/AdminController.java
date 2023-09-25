package com.wellsfargo.training.lms.controller;

import com.wellsfargo.training.lms.exception.ResourceNotFoundException;
import com.wellsfargo.training.lms.model.Admin;
import com.wellsfargo.training.lms.model.Employee;
import com.wellsfargo.training.lms.model.Loan;
import com.wellsfargo.training.lms.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.wellsfargo.training.lms.exception.ResourceNotFoundException;
import com.wellsfargo.training.lms.model.Item;
import com.wellsfargo.training.lms.service.ItemService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

	@Autowired
	private ItemService iservice;

    @PostMapping("/login")
    public Boolean loginAdmin(@RequestBody @Validated Admin admin) throws ResourceNotFoundException
    {
        Boolean isLoggedIn = false;
        String username = admin.getUsername();
        String password = admin.getPassword();

        Admin a = adminService.loginAdmin(username).orElseThrow(() ->
                new ResourceNotFoundException("Admin not found for this admin username :: "));

        if(username.equals(a.getUsername())&& password.equals(a.getPassword())){
            isLoggedIn=true;

        }
        return isLoggedIn;
    }

    @PostMapping("/register")
    public Admin registerAdmin(@Validated @RequestBody Admin admin) {
        Admin a = adminService.registerAdmin(admin);
        return a;
    }

    @PostMapping("/loan")
    public ResponseEntity<Loan> saveLoan(@Validated @RequestBody Loan loan){
        try{
           Loan l = adminService.saveLoan(loan);
            return ResponseEntity.status(HttpStatus.CREATED).body(l);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/loan")
    public ResponseEntity<List<Loan>> getAllLoan(){
        try{
            List<Loan> l = adminService.listAll();
            return ResponseEntity.ok(l);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/loan/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable(value="id") int id) throws ResourceNotFoundException {
      Loan l = adminService.getLoanById(id).orElseThrow(() -> new ResourceNotFoundException("Loan not found with id: "+id));
       return ResponseEntity.ok(l);
    }

    @PutMapping("/loan/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable(value="id") int id,@Validated @RequestBody Loan loan) throws ResourceNotFoundException{
        Loan l = adminService.getLoanById(id).orElseThrow(()->new ResourceNotFoundException("Loan not found with id: "+id));

        try{
             l = adminService.saveLoan(loan);
            return ResponseEntity.status(HttpStatus.CREATED).body(l);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
    
    @DeleteMapping("/loan/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteLoan(@PathVariable(value = "id") int id)throws ResourceNotFoundException{
        Loan l = adminService.getLoanById(id).orElseThrow(()->new ResourceNotFoundException("Loan not found with id: "+id));

        adminService.deleteLoan(id);
        Map<String,Boolean> response = new HashMap<String, Boolean>();
        response.put("Deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


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
