import { saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const getSection = document.querySelector('.products');
const catchSection = document.querySelector('.container');

// Função que cria o texto "Carregando" enquanto a promise está gerando a requisição
const createLoading = () => {
  const createHeader = document.createElement('header');
  createHeader.className = 'loading';
  createHeader.innerText = 'carregando...';
  catchSection.appendChild(createHeader);
  return createHeader;
};

// Função que exlcui o texto carregando, quando a promise está realizada ou que cria uma mensagem de erro
const deleteLoading = () => {
  const catchLoading = document.querySelector('.loading');
  const removeSection = catchSection.removeChild(catchLoading);
  return removeSection;
};

// Função que cria uma mensagem de erro
const getError = () => {
  const catchLoading = document.querySelector('.loading');
  catchLoading.className = 'error';
  catchLoading.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
};

const getProducts = async () => {
  try {
    createLoading();
    const product = await fetchProductsList('computador');
    product.forEach((element) => {
      const data = createProductElement(element);
      getSection.appendChild(data);
    });
  } catch (error) {
    getError();
  }
  deleteLoading();
};
getProducts();

const getproductHtml = document.querySelector('.products');
getproductHtml.addEventListener('click', async (event) => {
  if (event.target.className === 'product__add') {
    const parentNodeTarget = event.target.parentNode;
    const getId = parentNodeTarget.firstElementChild;
    const textId = getId.innerText;
    saveCartID(textId);

    const selectProducts = await fetchProduct(textId);
    const shopCar = document.querySelector('.cart__products');
    shopCar.appendChild(createCartProductElement(selectProducts));
  }
});
