import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const getSection = document.querySelector('.products');
const catchSection = document.querySelector('.container');

// Função que cria o texto "Carregando" enquanto a promise está gerando a requisição
const createLoading = () => {
  const createSection = document.createElement('section');
  createSection.className = 'loading';
  createSection.innerText = 'carregando...';
  catchSection.appendChild(createSection);
  return createSection;
};

// Função que exlcui o texto carregando, quando a promise está realizada
const deleteLoading = () => {
  const catchLoading = document.querySelector('.loading');
  const removeSection = catchSection.removeChild(catchLoading);
  return removeSection;
};

window.onload = () => {
  const getProducts = async () => {
    createLoading();
    const product = await fetchProductsList('computador');
    product.forEach((element) => {
      const data = createProductElement(element);
      getSection.appendChild(data);
    });
    deleteLoading();
  };
  getProducts();
};
