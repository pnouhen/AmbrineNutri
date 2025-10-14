export async function fetchDataGet(url, name) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.data}`);
    }

    const data = await response.json();

    sessionStorage.setItem(name, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Error lors du fetch:", error);
    throw error;
  }
}
