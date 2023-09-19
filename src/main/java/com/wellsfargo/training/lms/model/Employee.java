package com.wellsfargo.training.lms.model;

import jakarta.persistence.Column;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.persistence.OneToMany;

import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Entity
@Table(name="employee_master")
public class Employee {

	@Id
	@Column(name="employee_id",nullable = false)
	private String id;

	@Column(name="employee_name", length=20,nullable = false)
	private String name;

	@Column(name="department", length=25,nullable = false)
	private String department;

	@Column(name="gender", length=1)
	private String gender;

	@Column(name="designation", length=25,nullable = false)
	private String designation;

	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="dob",nullable = false)
	private LocalDate dob;

	@JsonFormat(pattern="yyyy-MM-dd")
	@Column(name="doj",nullable = false)
	private LocalDate doj;

	@Column(name="password", length=20,nullable = false)
	private String password;

	@OnDelete(action=OnDeleteAction.CASCADE)
	@OneToMany(mappedBy="employee", fetch= FetchType.EAGER)
	private List<Issue>issue;

	@OnDelete(action=OnDeleteAction.CASCADE)
	@OneToMany(mappedBy="employee", fetch= FetchType.EAGER)
	private List<Card>card;

	public void setId(String id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public void setDoj(LocalDate doj) {
		this.doj = doj;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setIssue(List<Issue> issue) {
		this.issue = issue;
	}

	public void setCard(List<Card> card) {
		this.card = card;
	}



}