#! /usr/bin/env/node 
import inquirer from "inquirer";
//Bank account class 
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`withdrawal of $${amount} succesful!. Remaining balace $${this.balance}`);
        }
        else {
            console.log("Sorry  your balace is insufficient");
        }
    }
    // Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
            this.balance += amount;
            console.log(`Deposit of $${amount} successfull. your remaing balance is $${this.balance}`);
        }
    }
    // check balance
    checkbalance() {
        console.log(`Your current balance is ${this.balance}`);
    }
}
//Create customers
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNo;
    account;
    constructor(Fname, Lname, gender, age, mobileNo, account) {
        this.firstName = Fname,
            this.lastName = Lname,
            this.gender = gender,
            this.age = age,
            this.mobileNo = mobileNo,
            this.account = account;
    }
}
// Create Bank accounts
const accounts = [
    new BankAccount(1234, 500),
    new BankAccount(4567, 5000),
    new BankAccount(6789, 50000),
];
// Create customers
const customers = [
    new customer("shafique", "Baloch", "Male", 20, 3003008999, accounts[0]),
    new customer("Asad", "khan", "Male", 22, 5003008999, accounts[1]),
    new customer("saif", "ali", "Male", 29, 4003008999, accounts[2])
];
// Function interact with bank account
async function service() {
    while (true) {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`welcome!, ${customer.firstName} ${customer.lastName}`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "select an option",
                    choices: ["Deposit", "withdraw", "Check balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter your ammount to deposit"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter your ammount to withdraw"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check balance":
                    customer.account.checkbalance();
                    break;
                case "Exit":
                    console.log("Exiting the program...");
                    process.exit();
            }
        }
    }
}
service();
