package com.wellsfargo.training.lms.service;

import com.wellsfargo.training.lms.model.Admin;
import com.wellsfargo.training.lms.model.Item;
import com.wellsfargo.training.lms.model.Loan;
import com.wellsfargo.training.lms.repository.AdminRepository;
import com.wellsfargo.training.lms.repository.ItemRepository;
import com.wellsfargo.training.lms.repository.LoanRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

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

    public Admin registerAdmin(Admin admin){
        return adminRepository.save(admin);
    }

    public Optional<Admin> loginAdmin(String username){
        return adminRepository.findById(username);
    }

    public Item saveItem(Item i) {
        return itemRepository.save(i);
    }

    public List<Item> listAllItems() {
        return itemRepository.findAll();
    }

    public Optional<Item> getSingleItem(Integer id) {
        return itemRepository.findById(id);
    }

    public void deleteItem(int id) {
        itemRepository.deleteById(id);
    }

    public Loan saveLoan(Loan loan){
        return loanRepository.save(loan);
    }

    public List<Loan> listAll(){
        return loanRepository.findAll();
    }

    public Optional<Loan> getLoanById(int id){
        return loanRepository.findById(id);
    }

    public void deleteLoan(int id){
        loanRepository.deleteById(id);
    }




}
