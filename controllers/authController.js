const ProfessorRepository = require('../repository/sequelize/ProfessorRepository');
const authUtil = require('../config/util/authUtils');

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    ProfessorRepository.findByEmail(email)
        .then(prof => {
            if (!prof) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if (authUtil.comparePassword(password, prof.password) === true) {
                req.session.loggedUser = prof;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        }).catch(err => {
        console.log(err);
    });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}