const user = require("../models/user.js");
const crypto =  require('crypto');
const nodemailer = require('nodemailer');
module.exports.renderSignup = (req, res) => {
    res.render("users/signup");
}

module.exports.signupUsers=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new user({ email, username });
        const registeredUser = await user.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err)
            }
            req.flash("success", "User was registered");
            res.redirect("/listings")
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderloginUsers= (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login= async (req, res) => {
    req.flash("success", "Welcome to back wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};

module.exports.logout= (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings")
    })
};

module.exports.renderForgotForm = (req, res , next) =>{
    res.render("users/forgot.ejs");
};

module.exports.sendResetLink = async (req ,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});

    if(!user){
        req.flash("error" , "email not registered!");
        return res.redirect("/forgot");
    }
    // token setup 
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    // email setup
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user :'YOUR_EMAIL@gmail.com',
            pass : 'YOUR_APP_PASSWORD'
        }
    });
    const mailOptions = {
        to : user.email,
        from : 'StaySphere Admin',
        subject : 'Password Reset',
        text : `Click this link to reset password: http://localhost:3000/reset/${token}`
    };
    await transporter.sendMail(mailOptions);
    req.flash("success", "Reset link sent to your email!");
    res.redirect("/login");
};

// 3. Reset Form Dikhana
module.exports.renderResetForm = async (req, res) => {
    const { token } = req.params;
    const user = await User.findOne({ 
        resetPasswordToken: token, 
        resetPasswordExpires: { $gt: Date.now() } 
    });

    if (!user) {
        req.flash("error", "Token is invalid or expired.");
        return res.redirect("/forgot");
    }
    res.render("users/reset.ejs", { token });
};

// 4. Password Change karna
module.exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirm } = req.body;

    if (password !== confirm) {
        req.flash("error", "Passwords do not match!");
        return res.redirect(`/reset/${token}`);
    }

    const user = await User.findOne({ 
        resetPasswordToken: token, 
        resetPasswordExpires: { $gt: Date.now() } 
    });

    if (!user) {
        req.flash("error", "Token expired.");
        return res.redirect("/forgot");
    }

    // Passport-local-mongoose ka magic function
    await user.setPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    req.flash("success", "Password changed! Please login.");
    res.redirect("/login");
};
