const User = require('../models/register'); // Import the User model

const addUserModule = async (req, res) => {
  const { selectedUser_id, selectedModule_id } = req.body; // Get selectedUser_id and selectedModule_id from the request body

  try {
    // Find the user by selectedUser_id
    const user = await User.findById(selectedUser_id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the selectedModule_id to the modules array of the user
    user.modules.push(selectedModule_id);

    // Save the updated user
    await user.save();

    return res.status(200).json({ message: 'Module added to user successfully', user });
  } catch (error) {
    console.error('Error adding module to user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addUserModule };
