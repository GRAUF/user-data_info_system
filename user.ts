#! /usr/bin/env node


import inquirer from 'inquirer';
import chalk from 'chalk';

type UserInfo = {
    serialNumber: string;
    name: string;
    age: number;
    sex: 'Male' | 'Female' | 'Transgender';
    occupation: string;
    email: string;
    whatsapp: string;
    projectName: string;
    userExperience: string;
    isInfoTrue: boolean;
    date: string;
    time: string;
};

let usersData: UserInfo[] = [];

const generateSerialNumber = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const saveUserData = (userInfo: UserInfo) => {
    usersData.push(userInfo);
};

const findUserData = (serialNumber: string) => {
    return usersData.find(user => user.serialNumber === serialNumber);
};

const showAllData = () => {
    console.log(chalk.blue.bold("\nAll Saved User Data:"));
    usersData.forEach(user => {
        console.log(user);
    });
};

const printUserData = (userInfo: UserInfo) => {
    console.log(chalk.green("\nUser Info:"));
    console.log(`Serial Number: ${userInfo.serialNumber}`);
    console.log(`Name: ${userInfo.name}`);
    console.log(`Age: ${userInfo.age}`);
    console.log(`Sex: ${userInfo.sex}`);
    console.log(`Occupation: ${userInfo.occupation}`);
    console.log(`Email Address: ${userInfo.email}`);
    console.log(`WhatsApp Number: ${userInfo.whatsapp}`);
    console.log(`Project Name: ${userInfo.projectName}`);
    console.log(`User Experience: ${userInfo.userExperience}`);
    console.log(`Information is True: ${userInfo.isInfoTrue ? 'Yes' : 'No'}`);
    console.log(`Date: ${userInfo.date}`);
    console.log(`Time: ${userInfo.time}`);
    console.log(chalk.green(`\nThank you for using the Rauf-Info Data Information System.\n`));
};

const promptUserInfo = async () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const answers = await inquirer.prompt([
        { name: 'name', message: 'Enter Name:', type: 'input' },
        { name: 'age', message: 'Enter Age:', type: 'number' },
        { name: 'sex', message: 'Select Sex:', type: 'list', choices: ['Male', 'Female', 'Transgender'] },
        { name: 'occupation', message: 'Enter Occupation:', type: 'input' },
        { name: 'email', message: 'Enter E-Mail Address:', type: 'input' },
        { name: 'whatsapp', message: 'Enter WhatsApp Number:', type: 'input' },
        { name: 'projectName', message: 'Enter Project Name:', type: 'input' },
        { name: 'userExperience', message: 'Enter Message User Experience:', type: 'input' },
        { name: 'isInfoTrue', message: 'Do you agree this information is true?', type: 'confirm' },
    ]);

    const serialNumber = generateSerialNumber();

    const userInfo: UserInfo = {
        serialNumber,
        ...answers,
        date,
        time
    };

    saveUserData(userInfo);
    console.log(chalk.green(`\nData saved successfully! Your unique serial number is: ${serialNumber}`));
    printUserData(userInfo);
};

const mainMenu = async () => {
    const answer = await inquirer.prompt({
        name: 'action',
        message: 'What would you like to do?',
        type: 'list',
        choices: [
            'New Entry Form',
            'Find Data by Serial Number',
            'Show All Data',
            'Quit'
        ]
    });

    switch (answer.action) {
        case 'New Entry Form':
            await promptUserInfo();
            break;
        case 'Find Data by Serial Number':
            const findAnswer = await inquirer.prompt({
                name: 'serialNumber',
                message: 'Enter Serial Number:',
                type: 'input'
            });
            const userData = findUserData(findAnswer.serialNumber);
            if (userData) {
                printUserData(userData);
            } else {
                console.log(chalk.red(`\nNo data found for Serial Number: ${findAnswer.serialNumber}`));
            }
            break;
        case 'Show All Data':
            showAllData();
            break;
        case 'Quit':
            console.log(chalk.yellow(`\nThanks for using the Rauf-Info Data Information System.`));
            return;
    }

    const continueAnswer = await inquirer.prompt({
        name: 'continue',
        message: 'Would you like to do anything else?',
        type: 'list',
        choices: ['Yes', 'No']
    });

    if (continueAnswer.continue === 'Yes') {
        await mainMenu();
    } else {
        console.log(chalk.yellow(`\nThanks for using the Rauf-Info Data Information System.`));
    }
};

mainMenu();



































