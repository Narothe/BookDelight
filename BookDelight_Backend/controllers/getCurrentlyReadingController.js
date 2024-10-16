const { getCurrentlyReading } = require("../models/getCurrentlyReadingModel");

const showCurrentlyReading = async (req, res) => {
    const userId = req.params.id;

    try {
        const result = await getCurrentlyReading(userId);

        if (!result) {
            return res.status(404).json({message: 'Currently reading books not found'});
        }

        res.status(200).json(result);
    } catch (err) {
        console.error('Error while getting the currently reading books:', err);
        res.status(500).json({error: 'An error occurred while getting the currently reading books.'});
    }
}

module.exports = {
    showCurrentlyReading
};
