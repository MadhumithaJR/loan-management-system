package com.wellsfargo.training.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.lms.model.Item;

public interface ItemRepository extends JpaRepository<Item, Integer>{

}
