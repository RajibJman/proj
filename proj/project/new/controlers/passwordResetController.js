const User = require('../models/register');

exports.resetPassword = async (req, res) => {
    const { email,oldPassword, newPassword } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user.password == oldPassword)
        // Update user's password
        if(user.password==oldPassword)
        {
            console.log('1')
            user.password = newPassword;
            console.log('2')
            user.checkreset=true;
            console.log('3')  
            await user.save();
            console.log('4')

        res.status(200).json({ message: 'Password reset successfully' });
        }
        else{
            res.status(500).json({ message: 'Password didnot matched' });
        }

        
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
