package com.employeeapp.service;

import java.util.List;

import com.employeeapp.model.Employee;

public interface EmployeeService {
	public List<Employee> getAllEmployees();
	public Employee getEmployeeById(Long id);
	public Employee createEmployee(Employee employee);
	public Employee updateEmployee(Long id, Employee employee);
	public void deleteEmployee(Long id);
}
	