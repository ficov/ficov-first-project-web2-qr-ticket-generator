const express = require('express')
const { auth } = require('express-openid-connect');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 4000;
const externalUrl = process.env.RENDER_EXTERNAL_URL;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: externalUrl || `http://localhost:${port}`,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    issuerBaseURL: 'https://dev-kel58uh4kappi7z3.us.auth0.com',
    authorizationParams: {
        response_type: 'code',
        audience: 'https://dev-kel58uh4kappi7z3.us.auth0.com/api/v2/',
        scope: 'openid profile email',
        prompt: 'consent'
    },
  };

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(auth(config));

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const ticketRouter = require('./routes/tickets')

app.use('/tickets', ticketRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})