export const roles = {
  ADMIN: "admin",
  VIEWER: "viewer",
  ANALYST: "analyst",
};

export const permissions = {
  viewer: ["dashboard : read"],
  analyst: [
    "records : read",
    "dashboard : read",
    "dashboard-particular : read",
    "insights : read"
  ],
  admin: [
    "records : read",
    "records : create",
    "records : delete",
    "records : update",
    "dashboard-particular : read",
    "dashboard : read",
    "users : create",
    "users : read",
    "users : update",
    "users : delete",
    "insights : read"
  ],
};

export const hasPermission = (role, permission) => {
  const allowed = permissions[role] || [];
  return allowed.includes(permission);
};
