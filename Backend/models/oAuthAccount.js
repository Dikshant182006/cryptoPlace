const mongoose = require('mongoose');

const oauthAccountSchema = new mongoose.Schema({
    provider: { // tells that in which platform user should login
        type: String,
        enum: ["google", "github"],
        required: true,
    },
    providerId: {  // unique id
        type: String,
        required: true,
    },
    userId: {   // 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    { timestamps: true }
);

// Dono fields ka combinations unique hona chayiye.
oauthAccountSchema.index(
    { provider: 1, providerId: 1 },
    { unique: true }
)

const OAuthAccount =
    mongoose.models.OAuthAccount ||
    mongoose.model("OAuthAccount", oauthAccountSchema);

module.exports = OAuthAccount;
