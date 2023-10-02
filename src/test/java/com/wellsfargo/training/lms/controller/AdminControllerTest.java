package com.wellsfargo.training.lms.controller;

import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


import com.wellsfargo.training.lms.exception.ResourceNotFoundException;
import com.wellsfargo.training.lms.model.*;
import com.wellsfargo.training.lms.repository.AdminRepository;
import com.wellsfargo.training.lms.repository.EmployeeRepository;
import com.wellsfargo.training.lms.repository.ItemRepository;
import com.wellsfargo.training.lms.repository.LoanRepository;
import com.wellsfargo.training.lms.service.AdminService;
import com.wellsfargo.training.lms.service.EmployeeService;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

@SpringBootTest
@DisplayName("Admin Controller Tests")
public class AdminControllerTest {


    @Autowired
    private AdminController adminController;

    @MockBean
    private EmployeeService employeeService;

    @MockBean
    private EmployeeRepository employeeRepository;

    @MockBean
    private AdminService adminService;

    @MockBean
    private AdminRepository adminRepository;


    @MockBean
    private ItemRepository itemRepository;


    @MockBean
    private LoanRepository loanRepository;

    Employee emp;
    Admin adm;
    Loan loan;
    Item item;

    @BeforeEach
    void setUp() throws Exception {
        adm=new Admin();
        adm.setUsername("admin");
        adm.setPassword("password");
    	
    	emp = new Employee();

        emp.setId(1101l);
        emp.setName("Raj");
        emp.setPassword("secret");
        emp.setDepartment("Technology");
        emp.setDesignation("Director");

        LocalDate dob = LocalDate.parse("1985-01-01");
        emp.setDob(dob);

        LocalDate doj = LocalDate.parse("2001-01-01");
        emp.setDoj(doj);

        loan = new Loan();
        loan.setDuration((short) 3);
        loan.setLoan_id(1);
        loan.setType("Furniture");

        item = new Item();
        item.setCategory("Furniture");
        item.setDescription("new");
        item.setMake("wood");
        item.setStatus("A");
        item.setValue(1500);
        item.setItem_id(1);
        
    }

    @AfterEach
    void tearDown() throws Exception {
    	
        adm = null;
    	emp = null;
        loan = null;
        item = null;
    }
    
    @Test
    public void testLoginAdmin() throws ResourceNotFoundException{
    	when(adminService.loginAdmin(adm.getUsername())).thenReturn(Optional.of(adm));
    	
    	Admin a =adminService.loginAdmin(adm.getUsername()).get();
    	
    	assertEquals(a.getUsername(),adm.getUsername());
    	assertEquals(a.getPassword(),adm.getPassword());
    	
    	ResponseEntity<Boolean> result=adminController.loginAdmin(adm);
    	assertEquals(HttpStatus.OK,result.getStatusCode());
    	assertTrue(result.getBody());
    	
    	verify(adminService,times(2)).loginAdmin(adm.getUsername());
    	
    }
    
