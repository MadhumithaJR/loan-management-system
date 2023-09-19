package com.wellsfargo.training.lms.model;

import java.util.ArrayList;
import java.util.List;

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
	private List<EmployeeCard> ecard = new ArrayList<>();

	public LoanCard() {
		super();
	}

	public LoanCard(Long lid, String ltype, int duration, List<EmployeeCard> ecard) {
		super();
		this.lid = lid;
		this.ltype = ltype;
		this.duration = duration;
		this.ecard = ecard;
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

	public List<EmployeeCard> getEcard() {
		return ecard;
	}

	public void setEcard(List<EmployeeCard> ecard) {
		this.ecard = ecard;
	}
	
	
	
	
	
}
