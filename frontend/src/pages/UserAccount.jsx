import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

import Header from "../structures/Header";
import { BillingAddress } from "../user/BillingAddress";
import ModalMessage from "../Modals/MessageModal";
import Footer from "../structures/Footer";
import InvoiceHistory from "../user/InvoiceHistory";

export default function UserAccount() {
  const { token, userInfo, generateUserInfo } = useContext(AuthContext);

  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [textInvoiceHistory, setTextInvoiceHistory] = useState(
    "Il n'y a pas encore de facture"
  );
  const coordDefault = null
  const [messageModal, setMessageModal] = useState("");

  // Manage page if token
  useEffect(() => {
    if (!token) navigate("/se-connecter");
  }, [token]);

  //   Generate invoices
//   useEffect(() => {}, []);

  // Shows page after generate all elements
  if (!userInfo) {
    return null;
  }

  return (
    <>
      <Header />

      <main className="bgUserAccount">
        <div className="userAccountContainer section flex flex-col gap-5">
          <h2 className="h2">Mon Compte</h2>

          <InvoiceHistory
            invoices={invoices}
            setInvoices={setInvoices}
            textInvoiceHistory={textInvoiceHistory}
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
