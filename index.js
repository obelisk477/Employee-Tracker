const inquirer = require('inquirer')
const mysql = require('mysql2')
const UI = require('./utils/js/uiClass')


const sqlQueryMap = {
    "View All Employees": `
    SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager_name 
    FROM employee AS e 
    LEFT JOIN employee AS m ON e.manager_id = m.id
    LEFT JOIN role as r ON e.role_id = r.id
    LEFT JOIN department as d ON r.department_id = d.id;`,
    "View All Roles":`
    SELECT role.id, role.title, role.salary, department.name AS department
    FROM role
    LEFT JOIN department ON role.department_id = department.id`,
    "View All Departments":`
    SELECT id AS department_id, name FROM department`
}

const sqlModifyMap ={
    "Add Employee": ({employeeFirstName, employeeLastName, employeeRole, employeeManager}) => {
        let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES
            ("${employeeFirstName}", "${employeeLastName}", "${employeeRole}", "${employeeManager}");`
        return query
    },
    "Add Role": ({roleName, roleSalary, roleDept}) => {
        let query = `INSERT INTO role (title, salary, department_id)
        VALUES
            ("${roleName}",${roleSalary},"${roleDept}")`
        return query
    },
    "Add Department": ({dept}) => {
        let query = `INSERT INTO department (name)
        VALUES
            ("${dept}")`
        return query
    },
    "Update Employee Role": ({employeeToUpdate, employeeNewRole, employeeManager}) => {
        let query = `UPDATE role (title, salary, department_id)
        VALUES
            ("${employeeToUpdate}",${employeeNewRole},"${employeeManager}")`
        return query
    },
}


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Cb4714481#',
      database: 'employee_db',
      multipleStatements: true
    },
    console.log(`Connected to the employee_db database.`)
);

function init() {


    db.query(`SELECT title FROM role; SELECT e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e JOIN employee as m ON m.id = e.manager_id; SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employee`, function (err, results) {
        if (err) {
            console.log(err)
        }
        
        [listOfRoles, listOfManagers, listOfEmployees] = results
        arrOfEmployees = listOfEmployees.map(employee => employee.full_name)
        arrOfRoles = listOfRoles.map(role => role.title)
        arrOfManagers = listOfManagers.map(manager => manager.manager)
        
        inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ]
            }
        ])
        .then(responses => {
            if (responses.action.match(/(Add|Update)/)) {
                let questions = employeeManagerUI.furtherQuestions[responses.action]
                
                switch (responses.action) {
                    case ('Add Employee'):
                        questions[2].choices = arrOfRoles
                        questions[3].choices = arrOfManagers
                        break;
                    case ('Add Department'):
                        break;
                    case ('Add Role'):
                        questions[2].choices = arrOfRoles
                        break;
                    case ('Update Employee Role'):
                        questions[0].choices = arrOfEmployees
                        questions[1].choices = arrOfRoles
                        questions[2].choices = arrOfManagers
                        break;
                    default:
                        break;
                }
    
                inquirer
                    .prompt(questions)
                    .then(moreResponses => {
                        let queryFunction = sqlModifyMap[responses.action]
                        console.log(queryFunction)
                        let query = queryFunction(moreResponses)
                        console.log(query)
                        db.query(query, function(err, result) {
                            if (err) {
                                console.log(err)
                                return
                            }
                            console.log("Employee added!")
                        })
                    })
    
            } else if (responses.action === 'Quit') {
                console.log("Goodbye!")
                process.exit()
            } else {
                db.query(sqlQueryMap[responses.action], function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    console.log('\n')
                    console.table(results);
                    init()
                  });                
            }
        })
    });

}

let employeeManagerUI = new UI()
console.log(employeeManagerUI.logo)
init()
