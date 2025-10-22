import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { fecthInvoicesRecipes } from "../services/fecthInvoicesRecipes";
import { redirectionNoToken } from "../services/RedirectionNoToken";
import { toggleOverflow } from "../services/toggleOverflow";

import Header from "../structures/Header";
import Loader from "../components/Loader";
import { BillingAddress } from "../user/BillingAddress";
import ModalMessage from "../Modals/MessageModal";
import Footer from "../structures/Footer";
import InvoiceHistory from "../user/InvoiceHistory";
import Error404 from "../pages/Error404";

export default function UserAccount() {
  const { token, userInfo } = useContext(AuthContext);

  const [invoices, setInvoices] = useState(() => {
    return JSON.parse(sessionStorage.getItem("invoicesRecipes"));
  });

  const [addresses, setAddresses] = useState(() => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo?.addresses) return [];

    return userInfo.addresses;
  });
  const [coordDefault, setCoordDefault] = useState(null);

  const [messageModal, setMessageModal] = useState("");

  redirectionNoToken(token);

  //   Generate the name of invoices
  useEffect(() => {
    if (!invoices) {
      const loadInvoices = async () => {
        const newInvoicesRecipes = await fecthInvoicesRecipes();
        setInvoices(newInvoicesRecipes);
      };
      loadInvoices();
    }
  }, []);

  
    // Display coordDefault
    useEffect(() => {
      if (addresses) {
        const defaults = addresses.filter((address) => address.isDefault);
        if (defaults.length === 0) {
          setCoordDefault([]);
        } else {
          setCoordDefault(defaults[0]);
        }
      }
    }, [addresses]);

  // Shows page if user
  if (userInfo && userInfo.role !== "user") return <Error404 />;

  // ModalMessage is active, stop Overflow
  toggleOverflow(messageModal !== "");

  return (
    <>
      <Header />

      <Loader condition={userInfo && invoices} />

      {userInfo && invoices && (
        <>
          <main className="bgUserAccount h-full flex flex-1 items-center">
            <div className="userAccountContainer section flex flex-col gap-5">
              <h2 className="h2">Mon Compte</h2>

              <InvoiceHistory
                token={token}
                invoices={invoices}
                setMessageModal={setMessageModal}
              />

              <BillingAddress
                userInfo={userInfo}
                addresses={addresses}
                setAddresses={setAddresses}
                coordDefault={coordDefault}
                setCoordDefault={setCoordDefault}
                setMessageModal={setMessageModal}
              />
            </div>

            <ModalMessage
              action={messageModal}
              onClickClose={() => setMessageModal("")}
            />
          </main>
        </>
      )}
      <Footer />
    </>
  );
}
