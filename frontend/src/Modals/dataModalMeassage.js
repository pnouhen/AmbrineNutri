export const dataModalMeassage = [
  {
    action: "reviewsTrue",
    title: "Avis déposé",
    message: `Merci pour votre retour !<br />
    <strong>
      Étant donné qu'il s'agit d'un site de démonstration, votre
      commentaire sera supprimé dans 10 minutes.
    </strong>`,
  },

  {
    action: "reviewsFalse",
    title: "Erreur de validation",
    message: "Le formulaire est incomplet",
  },

  {
    action: "noConnexionNumberPeople",
    title: "Le bouton ne fonctionne pas",
    message: `Étant donné le temps investi dans la création des recettes, je demande
          une contribution de 1€ par recette.
            <br />
             Si cela vous intéresse, vous pouvez vous inscrire ou vous connecter`,
  },

  {
    action: "noAddPanierNumberPeople",
    title: "Le bouton ne fonctionne pas",
    message: `Étant donné le temps investi dans la création des recettes, je demande
          une contribution de 1€ par recette.
            <br />
             Cliquez sur « Ajouter au panier » pour la sélectionner.`,
  },

  {
    action: "noPurchaseNumberPeople",
    title: "Le bouton ne fonctionne pas",
    message:
      "Rendez-vous dans votre panier pour finaliser l’achat et profiter de votre recette.",
  },

  {
    action: "noConnexionAuthPage",
    title: "La connexion a échoué",
    message: "Email/Mot de passe n'est pas valide",
  },

  {
    action: "SignIn",
    title: "Inscription réussie",
    message: `Vous allez recevoir un mail de confirmation
            <br />
            <strong>
              Étant donné qu'il s'agit d'un site de démonstration, l'e-mail ne
              vous sera pas envoyé
            </strong>`,
  },

  {
    action: "ErrorSubmit",
    title: "Erreur dans le formulaire",
    message: "Tous les champs doivent être remplis",
  },

  {
    action: "passwordLength",
    title: "Erreur dans le formulaire",
    message: "Le mot de passe doit contenir au minimum 12 caractères",
  },

  {
    action: "passwordContain",
    title: "Erreur dans le formulaire",
    message:
      "Le mot de passe doit contenir au moins une majuscule, une miniscule, un nombre et un caractères spécial",
  },

  {
    action: "ErrorPassword",
    title: "Erreur dans le formulaire",
    message: "Les mots de passe doivent être identiques",
  },

  {
    action: "ErrorInscription",
    title: "Erreur d’inscription",
    message: `Les informations saisies ne peuvent pas être utilisées.
            <br />
            Veuillez vérifier vos champs et réessayer.`,
  },

  {
    action: "InvalidAddress",
    title: "Erreur adresse",
    message: "L'adresse n'est pas valide",
  },

  {
    action: "NoDelete",
    title: "Suppression non effectué",
    message: "Désolé, la suppression n'a pas pu se faire.",
  },

  {
    action: "NoRecipePanier",
    title: "Panier vide",
    message: "Le panier est vide",
  },

  {
    action: "RecipeAlreadyPurchased",
    title: "Recette(s) déjà achetée(s)",
    message: "Au moins une recette est déjà achetée",
  },

  {
    action: "NoAddressIsDefault",
    title: "Adresse non sélectionnée",
    message: "Aucune adresse n'est sélectionnée",
  },

  {
    action: "FailPayment",
    title: "Echec du paiement",
    message: "Un des éléments du paiement est mal rempli",
  },

  {
    action: "PaymentSuccessful",
    title: "Payment réussi",
    message: `Merci d'avoir acheté la ou les recettes
            <br />
            Vous trouverez votre facture dans votre espace personnel
            <br />
            <strong>
              Étant donné qu'il s'agit d'un site de démonstration, les données ne seront pas conservés
            </strong>`,
  },

  {
    action: "NoDownload",
    title: "Le téléchargement à échoué",
    message: "Désolé, le téléchargement n'a pas pu fonctionner"
  }
];
