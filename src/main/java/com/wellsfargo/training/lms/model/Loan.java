package com.wellsfargo.training.lms.model;

import java.util.List;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="loan_master")

public class Loan {
	@Id
	@Column(name="loan_id")
	private int loan_id;

	@Column(name="loan_type", unique = true)
	private String type;

	@Column(name="duration",nullable = false)
	private short duration;

	@OnDelete(action=OnDeleteAction.CASCADE)
	@OneToMany(mappedBy = "loan", fetch = FetchType.EAGER)
	private List<Card> card;

	public int getLoan_id() {
		return loan_id;
	}

	public void setLoan_id(int id) {
		this.loan_id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public short getDuration() {
		return duration;
	}

	public void setDuration(short duration) {
		this.duration = duration;
	}

	public List<Card> getCard() {
		return card;
	}

	public void setCard(List<Card> card) {
		this.card = card;
	}


}