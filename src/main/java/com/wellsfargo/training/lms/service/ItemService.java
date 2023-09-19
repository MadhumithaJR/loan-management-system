package com.wellsfargo.training.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.lms.model.Item;
import com.wellsfargo.training.lms.repository.ItemRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ItemService {

	@Autowired
	private ItemRepository irepo;
	
	public Item saveItem(Item i) {
		return irepo.save(i);
	}
	
	public List<Item> listAllItems() {
		return irepo.findAll();
	}
	
	public Optional<Item> getSingleItem(Integer id) {
		return irepo.findById(id);
	}
		
	public void deleteItem(int id) {
		irepo.deleteById(id);
	}
}
