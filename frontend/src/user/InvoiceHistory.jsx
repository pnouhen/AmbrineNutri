import React, { useEffect, useState } from "react";
import MessageNoData from "../components/MessageNoData";

export default function InvoiceHistory({ invoices, setInvoices, textInvoiceHistory }) {
    const generateContent = () => {
    if (!invoices || invoices.length === 0) {
      return <MessageNoData text={textInvoiceHistory} />;
    }

    return (
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>{invoice.titre}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="pb-6 border-panier flex flex-col gap-5">
      <h3 className="h3">Historique des factures</h3>
      {generateContent()}
    </div>
  );
}

