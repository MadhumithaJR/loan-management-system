package com.wellsfargo.training.lms.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.lms.model.Item;
import com.wellsfargo.training.lms.model.ItemView;
import com.wellsfargo.training.lms.model.LoanView;

import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<Item, Integer>{

    public Optional<Item> deleteById(int id);
    @Query("SELECT i FROM Item as i WHERE i.category = :category AND i.make = :make AND i.description = :description")
    Item findByMakeAndCategoryAndDescription(String make, String category, String description);
    
    @Query("SELECT new com.wellsfargo.training.lms.model.ItemView (Issue.issue_id, Item.description, Item.make, Item.category, Item.value) FROM Issue Issue INNER JOIN Item Item ON Issue.item.item_id=Item.item_id WHERE Issue.employee.id = :id")
 	public List<ItemView> getItemsByEmpId(Long id);

    @Query(nativeQuery = true, value="SELECT DISTINCT item_description from item_master WHERE item_category = :category")
    List<String> getItemDescriptionForCategory(String category);

    @Query(nativeQuery = true, value="SELECT DISTINCT item_make from item_master WHERE item_category = :category AND item_description = :description")
    List<String> getItemMakeForCategoryDesc(String category, String description);

    @Query(nativeQuery = true, value="SELECT item_value from item_master WHERE item_category = :category AND item_description = :description AND item_make = :make")
    int getItemValue(String category, String description, String make);
}
