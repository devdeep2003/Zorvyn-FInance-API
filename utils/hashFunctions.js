import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  try {
    return bcrypt.hash(password, 12);
  } catch (error) {
    console.log(`Error hashing password ${error}`);
  }
};

export const comparePassword = (password, hash) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (error) {
    console.log(`Error comparing password ${error}`);
  }
};
