import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (payload) => {
 

  try {
    return jwt.sign(payload, process.env.JWT_SECRET , {expiresIn:'8h'});
  } catch (error) {
    console.log(`Error generating token ${error}`);
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(`Error verifying token ${error}`);
  }
};
