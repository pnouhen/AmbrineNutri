export async function fetchDataGetUser(url) {
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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Erreur HTTP : ${errorData.message || response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors du fetch:", error);
    throw error;
  }
}