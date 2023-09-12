package com.wellsfargo.training.lms.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="employeeCards")
public class EmployeeCard {

	@Id
	@Column(name="employee_card_id")
	private Long ecid;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date card_issue_date;
	
	@ManyToOne
	@JoinColumn(name="employee_id")
	private Employee employee;
	
	@ManyToOne
	@JoinColumn(name="load_id")
	private LoanCard loancard;


	public EmployeeCard(Long ecid, Date card_issue_date) {
		super();
		this.ecid = ecid;
		this.card_issue_date = card_issue_date;
	}


	public EmployeeCard() {
		super();
	}
	
	
	
}
