const multer = require("multer");
const path = require("path");

// Configurer le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images"); 
  },
  filename: function (req, file, cb) {
    // Nommer les fichier images des articles sous la forme : date + nom du fichier
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

//Définir le format de fichiers accepté
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/; 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); 
  const mimetype = filetypes.test(file.mimetype); 
  
  if (extname && mimetype) {
    return cb(null, true); 
  } else {
    cb(new Error("Seulement les fichiers image sont autorisés"));
  }
};

// Configurer multer avec stockage et filtre de format des fichiers
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single("image");

module.exports = upload;
