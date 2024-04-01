const Module = require('../models/module');

// Controller function to add a module
exports.addModule = async (req, res) => {
    const { moduleName, startDate, endDate, quizId } = req.body;

    try {
        // Create a new module instance
        const newModule = new Module({
            moduleName,
            startDate,
            endDate,
            quizId // Add quizId to the new module
        });

        // Save the new module to the database
        await newModule.save();

        res.status(201).json({ message: "Module added successfully", module: newModule });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



exports.getModule = async (req, res) => {
    try {
        const modules = await Module.find({}); // Projecting only moduleId and moduleName fields

        if (!modules || modules.length === 0) {
            return res.status(404).json({ message: "Modules not found" });
        }

        res.status(200).json({ modules });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


exports.updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const updateData = req.body;

    try {
        const module = await Module.findOneAndUpdate({ moduleId }, updateData, { new: true });

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        res.status(200).json({ message: "Module updated successfully", module });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.deleteModule = async (req, res) => {
    const { moduleId } = req.params;

    try {
        const module = await Module.findOneAndDelete({ moduleId });

        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        res.status(200).json({ message: "Module deleted successfully", module });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



