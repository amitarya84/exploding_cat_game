const users = require('../modals/user');

const router = require('express').Router();

router.post('/signup', async (req, res) => {
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    try {

        const user = await users.findOne({ username: username });
        console.log('user', user);

        if (user) {
            res.json({ message: 'user already exist!' })
            return
        }
        const dbResp = await users.create({
            username: username,
            password: password
        })
        console.log('db response', dbResp)
        res.json({
            user: dbResp
        })
    }catch(err){
        console.log('Err user Rout', err.message)
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    const user = await users.findOne({ $and: [{ username: username }, { password: password }] });
    console.log('user', user);

    if (!user) {
        res.status(404).json({ message: 'User Not Found!' })
        return
    }

    const trimmedUser = {
        _id: user._id,
        username: user.username
    }

    res.json({ user: trimmedUser })


})


module.exports = router;