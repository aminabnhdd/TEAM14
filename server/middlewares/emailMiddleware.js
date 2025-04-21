const transporter = require("../config/nodeMailer");

const sendAccountStatusEmail = async ({ to, username, status }) => {
  if (!to || !username || !status) {
    throw new Error("Missing email parameters");
  }

  const subject = status === "accepted" 
    ? "Votre compte a été approuvé !" 
    : "Mise à jour sur votre demande de compte";

  const htmlMessage = status === "accepted"
    ? `
      <h2>Félicitations, ${username} !</h2>
      <p>Votre demande de création de compte a été approuvée.</p>
      <p>Vous pouvez maintenant vous connecter et utiliser notre plateforme.</p>
      <a href="https://athar.com" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">Se connecter</a>
      <p>Merci d'utiliser notre service.</p>
    `
    : `
      <h2>Bonjour ${username},</h2>
      <p>Nous avons examiné votre demande de compte.</p>
      <p>Malheureusement, nous ne pouvons pas l'approuver pour le moment.</p>
      <p>Si vous pensez qu'il y a une erreur, veuillez créez votre compte à nouveau.</p>
      <a href="https://athar.com" style="display: inline-block; padding: 10px 20px; background-color: #dc3545; color: #fff; text-decoration: none; border-radius: 5px;">Contacter le support</a>
    `;

  const textMessage = status === "accepted"
    ? `Félicitations ${username} ! Votre compte a été approuvé. Vous pouvez maintenant vous connecter: https://athar.com`
    : `Bonjour ${username}, votre demande de compte a été refusée. Si vous avez des questions, contactez-nous: athar.e14.esi@gmail.com`;

  try {
    await transporter.sendMail({
      from: `"Support Admin" <${process.env.EMAIL}>`,
      to,
      subject,
      text: textMessage, 
      html: htmlMessage,
    });

    console.log(`Email envoyé à ${to} - Statut: ${status}`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw new Error("Échec de l'envoi de l'email");
  }
};


const sendPasswordForgotten = async ({ to,otl }) => {
  if (!to) {
    throw new Error("Missing email parameter");
  }

  const subject =  "Réinitialisation de mot de passe";
  const username = to.split("@")[0]; 

  const htmlMessage = 
    ` <h2>Bonjour, ${username} !</h2>
      <p>Voici un lien pour réinitialiser votre mot de passe.</p>
      <a href="http://localhost:5173/mot-de-passe-oublie/${otl}" style="display: inline-block; padding: 10px 20px; background-color: #e8c07d; color: #fff; text-decoration: none; border-radius: 5px;">Se connecter</a>
      <p>Merci d'utiliser notre service.</p>
    `;

  // const textMessage = `Bonjour ${username}, votre demande de compte a été refusée. Si vous avez des questions, contactez-nous: athar.e14.esi@gmail.com`;

  try {
    await transporter.sendMail({
      from: `"Support Admin" <${process.env.EMAIL}>`,
      to,
      subject,
      // text: textMessage, 
      html: htmlMessage,
    });

    console.log(`Email envoyé à ${to} - Réninitialisation de mot de passe`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw new Error("Échec de l'envoi de l'email");
  }
};


const sendAccDis = async ({to,username})=>{
  if (!to || !username) {
    throw new Error("Missing email parameters");
  }

  const subject = "Votre compte a été désactivé !";

  const htmlMessage = `
      <h2>Bonjour, ${username}</h2>
      <p>Votre Compte ATHAR a été désactivé par l'admin :(</p>
      <p>Vous pouvez nous contacter sur : athar.e14.esi@gmail.com, pour plus d'informations.</p>
    `;

  const textMessage =`Cher ${username} ! Votre compte a été désactivé. Vous pouvez nous contacter sur athar.e14.esi@gmail.com`;

  try {
    await transporter.sendMail({
      from: `"Support Admin" <${process.env.EMAIL}>`,
      to,
      subject,
      text: textMessage, 
      html: htmlMessage,
    });

    console.log(`Email envoyé à ${to}`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw new Error("Échec de l'envoi de l'email");
  }
}

module.exports = {sendAccountStatusEmail,sendAccDis,sendPasswordForgotten};
