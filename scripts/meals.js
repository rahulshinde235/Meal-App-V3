const getMeal = async (inputMeal) => {
  const base = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const query = `${inputMeal}`;
  console.log(base + query);
  const response = await fetch(base + query);
  const data = await response.json();
  return data;
};
