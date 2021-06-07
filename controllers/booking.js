const { User } = require("../models/user");

async function createBooking(req, res) {
    // const {error} = validatebooking(req.body);
    // if(error) {
    //     return res.status(400).send(`Bad Request ${error}`);
    // }

    const user = await User.findById(req.body.userId);
    const amount = +req.body.amount;
    if(user.walletMoney < amount) {
        return res.status(400).send('Wallet balance is insufficient');
    }

    try {
        const booking = new Booking(req.body);
        const savedBooking = booking.save();
        const updatedUser = new User({...user, walletMoney: walletMoney - amount});
        await updatedUser.save();
        return res.send({...savedBooking});
    } catch(ex) {
        return res.status(400).send(ex.message);
    }
}

module.exports = {
    createBooking
}