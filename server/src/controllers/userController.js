import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Username , Password ,Name  are required." });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must have atleast 6 Charaters." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exist." });
    }
    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);
    const newUser = new User({ name, email, password: hash_password });
    await newUser.save();
    res.status(200).json({ newUser, message: "Data Saved SuccessFully." });
  } catch (error) {
    res.status(500).json({ message: "Error While Creating User", error });
  }
};
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Ensure you have a secret key in your .env file

const Login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Username and Password are required." });
  }

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username or Password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Username or Password." });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    // Set the token in a cookie
    res.setHeader("Set-Cookie", cookie.serialize("student-dash", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        secure: true,
      path: "/", // Available for the whole site
    }));

    res.status(200).json({ message: "Login successful!" ,token});
  } catch (error) {
    res.status(500).json({ message: "Error While Logging In", error });
    console.log(error);
    
  }
};
const getCurrentUser = async (req, res) => {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const token = cookies['student-dash'];
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
  
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
  
      try {
        const userId = decodedToken.userId;
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
  
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
  
        res.status(200).json({ user });
      } catch (error) {
        console.error("Error retrieving user information:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  };



const logout = (req, res) => {
  // Clear the cookie by setting its expiration date to a past time
  res.setHeader("Set-Cookie", cookie.serialize("student-dash", "", {
    maxAge: -1, // Set to a past date to invalidate the cookie
    path: "/",  // Available for the whole site
    sameSite: "none",  // Ensure this matches the setting used during login
    httpOnly: true,
    secure: true, // Use secure flag if your site is HTTPS
  }));

  res.status(200).json({ message: "Logout successful" });
};



export { Signup ,Login , getCurrentUser,logout};
