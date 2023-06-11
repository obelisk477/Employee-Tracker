const mysql = require('mysql2')


class UI {
    constructor() {

        this.logo = `
        ,---------------------------------------------------.
        |    ______                 _                        |
        |   |   ___|_ __ ___  _ __ | | ___  _   _  ___  ___  |
        |   |   _| | '_  \`_ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\ |
        |   |  |___| | | | | | |_) | | (_) | |_| |  __/  __/ |
        |   |______|_| |_| |_|  __/|_|\\___/ \\__, |\\___|\\___| |
        |                    |_|            |___/            |
        |    __  __                                          |
        |   |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
        |   | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |/ _ \\ '__|       |    
        |   | |  | | (_| | | | | (_| | (_| |  __/ |          |
        |   |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
        |                             |___/                  |
        |                                                    |
        \`----------------------------------------------------\``

        this.furtherQuestions = {
            'Add Department' : [
                {
                    message: 'What is the name of the department?',
                    type: 'input',
                    name: 'dept'
                }],
            'Add Role' : [
                {
                    message: 'What is the name of the role?',
                    type: 'input',
                    name: 'roleName',
                },
                {
                    message: 'What is the salary of the role?',
                    type: 'input',
                    name: 'roleSalary',
                },
                {
                    message: 'Which department does the role belong to?',
                    type: 'list',
                    name: 'roleDept',
                    choices: []
                }],
            'Add Employee' : [
                {
                    message: 'What is the employee\'s first name?',
                    type: 'input',
                    name: 'employeeFirstName',
                },
                {
                    message: 'What is the employee\'s last name?',
                    type: 'input',
                    name: 'employeeLastName',
                },
                {
                    message: 'What is the employee\'s role?',
                    type: 'list',
                    name: 'employeeRole',
                    choices: []
                },
                {
                    message: 'Who is the employee\'s manager?',
                    type: 'list',
                    name: 'employeeManager',
                    choices: []
                }],
            'Update Employee Role' : [
                {
                    message: 'Which employee\'s role do you want to update?',
                    type: 'list',
                    name: 'employeeToUpdate',
                    choices: []
                },
                {
                    message: 'Which role do you want to assign the selected employee?',
                    type: 'list',
                    name: 'employeeNewRole',
                    choices: []
                },
                {
                    message: 'Who is the employee\'s manager?',
                    type: 'list',
                    name: 'employeeManager',
                    choices: []
                }],
        }
        
    }
}


// async function dbQuery() {
//     const connection = await mysql.createConnection(
//         {
//           host: 'localhost',
//           // MySQL username,
//           user: 'root',
//           // MySQL password
//           password: 'Cb4714481#',
//           database: 'employee_db'
//         },
//     );

//     const query = await connection.query('SELECT * FROM department', function(err, results) {
//         console.log(results)
//         return results
//     })
// }

module.exports = UI