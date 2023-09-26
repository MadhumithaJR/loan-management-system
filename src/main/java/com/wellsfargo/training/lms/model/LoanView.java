package com.wellsfargo.training.lms.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LoanView {
	
	private int loan_id;
	private short duration;
	private String type;
	private LocalDate date;

}


