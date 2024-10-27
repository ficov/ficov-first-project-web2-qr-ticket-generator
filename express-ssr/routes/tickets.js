const express = require('express')
const axios = require('axios')
const router = express.Router()
require('dotenv').config();
const { requiresAuth } = require('express-openid-connect');

router.get('/totalNumber', async (req, res) => {
    axios.get(process.env.BACKEND_DEV + '/ticket/totalNumber')
        .then(response => {
            const totalNum = response.data
            res.render('tickets/totalNumber', { totalNum })
        })
        .catch(error => {
            res.send(error)
        })
})

router.get('/:id', requiresAuth(), async (req, res) => {
    let { token_type, access_token, isExpired, refresh } = req.oidc.accessToken;
    if (isExpired()) {
        ({ access_token } = await refresh());
    }

    const username = req.oidc.user?.nickname || req.oidc.user?.email;

    axios.get(process.env.BACKEND_DEV + '/ticket/' + req.params.id, {
        headers: {
            Authorization: `${token_type} ${access_token}`
        },
        json: true
    })
        .then(response => {
            const ticket = response.data
            const dateCreated = new Date(ticket.timeCreated)
            res.render('tickets/ticketById', { ticket, dateCreated, username })
        })
        .catch(error => {
            res.send(error)
        })
})

module.exports = router