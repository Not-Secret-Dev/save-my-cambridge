export const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("Decoded User:", req.user); // 👈 log this

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      console.log("Access denied. Role is:", req.user?.role);
      return res.status(403).json({ message: "Access denied!" });
    }

    next();
  };
};
