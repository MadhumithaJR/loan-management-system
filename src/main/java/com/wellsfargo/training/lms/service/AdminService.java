package com.wellsfargo.training.lms.service;

import com.wellsfargo.training.lms.model.Admin;
import com.wellsfargo.training.lms.model.Loan;
import com.wellsfargo.training.lms.repository.AdminRepository;
import com.wellsfargo.training.lms.repository.LoanRepository;
import jakarta.transaction.Transactional;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Service
@Transactional
public class AdminService {


    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private AdminRepository adminRepository;

    public Admin registerAdmin(Admin admin){
        return adminRepository.save(admin);
    }

    public Optional<Admin> loginAdmin(String username){
        return adminRepository.findById(username);
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
