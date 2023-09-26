package com.wellsfargo.training.lms.controller;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import com.wellsfargo.training.lms.model.ApplyLoanModel;
import com.wellsfargo.training.lms.model.Card;
import com.wellsfargo.training.lms.model.Employee;
import com.wellsfargo.training.lms.model.Issue;
import com.wellsfargo.training.lms.repository.AdminRepository;
import com.wellsfargo.training.lms.repository.EmployeeRepository;
import com.wellsfargo.training.lms.repository.ItemRepository;
import com.wellsfargo.training.lms.repository.LoanRepository;
import com.wellsfargo.training.lms.service.AdminService;
import com.wellsfargo.training.lms.service.EmployeeService;
import org.junit.Test;
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

import org.hamcrest.Matchers;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;

@RunWith(SpringRunner.class)
@WebMvcTest
public class EmployeeControllerTest {


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

    ObjectMapper mapper = new ObjectMapper()
            .findAndRegisterModules()
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);


    @Test
    public void testApplyLoan() throws Exception{
        ApplyLoanModel loan_model = new ApplyLoanModel();
        loan_model.setEmployee_id("123456");
        loan_model.setItem_value(100);
        loan_model.setItem_category("Transport");
        loan_model.setItem_description("new");
        loan_model.setItem_make("steel");
        String mes = "Success";
        Mockito.when(employeeService.applyLoan(ArgumentMatchers.any())).
                thenReturn(mes);
        System.out.println("hi");
        String json = mapper.writeValueAsString(loan_model);

        mvc.perform(post("/api/applyLoan").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8")
                        .content(json).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

}
