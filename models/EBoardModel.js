const mongoose = require("mongoose");
const {Schema} = mongoose;

const sponsorSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number },
  logo: { type: String },
  link: { type: String },
  date_from: { type: Date },
  date_to: { type: Date }
});

module.exports = mongoose.model("E_board", executiveBoardSchema);


  