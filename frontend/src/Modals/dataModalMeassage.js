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
    action: "ErrorSignIn",
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
];
