const loginModel = require('../models/loginModel')

exports.getLogin = ((req, res) => {
    const login = new loginModel()
    const ola = login.olaMundo()
    res.send(`<h1>login !</h1>
        <p>${ola}</p>`)
})

exports.getLogin = ((req, res)=> {

})