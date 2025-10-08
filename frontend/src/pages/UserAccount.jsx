import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { fetchDataUserGet } from "../services/fetchDataUserGet";

import Header from "../structures/Header";
import { BillingAddress } from "../user/BillingAddress";
import ModalMessage from "../Modals/MessageModal";
import Footer from "../structures/Footer";
import InvoiceHistory from "../user/InvoiceHistory";
import { redirectionNoToken } from "../services/RedirectionNoToken";

export default function UserAccount() {
  const { token, userInfo, generateUserInfo } = useContext(AuthContext);

  const [invoices, setInvoices] = useState(null);
  const coordDefault = null;
  const [messageModal, setMessageModal] = useState("");

  redirectionNoToken(token);

  //   Generate the name of invoices
  useEffect(() => {
    fetchDataUserGet(
      `${import.meta.env.VITE_BASE_API}/api/users/me/invoicesRecipes`
    )
      .then((invoicesRecipes) => setInvoices(invoicesRecipes))
      .catch((error) => {
        setInvoices([]);
        console.error("Erreur lors du chargement", error);
      });
  }, []);

  // Shows page after generate all elements
  if (!userInfo || !invoices) {
    return null;
  }

  return (
    <>
      <Header />

      <main className="bgUserAccount h-full flex flex-1 items-center">
        <div className="userAccountContainer section flex flex-col gap-5">
          <h2 className="h2">Mon Compte</h2>

          <InvoiceHistory
            token={token}
            invoices={invoices}
            setMessageModal={setMessageModal}
          />

          <BillingAddress
            addresses={userInfo?.addresses}
            generateUserInfo={generateUserInfo}
            coordDefault={coordDefault}
            setMessageModal={setMessageModal}
          />
        </div>

        <ModalMessage
          action={messageModal}
          onClickClose={() => setMessageModal("")}
        />
      </main>

      <Footer />
    </>
  );
}
