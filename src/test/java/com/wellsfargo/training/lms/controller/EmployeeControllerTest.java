package com.wellsfargo.training.lms.controller;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.BDDMockito.*;

import java.time.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.Rule;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.rules.ExpectedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wellsfargo.training.lms.exception.ResourceNotFoundException;
import com.wellsfargo.training.lms.model.ApplyLoanModel;
import com.wellsfargo.training.lms.model.Employee;
import com.wellsfargo.training.lms.model.Issue;
import com.wellsfargo.training.lms.model.Item;
import com.wellsfargo.training.lms.model.ItemView;
import com.wellsfargo.training.lms.model.LoanView;
import com.wellsfargo.training.lms.service.EmployeeService;

@SpringBootTest
@DisplayName("Employee Controller Tests")
class EmployeeControllerTest {
	
	@Autowired
	private EmployeeController employeeController;
	
	Employee emp;
	
	@MockBean
	private EmployeeService employeeService;
	
	@BeforeEach
	void setUp() throws Exception {
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
	}
	
	@AfterEach
	void tearDown() throws Exception {
		emp = null;
	}
	
	@Test
	void testLoginEmployee() throws ResourceNotFoundException {
		
		when(employeeService.loginEmployee(1101l)).thenReturn(Optional.of(emp));
		
		Employee x = employeeService.loginEmployee(1101l).get();
		
		assertEquals(x.getId(), emp.getId());
		assertEquals(x.getPassword(), emp.getPassword());
		
		ResponseEntity<Boolean> result = employeeController.loginEmployee(emp);
		
		assertTrue(result.getBody());
		assertEquals(HttpStatus.OK, result.getStatusCode());
		
		verify(employeeService, times(2)).loginEmployee(1101l);
	
	}
	
	@Test
	void testLoginEmployeeFailure() throws ResourceNotFoundException {
		//when(employeeService.loginEmployee(1101l)).thenAnswer(invocation -> {throw new ResourceNotFoundException("Employee not found for this Employee Id :: "); });
		
		try { 
			Employee empNew = employeeService.loginEmployee(1102l).orElseThrow(() ->
			new ResourceNotFoundException("Employee not found for this Employee Id :: "));
		}
		
		catch (Exception e) {
			Employee empNew = new Employee();
			ResponseEntity<Boolean> result = employeeController.loginEmployee(empNew);
			
			assertNull(result.getBody());
			assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
			verify(employeeService, times(1)).loginEmployee(1102l);
		}
	}
	
	@Test
	void testApplyLoan() throws ResourceNotFoundException {
		
		ApplyLoanModel loan = new ApplyLoanModel();
		loan.setEmployee_id(1101l);
		loan.setItem_category("Furniture");
		loan.setItem_description("Bed");
		loan.setItem_make("Wood");
		loan.setItem_value(30000);
		
		String response = "Loan has been applied successfully!";
		
		when(employeeService.applyLoan(loan)).thenReturn(response);
		
		ResponseEntity<String> re = employeeController.applyLoan(loan);
		
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals(response, re.getBody());
		
		verify(employeeService, times(1)).applyLoan(any(ApplyLoanModel.class));		

	}
	
