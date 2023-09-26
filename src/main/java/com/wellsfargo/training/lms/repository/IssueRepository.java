package com.wellsfargo.training.lms.repository;

import com.wellsfargo.training.lms.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue,Integer> {


}
