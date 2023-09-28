package com.wellsfargo.training.lms.service;

import com.wellsfargo.training.lms.model.Admin;
import com.wellsfargo.training.lms.model.Employee;
import com.wellsfargo.training.lms.model.Item;
import com.wellsfargo.training.lms.model.Loan;
import com.wellsfargo.training.lms.repository.AdminRepository;
import com.wellsfargo.training.lms.repository.EmployeeRepository;
import com.wellsfargo.training.lms.repository.ItemRepository;
import com.wellsfargo.training.lms.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AdminService {


    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ItemRepository itemRepository;
    
    @Autowired
    private EmployeeRepository empRepository;
    
    // Admin Registration
    public Admin registerAdmin(Admin admin){
        return adminRepository.save(admin);
    }

    // Admin Login    
    public Optional<Admin> loginAdmin(String username){
        return adminRepository.findById(username);
    }
    
 // Register or Update Employee
 	public Employee registerEmployee(Employee e) {
 		return empRepository.save(e);
 	}
    
    // View All Employees
    public List<Employee> listAll(){
		return empRepository.findAll();
	}
    
    // Get Single Employee By ID    
	public Optional<Employee> getSingleEmployee(Long id){
		return empRepository.findById(id);
		
	}
	
	// Delete an Employee	
	public void deleteEmployee(Long id) {
		empRepository.deleteById(id);
	}

	// Save Item
    public Item saveItem(Item i) {
        return itemRepository.save(i);
    }

    // View All Items
    public List<Item> listAllItems() {
        return itemRepository.findAll();
    }

    // Get Single Item By ID
    public Optional<Item> getItemById(Integer id) {
        return itemRepository.findById(id);
    }

    // Delete an Item
    public Optional<Item> deleteItem(int id) {
        return itemRepository.deleteById(id);
    }

    // Save Loan
    public Loan saveLoan(Loan loan){
        return loanRepository.save(loan);
    }

    // View All Loans
    public List<Loan> listAllLoans(){
        return loanRepository.findAll();
    }

    // Get Single Loan By ID
    public Optional<Loan> getLoanById(int id){
        return loanRepository.findById(id);
    }

    // Delete a Loan
    public Optional<Loan> deleteLoan(int id){
        return loanRepository.deleteById(id);
    }

}
