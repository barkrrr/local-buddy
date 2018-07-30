module.exports = {
  validUserInputSignUp: (req, res, next) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      req.flash('info', 'Missing info, please try again');
      return res.redirect('/signup');
    } else {
      next();
    }
  },
  validUserInputLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('info', 'Missing info, please try again');
      return res.redirect('/login');
    } else {
      next();
    }
  }
};