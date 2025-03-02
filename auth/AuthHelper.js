const jwt = require("jsonwebtoken");

const AuthHelper = (req, res, next) => {
  try {
    if (req.cookies && req.cookies.token) {
      const token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      // Set user data globally for all views
      res.locals.data = decoded; 
      
      return next();
    } else {
      res.locals.data = null; // Ensure it's null when user is not logged in
      return res.redirect('/signin'); 
    }
  } catch (error) {
    res.locals.data = null;
    return res.redirect('/signin');
  }
};

module.exports = AuthHelper;
