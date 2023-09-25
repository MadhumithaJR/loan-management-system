package com.wellsfargo.training.lms.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.lms.model.Item;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<Item, Integer>{

    @Query("SELECT i FROM Item as i WHERE i.category = :category AND i.make = :make AND i.description = :description")
    Item findByMakeAndCategoryAndDescription(String make, String category, String description);
    
    @Query(nativeQuery=true, value="SELECT Issue.issue_id, Item.item_description, Item.item_make, Item.item_category, Item.item_value FROM issue_details Issue INNER JOIN item_master Item ON Issue.item_id = Item.item_id WHERE Issue.employee_id = ?1")
    List<Map<String, Object>> getItemsByEmpId(String id);
}
