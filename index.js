// packages needed for this application
const inquirer = require("inquirer");

// creating an array of questions for user input
const questions = [
  {
    type: "list",
    name: "task",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
  {
    //this question should be shown if user chooses "Add Department"
    type: "input",
    name: "newDepartment",
    message: "What is the name of the department",
  },
  {
    //this question should be asked if user chooses "Add Role"
    type: "input",
    name: "newRole",
    message: "What is the name of the role?",
  },
  {
    //this question should be asked if user chooses "Add Role" after input newRole
    type: "number",
    name: "salary",
    message: "What s the salary of the new role?",
  },
  {
    //this qustion should be asked if user choosees "Add Role" after salary input
    type: "list",
    name: "department",
    message: "What department does the role belong to?",
    choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
  },
  {
    //this question should be asked if user chooses "Add Employee"
    type: "input",
    name: "firstName",
    message: "What is the employee's first name?",
  },
  {
    //this question should be asked if user chooses "Add Employee" after firstName input
    type: "input",
    name: "lastName",
    message: "What is the employee's last name?",
  },
  {
    //this question should be asked if user chooses "Add Employee" after lastName input
    type: "list",
    name: "employeeRole",
    message: "What is the employee's role?",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
      "Lawyer",
      "Customer Service",
    ],
  },
  {
    //this question should be asked if user chooses "Add Employee" after employeeRole input
    type: "list",
    name: "manager",
    message: "Who is the employee's manager",
    choices: [
      "none",
      //employees names should be comming from database
    ],
  },
  {
    //this question should be asked if user chooses "Update Employee Role"
    type: "list",
    name: "updateEmployee",
    message: "Which employee do you want to update?",
    choices: [
      //employees names should be comming from database
    ],
  },
  {
    //this question should be asked if user chooses "Update Employee Role" after updateEmployee input
    type: "list",
    name: "role",
    message: "Which role do you want to assign the selected employee?",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
      "Lawyer",
      "Customer Service",
    ],
  },
];
