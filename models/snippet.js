const  mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema({

  title: 
  { 
    type: String,
    required: true
 },
  code: { 
    type: String, 
    required: true 
},
  language:
   { type: String, 
    required: true 
},
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
},
{ timestamps: true
 
});
const snippet= mongoose.model('snippet', SnippetSchema)
module.exports = snippet


