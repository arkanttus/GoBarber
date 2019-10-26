const { User } = require('../models');

class SessionController {
  async create(req, res) {
    console.log('session');
    return res.render('auth/signin');
  }

  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/');
    }

    if (!await user.checkPassword(password)) {
      req.flash('error', 'Password is incorrect');
      return res.redirect('/');
    }

    req.flash('success', 'Logged');
    req.session.user = user;

    return res.redirect('/app/dashboard');
  }

  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie('root');
      console.log('logout');
      return res.redirect('/');
    });
  }
}

module.exports = new SessionController();
