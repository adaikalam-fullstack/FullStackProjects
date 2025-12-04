package com.employeeapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employeeapp.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	
}