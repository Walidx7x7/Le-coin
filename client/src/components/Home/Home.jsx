import React, { useState, useEffect } from "react";
import axios from "axios";

const ArticlesManager = () => {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const [editingArticleId, setEditingArticleId] = useState(null);

  // Charger les articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/articles"); // Remplace par l'URL correcte
        setArticles(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des articles :", error);
      }
    };

    fetchArticles();
  }, []);

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Ajouter ou modifier un article
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    try {
      if (editingArticleId) {
        // Modifier un article
        await axios.put(`/api/articles/${editingArticleId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Article modifié avec succès !");
      } else {
        // Ajouter un article
        await axios.post("/api/articles", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Article ajouté avec succès !");
      }
      setEditingArticleId(null);
      setForm({ title: "", content: "", category: "", image: null });
      refreshArticles();
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Une erreur s'est produite !");
    }
  };

  // Supprimer un article
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/articles/${id}`);
      alert("Article supprimé avec succès !");
      refreshArticles();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Une erreur s'est produite !");
    }
  };

  // Mettre à jour la liste des articles après une modification
  const refreshArticles = async () => {
    try {
      const response = await axios.get("/api/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des articles :", error);
    }
  };

  // Remplir le formulaire pour modifier un article
  const handleEdit = (article) => {
    setEditingArticleId(article._id);
    setForm({
      title: article.title,
      content: article.content,
      category: article.category,
      image: null,
    });
  };

  return (
    <div>
      <h1>Gestion des articles</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="content"
          placeholder="Contenu"
          value={form.content}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Catégorie"
          value={form.category}
          onChange={handleInputChange}
          required
        />
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">
          {editingArticleId ? "Modifier l'article" : "Ajouter un article"}
        </button>
      </form>

      <h2>Liste des articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <p>Catégorie : {article.category}</p>
            {article.imagePath && (
              <img
                src={article.imagePath}
                alt={article.title}
                style={{ width: "200px" }}
              />
            )}
            <button onClick={() => handleEdit(article)}>Modifier</button>
            <button onClick={() => handleDelete(article._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesManager;