    @Test
    public void testLoginAdminFailure() throws ResourceNotFoundException{
    	
    	try {
    		Admin admin = adminService.loginAdmin("Admin").orElseThrow(() ->
            new ResourceNotFoundException("Admin not found for this admin username :: "));
    	}
    	
    	catch (Exception e) {
    		Admin admin = new Admin();
    		ResponseEntity<Boolean> result = adminController.loginAdmin(admin);
        	assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,result.getStatusCode());
        	assertNull(result.getBody());
        	
        	verify(adminService,times(1)).loginAdmin("Admin");
    	}
    }
    
    @Test
    public void testRegisterAdmin() throws ResourceNotFoundException{

        when(adminService.registerAdmin(adm)).thenReturn(adm);

        Admin a = adminService.registerAdmin(adm);

        assertEquals(a.getUsername(), adm.getUsername());
        assertEquals(a.getPassword(), adm.getPassword());

        Admin result = adminController.registerAdmin(adm);
        
        assertEquals(adm, result);
        
        verify(adminService, times(2)).registerAdmin(adm);

    }
    
    @Test
    public void testSaveEmployee() throws ResourceNotFoundException{


        when(adminService.registerEmployee(emp)).thenReturn(emp);

        Employee x = adminService.registerEmployee(emp);

        assertEquals(x.getId(), emp.getId());
        assertEquals(x.getPassword(), emp.getPassword());

        ResponseEntity<Employee> result = adminController.saveEmployee(emp);


        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals(x, result.getBody());


        verify(adminService, times(2)).registerEmployee(emp);

    }
    
    @Test
    public void testSaveEmployeeFailure() throws ResourceNotFoundException{

        when(adminService.registerEmployee(emp)).thenThrow(new RuntimeException("Error"));

        ResponseEntity<Employee> result = adminController.saveEmployee(emp);
       
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
        assertNull(result.getBody());
        verify(adminService, times(1)).registerEmployee(emp);
        
    }

    @Test
    public void testUpdateEmployee() throws ResourceNotFoundException{


        when(adminService.getSingleEmployee(1101l)).thenReturn(Optional.of(emp));

        Employee x = adminService.getSingleEmployee(1101l).get();


        assertEquals(x.getId(), emp.getId());
        assertEquals(x.getPassword(), emp.getPassword());

        ResponseEntity<Employee> result = adminController.updateEmployeeById(1101l,emp);


        assertEquals(HttpStatus.OK, result.getStatusCode());


        verify(adminService, times(2)).getSingleEmployee(1101l);

    }
    
    @Test
    public void testUpdateEmployeeFailure() throws ResourceNotFoundException{
    	
    	try {
			 Employee employee = adminService.getSingleEmployee(1102l).
			 orElseThrow(()->new ResourceNotFoundException("Employee Not found for the ID"));
    	}
    	catch (Exception e) {
    		ResponseEntity<Employee> result = adminController.updateEmployeeById(1102l,emp);
    		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
    		assertNull(result.getBody());
            verify(adminService, times(2)).getSingleEmployee(1102l);
    	}
    }
    
    @Test
    public void testGetEmployeeById() throws ResourceNotFoundException{


        when(adminService.getSingleEmployee(1101l)).thenReturn(Optional.of(emp));

        Employee x = adminService.getSingleEmployee(1101l).get();


        assertEquals(x.getId(), emp.getId());
        assertEquals(x.getPassword(), emp.getPassword());

        ResponseEntity<Employee> result = adminController.getEmployeeById(1101l);


        assertEquals(HttpStatus.OK, result.getStatusCode());
        verify(adminService, times(2)).getSingleEmployee(1101l);

    }
    
    @Test
    public void testGetEmployeeByIdFailure() throws ResourceNotFoundException{

    	try {
    		Employee empNew = adminService.getSingleEmployee(1102l).
    				orElseThrow(()->new ResourceNotFoundException("Employee Not found for the ID"));
    	}
    	catch (Exception e) {
    		ResponseEntity<Employee> result = adminController.getEmployeeById(1102l);
    	    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
    	    assertNull(result.getBody());
    	    verify(adminService, times(2)).getSingleEmployee(1102l);
    	}
    }

    @Test
    public void testRemoveEmployee() throws ResourceNotFoundException{


		doNothing().when(adminService).deleteEmployee(1101l);
        when(adminService.getSingleEmployee(1101l)).thenReturn(Optional.of(emp));

        Employee e = adminService.getSingleEmployee(1101l).get();

        ResponseEntity<Map<String,Boolean>> result = adminController.deleteEmployee(1101l);

        assertEquals(HttpStatus.OK,result.getStatusCode());

        verify(adminService, times(1)).deleteEmployee(1101l);

    }
    
    @Test
    public void testRemoveEmployeeFailure() throws ResourceNotFoundException{
    	
    	try {
    		adminService.getSingleEmployee(1102l).
			orElseThrow(()-> new ResourceNotFoundException("Employee Not found for this ID:"+1102l));
    	}
    	catch (Exception e) {
    		ResponseEntity<Map<String,Boolean>> result = adminController.deleteEmployee(1102l);
    	    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
    	    assertNull(result.getBody());
    	    verify(adminService, times(0)).deleteEmployee(1102l);
    	}
    }

    @Test
    public void testGetAllEmployee() throws Exception{


        List<Employee> mockItems = new ArrayList<Employee>();
        mockItems.add(emp);
        when(adminService.listAll()).thenReturn(mockItems);

        ResponseEntity<List<Employee>> re = adminController.getAllEmployees();

        assertEquals(1, re.getBody().size());
        assertEquals(HttpStatus.OK, re.getStatusCode());
        assertEquals(1101l, re.getBody().get(0).getId());

        verify(adminService, times(1)).listAll();

    }
    
    @Test
    public void testGetAllEmployeeFailure() throws ResourceNotFoundException{

        when(adminService.listAll()).thenThrow(new RuntimeException("Error"));

        ResponseEntity<List<Employee>> result = adminController.getAllEmployees();
       
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
        assertNull(result.getBody());
        verify(adminService, times(1)).listAll();
        
    }

    @Test
    public void testAddNewLoan() throws Exception{


        when(adminService.saveLoan(loan)).thenReturn(loan);

        Loan l = adminService.saveLoan(loan);

        assertEquals(l.getLoan_id(),loan.getLoan_id());
        assertEquals(l.getType(),loan.getType());

        ResponseEntity<Loan> result = adminController.saveLoan(loan);

        assertEquals(HttpStatus.CREATED,result.getStatusCode());
        assertEquals(l,result.getBody());

        verify(adminService,times(2)).saveLoan(loan);


    }
    
    @Test
    public void testAddNewLoanFailure() throws Exception{
    	
    	when(adminService.saveLoan(loan)).thenThrow(new RuntimeException("Error"));

        ResponseEntity<Loan> result = adminController.saveLoan(loan);
       
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
        assertNull(result.getBody());
        verify(adminService, times(1)).saveLoan(loan);
    }

    @Test
    public void testGetLoanById() throws ResourceNotFoundException{


        when(adminService.getLoanById(1)).thenReturn(Optional.of(loan));

        Loan l = adminService.getLoanById(1).get();

        assertEquals(loan.getLoan_id(),l.getLoan_id());
        assertEquals(loan.getType(),l.getType());

        ResponseEntity<Loan> result  = adminController.getLoanById(1);

        assertEquals(HttpStatus.OK,result.getStatusCode());
        assertEquals(l,result.getBody());

        verify(adminService,times(2)).getLoanById(1);

    }

    @Test
    public void testGetLoanByIdFailure() throws ResourceNotFoundException{
    	
    	try {
    		Loan l = adminService.getLoanById(2).
    				orElseThrow(() -> new ResourceNotFoundException("Loan not found with id: "+2));
    	}
    	catch (Exception e) {
    		ResponseEntity<Loan> result = adminController.getLoanById(2);
    		
    	    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
    	    assertNull(result.getBody());
    	    verify(adminService, times(2)).getLoanById(2);
    	}
    }

    @Test
    public void testRemoveLoan() throws Exception{

        when(adminService.getLoanById(1)).thenReturn(Optional.of(loan));
        when(adminService.deleteLoan(1)).thenReturn(Optional.of(loan));

        Loan l = adminService.getLoanById(1).get();

        ResponseEntity<Map<String,Boolean>> result = adminController.deleteLoan(1);

        assertEquals(HttpStatus.OK,result.getStatusCode());

        verify(adminService, times(1)).deleteLoan(1);

    }
    
    @Test
    public void testRemoveLoanFailure() throws Exception {
    	
    	try {
    		Loan l = adminService.getLoanById(2).orElseThrow(()->new ResourceNotFoundException("Loan not found with id: "+2));
    	}
    	catch (Exception e) {
    		ResponseEntity<Map<String,Boolean>> result = adminController.deleteLoan(2);
    		
    	    assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
    	    assertNull(result.getBody());
    	    verify(adminService, times(0)).deleteLoan(2);
    	}
    }

    @Test
    public void testGetAllLoan() throws Exception{
        List<Loan> mockItems = new ArrayList<Loan>();
        mockItems.add(loan);
        when(adminService.listAllLoans()).thenReturn(mockItems);

        ResponseEntity<List<Loan>> re = adminController.getAllLoan();

        assertEquals(1, re.getBody().size());
        assertEquals(HttpStatus.OK, re.getStatusCode());
        assertEquals(1, re.getBody().get(0).getLoan_id());

        verify(adminService, times(1)).listAllLoans();

    }
    
    @Test
    public void testGetAllLoanFailure() throws ResourceNotFoundException{

        when(adminService.listAllLoans()).thenThrow(new RuntimeException("Error"));

        ResponseEntity<List<Loan>> result = adminController.getAllLoan();
       
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
        assertNull(result.getBody());
        verify(adminService, times(1)).listAllLoans();
        
    }
    
    @Test
    public void testUpdateLoan() throws ResourceNotFoundException{


        when(adminService.getLoanById(1)).thenReturn(Optional.of(loan));

        Loan l = adminService.getLoanById(1).get();

        assertEquals(l.getLoan_id(), loan.getLoan_id());
        assertEquals(l.getType(), loan.getType());

        ResponseEntity<Loan> result = adminController.updateLoan(1,loan);


        assertEquals(HttpStatus.CREATED, result.getStatusCode());


        verify(adminService, times(2)).getLoanById(1);

    }
    
    /*@Test
    public void testUpdateLoanFailure() throws ResourceNotFoundException{
    	try {
    		Loan l = adminService.getLoanById(2)
            		.orElseThrow(()->new ResourceNotFoundException("Loan not found with id: "+2));
    	}
    	catch (Exception e) {
    		Loan l = new Loan();
    		ResponseEntity<Loan> result = adminController.updateLoan(l.getLoan_id(),loan);

            assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
            assertNull(result.getBody());
            verify(adminService, times(2)).getLoanById(2);
    	}
    }*/


    @Test
    public void testAddItem() throws Exception{
        when(adminService.saveItem(item)).thenReturn(item);

        Item i = adminService.saveItem(item);

        assertEquals(i.getItem_id(),item.getItem_id());
        assertEquals(i.getCategory(),item.getCategory());

        ResponseEntity<Item> result = adminController.saveItem(item);

        assertEquals(HttpStatus.CREATED,result.getStatusCode());
        assertEquals(i,result.getBody());

        verify(adminService,times(2)).saveItem(item);

    }
    
    @Test
    public void testAddItemFailure() throws Exception{
    	
    	when(adminService.saveItem(item)).thenThrow(new RuntimeException("Error"));

    	ResponseEntity<Item> result = adminController.saveItem(item);
       
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
        assertNull(result.getBody());
        verify(adminService, times(1)).saveItem(item);
    }

    @Test
    public void testGetItemById() throws Exception{
        when(adminService.getItemById(1)).thenReturn(Optional.of(item));

        Item i = adminService.getItemById(1).get();

        assertEquals(item.getItem_id(),i.getItem_id());
        assertEquals(item.getCategory(),i.getCategory());

        ResponseEntity<Item> result  = adminController.getItemById(1);

        assertEquals(HttpStatus.OK,result.getStatusCode());
        assertEquals(i,result.getBody());

        verify(adminService,times(2)).getItemById(1);

    }
    
    @Test
    public void testGetItemByIdFailure() throws Exception{
    	
    	try {
    		Item i = adminService.getItemById(2).
    				orElseThrow(() -> new ResourceNotFoundException("Item Not Found For This ID: "+2));
    	}
    	catch (Exception e) {
    		ResponseEntity<Item> result  = adminController.getItemById(2);

            assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,result.getStatusCode());
            assertNull(result.getBody());
            verify(adminService,times(2)).getItemById(2);
    	}
    }


    @Test
    public void testRemoveItem() throws ResourceNotFoundException{

        when(adminService.getItemById(1)).thenReturn(Optional.of(item));
        when(adminService.deleteItem(1)).thenReturn(Optional.of(item));

        Item i = adminService.getItemById(1).get();

        ResponseEntity<Map<String,Boolean>> result = adminController.deleteItem(1);

        assertEquals(HttpStatus.OK,result.getStatusCode());

        verify(adminService, times(1)).deleteItem(1);

    }

    @Test
    public void testRemoveItemFailure() throws ResourceNotFoundException{
    	
    	try {
			adminService.getItemById(2).
			orElseThrow(() -> new ResourceNotFoundException("Item Not Found For This ID: "+2));
    	}
    	catch (Exception e) {
    		ResponseEntity<Map<String,Boolean>> result = adminController.deleteItem(2);

            assertEquals(HttpStatus.INTERNAL_SERVER_ERROR,result.getStatusCode());
            assertNull(result.getBody());
            verify(adminService, times(0)).deleteItem(2);
    	}
    }


    @Test
    public void testGetAllItems() throws ResourceNotFoundException{
        List<Item> mockItems = new ArrayList<Item>();
        mockItems.add(item);
        when(adminService.listAllItems()).thenReturn(mockItems);

        ResponseEntity<List<Item>> re = adminController.getAllItems();

        assertEquals(1, re.getBody().size());
        assertEquals(HttpStatus.OK, re.getStatusCode());
        assertEquals(1, re.getBody().get(0).getItem_id());

        verify(adminService, times(1)).listAllItems();

    }
    
    @Test
    public void testGetAllItemsFailure() throws ResourceNotFoundException {
    	
    	when(adminService.listAllItems()).thenThrow(new RuntimeException("Error"));

    	ResponseEntity<List<Item>> result = adminController.getAllItems();
       
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
        assertNull(result.getBody());
        verify(adminService, times(1)).listAllItems();
    }
    
    @Test
    public void testUpdateItem() throws ResourceNotFoundException{

        when(adminService.getItemById(1)).thenReturn(Optional.of(item));

        Item i = adminService.getItemById(1).get();

        assertEquals(i.getItem_id(), item.getItem_id());
        assertEquals(i.getCategory(), item.getCategory());

        ResponseEntity<Item> result = adminController.updateItem(1,item);


        assertEquals(HttpStatus.OK, result.getStatusCode());


        verify(adminService, times(2)).getItemById(1);
      
    }
    
    @Test
    public void testUpdateItemFailure() throws ResourceNotFoundException{
    	
    	try {
			Item i = adminService.getItemById(2).
					orElseThrow(() -> new ResourceNotFoundException("Item Not Found For This ID: "+2));
    	}
    	catch (Exception e) {
    		ResponseEntity<Item> result = adminController.updateItem(2,item);

            assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
            assertNull(result.getBody());
            verify(adminService, times(2)).getItemById(2);
    	}
    }

}
