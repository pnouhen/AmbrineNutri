import React from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    backgroundColor: "#fff",
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },

  header: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  logo: { width: 53, height: 100 },
  h1: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },

  subH1: {
    fontSize: 14,
  },

  h2: {
    marginBottom: 20,
    fontSize: 16,
    width: "100%",
    textAlign: "center",
    fontWeight: "Bold",
  },

  h3: {
    fontSize: 14,
    width: "100%",
    fontWeight: "Bold",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },

  cardRecipe: {
    width: 200,
    height: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  userBadgeInfo: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#30672e",
    color: "#d6d6d6",
    fontWeight: "SemiBold",
  },

  duration: {
    width: 130,
    borderBottomRightRadius: 6,
  },

  imgFeatures: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  vegetarienContainer: {
    width: "100%",
    display: "flex",
    marginLeft: 115,
  },

  vegetarien: {
    width: 85,
    borderTopLeftRadius: 6,
  },

  features: {
    width: 200,
    height: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    backgroundColor: "#30672e",
    color: "#d6d6d6",
  },

  featuresContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  steps: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});

export default function GenerateRecipePdf({ recipeDetails, indexPeople }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            src="/assets/logo/logo-facture.jpg"
            alt="Logo de Ambrine Nutri"
            style={styles.logo}
          />
          <View>
            <Text style={styles.h1}>Ambrine Nutri</Text>

            <Text style={styles.subH1}>
              A l'écoute pour des conseils de qualité et personnalisés
            </Text>
          </View>
        </View>

        {/* Recipe */}
        <View>
          <Text style={styles.h2}>{recipeDetails.title}</Text>
          <View style={styles.container}>
            <View>
              {/* Card */}
              <View style={styles.cardRecipe}>
                <Image
                  src={`data:image/jpeg;base64,${recipeDetails.imageBase64}`}
                  style={styles.imgFeatures}
                />

                <Text style={[styles.userBadgeInfo, styles.duration]}>
                  {recipeDetails.duration}
                </Text>

                {recipeDetails.vegetarian === "Oui" && (
                  <View style={styles.vegetarienContainer}>
                    <Text style={[styles.userBadgeInfo, styles.vegetarien]}>
                      Végétarien
                    </Text>
                  </View>
                )}
              </View>

              {/* Number People */}
              <View style={styles.features}>
                <Text style={styles.h3}>
                  Pour : {indexPeople}
                  {indexPeople === 1 ? " personne" : " personnes"}
                </Text>

                {/* Ustensils */}
                <View style={styles.featuresContainer}>
                  <Text style={styles.h3}>Les ustensils :</Text>
                  {recipeDetails?.ustensils.map((ustensil, index) => (
                    <Text key={index}>{ustensil}</Text>
                  ))}
                </View>

                {/* Steps */}
                <View style={styles.featuresContainer}>
                  <Text style={styles.h3}>Les ingrédients :</Text>
                  {recipeDetails?.ingredients.map((ingredient, index) => (
                    <Text key={index} className="text text-white-200">
                      {Number(ingredient.quantity) * indexPeople}
                      {/* Dosage arrangement according to it's type */}
                      {ingredient.dosage?.length <= 2 ? "" : " "}
                      {ingredient.dosage} {ingredient.name}
                    </Text>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.featuresContainer}>
              <Text style={styles.h3}>Les étapes</Text>

              <View style={styles.steps}>
                {recipeDetails.steps.map((step, index) => (
                  <Text key={index} className="text">
                    {index + 1}. {step}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