	@Test
	void testApplyLoanFailure() throws ResourceNotFoundException {
		
			ApplyLoanModel loan = new ApplyLoanModel();
			loan.setEmployee_id(1102l);
			loan.setItem_category("Furniture");
			loan.setItem_description("Bed");
			loan.setItem_make("Wood");
			loan.setItem_value(30000);
			when(employeeService.applyLoan(loan)).thenThrow(new RuntimeException("Error"));
		
			ResponseEntity<String> result = employeeController.applyLoan(loan);
			
			assertNull(result.getBody());
			assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, result.getStatusCode());
			verify(employeeService, times(1)).applyLoan(loan);

	}
	
	@Test
	void testViewItems() throws ResourceNotFoundException {
		
		List<ItemView> mockItems = new ArrayList<ItemView>();
		mockItems.add(new ItemView(1, "Bed", "Wooden", "Furniture", 40000));
		
		when(employeeService.viewEmployeeItems(1101l)).thenReturn(mockItems);
		
		ResponseEntity<List<ItemView>> re = employeeController.viewEmployeeItems(1101l);
		
		assertEquals(1, re.getBody().size());
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals("Furniture", re.getBody().get(0).getCategory());
		
		verify(employeeService, times(1)).viewEmployeeItems(1101l);
		
	}
	
	@Test
	void testViewItemsFailure() throws ResourceNotFoundException {
		
		List<ItemView> mockItems = new ArrayList<ItemView>();
		mockItems.add(new ItemView(1, "Bed", "Wooden", "Furniture", 40000));
		
		when(employeeService.viewEmployeeItems(1102l)).thenThrow(new RuntimeException("Error"));
		
		ResponseEntity<List<ItemView>> re = employeeController.viewEmployeeItems(1102l);
		
		assertNull(re.getBody());
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, re.getStatusCode());
		verify(employeeService, times(1)).viewEmployeeItems(1102l);
		
	}
	
	@Test
	void testViewLoans() throws ResourceNotFoundException {
		
		List<LoanView> mockLoans = new ArrayList<LoanView>();
		mockLoans.add(new LoanView(1, (short) 2, "Furniture", LocalDate.parse("2023-09-09")));
		
		when(employeeService.viewEmployeeLoans(1101l)).thenReturn(mockLoans);
		
		ResponseEntity<List<LoanView>> re = employeeController.viewEmployeeLoans(1101l);
		
		assertEquals(1, re.getBody().size());
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals("Furniture", re.getBody().get(0).getType());
		
		verify(employeeService, times(1)).viewEmployeeLoans(1101l);
		
	}
	
	@Test
	void testViewLoansFailure() throws ResourceNotFoundException {
		
		List<LoanView> mockLoans = new ArrayList<LoanView>();
		mockLoans.add(new LoanView(1, (short) 2, "Furniture", LocalDate.parse("2023-09-09")));
		
		when(employeeService.viewEmployeeLoans(1102l)).thenThrow(new RuntimeException("Error"));
		
		ResponseEntity<List<LoanView>> re = employeeController.viewEmployeeLoans(1102l);
		
		assertNull(re.getBody());
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, re.getStatusCode());
		verify(employeeService, times(1)).viewEmployeeLoans(1102l);
		
	}
	
	@Test
	void testGetItemDescriptions() throws ResourceNotFoundException{
		
		List<String> mockDescription=new ArrayList<String>();
		mockDescription.add("Chair");
		
		when(employeeService.getItemDescriptions("Furniture")).thenReturn(mockDescription);
		
		ResponseEntity<List<String>> re= employeeController.getItemDescriptionsFromCategory("Furniture");
		
		assertEquals(1, re.getBody().size());
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals("Chair", re.getBody().get(0));
		
		verify(employeeService, times(1)).getItemDescriptions("Furniture");
		
	}
	
	@Test
	void testGetItemDescriptionsFailure() throws ResourceNotFoundException {
		
		List<String> mockDescription=new ArrayList<String>();
		mockDescription.add("Chair");
		
		when(employeeService.getItemDescriptions("Furniture")).thenThrow(new RuntimeException("Error"));
		
		ResponseEntity<List<String>> re = employeeController.getItemDescriptionsFromCategory("Furniture");
		
		assertNull(re.getBody());
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, re.getStatusCode());
		verify(employeeService, times(1)).getItemDescriptions("Furniture");
		
	}
	
	@Test
	void testGetItemMake() throws ResourceNotFoundException{
		
		List<String> mockMake=new ArrayList<String>();
		mockMake.add("Wooden");
		
		when(employeeService.getItemMakes("Furniture","Chair")).thenReturn(mockMake);
		
		ResponseEntity<List<String>> re= employeeController.getItemMakesFromCategoryDesc("Furniture","Chair");
		
		assertEquals(1, re.getBody().size());
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals("Wooden", re.getBody().get(0));
		
		verify(employeeService, times(1)).getItemMakes("Furniture","Chair");	
	}
	
	@Test
	void testGetItemMakeFailure() throws ResourceNotFoundException{
		
		List<String> mockMake = new ArrayList<String>();
		mockMake.add("Wooden");
		
		when(employeeService.getItemMakes("Furniture","Chair")).thenThrow(new RuntimeException("Error"));
		
		ResponseEntity<List<String>> re= employeeController.getItemMakesFromCategoryDesc("Furniture","Chair");
		
		assertNull(re.getBody());
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, re.getStatusCode());
		verify(employeeService, times(1)).getItemMakes("Furniture","Chair");
		
	}
	
	@Test
	void testGetItemValue() throws ResourceNotFoundException{
		
		int mockValue=100;
		
		when(employeeService.getItemValue("Furniture","Chair","Wooden")).thenReturn(mockValue);
		
		ResponseEntity<Integer> re= employeeController.getItemValueFromCategoryDescMake("Furniture","Chair","Wooden");
		
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals(100, re.getBody());
		
		verify(employeeService, times(1)).getItemValue("Furniture","Chair", "Wooden");	
	
	}
	
	@Test
	void testGetItemValueFailure() throws ResourceNotFoundException {
		
		when(employeeService.getItemValue("Furniture","Chair","Wooden")).thenThrow(new RuntimeException("Error"));
		
		ResponseEntity<Integer> re = employeeController.getItemValueFromCategoryDescMake("Furniture","Chair","Wooden");
		
		assertNull(re.getBody());
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, re.getStatusCode());
		verify(employeeService, times(1)).getItemValue("Furniture","Chair", "Wooden");

	}
	
	@Test
	void testGetAllLoanTypes() throws ResourceNotFoundException{
		
		List<String> mockType=new ArrayList<String>();
		mockType.add("Furniture");
		
		when(employeeService.getAllLoanTypes()).thenReturn(mockType);
		
		ResponseEntity<List<String>> re= employeeController.getAllLoanTypes();
		
		assertEquals(1, re.getBody().size());
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals("Furniture", re.getBody().get(0));
		
		verify(employeeService, times(1)).getAllLoanTypes();	
		
	}
	
	@Test
	void testGetAllLoanTypesFailure() throws ResourceNotFoundException {
		
		List<String> mockType = new ArrayList<String>();
		mockType.add("Furniture");
		
		when(employeeService.getAllLoanTypes()).thenThrow(new RuntimeException("Error"));
		
		ResponseEntity<List<String>> re= employeeController.getAllLoanTypes();
		
		assertNull(re.getBody());
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, re.getStatusCode());
		verify(employeeService, times(1)).getAllLoanTypes();
		
	}
}
