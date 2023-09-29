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

import com.wellsfargo.training.lms.model.Item;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    // Admin Login

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

    // Admin Registration
    
    @PostMapping("/register")
    public Admin registerAdmin(@Validated @RequestBody Admin admin) {
        Admin a = adminService.registerAdmin(admin);
        return a;
    }
    
    // Employee Registration
	
 	@PostMapping("/employees")
 	public ResponseEntity<Employee> saveEmployee(@Validated @RequestBody Employee employee) {
 		try {
 			Employee e = adminService.registerEmployee(employee);
 			return ResponseEntity.ok(e);
 		} catch (Exception e) {
 			e.printStackTrace();
 			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
 					.body(null);
 		}
 	}
    
    // View All Employees
    
    @GetMapping("/employees")
	public ResponseEntity<List<Employee>> getAllEmployees(){
		try{
			List<Employee> employees = adminService.listAll();
			return ResponseEntity.ok(employees);
		}
		catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
    
    // Get Single Employee By ID
    
    @GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable(value="id") Long eID)
	throws ResourceNotFoundException{
    	try {
    		Employee e = adminService.getSingleEmployee(eID).
    				orElseThrow(()->new ResourceNotFoundException("Employee Not found for the ID"));
    		return ResponseEntity.ok().body(e);
    	} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    	}
	}
	
	// Delete an Employee
    
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable(value="id") Long eID)
		throws ResourceNotFoundException{
			try {
				adminService.getSingleEmployee(eID).
					orElseThrow(()-> new ResourceNotFoundException("Employee Not found for this ID:"+eID));
				adminService.deleteEmployee(eID);
		
				Map<String,Boolean> response =new HashMap<String,Boolean>();
				response.put("Deleted",Boolean.TRUE);
				return ResponseEntity.ok(response);
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}
	}

	// Update An Employee
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployeeById(@PathVariable(value="id") Long eID,
			@Validated @RequestBody Employee e) throws ResourceNotFoundException{
			try {
				 Employee employee = adminService.getSingleEmployee(eID).
				 orElseThrow(()->new ResourceNotFoundException("Employee Not found for the ID"));
				 
				 //Update Employee with New values
				 employee.setName(e.getName());
				 employee.setGender(e.getGender());
				 employee.setDepartment(e.getDepartment());
				 employee.setDesignation(e.getDesignation());
				 employee.setDob(e.getDob());
				 employee.setDoj(e.getDoj());
				 
				 final Employee updatedEmployee = adminService.registerEmployee(employee);
				 return ResponseEntity.ok().body(updatedEmployee);
			} catch (Exception exp) {
				exp.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}
	}
	
	// Save Loan

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
    
    // View All Loans

    @GetMapping("/loan")
    public ResponseEntity<List<Loan>> getAllLoan(){
        try{
            List<Loan> l = adminService.listAllLoans();
            return ResponseEntity.ok(l);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    // Get Single Loan By ID

    @GetMapping("/loan/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable(value="id") int id) throws ResourceNotFoundException {
    	try {
    		Loan l = adminService.getLoanById(id).
    				orElseThrow(() -> new ResourceNotFoundException("Loan not found with id: "+id));
    		return ResponseEntity.ok(l);
    	} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    	}
    }
    
    // Update a Loan

    @PutMapping("/loan/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable(value="id") int id,@Validated @RequestBody Loan loan)
    		throws ResourceNotFoundException {
        Loan l = adminService.getLoanById(id)
        		.orElseThrow(()->new ResourceNotFoundException("Loan not found with id: "+id));

        try{
             l = adminService.saveLoan(loan);
             return ResponseEntity.status(HttpStatus.CREATED).body(l);
             
        } catch (Exception e) {
             e.printStackTrace();
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
    
    // Delete a Loan
    
    @DeleteMapping("/loan/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteLoan(@PathVariable(value = "id") int id)
    		throws ResourceNotFoundException{
        try {
        	Loan l = adminService.getLoanById(id).orElseThrow(()->new ResourceNotFoundException("Loan not found with id: "+id));

        	adminService.deleteLoan(id);
        	Map<String,Boolean> response = new HashMap<String, Boolean>();
        	response.put("Deleted",Boolean.TRUE);
        	return ResponseEntity.ok(response);
        } catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Save an Item
    
	@PostMapping("/items")
	public ResponseEntity<Item> saveItem(@Validated @RequestBody Item item) {
		try {
			Item i = adminService.saveItem(item);
			return ResponseEntity.status(HttpStatus.CREATED).body(i);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	// View All Items

	@GetMapping("/items")
	public ResponseEntity<List<Item>> getAllItems() {
		try {
			List<Item> items = adminService.listAllItems();
			return ResponseEntity.ok(items);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	// Get Single Item By ID

	@GetMapping("/items/{id}")
	public ResponseEntity<Item> getItemById(@PathVariable(value="id") Integer id)
	throws ResourceNotFoundException {
		try {
			Item i = adminService.getItemById(id).
				orElseThrow(() -> new ResourceNotFoundException("Item Not Found For This ID: "+id));
			return ResponseEntity.ok().body(i);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	// Update an Item

	@PutMapping("/items/{id}")
	public ResponseEntity<Item> updateItem(@PathVariable(value="id") Integer id,
			@Validated @RequestBody Item i)
	throws ResourceNotFoundException {
		try {
			Item item = adminService.getItemById(id).
					orElseThrow(() -> new ResourceNotFoundException("Item Not Found For This ID: "+id));
	
			item.setDescription(i.getDescription());
			item.setStatus(i.getStatus());
			item.setCategory(i.getCategory());
			item.setValue(i.getValue());
			item.setMake(i.getMake());
	
			final Item updatedItem = adminService.saveItem(item);
			return ResponseEntity.ok().body(updatedItem);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			
		}
	}
	
	// Delete an Item
	
	@DeleteMapping("/items/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteItem(@PathVariable(value="id") Integer id)
		throws ResourceNotFoundException {
		try {
			adminService.getItemById(id).
			orElseThrow(() -> new ResourceNotFoundException("Item Not Found For This ID: "+id));
	
			adminService.deleteItem(id);
	
			Map<String, Boolean> response = new HashMap<String, Boolean>();
			response.put("Deleted", Boolean.TRUE);
			return ResponseEntity.ok(response);
			
			} catch (Exception e) {
				
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
				
			}
	}

}
