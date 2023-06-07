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

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Cb4714481#',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);


let employeeManagerUI = new UI()
console.log(employeeManagerUI.logo)

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
            console.log('do something')
        } else if (responses.action === 'Quit') {
            return
        } else {
            db.query(sqlQueryMap[responses.action], function (err, results) {
                if (err) {
                    console.log(err)
                }
                console.log('\n')
                console.table(results);
              });
            
            
        }
    })


