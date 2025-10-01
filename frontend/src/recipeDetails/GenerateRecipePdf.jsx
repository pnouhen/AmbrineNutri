import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFViewer,
  View,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    display:"flex",
    flexDirection: "column",
    gap: 20,
    backgroundColor: "#fff",
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  logo: { width: 53, height: 100 },
  h1: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "black"
  },
  subH1: {
    fontSize: 14,
  }
});

function RecipePdf({ recipeDetails }) {
    console.log(recipeDetails)
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
            <Text style={styles.h1}>Laura diététique</Text>
            <Text style={styles.subH1}>A l'écoute pour des conseils de qualité et personnalisés</Text>
          </View>
        </View>

        {/* Recipe */}
        <View>
            <Text>{recipeDetails.title}</Text>
            <View>
                <View>
                    <View>
                        <Text>{recipeDetails.duration}</Text>
                        {recipeDetails.vegetarian === "Oui" ? (
        <View>Végétarien</View>
      ) : (
        ""
      )}
      <Image
        src={recipeDetails.img}
        alt={`Image de ${recipeDetails.title}`}
        loading="eager"
      />

      <View>
        {recipeDetails.title}
      </View>
                    </View>
                </View>
            </View>
        </View>
      </Page>
    </Document>
  );
}

export default function GenerateRecipePdf({ recipeDetails }) {
  if (!recipeDetails?.steps) return null;

  return (
    <PDFViewer width="100%" height="600">
      <RecipePdf recipeDetails={recipeDetails} />
    </PDFViewer>
  );
}
