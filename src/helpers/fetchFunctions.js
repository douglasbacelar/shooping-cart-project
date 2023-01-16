export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (element) => {
  if (!element) throw new Error('Termo de busca não informado');
  try {
    const API = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${element}`);
    const data = await API.json();
    return data.results;
  } catch (error) {
    return error.message;
  }
};
