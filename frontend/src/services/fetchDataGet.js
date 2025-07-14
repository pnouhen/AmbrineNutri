export async function fetchDataGet(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.data}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error lors du fetch:", error);
    throw error;
  }
}