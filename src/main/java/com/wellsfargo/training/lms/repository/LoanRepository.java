package com.wellsfargo.training.lms.repository;

import com.wellsfargo.training.lms.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Integer> {

}
