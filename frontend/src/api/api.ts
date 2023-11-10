export const populateDatabase = async () => {
  const baseUrl = new URL("http://localhost:5000/api/property");
  const requestOptions = {
    method: "POST",
  };

  try {
    const response = await fetch(baseUrl.toString(), requestOptions);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while populating the database:", error);
    throw error;
  }
};

export const fetchProperties = async (page: number) => {
  const baseUrl = new URL(`http://localhost:5000/api/property?page=${page}`);

  try {
    const response = await fetch(baseUrl.toString());

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while fetching properties:", error);
    throw error;
  }
};
