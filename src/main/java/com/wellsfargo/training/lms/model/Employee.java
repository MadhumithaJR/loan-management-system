package com.wellsfargo.training.lms.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="employees")
public class Employee {

	@Id
	private Long eid;
	
	private String ename;
	
	private String password;
	
	private String designation;
	
	@Column(name="department")
	private String dept;
	
	private String gender;
	
	@Column(name="date_of_birth")
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date dob;
	
	@Column(name="date_of_joining")
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date doj;
	
	@OneToMany(mappedBy="employee", cascade=CascadeType.ALL)
	private EmployeeIssue eIssue;
	
	@OneToMany(mappedBy="employee", cascade=CascadeType.ALL)
	private EmployeeCard eCard;
}
