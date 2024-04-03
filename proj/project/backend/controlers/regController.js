const nodemailer = require('nodemailer');
const User = require('../models/register');

// Function to generate a random password
const generateRandomPassword = () => {
    const length = 8; // You can adjust the length of the generated password
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

exports.register = async (req, res) => {
    const { firstName, lastName, email, role } = req.body;

    try {
        // Check if user already exists with the provided email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Generate a random password
        const password = generateRandomPassword();

        // Create a new user
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            role
        });

        // Save the user to the database
        await user.save();

        // Send email with random password
        const transporter = nodemailer.createTransport({
            // Configure your email service provider here
            // Example for Gmail:
            service: 'outlook',
            auth: {
                user: 'rajib_dev@outlook.com', // Your email address
                pass: 'Rajib@123' // Your email password
            }
        });

        const mailOptions = {
            from: 'rajib_dev@outlook.com',
            to: email,
            subject: 'Your Account Details',
            text: `Hello ${firstName} ${lastName},\n\nYour account has been successfully registered.\n\nEmail: ${email}\nPassword: ${password}\n\nThank you.`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
