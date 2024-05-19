var express = require('express');
var router = express();
require("../controllers/oauth")
const passport = require('passport');


// function isLoggenIn(req, res, next){
//   console.log(req.session)
//   req.user ? next() : res.sendStatus(401)
// }

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  router.get('/auth/google/callback',
  passport.authenticate('google', { 
    sucessRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure' 
  }));

  router.get('/auth/protected', (req, res) => {
    let name = req.user.displayName;
    res.send(`hello ${name}`)
  });

  router.get('/auth/google/failure', (req, res) => {
    res.send('Something went wrong')
  })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
