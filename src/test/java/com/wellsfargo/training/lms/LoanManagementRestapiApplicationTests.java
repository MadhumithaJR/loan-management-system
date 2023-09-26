package com.wellsfargo.training.lms;

import com.wellsfargo.training.lms.controller.AdminControllerTest;
import com.wellsfargo.training.lms.controller.EmployeeControllerTest;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages="com")
@SpringBootTest(classes= {EmployeeControllerTest.class, AdminControllerTest.class})
class LoanManagementRestapiApplicationTests {


	@Test
	void contextLoads() {
	}

}
