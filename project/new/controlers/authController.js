const jwt = require('jsonwebtoken');
const User = require('../models/register');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({email});
        console.log(user)


        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
        
        if(user.role=='admin')
        res.status(210).json({ message: 'admin', token });
        else if(user.role=='user')

        {
            if(user.checkreset==false)
            {

                res.status(220).json({ message: 'user need to reset', token });
            }
            else
            {
                
                res.status(230).json({ message: 'user', token });
            }
            

        }
        else
        res.status(200).json({ message: 'Login successful', user });


    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.allData = async (req, res) => {

    try {
        const user = await User.find({});
        // console.log(user)
        res.status(200).json({user});
            

        }catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
