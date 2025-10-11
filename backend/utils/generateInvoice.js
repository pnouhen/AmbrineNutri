const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const open = require("open").default;

const { generateFolder } = require("../utils/generateFolder");
const { getNextInvoiceNumber } = require("../utils/getNextInvoiceNumber");

// function generateInvoice(req, res) {
function generateInvoice(req, userId, recipesName, infoPurchasesRecipes) {
  // Formatted date
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  // Save pdf
  const invoicesFolderUserId = path.join("./uploads", "users", userId);
  generateFolder(invoicesFolderUserId);

  const invoicesFolderInvoice = path.join(
    "./uploads/users",
    userId,
    "factures"
  );
  generateFolder(invoicesFolderInvoice);

  const partialName = `Facture-${day}-${month}-${year}`;
  const numberInvoiceDay = getNextInvoiceNumber(
    invoicesFolderInvoice,
    partialName
  );
  const fileName = `${partialName}-${numberInvoiceDay}.pdf`;

  const filePath = path.join(invoicesFolderInvoice, fileName);

  // Fillable PDF object + get total pages
  const doc = new PDFDocument({ bufferPages: true });

  // The file on disk where the PDF will be written.
  const stream = fs.createWriteStream(filePath);

  // Link the two together to save the PDF content.
  doc.pipe(stream);

  // Resources
  const invoiceNumber = Date.now();
  const logoPath = path.join("./", "assets/img/logo", "logo-facture.jpg");

  // Layout
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const margin = 30;

  // Footer margins to get a limit for the text
  const heightCountFooter = doc.fontSize(10).heightOfString("Page");
  const heightTextFooter = doc.fontSize(8).heightOfString("Page");
  const marginFooter = 10;
  const heightPageFooter =
    pageHeight - heightCountFooter - heightCountFooter - marginFooter - margin;
  const bottomLimit = heightPageFooter - margin;

  // Basic font
  const fontSizeInitial = 11;
  const fontInitial = "Helvetica";
  doc.fontSize(fontSizeInitial).font(fontInitial);

  // HEADER
  const textHeader =
    "Claire Diet\n10 Rue de la Paix\n75002 Paris\n01.23.45.67.89\nRCS : RCS Limoges 512 345 678\nSIREN : 512 345 678\nSIRET : 512 345 678 00021\nTVA intracommunautaire : FR12 512345678";
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

  doc.font(fontTitle).fontSize(fontSizeTitle).fillColor("black");
  const widthTitleText = doc.widthOfString(textTitle);
  const heightTitleText = doc.heightOfString(textTitle);

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
  const textUserAddress = `${infoPurchasesRecipes.address.lastName} ${infoPurchasesRecipes.address.firstName}\n${infoPurchasesRecipes.address.address}\n${infoPurchasesRecipes.address.postalCode} ${infoPurchasesRecipes.address.city}\n${infoPurchasesRecipes.address.country}`;
  doc.font(fontInitial).fontSize(fontSizeInitial);
  const heightUserAddressText = doc.heightOfString(textUserAddress);

  doc.text(textUserAddress, margin, heightUserAddress, {
    align: "left",
  });

  // INVOICE INFORMATION
  const formattedDateInformation = `${day}/${month}/${year}`;

  const heightInVoiceInformation =
    heightUserAddress + heightUserAddressText + margin;
  const textInvoiceInformation = `Facture n° : Fr-${invoiceNumber}\nDate d'émission : ${formattedDateInformation}\nFacture acquittée le ${formattedDateInformation}\nMode de paiement : Carte bancaire`;
  const heightInVoiceInformationText = doc.heightOfString(
    textInvoiceInformation
  );

  doc.text(textInvoiceInformation, margin, heightInVoiceInformation, {
    align: "left",
  });

  //   PURCHASING TABLE
  // Calculates the text width of the last three columns using the header text
  const purchasingTableHEADER_PRIX_HT = "Prix HT";
  const purchasingTableHEADER_TVA = "TVA (20%)";
  const purchasingTableHEADER_PRIX_TTC = "Prix TTC";

  const purchasingTableHEADER = [
    purchasingTableHEADER_PRIX_HT,
    purchasingTableHEADER_TVA,
    purchasingTableHEADER_PRIX_TTC,
  ];
  const widthTextLastThreeColumnsPurchasedTable = Math.max(
    ...purchasingTableHEADER.map((h) => doc.widthOfString(h))
  );

  const heightBowPurchasingTable = doc.heightOfString("Prix TTC");

  // Other sizes
  const marginTextPurchasingTable = 10;
  // Add an extra 5px because PDFKit remove internal padding
  const singleVerticalLinePurchasedTable =
    heightBowPurchasingTable + marginTextPurchasingTable + 5;

  // Margin Text
  const marginTextFirstColumnPurchasingTable =
    margin + marginTextPurchasingTable;

  const marginSecondColumnsPurchasedTable =
    pageWidth -
    margin -
    (widthTextLastThreeColumnsPurchasedTable + marginTextPurchasingTable * 2) *
      3;

  const marginTextSecondColumnPurchasingTable =
    marginSecondColumnsPurchasedTable + marginTextPurchasingTable;

  const marginTextThirdColumnPurchasingTable =
    marginTextSecondColumnPurchasingTable +
    widthTextLastThreeColumnsPurchasedTable +
    marginTextPurchasingTable * 2;

  const marginTextFourthColumnPurchasingTable =
    marginTextThirdColumnPurchasingTable +
    widthTextLastThreeColumnsPurchasedTable +
    marginTextPurchasingTable * 2;

  // Lines
  const horizontalLinePurchasedTable = (height) => {
    // 0.5 so that there is a corner
    doc
      .moveTo(margin - 0.5, height)
      .lineTo(pageWidth - margin + 0.5, height)
      .stroke();
  };

  const verticalLinesPurchasedTable = (firstHeight, secondHeight) => {
    // First Verrtical Line
    doc.moveTo(margin, firstHeight).lineTo(margin, secondHeight).stroke();

    // Second Vertical Line
    doc
      .moveTo(marginSecondColumnsPurchasedTable, firstHeight)
      .lineTo(marginSecondColumnsPurchasedTable, secondHeight)
      .stroke();

    // Last Three Vartical Line
    let width =
      marginSecondColumnsPurchasedTable +
      widthTextLastThreeColumnsPurchasedTable +
      marginTextPurchasingTable * 2;

    [...Array(3)].forEach(() => {
      doc.moveTo(width, firstHeight).lineTo(width, secondHeight).stroke();

      width =
        width +
        widthTextLastThreeColumnsPurchasedTable +
        marginTextPurchasingTable * 2;
    });
  };

  // Header
  const widthTextFirstColumnsPurchasedTable =
    marginSecondColumnsPurchasedTable - marginTextPurchasingTable * 2 - margin;

  const header = (heightInitial) => {
    horizontalLinePurchasedTable(heightInitial);

    verticalLinesPurchasedTable(
      heightInitial,
      heightInitial + singleVerticalLinePurchasedTable
    );

    const heightFirstRowPurchasedTable =
      heightInitial + marginTextPurchasingTable;

    doc.text(
      "Recette(s)",
      marginTextFirstColumnPurchasingTable,
      heightFirstRowPurchasedTable,
      {
        width: widthTextFirstColumnsPurchasedTable,
        align: "center",
      }
    );

    doc.text(
      purchasingTableHEADER_PRIX_HT,
      marginTextSecondColumnPurchasingTable,
      heightFirstRowPurchasedTable,
      {
        width: widthTextLastThreeColumnsPurchasedTable,
        align: "center",
      }
    );

    doc.text(
      purchasingTableHEADER_TVA,
      marginTextThirdColumnPurchasingTable,
      heightFirstRowPurchasedTable,
      {
        width: widthTextLastThreeColumnsPurchasedTable,
        align: "center",
      }
    );

    doc.text(
      purchasingTableHEADER_PRIX_TTC,
      marginTextFourthColumnPurchasingTable,
      heightFirstRowPurchasedTable,
      {
        width: widthTextLastThreeColumnsPurchasedTable,
        align: "center",
      }
    );
  };

  const heightFirstLinePurchasedTable =
    heightInVoiceInformation + heightInVoiceInformationText + margin;
  header(heightFirstLinePurchasedTable);

  // Recipes Rows
  const heightsecondVerticalLinePurchasedTable =
    heightFirstLinePurchasedTable + singleVerticalLinePurchasedTable;
  horizontalLinePurchasedTable(heightsecondVerticalLinePurchasedTable);

  let heightLineRecipesPurchasedTable = heightsecondVerticalLinePurchasedTable;
  let heightNextLineRecipesPurchasedTable = 0;

  // Remove 2px = heightOfString - fontSize
  const paddingVertical = marginTextPurchasingTable - 2;

  recipesName.forEach((fullName) => {
    const textHeightPurchasedTable = doc.heightOfString(fullName, {
      width: widthTextFirstColumnsPurchasedTable,
    });

    // The text baseline visually falls in the center of the cell  with a factor of 1.5
    const heightRecipeLinePurchasedTable =
      textHeightPurchasedTable + paddingVertical * 1.5;

    heightNextLineRecipesPurchasedTable =
      heightLineRecipesPurchasedTable + heightRecipeLinePurchasedTable;

    // Check if row exceeds the page
    if (heightNextLineRecipesPurchasedTable > bottomLimit) {
      doc.addPage();

      // Reset Header
      header(margin);

      // Reset height
      heightLineRecipesPurchasedTable =
        margin + singleVerticalLinePurchasedTable;
      heightNextLineRecipesPurchasedTable =
        heightLineRecipesPurchasedTable + heightRecipeLinePurchasedTable;

      horizontalLinePurchasedTable(heightLineRecipesPurchasedTable);

      verticalLinesPurchasedTable(
        heightLineRecipesPurchasedTable,
        heightNextLineRecipesPurchasedTable
      );
    }

    verticalLinesPurchasedTable(
      heightLineRecipesPurchasedTable,
      heightNextLineRecipesPurchasedTable
    );

    // Product text placement
    const heightTextLineRecipesPurchasedTable =
      heightLineRecipesPurchasedTable + paddingVertical;

    doc.text(
      fullName,
      marginTextFirstColumnPurchasingTable,
      heightTextLineRecipesPurchasedTable,
      {
        width: widthTextFirstColumnsPurchasedTable,
        align: "left",
      }
    );

    // Centered vertical alignment for the 3 price columns
    const alignMiddleTextLastThreeColumnsPurchasedTable =
      heightTextLineRecipesPurchasedTable +
      (heightRecipeLinePurchasedTable - heightBowPurchasingTable) / 2 -
      5;

    doc.text(
      "0.83€",
      marginTextSecondColumnPurchasingTable,
      alignMiddleTextLastThreeColumnsPurchasedTable,
      {
        width: widthTextLastThreeColumnsPurchasedTable,
        align: "right",
      }
    );

    doc.text(
      "0.17€",
      marginTextThirdColumnPurchasingTable,
      alignMiddleTextLastThreeColumnsPurchasedTable,
      {
        width: widthTextLastThreeColumnsPurchasedTable,
        align: "right",
      }
    );

    doc.text(
      "1.00€",
      marginTextFourthColumnPurchasingTable,
      alignMiddleTextLastThreeColumnsPurchasedTable,
      {
        width: widthTextLastThreeColumnsPurchasedTable,
        align: "right",
      }
    );

    // Horizontal line at the bottom of the cell
    horizontalLinePurchasedTable(heightNextLineRecipesPurchasedTable);

    // Update for the next line
    heightLineRecipesPurchasedTable = heightNextLineRecipesPurchasedTable;
  });

  //  Footer
  const heightLastLineRecipesPurchasedTable =
    heightNextLineRecipesPurchasedTable + singleVerticalLinePurchasedTable;
  const heightTextLastLineRecipesPurchasedTable =
    heightNextLineRecipesPurchasedTable + marginTextPurchasingTable;

  verticalLinesPurchasedTable(
    heightLineRecipesPurchasedTable,
    heightLastLineRecipesPurchasedTable
  );

  doc.text(
    "Total",
    marginTextFirstColumnPurchasingTable,
    heightTextLastLineRecipesPurchasedTable,
    {
      width: widthTextFirstColumnsPurchasedTable,
      align: "center",
    }
  );
  const priceHT = 0.83 * recipesName.length;
  doc.text(
    `${priceHT.toFixed(2)}€`,
    marginTextSecondColumnPurchasingTable,
    heightTextLastLineRecipesPurchasedTable,
    {
      width: widthTextLastThreeColumnsPurchasedTable,
      align: "right",
    }
  );

  const priceTVA = 0.17 * recipesName.length;
  doc.text(
    `${priceTVA.toFixed(2)}€`,
    marginTextThirdColumnPurchasingTable,
    heightTextLastLineRecipesPurchasedTable,
    {
      width: widthTextLastThreeColumnsPurchasedTable,
      align: "right",
    }
  );

  doc.text(
    `${recipesName.length}.00€`,
    marginTextFourthColumnPurchasingTable,
    heightTextLastLineRecipesPurchasedTable,
    {
      width: widthTextLastThreeColumnsPurchasedTable,
      align: "right",
    }
  );

  // Horizontal line at the bottom of the cell
  horizontalLinePurchasedTable(heightLastLineRecipesPurchasedTable);

  // MANDATORY LEGAL NOTICES
  const heightMandatoryLegalnotices =
    heightLastLineRecipesPurchasedTable + marginTextPurchasingTable;

  doc.text(
    "Taux des pénalités de retard : 3 fois le taux d’intérêt légal.\nIndemnité forfaitaire pour frais de recouvrement : 40 €.",
    margin,
    heightMandatoryLegalnotices
  );

  // FOOTER
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);

    // Add count number
    doc
      .fontSize(10)
      .fillColor("#666666")
      .text(`Page ${i + 1} sur ${range.count}`, 50, heightPageFooter, {
        align: "center",
        width: pageWidth - 100,
        height: heightCountFooter,
      });

    // Legal obligation to retain
    doc
      .fontSize(8)
      .text(
        "Document généré automatiquement – à conserver pendant 10 ans (art. L123-22 du Code de commerce).",
        50,
        heightPageFooter + heightCountFooter + marginFooter,
        {
          align: "center",
          width: pageWidth - 100,
          height: heightTextFooter,
        }
      );
  }

  doc.end();

  // To views pdf
  // stream.on("finish", async () => {
  //   await open(filePath);
  //   res.send("PDF généré et ouvert !");
  // });
}

module.exports = { generateInvoice };
