const mongoose = require("mongoose");
const {Schema} = mongoose;

const sponsorSchema = new Schema({
    name: { type: String, required: true },
    amount: { type: Number },
    logo: { type: String },
    date_from: { type: Schema.Types.Mixed },
    date_to: { type: Schema.Types.Mixed }
});

module.exports =  mongoose.model("Sponsor", sponsorSchema);