export const fetchProduct = async (element) => {
  if (!element) throw new Error('ID não informado');
  const API = await fetch(`https://api.mercadolibre.com/items/${element}`);
  const data = await API.json();
  return data;
};

export const fetchProductsList = async (element) => {
  if (!element) throw new Error('Termo de busca não informado');
  const API = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${element}`);
  const data = await API.json();
  return data.results;
};
