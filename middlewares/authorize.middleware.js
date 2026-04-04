import { hasPermission } from "../utils/roles.js";

export const authorize = (permission) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!hasPermission(userRole, permission)) {
      return res
        .status(403)
        .json({ message: "User is not authorized to perform this action" });
    }

    next();
  };
};
