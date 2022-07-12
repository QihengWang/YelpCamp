const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register')
};

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username});
        //passport的方法，userSchema里面不需要声明username和password属性
        const registeredUser = await User.register(user, password);
        //注册后直接用passport的函数登录
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
};

module.exports.login = (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;//删除session中的returnTo
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
};


// module.exports.logout = (req, res, next) => {
//     req.logout((err) => {
//         if (err) 
//             return next(err);
//         req.flash('success', 'Goodbye!');
//         res.redirect('/campgrounds'); 
//     });
// }