const mongoose = require("mongoose");
const {Schema} = mongoose;

const executiveBoardSchema = new Schema({
    president: { type: String, required: true  },
    vice_president: { type: String, required: true  },
    treasurer: { type: String, required: true  },
    directors: [{ type: String, required: true  }]
  });

module.exports = mongoose.model("E_board", executiveBoardSchema);


  