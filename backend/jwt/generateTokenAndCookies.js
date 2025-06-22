import jwt from 'jsonwebtoken';

const createTokenAndCookies = (userId, res) => {
    const token = jwt.sign({userId }, process.env.JWT_SECRET, {
        expiresIn: '10h', // Token expiration time
    });
    // Set the cookie with the token

    res.cookie("jwt", token,{
        httpOnly: true,
       
        sameSite: 'Strict', // Adjust based on your requirements
        maxAge: 10 * 60 * 1000, // 10 hours in milliseconds
    });
return token;
};

export default createTokenAndCookies;