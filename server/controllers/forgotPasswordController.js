const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

let codes = {}; 

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fdcadb0bb90202",
      pass: "18bc684f2a446b"
    }
  });

exports.sendResetCode = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        // Générer un code unique
        const code = crypto.randomInt(100000, 999999).toString();
        codes[email] = code; 


        await transporter.sendMail({
            from: 'info@mailtrap.club',
            to: email,
            subject: 'Réinitialisation de votre mot de passe',
            text: `Voici votre code de réinitialisation : ${code}`,
            html: `<p>Voici votre code de réinitialisation : <strong>${code}</strong></p>`,
        });

        res.status(200).json({ message: 'Code envoyé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
    }
};


exports.verifyResetCode = (req, res) => {
    const { email, code } = req.body;
    if (!email || !code) {
        return res.status(400).json({ message: 'Email et code sont requis.' });
    }


    if (codes[email] === code) {
        delete codes[email]; 
        return res.status(200).json({ message: 'Code vérifié avec succès.' });
    } else {
        return res.status(400).json({ message: 'Code invalide ou expiré.' });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, password, confirmedPassword } = req.body;
  
    if (password !== confirmedPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
    }
  
    if (password.length < 8) {
      return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères." });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await User.findOneAndUpdate(
        { email }, 
        { $set: { password: hashedPassword } }, 
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
  
      res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error);
      res.status(500).json({ message: "Erreur serveur lors de la réinitialisation du mot de passe." });
    }
  };
  