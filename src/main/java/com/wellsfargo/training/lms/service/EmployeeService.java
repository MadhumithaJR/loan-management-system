package com.wellsfargo.training.lms.service;

import java.time.LocalDate;
import java.util.List;
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
	private EmployeeRepository erepo;

	@Autowired
	private LoanRepository lrepo;

	@Autowired
	private ItemRepository irepo;

	@Autowired
	private CardRepository crepo;

	@Autowired
	private IssueRepository issrepo;
	
	public Employee registerEmployee(Employee e) {
		return erepo.save(e);
	}
	
	public Optional<Employee> loginEmployee(String id) {
		return erepo.findById(id);
	}
	
	public List<Employee> listAll(){
		return erepo.findAll();
	}
	public Optional<Employee> getSingleEmployee(String id){
		return erepo.findById(id);
		
	}
	public void deleteEmployee(String id) {
		erepo.deleteById(id);
	}

	public String applyLoan(ApplyLoanModel applyLoanModel){
		Card card =new Card();
		Issue issue = new Issue();

		Employee employee = erepo.findById(applyLoanModel.getEmployee_id()).get();
		Loan loan = lrepo.findByType(applyLoanModel.getItem_category());
		Item item = irepo.findByMakeAndCategoryAndDescription(applyLoanModel.getItem_make(),applyLoanModel.getItem_category(),applyLoanModel.getItem_description());


		card.setEmployee(employee);
		card.setLoan(loan);
		card.setDate(LocalDate.now());

		Card newCardCreated = crepo.save(card);
		if(newCardCreated == null) {
			return "Loan Application Failed";
		}

		Short duration = loan.getDuration();
		LocalDate returnDate = newCardCreated.getDate().plusYears((long) duration);

		issue.setEmployee(employee);
		issue.setItem(item);
		issue.setIssueDate(newCardCreated.getDate());
		issue.setReturnDate(returnDate);

		Issue newIssueCreated = issrepo.save(issue);

		if(newIssueCreated == null) {
			return "Error in issue generation";
		}

		return "Loan has been applied successfully!";

	}
}
