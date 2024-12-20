const express = require("express");
const routes = express.Router();
const {
    updateUser,
    deleteUser,
    getUsers,
  } = require("../controllers/userController");
const authMiddleware  = require("../middlewares/authMiddleware")

routes.get("/users", authMiddleware, getUsers);
routes.delete("/delete",authMiddleware, deleteUser)
routes.put("/update/:id", authMiddleware, updateUser)

module.exports = routes;



