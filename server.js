// packages needed for this application
const inquirer = require("inquirer");
const mysql = require("mysql");
const { printTable } = require("console-table-printer"); //for showing the array returned by mysql query as a table in command line

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
        console.log("Good Bye!");
        process.exit;
      }
    });
}

//FUNCTIONS

//view all employees
function viewAllEmployees() {
  const sql =
    "select e.id, e.first_name, e.last_name, r.title, r.salary, d.name as department, concat(m.first_name, ' ', m.last_name) as manager from employee as e" +
    " join role as r on e.role_id=r.id join department as d on  r.department_id=d.id left join employee as m on e.manager_id=m.id";
  db.query(sql, (err, res) => {
    if (err) throw err;

    printTable(res);
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
          console.log("Good Bye!");
          process.exit;
        }
      });
  });
}

// view all roles
function viewAllRoles() {
  const sql =
    "select r.id, r.title, r.salary, d.name as department from role as r " +
    "join department as d where r.department_id=d.id;";
  db.query(sql, (err, res) => {
    if (err) throw err;
    printTable(res);
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
          console.log("Good Bye!");
          process.exit;
        }
      });
  });
}

// view all departments
function viewAllDepartments() {
  const sql = "select department.id, department.name from department;";
  db.query(sql, (err, res) => {
    if (err) throw err;
    printTable(res);
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
          console.log("Good Bye!");
          process.exit;
        }
      });
  });
}

// gets role ID for input
async function getRoleID() {
  let options = [];
  await db.query("SELECT r.id, r.title FROM role AS r", (err, res) => {
    if (err) throw err;

    res.map((obj) => options.push({ name: obj.title, value: obj.id }));
  });
  return options;
}

// gets employee ID for input
async function getEmployeeID() {
  let options = [];
  await db.query(
    "SELECT e.id, concat(e.first_name, ' ', e.last_name) AS fullName FROM employee AS e",
    // "SELECT e.id, concat(e.first_name, ' ', e.last_name) AS fullName FROM employee AS e",
    (err, res) => {
      if (err) throw err;

      res.map((obj) =>
        options.push({
          name: obj.fullName,
          value: obj.id,
        })
      );

      console.log("options :>> ", options);
      return options;
    }
  );
}

// gets department ID for input
async function getDepartmentID() {
  let options = [];
  await db.query("SELECT d.id, d.name FROM department AS d", (err, res) => {
    if (err) throw err;

    res.map((obj) => options.push({ name: obj.name, value: obj.id }));
  });
  return options;
}

// add new employee
async function addEmployee() {
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
        type: "list",
        name: "role",
        message: "What is the employee's role?",
        choices: await getRoleID(),
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: await getEmployeeID(),
      },
    ])
    .then((response) => {
      db.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          response.firstName,
          response.lastName,
          response.role,
          response.manager,
        ],
        (err, res) => {
          if (err) throw err;
          console.log("New employee successfully added.");
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
                console.log("Good Bye!");
                process.exit;
              }
            });
        }
      );
    });
}

// add new role
async function addRole() {
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
        type: "list",
        name: "department",
        message: "What department does the role belong to?",
        choices: await getDepartmentID(),
      },
    ])
    .then((response) =>
      db.query(
        "INSERT INTO role(title, salary, department_id) VALUES (?,?,?)",
        [response.newRole, response.salary, response.department],
        // ),
        (err, res) => {
          if (err) throw err;
          console.log(`${response.newRole} was successfully added to role.`);
          // console.table(res);
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
                console.log("Good Bye!");
                process.exit;
              }
            });
        }
      )
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
    .then((response) => {
      db.query(
        "INSERT INTO department(name) VALUES (?)",
        [response.newDepartment],
        (err, res) => {
          if (err) throw err;
          console.log(
            `${response.newDepartment} was successfully added to department.`
          );
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
                console.log("Good Bye!");
                process.exit;
              }
            });
        }
      );
    });
}

// update employee role
async function updateEmployeeRole() {
  // const allEmployees = getEmployeeID();
  // console.log("allEmployees:", getEmployeeID());
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Select the employee you want to update the role for:",
        choices: await getEmployeeID(),
      },
      {
        type: "list",
        name: "role",
        message: "Which role do you want to assign to selected employee?",
        choices: await getRoleID(),
      },
    ])
    .then((response) => {
      db.query(
        `UPDATE employee SET role_id=${response.role} WHERE employee.id=${response.employee}`,
        (err, res) => {
          if (err) throw err;
          console.log("Employee's role is successfully updated.");
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
                console.log("Good Bye!");
                process.exit;
              }
            });
        }
      );
    });
}

// call start to begin
// getEmployeeID();
start();
