const mongoose = require('mongoose');

const oauthAccountSchema = new mongoose.Schema(
    {
        // Tells that which account has google or github
        provider: {
            type: String,
            required: true,
            enum: ["google", "github"],
        },

        // This tells that in that platform which is the account
        providerId: {
            type: String,
            required: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

oauthAccountSchema.index(
    { provider: 1, providerId: 1 },
    { unique: true },
);

const OAuthAccount = mongoose.models.OAuthAccount || mongoose.model('OAuthAccount', oauthAccountSchema);
module.exports = { OAuthAccount };
