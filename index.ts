#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let myBalance: number = 10000; // dollars
let myPin: number = 22331;

console.log(chalk.redBright(' "Welcome to HBL Bank" '));

let pinCode = await inquirer.prompt([
    {
        name: "PinCode",
        type: "number",
        prefix: ">",
        message: "Enter your pin number"
    }
]);

if (pinCode.PinCode === myPin) {
    console.log(chalk.greenBright("You have entered the correct pin"));

    let options = await inquirer.prompt([
        {
            name: "Option",
            type: "list",
            prefix: ">",
            message: "Enter your option",
            choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
        }
    ]);

    if (options.Option === "Deposit") {
        console.log(chalk.greenBright("You have entered the Deposit"));

        let deposit = await inquirer.prompt([
            {
                name: "Amount",
                type: "number",
                prefix: ">",
                message: "Enter the amount"
            }
        ]);
        myBalance += deposit.Amount;
        console.log(chalk.green(`Balance: ${myBalance}`));
    } else if (options.Option === "Withdraw") {
        console.log(chalk.greenBright("You have entered the Withdraw"));

        let withdrawMethod = await inquirer.prompt([
            {
                name: "WithdrawMethod",
                type: "list",
                prefix: ">",
                message: "Enter the withdraw method",
                choices: ["fastCash", "enterAmount"]
            }
        ]);

        if (withdrawMethod.WithdrawMethod === "fastCash") {
            let fastCashAmount = await inquirer.prompt([
                {
                    name: "fastCashAmount",
                    type: "list",
                    prefix: ">",
                    message: "Select the amount",
                    choices: [500, 1000, 5000, 10000]
                }
            ]);
            let selectedAmount = fastCashAmount.fastCashAmount;
            if (selectedAmount > myBalance) {
                console.log(chalk.redBright("You do not have sufficient balance"));
            } else {
                myBalance -= selectedAmount; // Deduct the amount from the balance
                console.log(chalk.greenBright(`Your current balance is ${myBalance}`));
            }
        } else if (withdrawMethod.WithdrawMethod === "enterAmount") {
            let enterAmount = await inquirer.prompt([
                {
                    name: "enterAmount",
                    type: "number",
                    prefix: ">",
                    message: "Enter the amount"
                }
            ]);
            let selectedAmount = enterAmount.enterAmount;
            if (selectedAmount > myBalance) {
                console.log(chalk.redBright("You do not have sufficient balance"));
            } else {
                myBalance -= selectedAmount; // Deduct the amount from the balance
                console.log(chalk.greenBright(`Your current balance is ${myBalance}`));
            }
        }
    }
} else {
    console.log(chalk.redBright("You have entered the incorrect pin"));
}
