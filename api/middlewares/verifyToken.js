// Middleware to know if user is logged in by checking the token
import { PrismaClient } from '@prisma/client'; // Adjust the import based on your project structure
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const isLoggedIn = async (req, res, next) => {
    // Get the accessToken from the request headers
    const accessToken = req.headers.authorization.split(' ')[1];

    console.log(accessToken);
    try {
        // Verify the token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        // Find the user by the id from the token
        const user = await prisma.users.findUnique({
            where: { user_id: decoded.id },
        });

        // If no user is found, we respond with a 401 status code
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized : no user found.' });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'Invalid or expired access token' });
    }
};

export default isLoggedIn;
