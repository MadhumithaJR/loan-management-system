package com.wellsfargo.training.lms.controller;

import java.util.List;
import java.util.Map;


import com.wellsfargo.training.lms.model.ApplyLoanModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.wellsfargo.training.lms.exception.ResourceNotFoundException;
import com.wellsfargo.training.lms.model.Employee;
import com.wellsfargo.training.lms.model.ItemView;
import com.wellsfargo.training.lms.model.LoanView;
import com.wellsfargo.training.lms.service.EmployeeService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class EmployeeController {
	
	@Autowired
	private EmployeeService eservice;
	
	// Employee Login
	
	@PostMapping("/login")
	public ResponseEntity<Boolean> loginEmployee(@Validated @RequestBody Employee emp) throws ResourceNotFoundException {
		try {
			Boolean isLoggedIn = false;
			Long id = emp.getId();
			String password = emp.getPassword();
		
			Employee employee = eservice.loginEmployee(id).orElseThrow(() ->
				new ResourceNotFoundException("Employee not found for this Employee Id :: "));
		 
			if(id.equals(employee.getId())&& password.equals(employee.getPassword())){
				isLoggedIn=true;
				}
			return ResponseEntity.ok(isLoggedIn);
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(null);
		}
	}
	
	// Apply Loan

	@PostMapping("/applyLoan")
	public ResponseEntity<String> applyLoan(@RequestBody ApplyLoanModel applyLoanModel) {
		try {
			String result = eservice.applyLoan(applyLoanModel);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	// View Items By Employee ID
	
	@GetMapping("/viewItems/{id}")
	public ResponseEntity<List<ItemView>> viewEmployeeItems(@PathVariable(value="id") Long eid){
		try {
			List<ItemView> items = eservice.viewEmployeeItems(eid);
			return ResponseEntity.ok(items);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
	
	// View Loans By Employee ID
	
	@GetMapping("/viewLoans/{id}")
	public ResponseEntity<List<LoanView>> viewEmployeeLoans(@PathVariable(value="id") Long eid){
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
