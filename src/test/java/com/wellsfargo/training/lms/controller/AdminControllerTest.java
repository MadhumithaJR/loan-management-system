package com.wellsfargo.training.lms.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.wellsfargo.training.lms.model.*;
import com.wellsfargo.training.lms.repository.AdminRepository;
import com.wellsfargo.training.lms.repository.EmployeeRepository;
import com.wellsfargo.training.lms.repository.ItemRepository;
import com.wellsfargo.training.lms.repository.LoanRepository;
import com.wellsfargo.training.lms.service.AdminService;
import com.wellsfargo.training.lms.service.EmployeeService;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hamcrest.Matchers;

import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@RunWith(SpringRunner.class)
@WebMvcTest
public class AdminControllerTest {

    @Autowired
    private MockMvc mvc;

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

    @InjectMocks
    private AdminController adminController;


    ObjectMapper mapper = new ObjectMapper()
            .findAndRegisterModules()
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

//    @Before
//    public void setUp() throws Exception {
//        MockitoAnnotations.initMocks(this);
//        // this is needed for inititalization of mocks, if you use @Mock
//        this.mvc = MockMvcBuilders.standaloneSetup(adminController).build();
//    }

    @Test
    public void testSaveEmployee() throws Exception{
//		System.out.println("hi");
        Employee emp = new Employee();
        List<Issue> issueList = new ArrayList<>();
        List<Card> cardList = new ArrayList<>();
        Issue issue = new Issue();
        Card card = new Card();
        issueList.add(issue);
        cardList.add(card);

        emp.setId("123456");
        emp.setName("ABC");
        emp.setPassword("12345678");
        emp.setDepartment("DepA");
        emp.setDesignation("Des1");
        emp.setDob(LocalDate.now());
        emp.setDoj(LocalDate.now());
        emp.setGender("M");
        emp.setIssue(issueList);
        emp.setCard(cardList);


        Mockito.when(employeeService.registerEmployee(ArgumentMatchers.any())).
                thenReturn(emp);
        String json = mapper.writeValueAsString(emp);

        mvc.perform(post("/api/employees").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                        .content(json).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", Matchers.equalToIgnoringCase(emp.getName())));

    }

    @Test
    public void testUpdateEmployee() throws Exception{
        Employee emp = new Employee();
        List<Issue> issueList = new ArrayList<>();
        List<Card> cardList = new ArrayList<>();
        Issue issue = new Issue();
        Card card = new Card();
        issueList.add(issue);
        cardList.add(card);

        emp.setId("123456");
        emp.setName("ABC");
        emp.setPassword("12345678");
        emp.setDepartment("DepA");
        emp.setDesignation("Des1");
        emp.setDob(LocalDate.now());
        emp.setDoj(LocalDate.now());
        emp.setGender("M");
        emp.setIssue(issueList);
        emp.setCard(cardList);
        String mes = "Employee details successfully updated";
        Mockito.when(employeeService.getSingleEmployee(ArgumentMatchers.any())).thenReturn(Optional.of(emp));
        String json = mapper.writeValueAsString(emp);

        mvc.perform(put("/api/employees/{employee_id}",emp.getId()).contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                        .content(json).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void testRemoveEmployee() throws Exception{
        Employee emp = new Employee();
        List<Issue> issueList = new ArrayList<>();
        List<Card> cardList = new ArrayList<>();
        Issue issue = new Issue();
        Card card = new Card();
        issueList.add(issue);
        cardList.add(card);

        emp.setId("123456");
        emp.setName("ABC");
        emp.setPassword("12345678");
        emp.setDepartment("DepA");
        emp.setDesignation("Des1");
        emp.setDob(LocalDate.now());
        emp.setDoj(LocalDate.now());
        emp.setGender("M");
        emp.setIssue(issueList);
        emp.setCard(cardList);
        employeeRepository.save(emp);
        String mes = "Employee has been successfully deleted";
        Mockito.when(employeeService.deleteEmployee(ArgumentMatchers.any())).thenReturn(Optional.of(emp));
//		String json = mapper.writeValueAsString(emp);

        mvc.perform(delete("/api/employees/{employee_id}",emp.getId()).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", Matchers.equalToIgnoringCase(mes)));
    }

    @Test
    public void testGetAllEmployee() throws Exception{
        Employee emp = new Employee();
        List<Issue> issueList = new ArrayList<>();
        List<Card> cardList = new ArrayList<>();
        Issue issue = new Issue();
        Card card = new Card();
        issueList.add(issue);
        cardList.add(card);

        emp.setId("123456");
        emp.setName("ABC");
        emp.setPassword("12345678");
        emp.setDepartment("DepA");
        emp.setDesignation("Des1");
        emp.setDob(LocalDate.now());
        emp.setDoj(LocalDate.now());
        emp.setGender("M");
        emp.setIssue(issueList);
        emp.setCard(cardList);
        List<Employee> emp_list = new ArrayList<>();
        emp_list.add(emp);

        Mockito.when(employeeService.listAll()).thenReturn(emp_list);
        mvc.perform(get("/api/employees").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].id", Matchers.equalTo(emp.getId())));
    }

    @Test
    public void testGetAllLoan() throws Exception{
        Loan loan = new Loan();
        List<Card> card_list = new ArrayList<>();
        Card card = new Card();
        card_list.add(card);
        loan.setDuration((short)3);
        loan.setLoan_id(1);
        loan.setType("Furniture");
        loan.setCard(card_list);
        List<Loan> loan_list = new ArrayList<>();
        loan_list.add(loan);
        Mockito.when(adminService.listAllLoans()).thenReturn(loan_list);
        mvc.perform(get("/api/admin/loan").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].loan_id", Matchers.equalTo(loan.getLoan_id())));
    }

    @Test
    public void testGetLoanById() throws Exception{
        Loan loan = new Loan();
        List<Card> card_list = new ArrayList<>();
        Card card = new Card();
        card_list.add(card);
        loan.setDuration((short)3);
        loan.setLoan_id(1);
        loan.setType("Furniture");
        loan.setCard(card_list);

        Mockito.when(adminService.getLoanById(ArgumentMatchers.anyInt())).thenReturn(Optional.of(loan));
        mvc.perform(get("/api/admin/loan/{loan_id}",1).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.loan_id", Matchers.equalTo(loan.getLoan_id())));
    }

    @Test
    public void testAddNewLoan() throws Exception{
        Loan loan = new Loan();
        List<Card> card_list = new ArrayList<>();
        Card card = new Card();
        card_list.add(card);
        loan.setDuration((short)3);
        loan.setLoan_id(1);
        loan.setType("Furniture");
        loan.setCard(card_list);
        String mes="Loan has been added successfully";
        String json = mapper.writeValueAsString(loan);
        Mockito.when(adminService.saveLoan(ArgumentMatchers.any())).thenReturn(loan);
        mvc.perform(post("/api/admin/loan").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                        .content(json).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.loan_id", Matchers.equalTo(loan.getLoan_id())));
    }

    @Test
    public void testRemoveLoan() throws Exception{
        Loan loan = new Loan();
        List<Card> card_list = new ArrayList<>();
        Card card = new Card();
        card_list.add(card);
        loan.setDuration((short)3);
        loan.setLoan_id(1);
        loan.setType("Furniture");
        loan.setCard(card_list);

       String mes = "Loan has been successfully deleted";
        Mockito.when(adminService.deleteLoan(1)).thenReturn(Optional.of(loan));
//		String json = mapper.writeValueAsString(emp);

        mvc.perform(MockMvcRequestBuilders.delete("/api/admin/loan/1").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }


    @Test
    public void testAddItem() throws Exception{
        Item item = new Item();
        item.setCategory("Furniture");
        item.setDescription("new");
        item.setMake("wood");
        item.setStatus("A");
        item.setValue(1500);
        item.setItem_id(1);
        List<Issue> issues = new ArrayList<>();
        Issue issue = new Issue();
        issues.add(issue);
        item.setIssue(issues);
        String json = mapper.writeValueAsString(item);
        Mockito.when(adminService.saveItem(ArgumentMatchers.any())).thenReturn(item);
        mvc.perform(post("/api/admin/items").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                        .content(json).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.item_id", Matchers.equalTo(item.getItem_id())));
    }


    @Test
    public void testRemoveItem() throws Exception{
        Item item = new Item();
        item.setCategory("Furniture");
        item.setDescription("new");
        item.setMake("wood");
        item.setStatus("A");
        item.setValue(1500);
        item.setItem_id(1);
        List<Issue> issues = new ArrayList<>();
        Issue issue = new Issue();
        issues.add(issue);
        item.setIssue(issues);
        String mes = "Item has been successfully deleted";
        Mockito.when(adminService.deleteItem(1)).thenReturn(Optional.of(item));
        mvc.perform(MockMvcRequestBuilders.delete("/api/admin/items/1").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", Matchers.equalToIgnoringCase(mes)));
    }

    @Test
    public void testGetItemById() throws Exception{
        Item item = new Item();
        item.setCategory("Furniture");
        item.setDescription("new");
        item.setMake("wood");
        item.setStatus("A");
        item.setValue(1500);
        item.setItem_id(1);
        List<Issue> issues = new ArrayList<>();
        Issue issue = new Issue();
        issues.add(issue);
        item.setIssue(issues);
        Mockito.when(adminService.getItemById(ArgumentMatchers.anyInt())).thenReturn(Optional.of(item));
        mvc.perform(get("/api/admin/items/{item_id}",1).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.item_id", Matchers.equalTo(item.getItem_id())));
    }

    @Test
    public void testGetAllItems() throws Exception{
        Item item = new Item();
        item.setCategory("Furniture");
        item.setDescription("new");
        item.setMake("wood");
        item.setStatus("A");
        item.setValue(1500);
        item.setItem_id(1);
        List<Issue> issues = new ArrayList<>();
        Issue issue = new Issue();
        issues.add(issue);
        item.setIssue(issues);
        List<Item> item_list = new ArrayList<>();
        item_list.add(item);
        Mockito.when(adminService.listAllItems()).thenReturn(item_list);
        mvc.perform(get("/api/admin/items").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", Matchers.hasSize(1)))
                .andExpect(jsonPath("$[0].item_id", Matchers.equalTo(item.getItem_id())));
    }

}
