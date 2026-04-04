import db from "../config/db.js";
import { hashPassword } from "../utils/hashFunctions.js";
import { users } from "../models/db.schema.js";
import { eq } from "drizzle-orm";
import { records } from "../models/db.schema.js";

//CREATE USER
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Provide all the required fields" });
  }

  const hashedPassword = await hashPassword(password);

  try {
    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role,
      })
      .returning();

    return res.status(201).json({ message: "User created", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error}` });
  }
};

//UPDATE USER
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password, isActive } = req.body;

  const payload = {};

  if (name) {
    payload.name = name;
  }
  if (email) {
    payload.email = email;
  }
  if (password) {
    payload.password = await hashPassword(password);
  }
  if (role) {
    payload.role = role;
  }
  if (isActive) {
    payload.isActive = isActive;
  }

  if (Object.keys(payload).length === 0) {
    return res
      .status(400)
      .json({ message: "At least one field should be updated" });
  }

  let updatedRecords = null;

  try {
    //get old email
    const [user] = await db.select().from(users).where(eq(users.id, id));

    const [updatedUser] = await db
      .update(users)
      .set(payload)
      .where(eq(users.id, id))
      .returning();

    if (email && email !== user.email) {
      updatedRecords = await db
        .update(records)
        .set({ email })
        .where(eq(records.email, user.email)).returning({email : records.email , r_id : records.r_id});
    }
    return res.status(200).json({ message: "User updated", data: updatedUser , records : updatedRecords });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error}` });
  }
};

//DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();
    return res.status(200).json({ message: "User deleted", data: deletedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Internal Server Error : ${error}` });
  }
};
