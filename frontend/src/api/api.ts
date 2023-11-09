export const populateDatabase = async () => {
  const baseUrl = new URL("http://localhost:5000/api/users");
  const requestOptions = {
    method: "POST",
  };
  const response = await fetch(baseUrl.toString(), requestOptions);
  const data = await response.json();
  return data;
};

export const fetchProperties = async (page: number) => {
  const baseUrl = new URL(`http://localhost:5000/api/users?page=${page}`);
  const response = await fetch(baseUrl.toString());
  const data = await response.json();
  return data;
};
