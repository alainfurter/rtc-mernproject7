const { signToken } = require("../config/jwt");
const { hashPassword, verifyPassword } = require("../config/password");
const {
  createUserDB,
  getUserByEmailDB,
  getUserByIdDB,
} = require("../repositories/usersFunctions");

const getUser = async (req, res) => {
  const { id } = req.user; // should be there from hasValidJWTToken
  const user = await getUserByIdDB(id);
  res.status(200).json({ data: user });
};

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$/)) {
      res.status(500).json({
        data: "The user password is invalid. It must be at least 6 characters long and contain one lowercase and one uppercase character.",
      });
      return;
    }

    const hash = await hashPassword(password);
    const newUser = await createUserDB({ email, password: hash });
    res.status(201).json({ data: newUser });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ data: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmailDB(email);
  if (!user) {
    res.status(401).json({ data: "User does not exists" });
    return;
  }

  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ data: "Account and passwort do not match" });
    return;
  }

  const token = signToken({ id: user._id });
  const { password: userPassword, ...restUser } = user;
  res.status(200).json({ data: { token, user: restUser } });
};

module.exports = { getUser, registerUser, loginUser };
