import React, { useEffect, useState } from "react";
import MessageNoData from "../components/MessageNoData";

export default function InvoiceHistory({ token, invoices, setMessageModal }) {
  const downloadInvoice = async (fileName) => {
    // No use of fetchDataUserGet because the response will be a binary object.
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_API
        }/api/users/me/invoicesRecipes/${fileName}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const blob = await res.blob();
      // Creates a temporary URL for this Blob file
      const url = window.URL.createObjectURL(blob);

      // Dynamically creates an <a> element to trigger the download
      const link = document.createElement("a");
      // Link of PDF
      link.href = url;
      // Name PDF
      link.download = fileName;
      // Simulates a click to download it
      link.click();

      // Frees the temporary URL to avoid memory leaks
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur :", error.message);
      setMessageModal("NoDownload");
    }
  };

  const generateContent = () => {
    if (!invoices || invoices.length === 0) {
      return <MessageNoData text="Il n'y a pas encore de facture" />;
    }

    return (
      <ul className="flex flex-col gap-5">
        {invoices.map((invoice, index) => (
          <li key={index}>
            <button
              className="text text-blue-600 hover:text-blue-800 cursor-pointer underline"
              onClick={() => downloadInvoice(invoice)}
            >
              {invoice}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="pb-6 borderTopGray flex flex-col gap-5">
      <h3 className="h3">Historique des factures</h3>
      {generateContent()}
    </div>
  );
}
