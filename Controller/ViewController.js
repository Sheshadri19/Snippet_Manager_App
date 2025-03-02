const Snippet = require("../models/snippet"); // Import Snippet model

class ViewController {
  
  // Middleware for authentication
  Authuser = (req, res, next) => {
    if (req.user) {
      console.log('Authenticated User:', req.user);
      res.locals.data = req.user; // Set data globally for views
    } else {
      res.locals.data = null; // Ensure data is null if no user
    }
    next();
  };
  

  // Login page
login = async (req, res) => {
  try {
    res.render('login', {
      title: "Login",
      data: req.user || null // Ensure data is passed
    });
  } catch (error) {
    console.error("Error rendering login page:", error);
    res.status(500).send("Error rendering login page.");
  }
};

// Register page
register = async (req, res) => {
  try {
    res.render('register', {
      title: "Register",
      data: req.user || null // Ensure data is passed
    });
  } catch (error) {
    console.error("Error rendering register page:", error);
    res.status(500).send("Error rendering register page.");
  }
};


  // Home page
  Home = async (req, res) => {
    try {
      res.render('Home', {
        title: "Home",
        data: res.locals.data || null
      });
    } catch (error) {
      console.error("Error rendering home page:", error);
      res.status(500).send("Error rendering home page.");
    }
  };

  // Show snippets page with all snippets and user details
  show = async (req, res) => {
    try {
      const snippets = await Snippet.aggregate([
        {
          $lookup: {
            from: "users", // Check if this is the correct collection name in MongoDB
            localField: "user",
            foreignField: "_id",
            as: "userDetails"
          }
        },
        { $unwind: "$userDetails" },
        {
          $project: {
            _id: 1,
            title: 1,
            code: 1,
            language: 1,
            createdAt: 1,
            "userDetails._id": 1,
            "userDetails.name": 1,
            "userDetails.email": 1
          }
        }
      ]);
      
      return res.render('show', {
        title: "Show Snippets",
        data: res.locals.data || null,
        snippets: snippets
      });

    } catch (error) {
      console.error("Error fetching snippets:", error);
      res.status(500).send("Error fetching snippets.");
    }
  };

  // Create snippet page (only for authenticated users)
  createSnippet = async (req, res) => {
    try {
      if (!res.locals.data) {
        return res.redirect('/signin');
      }
      
      return res.render('create', {
        title: "Create Snippet",
        data: res.locals.data
      });

    } catch (error) {
      console.error("Error rendering create snippet page:", error);
      res.status(500).send("Error rendering create snippet page.");
    }
  };
}

module.exports = new ViewController();
