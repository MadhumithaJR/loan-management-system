package com.wellsfargo.training.lms.repository;

import com.wellsfargo.training.lms.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Integer> {

}
