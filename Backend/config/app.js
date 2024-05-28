const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 4000,
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    }
};