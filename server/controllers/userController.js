const User = require("../models/userModel");

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
          return res.status(404).send({ error: "Utilisateur introuvable" });
        }
        res.status(200).send({ message: "Utilisateur supprimé" });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};

const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select("-password");
      if (!user) {
        return res.status(404).send({ error: "Utilisateur introuvable" });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  

  const getUsers = async (req, res) => {
    try {
      const filter = {};
  
      if (req.query.username) {
        filter.username = { $regex: req.query.username, $options: "i" };
      }
  
      const users = await User.find(filter).select("-password");
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

module.exports = {deleteUser, updateUser, getUsers};
