const shoes = [
  {
    id: 1,
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 12999,
    images: "./src/images/beis/image.jpg",
  },
  {
    id: 2,
    title: "Мужские Кроссовки Nike Air Max 270",
    price: 11999,
    images: "./src/images/beis/image(1).jpg",
  },
  {
    id: 3,
    title: "Мужские Кроссовки Nike Blazer Mid Suede",
    price: 8499,
    images: "./src/images/beis/image(2).jpg",
  },
  {
    id: 4,
    title: "Кроссовки Puma X Aka Boku Future Rider",
    price: 9499,
    images: "./src/images/beis/image(3).jpg",
  },
  {
    id: 5,
    title: "Мужские Кроссовки Under Armour Curry 8",
    price: 15199,
    images: "./src/images/beis/image(4).jpg",
  },
  {
    id: 6,
    title: "Мужские Кроссовки Nike Kyrie 7",
    price: 11200,
    images: "./src/images/beis/image(5).jpg",
  },
  {
    id: 7,
    title: "Мужские Кроссовки Jordan Air Jordan 11",
    price: 10999,
    images: "./src/images/beis/image(6).jpg",
  },
  {
    id: 8,
    title: "Мужские Кроссовки Nike LeBron XVIII",
    price: 16499,
    images: "./src/images/beis/image(7).jpg",
  },
  {
    id: 9,
    title: "Мужские Кроссовки Nike Lebron XVIII Low",
    price: 13999,
    images: "./src/images/beis/image(8).jpg",
  },
  {
    id: 10,
    title: "Мужские Кроссовки Nike Kyrie Flytrap IV",
    price: 11299,
    images: "./src/images/beis/image(9).jpg",
  },
];

window.addEventListener("load", () => {
  let wrapper = document.querySelector(".info__wrapper");
  let infoInput = document.querySelector(".info__input");
  let corZina = document.querySelector(".header__corzina");
  let overLay = document.querySelector(".overlay");
  let overX = document.querySelector(".overlay__x");
  let overlayRow = document.querySelector(".overlay__header");
  let headerSup = document.querySelector(".header__sups");
  let headerSumma = document.querySelector(".header__summa");
  let overFuuter = document.querySelector(".overlay__futter");
  let overSup = document.querySelector(".overlay__summ");
  let overSups = document.querySelector(".overlay__sups");
  let carts = [];

  const addShoes = (shoesArray) => {
    wrapper.innerHTML = "";
    (shoesArray || shoes).forEach((item) => {
      wrapper.innerHTML += `
      <div class="info__row">
        <img class="info__img" src="${item.images}" alt="${item.title}">
        <div class="info__subtitle">${item.title}</div>
        <div class="info__subrow">
          <div>
            <p class="info__text"> Цена: </p>
            <h3 class="info__price">${item.price} руб</h3>
          </div>
          <button class="info__btn" type="button" data-id="${item.id}" data-img="${item.images}" data-title="${item.title}" data-price="${item.price}">+</button>
        </div>
      </div>
    `;
    });
  };

  infoInput.addEventListener("input", (e) => {
    const filteredShoes = shoes.filter((item) => {
      return item.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    addShoes(filteredShoes);
  });
  addShoes();

  const scrollControll = {
    pleuScroll() {
      document.body.style.cssText = `
      overflow: hidden; `;
    },
    entScroll() {
      document.body.style.cssText = "";
    },
  };
  
    const cartAppend = () => {
    headerSumma.textContent = carts.length
    headerSup.textContent = `${carts.reduce((acc, rec) => acc + +rec.price, 0)}`
    overSup.textContent = `${carts.reduce((acc, rec) => acc + +rec.price, 0)}`
    overSups.textContent = `${Math.ceil(carts.reduce((acc, rec) => acc + +rec.price, 0) / 100 * 5)}`
    if (carts.length) {
      carts.forEach((item) => {
        overlayRow.innerHTML += `
        <div class="overlay__row">
         <img class="overlay__img" src="${item.images}" alt="">
           <div class="overlay__info">
            <h4 class="overlay__subtitle">${item.title}</h4>
            <h5 class="overlay__ptice">${item.price}</h5>
           </div>
        <button data-id="${item.id}" class="overlay__delit">+</button>
      </div>
        `
        let overDel = document.querySelectorAll('.overlay__delit')
          overDel.forEach((btn) => {
            btn.addEventListener('click', () => {
              carts = carts.filter((el) => el.id != btn.dataset.id)
              document.querySelectorAll('.info__btn').forEach((activ) => {
                if (btn.dataset.id === activ.dataset.id) {
                  activ.style.background = 'none'
                }
              })
            })
          })
      })
      overFuuter.style.display = 'block'
    } else {
       overlayRow.innerHTML = `
       <div class="overlay__corsin"> 
        <img class="overlay__cors" src="./src/images/footer/cortin.png" alt="img">
        <h4 class="overlay__pust">Корзина пустая</h4>
        <p class="overlay__dob">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
       </div> 
      `
      overFuuter.style.display = 'none'
    }

  }

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('info__btn')){
        let idx = carts.findIndex((item) => item.id == e.target.dataset.id)
          if (idx > -1) {
            carts = carts.filter((item) => item.id != +e.target.dataset.id)
            e.target.style.background = 'white'
        } else {
          carts = [...carts, {
             id:     e.target.dataset.id,
             title:  e.target.dataset.title,
             price:  e.target.dataset.price,
             images: e.target.dataset.img
          }]
            e.target.style.background = '#5e8b16'
        }
      }
      overlayRow.innerHTML = ''
      cartAppend()
      headerSup.textContent = `${carts.reduce((acc, rec) => acc + +rec.price, 0)}`
      overSup.textContent = `${carts.reduce((acc, rec) => acc + +rec.price, 0)}`
      overSups.textContent = `${Math.ceil(carts.reduce((acc, rec) => acc + +rec.price, 0) / 100 * 5)}`
    })

    corZina.addEventListener('click', () => {
      overLay.style.display = 'block'
      scrollControll.pleuScroll();
    })
  
    overLay.addEventListener('click', (e) => {
      if (e.target === overLay) {
        overLay.style.display = 'none'
        scrollControll.entScroll();
      }
    })

    overX.addEventListener('click', () => {
      overLay.style.display = 'none'
      scrollControll.entScroll();
    })
    
    cartAppend()
  })

