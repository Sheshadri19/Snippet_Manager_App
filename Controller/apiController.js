const Snippet = require("../models/snippet");

class apiController {
  // Create a new snippet
  async createSnippet(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { title, code, language } = req.body;
      const userId = req.user.id;

      const snippet = new Snippet({ title, code, language, user: userId });
      await snippet.save();

      res.redirect('/show');
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  // Get all snippets with user details using aggregation
  async getAllSnippets(req, res) {
    try {
      const snippets = await Snippet.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails"
          }
        },
        {
          $unwind: "$userDetails"
        },
        {
          $project: {
            _id: 1,
            title: 1,
            code: 1,
            language: 1,
            "userDetails.name": 1,
            "userDetails.email": 1
          }
        }
      ]);

      res.status(200).json(snippets);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  // Get a single snippet by ID with user details
  async getSnippetById(req, res) {
    try {
      const snippet = await Snippet.aggregate([
        {
          $match: { _id: require("mongoose").Types.ObjectId(req.params.id) }
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails"
          }
        },
        {
          $unwind: "$userDetails"
        },
        {
          $project: {
            _id: 1,
            title: 1,
            code: 1,
            language: 1,
            "userDetails.name": 1,
            "userDetails.email": 1
          }
        }
      ]);

      if (!snippet.length) {
        return res.status(404).json({ message: "Snippet not found" });
      }

      res.status(200).json(snippet[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  // Delete a snippet
  async deleteSnippet(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const snippet = await Snippet.findById(req.params.id);
      if (!snippet) {
        return res.status(404).json({ message: "Snippet not found" });
      }

      // Ensure user owns the snippet
      if (snippet.user.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this snippet" });
      }

      await Snippet.findByIdAndDelete(req.params.id);
      res.redirect('/show');
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}

module.exports = new apiController();
