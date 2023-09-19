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
@Table(name="items")
public class Item {

	@Id
	@Column(name="item_name")
	private Long itid;
	
	@Column(name="item_description")
	private String desc;
	
	@Column(name="item_status")
	private String status;
	
	@Column(name="item_valuation")
	private int value;
	
	@Column(name="item_make")
	private String make;
	
	@Column(name="item_category")
	private String cat;
	
	@OneToMany(mappedBy="item", cascade=CascadeType.ALL)
	private List<EmployeeIssue> eIssue = new ArrayList<>();

	public Item() {
		super();
	}

	public Item(Long itid, String desc, String status, int value, String make, String cat, List<EmployeeIssue> eIssue) {
		super();
		this.itid = itid;
		this.desc = desc;
		this.status = status;
		this.value = value;
		this.make = make;
		this.cat = cat;
		this.eIssue = eIssue;
	}

	public Long getItid() {
		return itid;
	}

	public void setItid(Long itid) {
		this.itid = itid;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	public String getMake() {
		return make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getCat() {
		return cat;
	}

	public void setCat(String cat) {
		this.cat = cat;
	}

	public List<EmployeeIssue> geteIssue() {
		return eIssue;
	}

	public void seteIssue(List<EmployeeIssue> eIssue) {
		this.eIssue = eIssue;
	}
	
	
	
}
