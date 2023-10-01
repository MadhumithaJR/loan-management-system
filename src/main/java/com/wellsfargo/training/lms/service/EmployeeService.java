package com.wellsfargo.training.lms.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.wellsfargo.training.lms.model.*;
import com.wellsfargo.training.lms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository empRepository;

	@Autowired
	private LoanRepository loanRepository;

	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private CardRepository cardRepository;

	@Autowired
	private IssueRepository issueRepository;
	
	// Employee Login
	public Optional<Employee> loginEmployee(Long id) {
		return empRepository.findById(id);
	}
	
	// Apply Loan
	public String applyLoan(ApplyLoanModel applyLoanModel){
		Card card = new Card();
		Issue issue = new Issue();

		Employee employee = empRepository.findById(applyLoanModel.getEmployee_id()).get();
		Loan loan = loanRepository.findByType(applyLoanModel.getItem_category());
		Item item = itemRepository.findByMakeAndCategoryAndDescription(applyLoanModel.getItem_make(),applyLoanModel.getItem_category(),applyLoanModel.getItem_description());

		card.setEmployee(employee);
		card.setLoan(loan);
		card.setDate(LocalDate.now());

		Card newCardCreated = cardRepository.save(card);
		if(newCardCreated == null) {
			return "Loan Application Failed";
		}

		Short duration = loan.getDuration();
		LocalDate returnDate = newCardCreated.getDate().plusYears((long) duration);

		issue.setEmployee(employee);
		issue.setItem(item);
		issue.setIssueDate(newCardCreated.getDate());
		issue.setReturnDate(returnDate);

		Issue newIssueCreated = issueRepository.save(issue);

		if(newIssueCreated == null) {
			return "Error in issue generation";
		}

		return "Loan has been applied successfully!";

	}
	
	// View Items By Employee ID
	public List<ItemView> viewEmployeeItems(Long id) {
		return itemRepository.getItemsByEmpId(id);
	}
	
	// View Loans By Employee ID
	public List<LoanView> viewEmployeeLoans(Long id){
		return loanRepository.getLoansByEmpId(id);
	}

	public List<String> getAllLoanTypes(){
		return loanRepository.getAllTypes();
	}

	public List<String> getItemDescriptions(String category){
		return itemRepository.getItemDescriptionForCategory(category);
	}

	public List<String> getItemMakes(String category, String description){
		return itemRepository.getItemMakeForCategoryDesc(category,description);
	}

	public int getItemValue(String category, String description, String make){
		return itemRepository.getItemValue(category,description,make);
	}
	
}
