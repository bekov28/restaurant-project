"use strict";
import loader from "./modules/loader";
import tabs from "./modules/tabs";
import timer from "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
  tabs(".tabheader__item", ".tab_content", ".tabheader__items");
  loader(".loader-wrapper");
  timer();

  // Modal

  const modalOpenBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalContent = document.querySelector(".modal__content");

  function openModal() {
    modalContent.classList.add("modal_fade");
    modal.classList.add("show");
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

  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.getAttribute("data-modal-close") === "") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  // Class

  class OfferMenu {
    constructor(src, alt, title, descr, discount, sale, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.discount = discount;
      this.sale = sale;
      this.parent = document.querySelector(parentSelector);
      this.formatToUSD();
    }

    formatToUSD() {
      this.discount = this.discount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      this.sale = this.sale.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
				<img src="${this.src}" alt="${this.alt}">
				<div>
					<h3>${this.title}</h3>
					<p>${this.descr}</p>
					<p><del>${this.discount}</del> <span class="primary-text">${this.sale}</span></p>
				</div>
			`;

      this.parent.append(element);
    }
  }

  fetch("http://localhost:3000/offers", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((offer) => {
        const { src, alt, descr, discount, sale, title } = offer;
        new OfferMenu(src, alt, title, descr, discount, sale, ".offers-items").render();
      });
    });

  // FORM

  const form = document.querySelector("form");
  //telegramTokenBot = "6582188202:AAHHGOGsOMqUs3ELHhK35it1ykoWYwIo4co",
  //chatId = "5796596917";

  const message = {
    loading: "Loading...",
    success: "Thanks for contacting with us",
    failure: "Something went wrong",
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.style.width = "20px";
    loader.style.height = "20px";
    loader.style.marginTop = "20px";
    form.append(loader);

    const formData = new FormData(form);

    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Name: ${object.name}. Phone: ${object.phone}`,
      }),
    })
      .then(() => {
        showStatusMessage(message.success);
        form.reset();
      })
      .catch(() => showStatusMessage(message.failure))
      .finally(() => loader.remove());
  });

  function showStatusMessage(message) {
    const modalDialog = document.querySelector(".modal__dialog");

    modalDialog.classList.add("hide");
    openModal();

    const statusModal = document.createElement("div");
    statusModal.classList.add("modal__dialog");
    statusModal.innerHTML = `
			<div class="modal__content">
				<div data-modal-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

    document.querySelector(".modal").append(statusModal);

    setTimeout(() => {
      statusModal.remove();
      modalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  // SLIDER

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesInner = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;

  let slideIndex = 1,
    offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesInner.style.width = 100 * slides.length + "%";
  slidesInner.style.display = "flex";
  slidesInner.style.transition = "all .5s ease";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  next.addEventListener("click", () => {
    if (offset === +width.replace(/\D/g, "") * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.replace(/\D/g, "");
    }
    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  prev.addEventListener("click", () => {
    if (offset === 0) {
      //width = 900px
      offset = +width.replace(/\D/g, "") * (slides.length - 1);
    } else {
      offset -= +width.replace(/\D/g, "");
    }
    slidesInner.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });
});
