import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    // Verify token and extract user information
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(`Unable to login user, ${e}`);
    res.status(500).json({ error: e });
  }
};

export default verifyToken;
