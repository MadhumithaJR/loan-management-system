package com.wellsfargo.training.lms.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="loanCards")
public class LoanCard {

	@Id
	@Column(name="loan_id")
	private Long lid;
	
	@Column(name="loan_type", unique=true)
	private String ltype;
	
	private int duration;

	@OneToMany(mappedBy="loancard", cascade=CascadeType.ALL)
	private EmployeeCard eCard;

	public LoanCard() {
		super();
	}

	public LoanCard(Long lid, String ltype, int duration, EmployeeCard eCard) {
		super();
		this.lid = lid;
		this.ltype = ltype;
		this.duration = duration;
		this.eCard = eCard;
	}
	

	public LoanCard(Long lid, String ltype, int duration) {
		super();
		this.lid = lid;
		this.ltype = ltype;
		this.duration = duration;
	}

	public Long getLid() {
		return lid;
	}

	public void setLid(Long lid) {
		this.lid = lid;
	}

	public String getLtype() {
		return ltype;
	}

	public void setLtype(String ltype) {
		this.ltype = ltype;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public EmployeeCard geteCard() {
		return eCard;
	}

	public void seteCard(EmployeeCard eCard) {
		this.eCard = eCard;
	}
	
	
}
