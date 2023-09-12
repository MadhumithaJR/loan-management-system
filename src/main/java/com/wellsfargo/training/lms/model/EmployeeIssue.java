package com.wellsfargo.training.lms.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="employeeissues")
public class EmployeeIssue {

	@Id
	private Long issue_id;
	
	@ManyToOne
	@JoinColumn(name="employee_id")
	private Employee employee;
	
	@ManyToOne
	@JoinColumn(name="item_id")
	private Item item;

	public EmployeeIssue() {
		super();
	}

	public EmployeeIssue(Long issue_id) {
		super();
		this.issue_id = issue_id;
	}
	
	
}
