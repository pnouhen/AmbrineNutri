export async function fetchDataUserGet(url) {
  try {
    const token = sessionStorage.getItem("token");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

     if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("token");
        window.location.href = "/se-connecter"; // redirection vers la page de connexion
        return;
      }
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du fetch:", error);
    throw error;
  }
}
