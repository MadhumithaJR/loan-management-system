package com.wellsfargo.training.lms.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ItemView {

	private int issue_id;
	private String description;
	private String make;
	private String category;
	private int value;
	
}
