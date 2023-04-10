// toggle menu bar
const sidebar = document.querySelector("#side_nav_container");
const sidebarMenuButton = document.querySelector("#sidebar-menu");
const sidebarCrossButton = document.querySelector("#sidebar-cross-btn");
const sidebarOutbox = document.querySelector(".sidebar-outbox");
// console.log(sidebarCrossButton);
const sidebarMenuItems = document.querySelector(".sidebar__menu-items");
// menu button on click
sidebarMenuButton.addEventListener("click", function () {
  sidebarMenuItems.classList.toggle("active");
  sidebar.classList.toggle("active");
  sidebarOutbox.style.display = "block";

  console.log(sidebarMenuItems.className);
});
// cross button on click
sidebarCrossButton.addEventListener("click", function () {
  sidebarMenuItems.classList.toggle("active");
  sidebar.classList.toggle("active");
  sidebarOutbox.style.display = "none";
});
//closses modal
const closeSideBarModal = (event) => {
  if (event.target.classList.contains("sidebar-outbox")) {
    sidebarOutbox.style.display = "none";
    sidebar.classList.toggle("active");
  }
};
sidebarOutbox.addEventListener("click", closeSideBarModal);
// menu items header text
const menuHeaderList = document.querySelectorAll(".menu-tabs-header-text");
const weekdayLunch = document.querySelector("#weekday_lunch");
const weekdayLunchDishes = document.querySelector("#weekday_lunch-dishes");
const dinner = document.querySelector("#dinner");
const dinnerDishes = document.querySelector("#dinner-dishes");
console.log(1, weekdayLunch);
// remove active class from menu items
const removeActiveItem = () => {
  menuHeaderList.forEach((item) => {
    item.classList.remove("active");
  });
};
// MENU HEADER ADD ACTIVE ITEMS
menuHeaderList.forEach((item) => {
  console.log(item);

  item.addEventListener("click", () => {
    removeActiveItem();
    item.classList.add("active");
    console.log(item.id);
    if (item.id == "weekday_lunch") {
      weekdayLunchDishes.style.display = "flex";
      dinnerDishes.style.display = "none";
    } else if (item.id == "dinner") {
      console.log(item.id);
      weekdayLunchDishes.style.display = "none";
      dinnerDishes.style.display = "flex";
    } else console.log("paynai");
  });
});

// // menu header icons rotaion
const menuHeaderIcons = document.querySelectorAll(".menu-tabs-header-icon");
var root = document.querySelector(":root");
var i = 0;
console.log(menuHeaderIcons);
function rotateIcons() {
  setInterval(() => {
    // menuHeaderIcons.style.transform = "rotate(45deg)";
    root.style.setProperty("--menu_header-icons-tranform-deg", i + "deg");
    i += 5;
    // console.log(i);
  }, 100);
}
rotateIcons();

// show Dish details
function showDishDetails() {
  window.location.href = "/viewDetailsDishPage.html";
}

// serve count
const serveCount = document.querySelector(".count-number");
var servingCounter = 0;
function serveCountMinus() {
  if (servingCounter > 0) {
    servingCounter--;
  }

  console.log(servingCounter);
  serveCount.innerHTML = servingCounter;
}
function serveCountPlus() {
  servingCounter++;
  console.log(servingCounter);
  serveCount.innerHTML = servingCounter;
}

// show add to cart count
const addedToCart = document.querySelector(".added_items-count");
var addedToCartCounter = 0;
function addToCart() {
  addedToCartCounter++;
  addedToCart.innerHTML = addedToCartCounter;
}

// customized modal
// order
const customize = document.querySelector("#customize");
const orderModal = document.querySelector(".customize-order");
// order customization

//opens modal

const openOrderModal = () => {
  orderModal.style.display = "grid";
};
customize.addEventListener("click", openOrderModal);
//closses modal
const closeOrderModal = (event) => {
  if (event.target.classList.contains("customize-order")) {
    orderModal.style.display = "none";
  }
};
orderModal.addEventListener("click", closeOrderModal);
