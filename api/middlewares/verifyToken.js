// Middleware to know if user is logged in by checking the token
import { PrismaClient } from '@prisma/client'; // Adjust the import based on your project structure
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const isLoggedIn = async (req, res, next) => {
    // Get the token from the request headers
    const accessToken = req.headers.authorization.split(' ')[1];

    // If no token is found, we respond with a 401 status code
    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized : no accessToken provided.' });
    }

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
        if (error.name === 'TokenExpiredError') {
            // If the access token is expired, check for a valid refresh token
            const refreshToken = req.cookies?.refreshToken; // Assuming the refresh token is stored in cookies

            if (!refreshToken) {
                return res.status(401).json({ message: 'Unauthorized: Refresh token missing' });
            }

            try {
                // Verify the refresh token
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

                // Find the user by the ID from the refresh token
                const user = await prisma.users.findUnique({
                    where: { user_id: decodedRefreshToken.id },
                });

                if (!user) {
                    return res.status(401).json({ message: 'Unauthorized: User not found' });
                }

                // Generate a new access token
                const newAccessToken = jwt.sign({ id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1h',
                });

                // Attach the user and the new token to the request object
                req.user = user;
                res.setHeader('Authorization', `Bearer ${newAccessToken}`); // Send new access token in header
                next();
            } catch (refreshError) {
                return res.status(403).json({ message: 'Invalid refresh token', refreshError });
            }
        } else {
            return res.status(403).json({ message: 'Invalid access token' });
        }
    }
};

export default isLoggedIn;
