export const fetchProperties = async (page: number) => {
  const baseUrl = new URL("http://localhost:5000/api/property");
  baseUrl.searchParams.append("page", page.toString());
  const response = await fetch(baseUrl.toString());
  const data = await response.json();
  return data;
};
