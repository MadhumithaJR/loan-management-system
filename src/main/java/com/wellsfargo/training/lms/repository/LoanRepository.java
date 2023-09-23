package com.wellsfargo.training.lms.repository;

import com.wellsfargo.training.lms.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoanRepository extends JpaRepository<Loan, Integer> {


    @Query("SELECT l from Loan as l where l.type = :itemCategory")
    Loan findByType(String itemCategory);
}
