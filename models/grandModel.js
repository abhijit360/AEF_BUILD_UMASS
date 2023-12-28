const mongoose = require("mongoose");
const {Schema} = mongoose

const grantSchema = new Schema({
    title: { type: String, required: true },
    grantee: { type: String, required: true},
    amount: { type: Schema.Types.Mixed },
    schools: [{ type: String, required: true }],
    description: { type: String }
  });


module.exports = mongoose.model("Grant", grantSchema);