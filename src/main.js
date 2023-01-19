import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const getSection = document.querySelector('.products');
const catchSection = document.querySelector('.container');
const shopCar = document.querySelector('.cart__products');

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

// Recuperando do localStorage
const productsLocalStorage = () => getSavedCartIDs();

// soma os valores do carrinho
const totalPrice = () => {
  const totalPriceCart = document.querySelector('.total-price');
  const products = productsLocalStorage();
  let total = 0;

  products.forEach(({ price }) => {
    total += parseFloat(price);
  });

  totalPriceCart.innerText = total.toFixed(2);
};

// subtrai os valores do carrinho
const ul = document.querySelector('.cart__products');
ul.addEventListener('click', totalPrice);

// adicionando no carrinho
const getproductHtml = document.querySelector('.products');
getproductHtml.addEventListener('click', async (event) => {
  if (event.target.className === 'product__add') {
    const parentNodeTarget = event.target.parentNode;
    const getId = parentNodeTarget.firstElementChild;
    const textId = getId.innerText;

    const selectProducts = await fetchProduct(textId);
    saveCartID(selectProducts);

    shopCar.appendChild(createCartProductElement(selectProducts));
    totalPrice();
  }
});

// Alimenta o carrinho com os produtos do localStorage
const captureLocalStorage = () => {
  const products = productsLocalStorage();

  if (!products) return false;

  products.forEach((product) => {
    shopCar.appendChild(createCartProductElement(product));
  });

  totalPrice();
};

// Iniciando a aplicação
window.onload = async () => {
  captureLocalStorage();
  await getProducts();
};
