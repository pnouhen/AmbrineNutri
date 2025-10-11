import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

import Header from "../structures/Header";
import Footer from "../structures/Footer";

export default function LegalNotices() {
  const { token, userInfo } = useContext(AuthContext);

  // Display this page
  if (token && !userInfo) return null;

  return (
    <>
      <Header />

      <main className="p-5 flex flex-col justify-center items-center bg-gray">
        <div className="p-5 lg:w-7/12 md:w-10/12 w-full section flex flex-col justify-center items-center gap-5 rounded-2xl">
          <h2 className="h2">Mentions Légales</h2>

          <section className="w-full">
            <h3 className="h3 mb-2.5 w-full">1. Éditeur du site</h3>

            <ul className="flex flex-col gap-2">
              <li className="text">Nom de l'entreprise : Ambrine Nutri</li>

              <li className="text">
                Forme juridique : Entrepreneur individuel
              </li>

              <li className="text">Capital social : 200€</li>

              <li className="text">Adresse : 10 Rue de la Paix, 75002 Paris</li>

              <li className="text">Téléphone : 01.23.45.67.89</li>

              <li className="text">Email : contact@ambrinenutri.fr</li>

              <li className="text">Directeur de la publication : Ambrine Nouhen</li>
            </ul>
          </section>

          <section className="w-full">
            <h3 className="h3 mb-2.5 w-full">2. Hébergeur</h3>

            <div>
              <h4 className="h4 mb-2.5">Vercel</h4>

              <ul className="flex flex-col gap-2">
                <li className="text">Vercel Inc.</li>

                <li className="text">
                  340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                </li>

                <li className="text">
                  Site : <a href="https://vercel.com">https://vercel.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="h4 mb-2.5">Render</h4>

              <ul className="flex flex-col gap-2">
                <li className="text">Render, Inc.</li>

                <li className="text">
                  660 4th Street #502, San Francisco, CA 94107, États-Unis
                </li>

                <li className="text">
                  Site : <a href="https://render.com">https://render.com</a>
                </li>
              </ul>
            </div>
          </section>

          <section className="w-full">
            <h3 className="h3 mb-2.5 w-full">3. Propriété intellectuelle</h3>

            <p className="text">
              L’ensemble des éléments du site (contenus, visuels, logos, design,
              code source, etc.) est protégé par le droit de la propriété
              intellectuelle. Toute reproduction, modification ou diffusion,
              totale ou partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section className="w-full">
            <h3 className="h3 mb-2.5 w-full">4. Responsabilité</h3>

            <p className="text">
              L’éditeur du site s’efforce de fournir des informations fiables et
              mises à jour. Cependant, il ne peut être tenu responsable des
              erreurs, omissions, interruptions ou indisponibilités du service.
              Les liens externes présents sur le site n’engagent pas la
              responsabilité de l’éditeur.
            </p>
          </section>

          <section className="w-full">
            <h3 className="h3 mb-2.5 w-full">5. Données personnelles (RGPD)</h3>

            <p className="text">
              Les données collectées via le site (formulaires, création de
              compte, etc.) sont destinées à l'achat de recette de cuisine et
              leur accessibilité. Conformément au RGPD et à la loi «
              Informatique et Libertés », vous disposez d’un droit d’accès, de
              rectification, de suppression et d’opposition concernant vos
              données. Pour exercer vos droits, contactez : [email de contact]
              Vous pouvez également introduire une réclamation auprès de la CNIL
              (www.cnil.fr ).
            </p>
          </section>

          <section className="w-full">
            <h3 className="h3 mb-2.5 w-full">6. Cookies</h3>

            <p className="text">Il n'y a pas de cookies sur ce site internet</p>
          </section>

          <section className="w-full">
            <h3 className="h3 mb-2.5 w-full">7. Droit applicable</h3>

            <p className="text">
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige, et à défaut de résolution amiable, les tribunaux
              compétents seront ceux du ressort de Limoges.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
