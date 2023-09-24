package com.wellsfargo.training.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.lms.model.Item;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<Item, Integer>{

    @Query("SELECT i FROM Item as i WHERE i.category = :category AND i.make = :make AND i.description = :description")
    Item findByMakeAndCategoryAndDescription(String make, String category, String description);
}
