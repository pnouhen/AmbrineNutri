import React from "react";
import {
  Page,
  Text,
  Image,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { width: 53, height: 100 },
  section: {
    marginBottom: 15,
  },
  sellerInfo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 20,
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
  },
  footer: {
    marginTop: 40,
    padding: 10,
    fontSize: 8,
    textAlign: "center",
    color: "grey",
  },
});

// Composant
export default function GenerateFacture({ coordDefault, recipesPanier }) {
  const today = new Date();
  const formatted = today.toLocaleDateString("fr-FR");

  const dataFacture = {
    name: `${coordDefault?.lastName} ${coordDefault?.firstName}`,
    address: coordDefault?.address,
    PCCity: `${coordDefault?.postalCode} ${coordDefault?.city}`,
    country: coordDefault?.country,
    date: formatted,
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            src="/assets/logo/logo-facture.jpg"
            alt="Logo de Laura Diététique"
            style={styles.logo}
          />
          <View>
            <Text>Laura Diet</Text>
            <Text>21 Rue Védrines</Text>
            <Text>87100 Limoges</Text>
            <Text>06.75.66.96.04</Text>
            <Text>RCS : RCS Limoges 512 345 678</Text>
            <Text>SIREN : 512 345 678</Text>
            <Text>SIRET : 512 345 678 00021</Text>
            <Text>TVA intracommunautaire : FR12 512345678</Text>
          </View>
        </View>

        {/* TITRE */}
        <Text style={styles.title}>FACTURE</Text>

        {/* INFO CLIENT */}
        <View style={styles.section}>
          <Text>{dataFacture.name}</Text>
          <Text>{dataFacture.address}</Text>
          <Text>{dataFacture.PCCity}</Text>
          <Text>{dataFacture.country}</Text>
        </View>

        {/* INFO FACTURE */}
        <View style={styles.section}>
          <Text>Facture n° : Fr-{Date.now()}</Text>
          <Text>Date d'émission : {dataFacture.date}</Text>
          <Text>Facture acquittée le {dataFacture.date}</Text>
          <Text>Mode de Payment : Carte bancaire</Text>
        </View>

        {/* TABLEAU PRODUITS */}
        <View style={styles.table}>
          {/* En-tête */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Produit</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Prix HT</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>TVA (20%)</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Prix TTC</Text>
            </View>
          </View>

          {/* Lignes produits */}
          {recipesPanier?.map((recipe) => (
            <View key={recipe.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{recipe.title}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>0.83€</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>0.17€</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>1.00€</Text>
              </View>
            </View>
          ))}

          {/* Totaux */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {Number.parseFloat(recipesPanier.length * 0.83).toFixed(2)}€
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {Number.parseFloat(recipesPanier.length * 0.17).toFixed(2)}€
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{recipesPanier.length}€</Text>
            </View>
          </View>
        </View>

        {/* CONDITIONS LEGALES */}
        <View style={styles.section}>
          <Text>
            Taux des pénalités de retard : 3 fois le taux d’intérêt légal.
          </Text>
          <Text>
            Indemnité forfaitaire pour frais de recouvrement : 40 €.
          </Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text>
            Document généré automatiquement – à conserver pendant 10 ans 
            (art. L123-22 du Code de commerce).
          </Text>
        </View>
      </Page>
    </Document>
  );
}
