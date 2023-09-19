package com.wellsfargo.training.lms.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.lms.exception.ResourceNotFoundException;
import com.wellsfargo.training.lms.model.Employee;
import com.wellsfargo.training.lms.service.EmployeeService;

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
	public List<Employee> getAllEmployees(){
		return eservice.listAll();
	}
	
	@PostMapping("/login")
	public Boolean loginEmployee(@Validated @RequestBody Employee e) throws ResourceNotFoundException {
		Boolean isLoggedIn = false;
		String eid = e.getId();
		String password = e.getPassword();
		
		Employee employee = eservice.loginEmployee(eid).orElseThrow(() ->
		 new ResourceNotFoundException("Employee not found for this Employee Id :: "));
		 
		 if(eid.equals(employee.getId())&& password.equals(employee.getPassword())){
			 isLoggedIn=true;
			 
		 }
		 return isLoggedIn;
	}
	
	

}
