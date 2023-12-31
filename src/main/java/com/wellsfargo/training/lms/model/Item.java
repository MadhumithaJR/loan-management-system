package com.wellsfargo.training.lms.model;

import java.util.List;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name="item_master")

public class Item {

	@Id
	@SequenceGenerator(name="item_seq", initialValue = 100,allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY,generator = "item_seq")
	@Column(name="item_id")
	private Integer item_id;

	@Column(name="item_description")
	private String description;

	@Column(name="item_status", length=1)
	private String status;

	@Column(name="item_category")
	private String category;

	@Column(name="item_value")
	private int value;

	@Column(name="item_make", length=25)
	private String make;

	@OnDelete(action=OnDeleteAction.CASCADE)
	@OneToMany(mappedBy = "item", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Issue> issue;

	public Integer getItem_id() {
		return item_id;
	}

	public void setItem_id(Integer item_id) {
		this.item_id = item_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
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

	public List<Issue> getIssue() {
		return issue;
	}

	public void setIssue(List<Issue> issue) {
		this.issue = issue;
	}

}