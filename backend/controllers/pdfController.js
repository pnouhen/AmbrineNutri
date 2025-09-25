const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const open = require("open").default;

function generatePDF(req, res) {
  const infopurchasesRecipes = {
    recipesName: ["recette", "688         4c8433a48742cc682a55"],
    address: {
      address: "7 rue Benjamin Delessert",
      city: "Limoges",
      country: "France",
      firstName: "Pierre",
      isDefault: true,
      lastName: "Nouhen",
      postalCode: "87100",
    },
  };

  // Chemin vers le dossier pdfs
  const pdfDir = path.join(__dirname, "../pdfs");

  // Crée le dossier s'il n'existe pas
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
  }
  const invoiceNumber = Date.now();
  const filePath = path.join(pdfDir, `Facture-${invoiceNumber}.pdf`);
  const logoPath = path.join(__dirname, "../assets/logo-facture.jpg");

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  const pageWidth = doc.page.width;
  const margin = 30;

  const fontSizeInitial = 11;
  const fontInitial = "Helvetica";
  doc.fontSize(fontSizeInitial).font(fontInitial);

  // HEADER
  const textHeader =
    "Laura Diet\n21 Rue Védrines\n87100 Limoges\n06.75.66.96.04\nRCS : RCS Limoges 512 345 678\nSIREN : 512 345 678\nSIRET : 512 345 678 00021\nTVA intracommunautaire : FR12 512345678";
  const widthHeaderImg = 53;
  const heightHeaderImg = 100;
  const textHeaderMoreLength = "TVA intracommunautaire : FR12 512345678";
  const widthHeaderText = doc.widthOfString(textHeaderMoreLength); // largeur du texte
  const heightHeaderText = doc.heightOfString(textHeader, {
    width: widthHeaderText,
  });
  const heightHeader =
    heightHeaderImg >= heightHeaderText ? heightHeaderImg : heightHeaderText;

  doc.image(logoPath, margin, margin, {
    width: widthHeaderImg,
    height: heightHeaderImg,
  });

  doc.text(textHeader, pageWidth - margin - widthHeaderText, margin, {
    width: widthHeaderText,
    align: "left",
  });

  //   TITLE
  const heightTitle = heightHeader + margin * 2;
  const textTitle = "FACTURE";
  const fontSizeTitle = 16;
  const fontTitle = "Helvetica-Bold";

  doc.font(fontTitle).fontSize(fontSizeTitle);
  const widthTitleText = doc.widthOfString(textTitle);
  const heightTitleText = doc.heightOfString(textTitle);

  // Affichage du texte centré
  doc.text(textTitle, 0, heightTitle, {
    width: pageWidth,
    align: "center",
  });

  //   Underlining
  const yLineTitle = heightTitle + heightTitleText - 5;
  doc
    .moveTo((pageWidth - widthTitleText) / 2, yLineTitle)
    .lineTo((pageWidth - widthTitleText) / 2 + widthTitleText, yLineTitle)
    .stroke();

  //   USER ADDRESS
  const heightUserAddress = heightTitle + heightTitleText + margin;
  const textUserAddress = `${infopurchasesRecipes.address.lastName} ${infopurchasesRecipes.address.firstName}\n${infopurchasesRecipes.address.address}\n${infopurchasesRecipes.address.postalCode} ${infopurchasesRecipes.address.city}\n${infopurchasesRecipes.address.country}`;
  doc.font(fontInitial).fontSize(fontSizeInitial);
  const heightUserAddressText = doc.heightOfString(textUserAddress);

  doc.text(textUserAddress, margin, heightUserAddress, {
    align: "left",
  });

  // Invoice information
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // les mois vont de 0 à 11
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const heightInVoiceInformation =
    heightUserAddress + heightUserAddressText + margin;
  const textInvoiceInformation = `Facture n° : Fr-${invoiceNumber}\nDate d'émission : ${formattedDate}\nFacture acquittée le ${formattedDate}\nMode de paiement : Carte bancaire`;
  const heightInVoiceInformationText = doc.heightOfString(
    textInvoiceInformation
  );

  doc.text(textInvoiceInformation, margin, heightInVoiceInformation, {
    align: "left",
  });

  //   Purchasing table
  doc.font(fontInitial).fontSize(fontSizeInitial);
  const purchasingTableHEADER_PRIX_HT = "Prix HT";
  const purchasingTableHEADER_TVA = "TVA (20%)";
  const purchasingTableHEADER_PRIX_TTC = "Prix TTC";
  const purchasingTableHEADER = [
    purchasingTableHEADER_PRIX_HT,
    purchasingTableHEADER_TVA,
    purchasingTableHEADER_PRIX_TTC,
  ];
  const widthMaxPurchasingTableHEADER = Math.max(
    ...purchasingTableHEADER.map((h) => doc.widthOfString(h))
  );

  const heightColomunPurchasingTable = doc.heightOfString("Prix TTC") + 10;
  const marginPurchasingTableText = 10;
  // TODO Créer que les lignes verticale et celle du haut sauf pour la dernière
  // First row
  const heightFirstRowPurchasingTable =
    heightInVoiceInformation + heightInVoiceInformationText + margin;

  // 0.5 so that there is a corner
  doc
    .moveTo(margin - 0.5, heightFirstRowPurchasingTable)
    .lineTo(pageWidth - margin + 0.5, heightFirstRowPurchasingTable)
    .stroke();
  // First box
  const heightFirstRowPurchasingTableText =
    heightFirstRowPurchasingTable + marginPurchasingTableText;
  // Left vertical line
  const lengthPurchasingTableFistRows =
    heightFirstRowPurchasingTable + heightColomunPurchasingTable;
  doc
    .moveTo(margin, heightFirstRowPurchasingTable)
    .lineTo(margin, lengthPurchasingTableFistRows)
    .stroke();

  // Text
  // Remove an extra 20px because PDFKit adds internal padding
  const widthPurchasingTableFirstColomunText =
    pageWidth -
    margin -
    marginPurchasingTableText * 2 -
    (widthMaxPurchasingTableHEADER + marginPurchasingTableText * 2) * 3 - 20;

  doc.text(
    "Produit",
    margin + marginPurchasingTableText,
    heightFirstRowPurchasingTableText,
    {
      width: widthPurchasingTableFirstColomunText,
      align: "center",
    }
  );

  // Second box
  const widthPurchasingTableSecondColomun =
    margin + widthPurchasingTableFirstColomunText + marginPurchasingTableText;
  doc
    .moveTo(widthPurchasingTableSecondColomun, heightFirstRowPurchasingTable)
    .lineTo(widthPurchasingTableSecondColomun, lengthPurchasingTableFistRows)
    .stroke();

  doc.text(
    purchasingTableHEADER_PRIX_HT,
    widthPurchasingTableSecondColomun + marginPurchasingTableText,
    heightFirstRowPurchasingTableText,
    {
      width: widthMaxPurchasingTableHEADER,
      align: "center",
    }
  );

  // Third box
  const widthPurchasingTableThirdColomun =
    widthPurchasingTableSecondColomun +
    marginPurchasingTableText * 2 +
    widthMaxPurchasingTableHEADER;

  doc
    .moveTo(widthPurchasingTableThirdColomun, heightFirstRowPurchasingTable)
    .lineTo(widthPurchasingTableThirdColomun, lengthPurchasingTableFistRows)
    .stroke();

  // Fourth box
  const widthPurchasingTableFourthColomun =
    widthPurchasingTableThirdColomun +
    marginPurchasingTableText * 2 +
    widthMaxPurchasingTableHEADER;

  doc
    .moveTo(widthPurchasingTableFourthColomun, heightFirstRowPurchasingTable)
    .lineTo(widthPurchasingTableFourthColomun, lengthPurchasingTableFistRows)
    .stroke();

  // Last line
  doc
    .moveTo(
      widthPurchasingTableFourthColomun +
        marginPurchasingTableText * 2 +
        widthMaxPurchasingTableHEADER,
      heightFirstRowPurchasingTable
    )
    .lineTo(
      widthPurchasingTableFourthColomun +
        marginPurchasingTableText * 2 +
        widthMaxPurchasingTableHEADER,
      lengthPurchasingTableFistRows
    )
    .stroke();
  console.log(widthPurchasingTableFirstColomunText);
  doc.end();

  stream.on("finish", async () => {
    await open(filePath); // ouvre le PDF automatiquement
    res.send("PDF généré et ouvert !");
  });
}

module.exports = { generatePDF };
