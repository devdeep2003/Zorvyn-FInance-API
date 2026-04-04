import { eq } from "drizzle-orm";
import { comparePassword } from "../utils/hashFunctions.js";
import { generateToken } from "../utils/jwtFunctions.js";
import db from "../config/db.js";
import { users } from "../models/db.schema.js";

//LOGIN CONTROLLER
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Provide all the required fields" });
  }

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "Inactive User : Contact Admin" });
    }

    if (
      !comparePassword(password, user.password) 
    ) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = generateToken({
      id : user.id,
      email : user.email,
      role : user.role
    });
    console.log(token);

    res.cookie("JWTtoken" , token , {
      sameSite : "strict",
      maxAge : 7 * 60 * 60 * 1000,
      httpOnly : process.env.NODE_ENV === "production",
      secure : false
    })

    return res.status(200).json({
      message: "Login Successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.isActive,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error}` });
  }
};

//logut controller 
export const logout = async (req,res) => {
  try {
    res.cookie("JWTtoken" , "");
    return res.status(200).json({message : "Logged out"})
  } catch (error) {
    return res.status(500).json({message : `Internal Server Error : ${error}`})
  }
}
