const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userModel = require("./models/userModel");
const dotenv = require("dotenv");



async function createAdmin() {
    try {

        // Check if admin already exists
        const existingAdmin = await userModel.findOne({ email: "admin@gmail.com" });
        if (existingAdmin) {
            console.log("Admin already exists skipping seeding");
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash("admin password", 10);

        // Create admin user
        const admin = new userModel({
            name: "admin",
            lastName: "admin",
            email: "admin@gmail.com",
            password: hashedPassword, // Store hashed password,
            userValide: true,
            role: "e98a533d338b74e1d4579e8e004f34b1cd853c4d2bbe680755d280ade16ce71fee99c170eba62f3465dcb30b02f7ff91c63e9bef4ab33b71c216adf1bef717da",
        });

        await admin.save();
        console.log("Admin created successfully");

    } catch (error) {
        console.error("Error creating admin:", error);

    }
}

module.exports = seedAdmin;