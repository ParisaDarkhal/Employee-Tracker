// packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql");

// connecting mysql to local host
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", //should hide password with env later
  database: "employees_db",
});
db.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Successfully Connected to Database");
});

// creating questions for user input
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",

          "Add Employee",
          "Update Employee Role",
          "Add Role",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      if (answer.task === "View All Employees") {
        viewAllEmployees();
      } else if (answer.task === "View All Roles") {
        viewAllRoles();
      } else if (answer.task === "View All Departments") {
        viewAllDepartments();
      } else if (answer.task === "Add Employee") {
        addEmployee();
      } else if (answer.task === "Update Employee Role") {
        updateEmployeeRole();
      } else if (answer.task === "Add Role") {
        addRole();
      } else if (answer.task === "Add Department") {
        addDepartment();
      } else if (answer.task === "Quit") {
        process.exit;
      }
    });
}

//FUNCTIONS

//view all employees
function viewAllEmployees() {
  const request = "SELECT * FROM employee";
  db.query(request, (err, res) => {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Select an option:",
          choices: ["Main Menu", "Quit"],
        },
      ])
      .then((answer) => {
        if (answer.choice === "Main Menu") {
          start();
        } else {
          process.exit;
        }
      });
  });
}

// view all roles
function viewAllRoles() {
  const request = "SELECT * FROM role";
  db.query(request, (err, res) => {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Select an option:",
          choices: ["Main Menu", "Quit"],
        },
      ])
      .then((answer) => {
        if (answer.choice === "Main Menu") {
          start();
        } else {
          process.exit;
        }
      });
  });
}

// view all departments
function viewAllDepartments() {
  const request = "SELECT * FROM department";
  db.query(request, (err, res) => {
    if (err) throw err;
    console.table(res);
    inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Select an option:",
          choices: ["Main Menu", "Quit"],
        },
      ])
      .then((answer) => {
        if (answer.choice === "Main Menu") {
          start();
        } else {
          process.exit;
        }
      });
  });
}

// add new employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "number",
        name: "roleID",
        message: "What is the employee's role id?",
      },
      {
        type: "number",
        name: "managerID",
        message: "Who is the employee's manager id",
      },
    ])
    .then(
      (response) =>
        db.query(
          "INSERT INTO employee(first-name, last-name, role_id, manager_id) VALUES (?,?,?,?)",
          [
            response.firstName,
            response.lastName,
            response.roleID,
            response.managerID,
          ]
        ),
      (err, res) => {
        if (err) throw err;
        console.table(res);
        inquirer
          .prompt([
            {
              type: "list",
              name: "choice",
              message: "Select an option:",
              choices: ["Main Menu", "Quit"],
            },
          ])
          .then((answer) => {
            if (answer.choice === "Main Menu") {
              start();
            } else {
              process.exit;
            }
          });
      }
    );
}

// add new role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "What is the name of the role?",
      },
      {
        type: "number",
        name: "salary",
        message: "What s the salary of the new role?",
      },
      {
        type: "number",
        name: "departmentID",
        message:
          "What department does the role belong to, please enter department ID?",
      },
    ])
    .then(
      (response) =>
        db.query(
          "INSERT INTO role(title, salary, department_id) VALUES (?,?,?)",
          [response.newRole, response.salary, response.departmentID]
        ),
      (err, res) => {
        if (err) throw err;
        console.table(res);
        inquirer
          .prompt([
            {
              type: "list",
              name: "choice",
              message: "Select an option:",
              choices: ["Main Menu", "Quit"],
            },
          ])
          .then((answer) => {
            if (answer.choice === "Main Menu") {
              start();
            } else {
              process.exit;
            }
          });
      }
    );
}

//add new department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the department",
      },
    ])
    .then(
      (response) =>
        db.query("INSERT INTO department(name) VALUES (?)", [
          response.newDepartment,
        ]),
      (err, res) => {
        if (err) throw err;
        console.table(res);
        inquirer
          .prompt([
            {
              type: "list",
              name: "choice",
              message: "Select an option:",
              choices: ["Main Menu", "Quit"],
            },
          ])
          .then((answer) => {
            if (answer.choice === "Main Menu") {
              start();
            } else {
              process.exit;
            }
          });
      }
    );
}

// update employee role
function updateEmployeeRole() {}

// call start to begin
start();
