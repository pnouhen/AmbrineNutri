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
    action: "noConnexion",
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
    message: "Le mot de passe doit contenir au minimum 8 caractères",
  },

  {
    action: "ErrorPassword",
    title: "Erreur dans le formulaire",
    message: "Les mots de passe doivent être identiques",
  },
  {
    action: "PaymentSuccessful",
    title: "Paiement réussi",
    message:`Merci d'avoir acheté la ou les recettes
            <br />
            Vous trouverez votre facture dans votre espace personnel
            <br />
            <strong>
              Étant donné qu'il s'agit d'un site de démonstration, les données ne seront pas conservés
            </strong>`,
  }
];
