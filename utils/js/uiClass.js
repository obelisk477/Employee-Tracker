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
                    name: 'action'
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
                    type: 'input',
                    name: 'roleDept',
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
                    name: 'employeeFirstName',
                },
                {
                    message: 'What is the employee\'s role?',
                    type: 'input',
                    name: 'employeeRole',
                },
                {
                    message: 'Who is the employee\'s manager?',
                    type: 'input',
                    name: 'employeeManager',
                }],
            'Update Employee Role' : [
                {
                    message: 'Which employee\'s role do you want to update?',
                    type: 'input',
                    name: 'employeeToUpdate',
                },
                {
                    message: 'Which role do you want to assign the selected employee?',
                    type: 'input',
                    name: 'employeeNewRole',
                },
                {
                    message: 'What is the employee\'s role?',
                    type: 'input',
                    name: 'employeeRole',
                },
                {
                    message: 'Who is the employee\'s manager?',
                    type: 'input',
                    name: 'employeeManager',
                }],
        }
        
    }
}

module.exports = UI