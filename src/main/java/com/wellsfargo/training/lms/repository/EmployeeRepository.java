package com.wellsfargo.training.lms.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.lms.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	
	public Optional<Employee> findById(String id);
	public Optional<Employee> deleteById(String id);

}
