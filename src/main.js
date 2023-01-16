import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const getSection = document.querySelector('.products');
const getSection2 = document.querySelector('.container');
const deleteP = document.querySelector('.loading');

const createLoading = () => {
  const createP = document.createElement('p');
  createP.className = 'loading';
  createP.innerText = 'carregando...';
  getSection2.appendChild(createP);
  return createP;
};

const deleteLoading = () => {
  getSection2.removeChild(deleteP);
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
