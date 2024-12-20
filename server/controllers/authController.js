const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation des champs requis
    if (!username || !email || !password) {
      return res.status(400).send({ error: "username, email, and password are required" });
    }
    console.log(req.body)
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User with this email already exists" });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    // Création de l'utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log(`User "${username}" added`);
    res.status(201).send({ message: "User successfully registered", user });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation des champs requis
    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: `No user found with email: ${email}` });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid password" });
    }

    // Génération du token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log("Token generated:", token);

    res.status(200).send({ message: "User connected", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = { login, register };
