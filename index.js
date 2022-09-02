const mongoose = require('mongoose')
const db_url = process.env.DB_URL || "mongodb+srv://pule:pule123@clientcommand.zmf4qvq.mongodb.net/test"

mongoose.connect(db_url, async err => {
    if (err) throw err
    console.log('connected to db success')
    })


//Import model
const Customer = require('./models/customer')

//Add Customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.log("New Customer Added")
        mongoose.connection.close()
    })
}

//Find Customer
const findCustomer = (name) => {
    //Make case insensitive
    const search = new RegExp(name, 'i')
    Customer.find({$or: [{firstname: search}, {lastname: search}]})
        .then(customer => {
            console.info(customer);
            console.info(`${customer.length} matches`)
            mongoose.connection.close()
        })
}
//Update customer
const updateCustomer = (_id, customer) => {
    Customer.updateOne({ _id }, customer)
    .then(customer => {
        console.info("Customer updates")
        mongoose.connection.close()
    })
}

//Remove customer
const removeCustomer = (_id) => {
    Customer.deleteOne({ _id })
    .then(customer => {
        console.info("Customer Removed")
        mongoose.connection.close()
    })
}

const listCustomers = () => {
    Customer.find()
    .then(customers => {
        console.info(customers)
        console.info(`${customers.length} matches`);
        mongoose.connection.close()
    })
}

//Export All methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}