export const fetchHello = async () => {
  const response = await fetch("http://localhost:8000/api/hello/");
  const data = await response.json();
  return data;
};
