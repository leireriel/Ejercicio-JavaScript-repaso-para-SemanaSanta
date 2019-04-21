'use strict';

const list = document.querySelector('.news');
const palettes = document.querySelector('.palettes');
const urlPalette1 = 'https://raw.githubusercontent.com/Adalab/Easley-ejercicios-de-fin-de-semana/master/data/palette.json';
const data = [
  {
    title: 'Asteroids 101',
    image: 'https://via.placeholder.com/200x100'
  },
  {
    title: 'Life on Mars',
    image: 'https://via.placeholder.com/200x100'
  },
  {
    title: 'Martians invade Earth',
    image: 'https://via.placeholder.com/200x100'
  },
  {
    title: 'Humans aren\'t real',
    image: 'https://via.placeholder.com/200x100'
  },
  {
    title: 'Space The Final Frontier',
    image: 'https://via.placeholder.com/200x100'
  }
];

const getListFromAPI = () => {
  fetch('https://raw.githubusercontent.com/Adalab/Easley-ejercicios-de-fin-de-semana/master/data/news.json')
    .then(response => response.json())
    .then(data => {
      const resultArr = createNewsInDOM(data.news);
      martianClassAddition(resultArr);

      //4. Add class 'news__item--no-image-visible' to all li elements and toggle functionality
      addHideClass(resultArr);

      for (let item of resultArr) {
        item.addEventListener('click', hideImage);
      }

      //5. Add first palette (to get from API)
      fetchPaletteFromAPI(urlPalette1);
    });
}

const createNewsInDOM = arrayOfObjects => {
  const arrOfNews = [];
  for (let item of arrayOfObjects) {
    //CONTAINERS AND CLASSES
    const liItem = document.createElement('li');
    liItem.classList.add('news__item');
    const titleElement = document.createElement('h2');
    titleElement.classList.add('news__title');
    const imgElement = document.createElement('img');
    imgElement.classList.add('news__image');

    //CONTENT
    const titleContent = document.createTextNode(item.title);
    imgElement.src = item.image;
    imgElement.alt = `Image of ${item.title}`;

    //APPENCHILD
    list.appendChild(liItem);
    liItem.appendChild(titleElement);
    titleElement.appendChild(titleContent);
    liItem.appendChild(imgElement);

    //Look for li elements that contains class 'news__item' and save in array
    arrOfNews.push(liItem);
  }
  return arrOfNews;
}

const martianClassAddition = arrayOfEls => {
  for (let i = 0; i < arrayOfEls.length; i++) {
    let resultTitles = arrayOfEls[i].firstChild.innerHTML;

    if (resultTitles.includes('Mars')) {
      arrayOfEls[i].classList.add('news__item--from-mars');
    } else if (resultTitles.includes('Martian')) {
      arrayOfEls[i].classList.add('news__item--from-mars');
    }
  }
}

const addHideClass = arrayOfEls => {
  for (let i = 0; i < arrayOfEls.length; i++) {
    arrayOfEls[i].classList.add('news__item--no-image-visible');
  }
}

const hideImage = event => {
  event.currentTarget.classList.toggle('news__item--no-image-visible');
}

const fetchPaletteFromAPI = (url) => {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    const arrObjs = data.palettes;
    for (let i = 0; i < arrObjs.length; i++) {
      //DIV CONTAINER OF PALETTE
      const divContainer = document.createElement('div');
      divContainer.classList.add('palette');

      //NAME OF PALETTE
      //---Container
      let namePalette = arrObjs[i].name;
      const nameItem = document.createElement('h3');
      nameItem.classList.add('name__palette');
      //---Content
      const nameContent = document.createTextNode(namePalette);
      //---Appenchild
      nameItem.appendChild(nameContent);

      //DIV CONTAINER OF COLORS
      const colorsDiv = document.createElement('div');
      colorsDiv.classList.add('color__palette');

      //COLORS OF PALETTE
      let colorsPalette = arrObjs[i].colors;
      for (let color of colorsPalette) {
        //---Container
        const colorItem = document.createElement('div');
        colorItem.classList.add('color__item');
        colorItem.style = `background-color:#${color}`;
        //---Appenchild
        colorsDiv.appendChild(colorItem);
      }

      //APPENCHILD
      palettes.appendChild(divContainer);
      divContainer.appendChild(nameItem);
      divContainer.appendChild(colorsDiv);
    }
  });
}

//3. Get list of news from API
getListFromAPI();

//1. Create DOM
// const resultArr = createNewsInDOM(data);

//2. Look for word "mars" or "martian" in titles and put new class 'news__item--from-mars' on parents of titles (li elements)
// martianClassAddition(resultArr);

