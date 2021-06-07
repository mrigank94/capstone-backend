const { User } = require("../models/user");

async function getUserDetails(req, res) {

    const user = await User.findById(req.params.id);

    if(!user) {
        return res.status(404).send('User not found!');
    }

    res.send(user);
}

module.exports = {
    getUserDetails
}