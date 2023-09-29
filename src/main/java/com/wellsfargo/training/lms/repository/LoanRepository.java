package com.wellsfargo.training.lms.repository;

import com.wellsfargo.training.lms.model.Loan;
import com.wellsfargo.training.lms.model.LoanView;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoanRepository extends JpaRepository<Loan, Integer> {

    Optional<Loan> deleteById(int id);
    @Query("SELECT l from Loan as l where l.type = :itemCategory")
    Loan findByType(String itemCategory);
    
    @Query("SELECT new com.wellsfargo.training.lms.model.LoanView (l.loan_id,l.duration,l.type,lc.date) FROM Loan l INNER JOIN Card lc ON l.loan_id=lc.loan.loan_id WHERE lc.employee.id = :employee_id")
 	public List<LoanView> getLoansByEmpId(String employee_id);

    @Query(nativeQuery = true, value="SELECT DISTINCT loan_type from loan_master")
    List<String> getAllTypes();
}
