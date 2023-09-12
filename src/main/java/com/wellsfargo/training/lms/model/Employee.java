package com.wellsfargo.training.lms.model;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.Base64;

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

	public Employee() {
		super();
	}

	public Employee(Long eid, String ename, String password, String designation, String dept, String gender, Date dob,
			Date doj, EmployeeIssue eIssue, EmployeeCard eCard) {
		super();
		this.eid = eid;
		this.ename = ename;
		this.password = password;
		this.designation = designation;
		this.dept = dept;
		this.gender = gender;
		this.dob = dob;
		this.doj = doj;
		this.eIssue = eIssue;
		this.eCard = eCard;
	}

	
	
	public Employee(Long eid, String ename, String password, String designation, String dept, String gender, Date dob,
			Date doj, EmployeeIssue eIssue) {
		super();
		this.eid = eid;
		this.ename = ename;
		this.password = password;
		this.designation = designation;
		this.dept = dept;
		this.gender = gender;
		this.dob = dob;
		this.doj = doj;
		this.eIssue = eIssue;
	}

	public Long getEid() {
		return eid;
	}

	public void setEid(Long eid) {
		this.eid = eid;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		Base64.Encoder encoder = Base64.getEncoder();  
        String normalString = password;
        String encodedString = encoder.encodeToString(   // encrypt password in database field
        normalString.getBytes(StandardCharsets.UTF_8) );
        this.password = encodedString;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public Date getDoj() {
		return doj;
	}

	public void setDoj(Date doj) {
		this.doj = doj;
	}

	public EmployeeIssue geteIssue() {
		return eIssue;
	}

	public void seteIssue(EmployeeIssue eIssue) {
		this.eIssue = eIssue;
	}

	public EmployeeCard geteCard() {
		return eCard;
	}

	public void seteCard(EmployeeCard eCard) {
		this.eCard = eCard;
	}
	
	
}
