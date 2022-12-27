const express = require('express');
const router = express.Router();
const path = require('path')
const createPath = (page) => path.resolve(__dirname, '../client', `${page}.html`)
const getOrCreate = require('./controllers/user.controller')
const sendSMS = require('./send')

router.get('/', (req, res) => {
    res.sendFile(createPath('/'))
})

router.get('/login', (req, res) => {
    res.sendFile(createPath('login'))
})

router.post('/verify', async (req, res) => {
    const { phone } = req.body;
    sendSMS(phone);
    res.status(200);
});

router.post('/login', async (req,res) => {
    const { phone, code } = req.body
    if (code === '111111') {
        const user = await getOrCreate(phone);
        req.session.user = user.phone;
        res.status(200).json({message: 'Good Message'});
    } else {
        res.status(500).json({message: 'Wrong Message'});
    }
})

router.get('/getuser', async (req, res) => {
    res.status(200).json(req.session.user)
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500)
        }
        res.status(200).json({message: 'Session destroy'});
    });
})

router.use((req, res) => {
    res
        .status(404)
        .sendFile(createPath('errorPage'))
})

module.exports = router;
