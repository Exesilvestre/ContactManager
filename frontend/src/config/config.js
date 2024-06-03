const config = {
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api',
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
    nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    googleApiKey: process.env.MY_API_KEY,
    cloudinaryUploadUrl: process.env.CLOUDINARY_UPLOAD_URL || 'https://api.cloudinary.com/v1_1/ddjhhlt7w/upload',
  };

export default config;