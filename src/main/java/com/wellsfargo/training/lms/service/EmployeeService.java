package com.wellsfargo.training.lms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.lms.model.Employee;
import com.wellsfargo.training.lms.repository.EmployeeRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository erepo;
	
	public Employee registerEmployee(Employee e) {
		return erepo.save(e);
	}
	
	public Optional<Employee> loginEmployee(Long eid) {
		return erepo.findByEid(eid);
	}
	
	public List<Employee> listAll(){
		return erepo.findAll();
	}
}
