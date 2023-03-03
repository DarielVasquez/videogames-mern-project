import bcrypt from "bcrypt";

const checkPassword = async (req, res, next) => {
  try {
    const { confirmPassword } = req.body;
    const isMatch = await bcrypt.compare(confirmPassword, req.user.password); // Comparing the provided password with the hashed password in the database
    if (!isMatch) {
      return res.json({ status: "failure", message: "Incorrect password" }); // If passwords don't match, return an error response
    }
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export default checkPassword;
