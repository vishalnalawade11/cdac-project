package com.app.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	Employee findByAadharNumber(String aadharNumber);
	//void deleteByAadharNumber(String aadharNumber);
}
