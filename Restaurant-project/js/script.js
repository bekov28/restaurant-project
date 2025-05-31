window.addEventListener("DOMContentLoaded", () => {
  //Tabs

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContents = document.querySelectorAll(".tab_content"),
    tabParents = document.querySelector(".tabheader__items");

  function hideTabContents() {
    tabContents.forEach((tabContent) => {
      tabContent.classList.add("hide");
      tabContent.classList.remove("show");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(index = 0) {
    tabContents[index].classList.add("show", "fade");
    tabContents[index].classList.remove("hide");
    tabs[index].classList.add("tabheader__item_active");
  }

  hideTabContents();
  showTabContent();

  tabParents.addEventListener("click", (event) => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((tab, index) => {
        if (target === tab) {
          hideTabContents();
          showTabContent(index);
        }
      });
    }
  });

  //Loader

  const loadedWrapper = document.querySelector(".loader-wrapper");

  setTimeout(() => {
    loadedWrapper.style.display = "none";
  }, 500);

  //Timer
  const deadline = "2025-12-31";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const time = Date.parse(endtime) - Date.parse(new Date()); //Converts the deadline string (e.g., '2025-12-31') to a timestamp (milliseconds since Jan 1, 1970).

    if (time <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds;
    } else {
      (days = Math.floor(time / (1000 * 60 * 60 * 24))),
        (hours = Math.floor((time / (1000 * 60 * 60)) % 24)),
        (minutes = Math.floor((time / (1000 * 60)) % 60)),
        (seconds = Math.floor((time / 1000) % 60));
    }

    return {
      totalTime: time,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function formatNumber(number) {
    if (number >= 0 && number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const time = getTimeRemaining(endtime);

      days.innerHTML = formatNumber(time.days);
      hours.innerHTML = formatNumber(time.hours);
      minutes.innerHTML = formatNumber(time.minutes);
      seconds.innerHTML = formatNumber(time.seconds);

      if (time.totalTime <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  //Modal
  const modalOpenBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-modal-close"),
    modalDialog = document.querySelector(".modal__dialog");

  function openModal() {
    modal.classList.add("show", "fade");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalOpenBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    console.log(event.target);
    if (event.target === modal || event.target === modalDialog) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    } else if (event.code === "Enter") {
      alert("Please fill in the modal");
    }
  });

  const modalTimerId = setTimeout(openModal, 6000);

  //Class
  class OfferMenu {
    constructor(src, alt, title, desc, discount, sale, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.desc = desc;
      this.discount = discount;
      this.sale = sale;
      this.parent = document.querySelector(parentSelector);
      this.formatToUSD();
    }

    formatToUSD() {
      this.discount = this.discount.toLocaleString("en-US", { style: "currency", currency: "USD" });
      this.sale = this.sale.toLocaleString("en-US", { style: "currency", currency: "USD" });
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
              <img src="${this.src}" alt="${this.alt}" />
              <div>
                <h3>${this.title}</h3>
                <p>${this.desc}</p>
                <p><del>${this.discount}</del><span class="primary-text">${this.sale}</span></p>
              </div>
      `;
      this.parent.append(element);
    }
  }

  const offers = [
    {
      src: "./img/offer1.png",
      alt: "Quattro Pasta",
      title: "Quattro Pasta",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
      discount: 55,
      sale: 20,
    },
    {
      src: "./img/offer2.png",
      alt: "Quattro Pasta",
      title: "Quattro Pasta",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
      discount: 65,
      sale: 25,
    },
    {
      src: "./img/offer3.png",
      alt: "Quattro Pasta",
      title: "Quattro Pasta",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam.",
      discount: 25,
      sale: 15,
    },
  ];

  offers.forEach((offer) => {
    const { src, alt, title, desc, discount, sale } = offer;
    new OfferMenu(src, alt, title, desc, discount, sale, ".offers-items").render();
  });

  //FORM
  const form = document.querySelector("form"),
    telegramBot = "8194994575:AAE3EVWjjbJcyYgolIZVa3FFFP78_cgaKaU",
    chatId = "130556670";

  const message = {
    loading: "Loading...",
    success: "Thank you for contacting us!",
    failure: "Something went wrong",
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const statusMessage = document.createElement("div");
    statusMessage.textContent = message.loading;
    form.append(statusMessage);

    const formData = new FormData(form);

    const object = {};

    formData.forEach((value, key) => {
      object[key] = value;
    });

    fetch(`https://api.telegram.org/bot${telegramBot}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Name: ${object.name}, Phone: ${object.phone}`,
      }),
    })
      .then(() => (statusMessage.textContent = message.success))
      .catch(() => (statusMessage.textContent = message.failure))
      .finally(() => {
        setTimeout(() => {
          statusMessage.remove();
          form.reset();
          closeModal();
        }, 2000);
      });
  });
});
