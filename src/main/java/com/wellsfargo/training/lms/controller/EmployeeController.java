package com.wellsfargo.training.lms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.wellsfargo.training.lms.model.ApplyLoanModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.wellsfargo.training.lms.exception.ResourceNotFoundException;
import com.wellsfargo.training.lms.model.Employee;
import com.wellsfargo.training.lms.model.LoanView;
import com.wellsfargo.training.lms.service.EmployeeService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class EmployeeController {
	
	@Autowired
	private EmployeeService eservice;
	
	@PostMapping("/employees")
	public Employee saveEmployee(@Validated @RequestBody Employee employee) {
		Employee e = eservice.registerEmployee(employee);
		return e;
	}
	
	@GetMapping("/employees")
	public ResponseEntity<List<Employee>> getAllEmployees(){
		try{
			List<Employee> employees = eservice.listAll();
			return ResponseEntity.ok(employees);
		}
		catch(Exception e){
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@PostMapping("/login")
	public Boolean loginEmployee(@Validated @RequestBody Employee e) throws ResourceNotFoundException {
		Boolean isLoggedIn = false;
		String id = e.getId();
		String password = e.getPassword();
		
		Employee employee = eservice.loginEmployee(id).orElseThrow(() ->
		 new ResourceNotFoundException("Employee not found for this Employee Id :: "));
		 
		 if(id.equals(employee.getId())&& password.equals(employee.getPassword())){
			 isLoggedIn=true;
			 
		 }
		 return isLoggedIn;
	}
	
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable(value="id") String eID)
	throws ResourceNotFoundException{
		 Employee e=eservice.getSingleEmployee(eID).
		 orElseThrow(()->new ResourceNotFoundException("Employee Not found for the ID"));
		 return ResponseEntity.ok().body(e);
	}
	
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable(value="id")String eID)
		throws ResourceNotFoundException{
		
		
		eservice.getSingleEmployee(eID).
		orElseThrow(()-> new ResourceNotFoundException("Product Not found for this ID:"+eID));
		
		eservice.deleteEmployee(eID);
		
		Map<String,Boolean> response =new HashMap<String,Boolean>();
		response.put("Deleted",Boolean.TRUE);
		return ResponseEntity.ok(response);
	}


	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateProductById(@PathVariable(value="id") String eID,
			@Validated @RequestBody Employee e)
			throws ResourceNotFoundException{
				 Employee employee=eservice.getSingleEmployee(eID).
				 orElseThrow(()->new ResourceNotFoundException("Employee Not found for the ID"));
				 
				 
				 //Update Employee with New values
				 employee.setName(e.getName());
				 employee.setGender(e.getGender());
				 employee.setDepartment(e.getDepartment());
				 employee.setDesignation(e.getDesignation());
				 employee.setDob(e.getDob());
				 employee.setDoj(e.getDoj());
				 
				 
				 final Employee updatedEmployee= eservice.registerEmployee(employee);
				 return ResponseEntity.ok().body(updatedEmployee);
				 
	}

	@PostMapping("/applyLoan")
	public String applyLoan(@RequestBody ApplyLoanModel applyLoanModel){
		return eservice.applyLoan(applyLoanModel);
	}
	
	@GetMapping("/viewItems/{id}")
	public ResponseEntity<List<Map<String, Object>>> viewEmployeeItems(@PathVariable(value="id") String eid) {
		try {
			List<Map<String, Object>> items = eservice.viewEmployeeItems(eid);
			return ResponseEntity.ok(items);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	@GetMapping("/viewLoans/{id}")
	public ResponseEntity<List<LoanView>> viewEmployeeLoans(@PathVariable(value="id") String eid){
		try {
			List<LoanView> loans = eservice.viewEmployeeLoans(eid);
			return ResponseEntity.ok(loans);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

	@GetMapping("/getDescriptions/{item_category}")
	public ResponseEntity<List<String>> getItemDescriptionsFromCategory(@PathVariable(value="item_category") String item_category){
		try {
			List<String> descriptions = eservice.getItemDescriptions(item_category);
			return ResponseEntity.ok(descriptions);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

	@GetMapping("/getMakes/{item_category}/{item_description}")
	public ResponseEntity<List<String>> getItemMakesFromCategoryDesc(@PathVariable(value="item_category") String item_category,@PathVariable(value="item_description") String item_description){
		try {
			List<String> makes = eservice.getItemMakes(item_category,item_description);
			return ResponseEntity.ok(makes);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

	@GetMapping("/getValue/{item_category}/{item_description}/{item_make}")
	public ResponseEntity<Integer> getItemMakesFromCategoryDesc(@PathVariable(value="item_category") String item_category, @PathVariable(value="item_description") String item_description, @PathVariable(value="item_make") String item_make){
		try {
			int value = eservice.getItemValue(item_category,item_description,item_make);
			return ResponseEntity.ok(value);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

	@GetMapping("/getAllLoanTypes")
	public ResponseEntity<List<String>> getAllLoanTypes(){
		try {
			List<String> types = eservice.getAllLoanTypes();
			return ResponseEntity.ok(types);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}

	}

}
