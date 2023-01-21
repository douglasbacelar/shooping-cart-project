const resultAdress = document.getElementsByClassName('cart__address')[0];
const inputNumberCep = document.getElementsByClassName('cep-input')[0];

const messageErrorCep = () => {
  resultAdress.innerHTML = 'CEP não encontrado';
};

export const getAddress = async (cep) => {
  const URL_1 = `https://cep.awesomeapi.com.br/json/${cep}`;
  const URL_2 = `https://brasilapi.com.br/api/cep/v2/${cep}`;
  Promise.any([
    await fetch(URL_1),
    await fetch(URL_2),
  ]).then(async (response) => {
    const adressResul = await response.json();
    console.log(adressResul);
    if (adressResul.street) {
      resultAdress
        .innerHTML = `${adressResul.street} - ${adressResul.neighborhood} - ${adressResul
          .city} - ${adressResul.state}`;
    } else if (adressResul.address) {
      resultAdress
        .innerHTML = `${adressResul.address} - ${adressResul.district} - ${adressResul
          .city} - ${adressResul.state}`;
    } else {
      messageErrorCep();
    }
  }).catch(() => messageErrorCep());
};

export const searchCep = () => {
  getAddress(inputNumberCep.value);
};
