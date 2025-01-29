const API_URL_BASE = "https://server-clce.onrender.com/api";

const fetchApi = async (endpoint, method, body = null) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${API_URL_BASE}/${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la solicitud");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(`Error en la solicitud a ${endpoint}:`, error);
    return { success: false, error: error.message };
  }
};

export const createPurchase = async (purchaseData) => {
  return fetchApi("shopping", "POST", purchaseData);
};

export const deletePurchase = async (purchaseId) => {
  console.log(purchaseId);
  return fetchApi(`shopping/${purchaseId}`, "DELETE");
};

export const getAllPurchases = async () => {
  return fetchApi("shopping", "GET");
};

