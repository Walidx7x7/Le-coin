const express = require("express");
const articleRoutes = express.Router();
const {
    createArticle,
    getArticles,
    updateArticle,
    getArticleByUserId,
    deleteArticle,
    getArticle,
} = require("../controllers/articleController");


const authMiddleware  = require("../middlewares/authMiddleware")


articleRoutes.post("/article", authMiddleware, createArticle);
articleRoutes.get("/articles", authMiddleware, getArticles);
articleRoutes.get("/article/:articleId", authMiddleware, getArticle);
articleRoutes.put("/article/:articleId", authMiddleware, updateArticle);
articleRoutes.get("/user/:userId/articles", authMiddleware, getArticleByUserId);
articleRoutes.delete("/article/:articleId", authMiddleware, deleteArticle);


module.exports = articleRoutes;



