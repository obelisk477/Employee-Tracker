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
        let query = `
        UPDATE employee
        SET role_id = ${employeeNewRole}, manager_id = ${employeeManager}
        WHERE id = ${employeeToUpdate};`
        return query
    },
}


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '12345678',
      database: 'employee_db',
      multipleStatements: true
    },
    console.log(`Connected to the employee_db database.`)
);

function init() {
    db.query(`SELECT id, title FROM role; SELECT e.manager_id, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee AS e JOIN employee as m ON m.id = e.manager_id; SELECT id, CONCAT(first_name, ' ', last_name) AS full_name FROM employee; SELECT * FROM department`, function (err, results) {
        if (err) {
            console.log(err)
        }
        
        [listOfRoles, listOfManagers, listOfEmployees, listOfDepts] = results

        const employeeMap = new Map()
        const roleMap = new Map()
        const managerMap = new Map()
        const deptMap = new Map()
        
        listOfEmployees.map(employee => employeeMap.set(employee.full_name, employee.id))
        listOfRoles.map(role => roleMap.set(role.title, role.id))
        listOfManagers.map(manager => managerMap.set(manager.manager, manager.manager_id))
        listOfDepts.map(dept => deptMap.set(dept.name, dept.id))

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
                        questions[2].choices = [...roleMap.keys()]
                        questions[3].choices = [...managerMap.keys()]
                        break;
                    case ('Add Department'):
                        break;
                    case ('Add Role'):
                        questions[2].choices = [...deptMap.keys()]
                        break;
                    case ('Update Employee Role'):
                        questions[0].choices = [...employeeMap.keys()]
                        questions[1].choices = [...roleMap.keys()]
                        questions[2].choices = [...managerMap.keys()]
                        break;
                    default:
                        break;
                }
    
                inquirer
                    .prompt(questions)
                    .then(moreResponses => {
                        let queryFunction = sqlModifyMap[responses.action]


                        switch (responses.action) {
                            case ('Add Employee'):
                                moreResponses.employeeRole = roleMap.get(moreResponses.employeeRole)
                                moreResponses.employeeManager = managerMap.get(moreResponses.employeeManager)
                                break;
                            case ('Add Department'):
                                break;
                            case ('Add Role'):
                                moreResponses.roleDept = deptMap.get(moreResponses.roleDept)
                                break;
                            case ('Update Employee Role'):
                                moreResponses.employeeToUpdate = employeeMap.get(moreResponses.employeeToUpdate)
                                moreResponses.employeeNewRole = roleMap.get(moreResponses.employeeNewRole)
                                moreResponses.employeeManager = managerMap.get(moreResponses.employeeManager)
                                break;
                            default:
                                break;
                        }

                        let query = queryFunction(moreResponses)

                        db.query(query, function(err, result) {
                            if (err) {
                                console.log(err)
                                return
                            }
                            console.log('\n')
                            console.log("Operation \"" + responses.action + "\" successful")
                            console.log('\n')
                            init()
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
