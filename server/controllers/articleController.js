const upload = require("../middlewares/upload");
const Article = require("../models/articleModel")


const createArticle = async (req, res) => {
    const authorId = req.user.id;

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        const imagePath = req.file
            ? `/images/${req.file.filename}`
            : null;

        const article = new Article({
            ...req.body,
            author: authorId,
            imagePath: imagePath,
        });

        try {
            await article.save();
            res.status(201).send(article);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    });
};

const getArticles = async (req, res) => {
    try {
        const filter = {};
        if (req.query.title) {
            filter.title = { $regex: req.query.title, $options: "i" };
        }
        if (req.query.category) {
            filter.category = { $regex: req.query.category, $options: "i" };
        }

        const articles = await Article.find(filter).populate(
            "author",
            "username email"
        );

        res.status(200).send(articles);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.articleId,
            req.body,
            {
                new: true,
            }
        );
        if (!article) {
            return res.status(404).send({ error: "Article introuvable" });
        }
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getArticleByUserId = async (req, res) => {
    try {
        const article = await Article.find({ author: req.params.userId }).populate(
            "author",
            "username email"
        );
        if (!article) {
            return res.status(404).send({ error: "Article introuvable" });
        }
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.articleId);
        if (!article) {
            return res.status(404).send({ error: "Article introuvable" });
        }
        res.status(200).send({ message: "Article supprimée" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId).populate(
            "author",
            "username email"
        );
        if (!article) {
            return res.status(404).send({ error: "Article introuvable" });
        }
        res.status(200).send(article);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


module.exports = {
    createArticle,
    getArticles,
    updateArticle,
    getArticleByUserId,
    deleteArticle,
    getArticle, 
};