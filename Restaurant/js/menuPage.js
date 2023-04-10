// toggle menu bar
const sidebar = document.querySelector("#side_nav_container");
const sidebarMenuButton = document.querySelector("#sidebar-menu");
const sidebarCrossButton = document.querySelector("#sidebar-cross-btn");
const sidebarOutbox = document.querySelector(".sidebar-outbox");

// console.log(sidebarCrossButton);
const sidebarMenuItems = document.querySelector(".sidebar__menu-items");

// menu button on click
sidebarMenuButton.addEventListener("click", function () {
  // sidebarMenuItems.classList.toggle("active");
  sidebar.classList.toggle("active");
  sidebarOutbox.style.display = "block";

  // console.log(sidebarMenuItems.className);
});
// cross button on click
sidebarCrossButton.addEventListener("click", function () {
  sidebarMenuItems.classList.toggle("active");
  sidebar.classList.toggle("active");
  sidebarOutbox.style.display = "none";
});

//closses sidebar modal
const closeSideBarModal = (event) => {
  if (event.target.classList.contains("sidebar-outbox")) {
    sidebarOutbox.style.display = "none";
    sidebar.classList.toggle("active");
  }
};
sidebarOutbox.addEventListener("click", closeSideBarModal);

function menuHeaderActive() {
  // menu items header text
  const menuHeaderList = document.querySelectorAll(".menu-tabs-header-text");
  const weekdayLunch = document.querySelector("#lunch");
  const weekdayLunchDishes = document.querySelector("#lunch-dishes");
  const dinner = document.querySelector("#dinner");
  const dinnerDishes = document.querySelector("#dinner-dishes");
  console.log(1, weekdayLunch);

  // remove active class from menu items
  const removeActiveMenuItem = () => {
    menuHeaderList.forEach((item) => {
      item.classList.remove("active");
    });
  };

  // MENU HEADER ADD ACTIVE ITEMS
  menuHeaderList.forEach((item) => {
    console.log(item);

    item.addEventListener("click", () => {
      removeActiveMenuItem();
      item.classList.add("active");
      console.log(item.id);
      if (item.id == "lunch") {
        weekdayLunchDishes.style.display = "flex";
        dinnerDishes.style.display = "none";
      } else if (item.id == "dinner") {
        console.log(item.id);
        weekdayLunchDishes.style.display = "none";
        dinnerDishes.style.display = "flex";
        console.log(dinnerDishes.style.display);
      } else console.log("paynai");
    });
  });
}

// // menu header icons rotaion
const menuHeaderIcons = document.querySelectorAll(".menu-tabs-header-icon");
var root = document.querySelector(":root");
var i = 0;
console.log(menuHeaderIcons);
function rotateSquareIcons() {
  setInterval(() => {
    // menuHeaderIcons.style.transform = "rotate(45deg)";
    root.style.setProperty("--menu_header-icons-tranform-deg", i + "deg");
    i += 5;
    // console.log(i);
  }, 100);
}
rotateSquareIcons();
// // timer  icons rotaion
const howerGlass = document.querySelector(".hour-glass");
var root = document.querySelector(":root");
var i = 0;
console.log(menuHeaderIcons);
function rotateTimerIcons() {
  setInterval(() => {
    // menuHeaderIcons.style.transform = "rotate(45deg)";
    root.style.setProperty("--hour-glass-icons-tranform-deg", i + "deg");
    i += 5;
    // console.log(i);
  }, 200);
}
rotateTimerIcons();

// show Dish details
function showDishDetails() {
  window.location.href = "/viewDetailsDishPage.html";
}

// ================================================ ********* =============================================

// get the table number from the url
const urlParams = new URLSearchParams(window.location.search);
const tableNumber = parseInt(urlParams.get("tableNumber"));
console.log(tableNumber); // Output: 123

// order confirm
const okBTN = document.getElementById("order_ok-btn");
okBTN.addEventListener("click", () => {
  document.querySelector(".confirm-order-outerbox").style.display = "none";
});
// added Order array
const AddedOrderArray = [];
// show add to cart count
const addedToCart = document.querySelector(".added_items-count");
var addedToCartCounter = 0;

function addToCart(id) {
  // console.log(
  //   "CheckedAddons: " +
  //     checkedAddonString +
  //     "\nchecked Addon price: $" +
  //     checkedAddonCost
  // );
  let quantity = servingCounter;
  const serveCountSpan = document.getElementById(`count${id}`);
  console.log(servingCounter);
  servingCounter = 1;
  serveCountSpan.innerHTML = 1;
  console.log(id, "item id");

  // check if item with the same ID already exists in the AddedOrderArray
  let existingItem = AddedOrderArray.find((item) => item.ID === id);
  console.log(existingItem, "existing item");

  if (existingItem) {
    // increase count and cost of existing item
    // existingItem.Quantity += quantity;
    // existingItem.Cost += quantity * existingItem.price;
    alert("Item added already! Please remove previous item to add again!");
  } else {
    let price;
    DishItemsArray.forEach((item) => {
      if (item.id == id) {
        price = item.price;
        let cost = price * quantity;
        let addonItems = "",
          addonItemsCost = 0;
        // if (checkedAddonCost) cost += checkedAddonCost;
        addedAddonsArray.forEach((item) => {
          if (item.addonDishID == id) {
            addonItems = item.addonItems;
            addonItemsCost = item.addonItemsCost;
            console.log(addonItems);
            console.log(cost);
            cost += addonItemsCost;
          }
          // addedAddonsArray.length = 0;
        });
        const obj = {
          Name: item.name,
          ImageSRC: item.imagePath,
          ID: item.id,
          Quantity: quantity,
          Cost: cost,
          Price: price,
          Addon: addonItems,
          AddonCost: addonItemsCost,
        };
        AddedOrderArray.push(obj);
      }
    });
    // checkedAddonString = "";
    // checkedAddonCost = 0;
    // console.log(AddedOrderArray, "AddedOrderArray");
  }

  if (!existingItem) {
    addedToCartCounter++;
    addedToCart.innerHTML = addedToCartCounter;
  }
  console.log("order");
  console.log(id);
  console.log(quantity);
  console.log(AddedOrderArray, "added order items");
  displayCartItems();
}

// display added to cart items
var totalCost;
var allAddons;
function displayCartItems() {
  console.log(AddedOrderArray, "displayCartItems() ");
  const cartItems = document.querySelector(".cart_items");
  cartItems.innerHTML = "";
  if (!AddedOrderArray.length) {
    // cartItems.innerHTML = `<h5 class="text-center mt-5" style="color:red">You have not added any dish to cart yet!</h5>`;
    cartItems.innerHTML = ` <img class="empty_order_img" src="/images/emptyCart.4e943399.png" alt="">`;
  }
  // allAddons = "";
  for (var i = 0; i < AddedOrderArray.length; i++) {
    let cartItem = document.createElement("div");
    cartItem.classList = "cart_item";
    let cartDishCard = document.createElement("div");
    cartDishCard.classList = "cart_dish_card";
    cartDishCard.setAttribute("id", AddedOrderArray[i].ID);
    let cartHeader = document.createElement("div");
    cartHeader.classList = "cart_header";
    let cartDishImage = document.createElement("img");
    cartDishImage.classList = "cart_dish-img";
    let imgPath = AddedOrderArray[i].ImageSRC;
    let pathArray = imgPath.split("\\"); // Split the file path into an array based on the backslash character
    let newPath = pathArray.slice(2).join("\\"); // Join the array elements starting from the second element using the backslash character
    console.log("new path" + newPath);
    cartDishImage.setAttribute("src", newPath);
    cartHeader.appendChild(cartDishImage);
    cartDishCard.appendChild(cartHeader);
    let cartDishBody = document.createElement("div");
    cartDishBody.classList = "cart_dish-body";
    let cartDishTitle = document.createElement("h6");
    cartDishTitle.innerHTML = AddedOrderArray[i].Name;
    cartDishBody.appendChild(cartDishTitle);
    let itemQuantityDiv = document.createElement("div");
    itemQuantityDiv.classList = "item_quantity";
    itemQuantityDiv.innerHTML = "Q: ";
    let quantitySpan = document.createElement("span");
    quantitySpan.classList = "quantity";
    quantitySpan.innerHTML = AddedOrderArray[i].Quantity;
    itemQuantityDiv.appendChild(quantitySpan);
    cartDishBody.appendChild(itemQuantityDiv);
    if (AddedOrderArray[i].Addon && AddedOrderArray[i].AddonCost) {
      // allAddons += checkedAddonString;
      let cartDishAddons = document.createElement("span");
      cartDishAddons.innerHTML = "Addons: " + AddedOrderArray[i].Addon;
      //+
      // " Cost: $" +
      // AddedOrderArray[i].AddonCost;
      cartDishAddons.setAttribute("style", "color:var(--color-primary);");
      cartDishBody.appendChild(cartDishAddons);
    }
    let dishPriceDiv = document.createElement("div");
    dishPriceDiv.classList = "dish-price";
    dishPriceDiv.innerHTML = "Total: $" + AddedOrderArray[i].Cost;
    totalCost += AddedOrderArray[i].Cost;
    cartDishBody.appendChild(dishPriceDiv);
    cartDishCard.appendChild(cartDishBody);

    let deleteIconDiv = document.createElement("div");
    deleteIconDiv.classList = "delete_icon mt-3 me-3 fs-5";
    let deleteIcon = document.createElement("i");
    deleteIcon.classList = "fa-regular fa-trash-can float-end";
    deleteIcon.setAttribute("onclick", `removeItem(${AddedOrderArray[i].ID})`);
    deleteIconDiv.appendChild(deleteIcon);
    cartDishCard.appendChild(deleteIconDiv);
    cartItem.appendChild(cartDishCard);
    let delimiter = document.createElement("div");
    delimiter.classList = "sidebar_delimiter";
    cartItem.appendChild(delimiter);
    cartItems.appendChild(cartItem);
  }
  totalCost = 0;
  if (AddedOrderArray.length) {
    AddedOrderArray.forEach((element) => {
      totalCost += element.Cost;
    });
    // if (checkedAddonCost != undefined) {
    //   orderCustomization = checkedAddonString;
    //   totalCost += checkedAddonCost;
    // }

    cartItems.innerHTML += `<div class="cart-footer">  <div class="text-end me-3 fs-5 fw-bold">Subtotal:<span class="ms-3" style="color: var(--color-primary);">$${totalCost}</span></div>

  <button class="dish-btn float-end w-50" onclick="OrderItems()">ORDER</button>

</div>`;
  }
}
// add single order
function orderNow() {
  // console.log(
  //   "CheckedAddons: " +
  //     checkedAddonString +
  //     "\nchecked Addon price: $" +
  //     checkedAddonCost
  // );

  console.log("helloorder");
  console.log(DishItemsArray);
  let id = event.target.id;
  let itemID = id.split("orderNow")[1];
  console.log(itemID, "itemID");
  let quantity = servingCounter;
  let serveElementID = "count" + itemID;
  console.log(serveElementID);
  const servedCountSpan = document.getElementById(`${serveElementID}`);
  console.log(servedCountSpan);
  if (servedCountSpan !== null) {
    servedCountSpan.innerHTML = 1;
  }
  // console.log(quantity);
  let cost;
  let status = true;
  let instruction = "Less Spice";
  let orderCustomization = "";

  DishItemsArray.forEach((item) => {
    if (item.id == itemID) {
      let price = item.price;
      cost = price * quantity;
    }
    // console.log(item);
  });
  // console.log(addedAddonsArray, "iujhfoasdhasfd");
  addedAddonsArray.forEach((item) => {
    if (item.addonDishID == itemID) {
      orderCustomization = item.addonItems;
      cost += item.addonItemsCost;
      console.log(orderCustomization);
      console.log(cost);
    }
    addedAddonsArray.length = 0;
  });
  console.log("order");
  console.log(itemID);
  console.log(quantity);
  console.log(cost);
  console.log(status);
  console.log(instruction);
  console.log(orderCustomization);
  console.log(tableNumber);

  const formData = new FormData();
  formData.append("item_id", itemID);
  formData.append("quantity", quantity);
  formData.append("order_total_cost", cost);
  formData.append("order_status", status);
  formData.append("customization_instructions", instruction);
  formData.append("customization", orderCustomization);
  formData.append("table_number", tableNumber);
  console.log(formData);

  fetch("http://192.168.2.102:8095/api/order/addorder", {
    method: "POST",
    body: formData,
  })
    // .then((res) => res.json())
    .then((data) => {
      console.log("data" + data);
      // alert("Order added!");

      document.querySelector(".confirm-order-outerbox").style.display = "grid";
      // checkedAddonString = "";
      // checkedAddonCost = 0;
      servingCounter = 1;
    })
    .catch((err) => console.log(err));
}
// multiple orders
function OrderItems() {
  console.log("helloorder");
  console.log(DishItemsArray);
  let cost = `${totalCost}`;
  let status = true;
  let instruction = "Less Spice";
  let orderCustomization = "";
  // console.log(AddedOrderArray, "hello order array");
  // for (var i = 0; i < AddedOrderArray.length; i++) {
  //   ItemsIDArray.push(AddedOrderArray[i].ID);
  //   QuantityArray.push(AddedOrderArray[i].Quantity);
  // }
  // console.log(ItemsIDArray, "ItemsIDArray");
  // console.log(QuantityArray, "QuantityArray");
  // if (checkedAddonString != undefined && checkedAddonCost != undefined) {
  //   orderCustomization = checkedAddonString;
  //   cost += checkedAddonCost;
  // }
  console.log("order");
  console.log(cost);
  console.log(status);
  console.log(instruction);
  console.log(orderCustomization);
  console.log(tableNumber);
  // const obj = {
  //   item_id: ItemsIDArray,
  //   quantity: QuantityArray,
  //   order_total_cost: cost,
  //   order_status: "true",
  //   customization_instructions: instruction,
  //   customization: orderCustomization,
  //   table_number: tableNumber,
  // };
  // console.log(obj);

  const formData = new FormData();
  // for (let i = 0; i < ItemsIDArray.length; i++) {
  //   formData.append("item_id", ItemsIDArray[i]);
  //   }
  // for (let i = 0; i < QuantityArray.length; i++) {
  //     formData.append("quantity", QuantityArray[i]);
  // }
  for (var i = 0; i < AddedOrderArray.length; i++) {
    formData.append("item_id", AddedOrderArray[i].ID);
    formData.append("quantity", AddedOrderArray[i].Quantity);
    if (AddedOrderArray[i].Addon != "") {
      formData.append("customization", AddedOrderArray[i].Addon);
    } else formData.append("customization", "None");
    // if (
    //   AddedOrderArray[i].Addon != null &&
    //   AddedOrderArray[i].Addon != undefined &&
    //   AddedOrderArray[i].Addon != ""
    // ) {
    // formData.append("customization", AddedOrderArray[i].Addon);
    // } else {
    //   formData.append("customization", "None");
    // }
  }

  formData.append("order_total_cost", cost);
  formData.append("order_status", status);
  formData.append("customization_instructions", instruction);
  // formData.append("customization", orderCustomization);
  formData.append("table_number", tableNumber);
  console.log(formData);

  fetch("http://192.168.2.102:8095/api/order/addorder", {
    method: "POST",
    body: formData,
  })
    // .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".confirm-order-outerbox").style.display = "grid";
      document.querySelector(".added_items-count").innerHTML = 0;
      addedToCartCounter = 0;
      totalCost = 0;
      AddedOrderArray.splice(0, AddedOrderArray.length);
      console.log(AddedOrderArray, "cleared array");
      displayCartItems();
    })
    .catch((err) => console.log(err));
}

// remove itemsFrom cart

function removeItem(id) {
  for (let i = 0; i < AddedOrderArray.length; i++) {
    console.log(AddedOrderArray[i].ID, "AddedOrderArray[i].id");
    if (AddedOrderArray[i].ID === id) {
      AddedOrderArray.splice(i, 1); // Remove 1 element starting at index i
      addedToCartCounter--;
      addedToCart.innerHTML = addedToCartCounter;
      break; // Stop looping after object is removed
    }
  }
  console.log(AddedOrderArray);
  displayCartItems();
}
// displayCartItems();

// const cartOutbox = document.querySelector(".cart-outbox");
const cartContainer = document.getElementById("cart_container");
const cartBTN = document.querySelector("#nav_cart");

cartBTN.addEventListener("click", () => {
  orderContainer.classList.remove("active");
  cartContainer.classList.toggle("active");

  // document.querySelector(".added_items-count").innerHTML = 0;
  console.log(AddedOrderArray, " cart: added order items");

  displayCartItems();
  // cartOutbox.style.display = "block";
});
const OrdersArray = [];
// Fetchhing Ortders from API
fetch("http://192.168.2.103:8095/api/order/getallorderlist")
  // fetch("/order.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const obj = { ...item }; // spread operator (...)
      // pushing objects to array
      OrdersArray.push(obj);
    });
    console.log("Orders Array");
    console.log(OrdersArray);
    showOrders();
  });

function showOrders() {
  console.log("Orders Array");
  console.log(OrdersArray);
}
const orderStatusArray = [];
function fetchOrderStatus() {
  orderStatusArray.length = 0;
  fetch("http://192.168.2.102:8095/api/order/getorderstatus")
    // fetch("/order.json")
    .then((response) => response.json())
    .then((data) => {
      // creating object from fetched data
      data.forEach((item) => {
        const obj = { ...item }; // spread operator (...)
        // pushing objects to array
        orderStatusArray.push(obj);
      });
      console.log("orderStatusArray");
      console.log(orderStatusArray);
      // showOrders();
    });
}
fetchOrderStatus();
setInterval(fetchOrderStatus, 5000);

const showOrderBTN = document.querySelector("#show_order");
const orderContainer = document.getElementById("orders_container");
const orderedItems = document.querySelector(".ordered_items");
function OrderTracker() {
  if (orderedItems != null || orderedItems != "") {
    orderedItems.innerHTML = ` <img class="empty_order_img" src="/images/emptyCart.4e943399.png" alt="">`;
  }

  // document.querySelector(".added_items-count").innerHTML = 0;
  // console.log(AddedOrderArray, " cart: added order items");
  // console.log(orderStatusArray);
  for (var i = 0; i < orderStatusArray.length; i++) {
    if (
      orderStatusArray[i].table_number == tableNumber &&
      orderStatusArray[i].order_status != "delivered"
    ) {
      orderedItems.innerHTML = `<div class="d-flex justify-content-between ps-2 pe-2 p-1">
      <div class="order-info">
        <div class="order-date fw-bold">Wed,12Sep</div>
      <span class="fw-bold">Order ID:</span>  <span class="order-id"> #12345</span>
      </div>
      <div class="fw-bold">Cost: <span class="price">$141</span></div>
    </div>
  <div class="sidebar_delimiter"></div>

    <!-- <img class="empty_order_img" src="/images/emptyCart.4e943399.png" alt=""> -->
    <div class="d-flex m-1 p-1">
      <h6 class="mt-1"> ETA: <span class="arrival-time">20 Min</span></h6>
      <div class="hour-glass ms-2 mb-1 pb-2 "style="width=20px;">
        <i class="fa-regular fa-hourglass-half"></i>
      </div>
    </div>
    <div class="order_tracking-body p-1">
      <!--  -->
      <div class="status" id="order_placed">
        <div class="status-content">
          <div class="status-line"></div>
          <div class="status-icon"><i class="fa-solid fa-circle-check"></i></div>
          <div class="status-body">
            <h6>Order Placed</h6>
            <p class="">Your order is being placed.</p>
          </div>
          <span class="status-time">8:20</span>
        </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="status" id="order_recived">
        <div class="status-content">
          <div class="status-line"></div>
        <div class="status-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div class="status-body">
          <h6>Order Recieved</h6>
          <p class=""> Your order got confirmed.</p>
          
        </div><span class="time">8:20</span>
      </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="status" id="preparing">
        <div class="status-content">
          <div class="status-line"></div>
        <div class="status-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div class="status-body">
          <h6>Preparing</h6>
          <p class="">We started preparing your dish.</p>
          
        </div><span class="time">8:20</span>
      </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="status" id="cooking">
        <div class="status-content">
          <div class="status-line"></div>
        <div class="status-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div class="status-body">
          <h6>Cooking</h6>
          <p class="">We hav strted cooking your food.</p>
          
        </div><span class="time">8:20</span>
      </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="status" id="ready">
        <div class="status-content">
          <div class="status-line"></div>
        <div class="status-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div class="status-body">
          <h6>It's Ready</h6>
          <p class="bold-text">Our executive strted to deliver your food.</p>
          
        </div><span class="time">8:20</span>
      </div>
      </div>
      <!--  -->
      <!--  -->
      <div class="status" id="delivered">
        <div class="status-content ms-1">
        <!-- <div class="status-line"></div> -->

        <div class="status-icon"><i class="fa-solid fa-circle-check"></i></div>
        <div class="status-body">
          <h6>Delivered</h6>
          <p class="bold-text">Enjoy your meal and have a great day. Don't forget to rate us.</p>
        </div><span class="time">8:20</span>
      </div>
      </div>
      <!--  -->

    </div>
  </div>`;
      const orderPlaced = document.getElementById("order_placed");
      const orderRecieved = document.getElementById("order_recived");
      const preparing = document.getElementById("preparing");
      const cooking = document.getElementById("cooking");
      const ready = document.getElementById("ready");
      const delivered = document.getElementById("delivered");
      console.log(orderStatusArray[i], "obj");
      console.log(tableNumber, "URLtableNumber", i);
      console.log(orderStatusArray[i].table_number, "table_number", i);
      console.log(orderStatusArray[i].order_status, "order_status", i);
      document.querySelector(".order-date").innerHTML =
        orderStatusArray[i].order_datetime;
      document.querySelector(".order-id").innerHTML =
        "#" + orderStatusArray[i].order_id;
      document.querySelector(".price").innerHTML =
        "$" + orderStatusArray[i].order_total_cost;
      // document.querySelector(".arrival-time").innerHTML =
      //   OrdersArray[i].serving_time;
      const orderStatus = orderStatusArray[i].order_status;
      console.log(orderStatus);
      if (orderStatus == "true") {
        // console.log(orderPlaced, "iseohtfpowes");
        orderPlaced.classList.add("active");
        // orderPlaced.style.background = "red";
      }
      if (orderStatus == "order_recived") {
        orderPlaced.classList.add("active");
        orderRecieved.classList.add("active");
        document
          .querySelector("#order_placed .status-line")
          .classList.add("active");
      }
      if (orderStatus == "preparing") {
        orderPlaced.classList.add("active");
        orderRecieved.classList.add("active");
        document
          .querySelector("#order_placed .status-line")
          .classList.add("active");
        preparing.classList.add("active");
        document
          .querySelector("#order_recived .status-line")
          .classList.add("active");
      }
      if (orderStatus == "cooking") {
        orderPlaced.classList.add("active");
        orderRecieved.classList.add("active");
        document
          .querySelector("#order_placed .status-line")
          .classList.add("active");
        preparing.classList.add("active");
        document
          .querySelector("#order_recived .status-line")
          .classList.add("active");
        cooking.classList.add("active");
        document
          .querySelector("#preparing .status-line")
          .classList.add("active");
      }
      if (orderStatus == "ready") {
        orderPlaced.classList.add("active");
        orderRecieved.classList.add("active");
        document
          .querySelector("#order_placed .status-line")
          .classList.add("active");
        preparing.classList.add("active");
        document
          .querySelector("#order_recived .status-line")
          .classList.add("active");
        cooking.classList.add("active");
        document
          .querySelector("#preparing .status-line")
          .classList.add("active");
        ready.classList.add("active");
        document.querySelector("#cooking .status-line").classList.add("active");
      }
      if (orderStatus == "delivered") {
        orderPlaced.classList.add("active");
        orderRecieved.classList.add("active");
        document
          .querySelector("#order_placed .status-line")
          .classList.add("active");
        preparing.classList.add("active");
        document
          .querySelector("#order_recived .status-line")
          .classList.add("active");
        cooking.classList.add("active");
        document
          .querySelector("#preparing .status-line")
          .classList.add("active");
        ready.classList.add("active");
        document.querySelector("#cooking .status-line").classList.add("active");
        delivered.classList.add("active");
        document.querySelector("#ready .status-line").classList.add("active");
      }
    }
  }
  setTimeout(OrderTracker, 5000);
}
showOrderBTN.addEventListener("click", () => {
  cartContainer.classList.remove("active");
  orderContainer.classList.toggle("active");
  OrderTracker();
  console.log("hujsdf");
  // OrdersArray
  // displayCartItems();
  // cartOutbox.style.display = "block";
});

// optimal counter
var servingCounter = 1;
var prevID;

function quantityCounter(id, icon) {
  let elementID = "count" + id;
  let prevElementID = "count" + prevID;
  const serveCountSpan = document.getElementById(`${elementID}`);
  const prevServeCountSpan = document.getElementById(`${prevElementID}`);
  console.log(serveCountSpan);
  if (prevID !== id) {
    servingCounter = 1;
    if (prevServeCountSpan !== null) {
      prevServeCountSpan.innerHTML = 1;
    }
    prevID = id;
  }

  if (icon == "minus") {
    console.log("hello minus");
    if (servingCounter > 1) {
      servingCounter--;
    }
    console.log(servingCounter);
    if (serveCountSpan !== null) {
      serveCountSpan.innerHTML = servingCounter;
    }
  }
  if (icon == "plus") {
    console.log("hello plus");
    servingCounter++;
    console.log(servingCounter);
    if (serveCountSpan !== null) {
      serveCountSpan.innerHTML = servingCounter;
    }
  }
}
const SidebarMenuArray = [];

// Fetchhing Sidebar items from json

// fetch("/sidebarData.json")
//   .then((response) => response.json())
//   .then((data) => {
// Fetchhing Sidebar items from API
fetch("http://192.168.2.102:8095/GetAllSidebarItems")
  .then((response) => response.json())
  .then((data) => {
    // console.log("All Data");
    // console.log(data);
    // creating object from fetched data
    // data.forEach((item) => {
    //   const obj = {};
    //   obj.MenuID = item.sidebar_item_id;
    //   obj.MenuName = item.sidebar_item_name;
    //   obj.ParentID = item.sidebar_item_parent_id;
    //   obj.Destination = item.sidebar_item_destination;

    //   // pushing objects to array
    //   SidebarMenuArray.push(obj);
    //   console.log(SidebarMenuArray);
    // });
    data.forEach((item) => {
      const obj = {
        MenuID: item.sidebar_item_id,
        MenuName: item.sidebar_item_name,
        ParentID: item.sidebar_item_parent_id,
        Destination: item.sidebar_item_destination,
      };
      // pushing objects to array
      SidebarMenuArray.push(obj);
    });

    console.log("Array");
    console.log(SidebarMenuArray);

    displaySidebarMenuItems();
    // data1();
    sidebarOnClick();
  })
  .catch((error) => {
    console.error("Error fetching sidebar items:", error);
  });

function displaySidebarMenuItems() {
  const menuItems = document.querySelector(".sidebar__menu-items");
  // icons classlist
  const squareIconClassList = "sidebar_square-icon fa-regular fa-square-full";
  const chevrondownIconClassList = "fa-solid fa-chevron-down";

  // console.log(menuItems);
  let sidebarDelimiter = document.createElement("div");
  sidebarDelimiter.classList = "sidebar_delimiter";
  menuItems.appendChild(sidebarDelimiter);
  for (let i = 0; i < SidebarMenuArray.length; i++) {
    // console.log(SidebarMenuArray);
    // console.log("i: " + i);
    // console.log("menuId:" + SidebarMenuArray[i].MenuID);
    // console.log("Parent:" + SidebarMenuArray[i].ParentID);
    let menuItem = document.createElement("div");
    menuItem.classList = "sidebar_menu-item";
    if (SidebarMenuArray[i].MenuID == SidebarMenuArray[i].ParentID) {
      // console.log("if conditon");
      let ParentMenuItem = document.createElement("div");
      ParentMenuItem.classList = "parent";
      let menuHeader = document.createElement("div");
      menuHeader.classList = "menu_header";
      let squareIcon = document.createElement("i");
      squareIcon.classList = squareIconClassList;
      let menuHeaderTitle = document.createElement("h6");
      let chevronDiv = document.createElement("div");
      chevronDiv.classList = "chevron-down-icon";
      let chevronIcon = document.createElement("i");
      chevronIcon.classList = chevrondownIconClassList;
      let parentSidebarDelimiter = document.createElement("div");
      parentSidebarDelimiter.classList = "parent_sidebar_delimiter";
      menuHeaderTitle.innerText = SidebarMenuArray[i].MenuName;
      menuHeader.appendChild(squareIcon);
      menuHeader.appendChild(menuHeaderTitle);
      ParentMenuItem.appendChild(menuHeader);
      chevronDiv.appendChild(chevronIcon);
      ParentMenuItem.appendChild(chevronDiv);
      menuItem.appendChild(ParentMenuItem);
      menuItem.appendChild(parentSidebarDelimiter);
      let childsMenuItem = document.createElement("div");
      childsMenuItem.classList = "childs";
      for (var j = i + 1; j < SidebarMenuArray.length; j++) {
        if (SidebarMenuArray[i].MenuID == SidebarMenuArray[j].ParentID) {
          let childMenuItem = document.createElement("div");
          childMenuItem.classList = "child";
          let menuHeader = document.createElement("div");
          menuHeader.classList = "menu_header";
          let squareIcon = document.createElement("i");
          squareIcon.classList = squareIconClassList;
          let menuHeaderTitle = document.createElement("h6");
          // let chevronDiv = document.createElement("div");
          // chevronDiv.classList = "chevron-down-icon";
          // let chevronIcon = document.createElement("i");
          chevronIcon.classList = chevrondownIconClassList;
          let childSidebarDelimiter = document.createElement("div");
          childSidebarDelimiter.classList = "child_sidebar_delimiter";
          menuHeaderTitle.innerText = SidebarMenuArray[j].MenuName;
          menuHeader.appendChild(squareIcon);
          menuHeader.appendChild(menuHeaderTitle);
          childMenuItem.appendChild(menuHeader);
          // chevronDiv.appendChild(chevronIcon);
          // childMenuItem.appendChild(chevronDiv);
          childsMenuItem.appendChild(childMenuItem);
          // console.log(childsMenuItem);
          menuItem.appendChild(childsMenuItem);
          childsMenuItem.appendChild(childSidebarDelimiter);
        }
      }
      menuItems.appendChild(menuItem);
    }
  }
}

//sidebar onclick
function sidebarOnClick() {
  // const removeParentActiveSidebarItem = () => {
  //   parentSidebarMenuList.forEach((item) => {
  //     item.classList.remove("active");
  //   });
  // };

  // const removeChildsActiveSidebarItem = () => {
  //   childsSidebarMenuList.forEach((item) => {
  //     item.classList.remove("active");
  //   });
  // };

  const parentSidebarMenuList = document.querySelectorAll(".parent");
  // const childsSidebarMenuList = document.querySelectorAll(".childs");

  parentSidebarMenuList.forEach(function (parentMenuItem) {
    parentMenuItem.addEventListener("click", function () {
      // console.log(parentMenuItem);
      parentMenuItem.classList.toggle("active");
      // console.log(parentMenuItem.classList);
      const delimiter = parentMenuItem.nextElementSibling;
      const childs = delimiter.nextElementSibling;
      // console.log(childs);
      if (childs) {
        // removeChildsActiveSidebarItem();
        childs.classList.toggle("active");
      }
    });
  });
}

const DishItemsArray = [];
// Fetchhing dish items items from json
// fetch("/dishItemsData.json")
//   .then((response) => response.json())
//   .then((data) => {

// Fetchhing dish items from API
// fetch("http://192.168.2.102:85/GetAllDishItems")
// fetch("http://localhost:5176/GetAllDishItems")
fetch("http://192.168.2.102:8095/GetAllDishItemsWithAddons")
  .then((response) => response.json())
  .then((data) => {
    // console.log("All Data");
    // console.log(data);
    // creating object from fetched data
    data.forEach((item) => {
      const obj = { ...item }; // spread operator (...)
      // pushing objects to array
      DishItemsArray.push(obj);
    });
    console.log("Array");
    console.log(DishItemsArray);
    displayMenuHeaderTitles();
    menuHeaderActive();
    displayDishItems();
    // addOrder();
  });
const parentArray = [];
// displayMenuHeaderTitle
function displayMenuHeaderTitles() {
  const menuHeaderItems = document.querySelector(".menu-tabs-header-items");
  menuHeaderItems.innerHTML = "";
  // icons
  const squareIconClassList = "menu-tabs-header-icon fa-regular fa-square-full";
  var parentCNT = 0,
    iconCNT = 0;
  for (let i = 0; i < DishItemsArray.length; i++) {
    if (DishItemsArray[i].id == DishItemsArray[i].parentMenuID) {
      parentArray.push(DishItemsArray[i]);
      console.log(parentArray, "parent");
    }
  }
  console.log(parentArray, "parent");
  for (let i = 0; i < parentArray.length; i++) {
    // if (DishItemsArray[i].id == DishItemsArray[i].parentMenuID) {
    let menuHeaderTextDiv = document.createElement("div");
    menuHeaderTextDiv.classList = "menu-tabs-header-text";
    if (i == 0) {
      menuHeaderTextDiv.classList = "menu-tabs-header-text active";
    }
    let idLower = `${parentArray[i].name}`.toLowerCase();
    menuHeaderTextDiv.setAttribute("id", idLower);
    let title = document.createElement("h5");
    title.innerText = parentArray[i].name;
    menuHeaderTextDiv.appendChild(title);

    menuHeaderItems.appendChild(menuHeaderTextDiv);
    if (iconCNT < parentArray.length - 1) {
      iconCNT++;
      let squareIconDiv = document.createElement("div");
      squareIconDiv.classList = "menu_header-Square_icon";
      let squareIcon = document.createElement("i");
      squareIcon.classList = squareIconClassList;
      squareIconDiv.appendChild(squareIcon);
      menuHeaderItems.appendChild(squareIconDiv);
    }
    // }
  }
}

// display Dish Items
function displayDishItems() {
  const dishItemsContainer = document.querySelector(".menu_dishes");
  console.log(DishItemsArray);
  // dishItemsContainer.innerHTML = "";
  for (let i = 0; i < DishItemsArray.length; i++) {
    if (DishItemsArray[i].id != DishItemsArray[i].parentMenuID) {
      // console.log(DishItemsArray[i]);
      let DishBlock = document.createElement("div");
      DishBlock.classList = "menu_dish-block";
      DishBlock.setAttribute("id", `${DishItemsArray[i].id}`);
      // console.log(DishBlock, "dishblock");
      let DishimgDiv = document.createElement("div");
      DishimgDiv.classList = "menu_dish-img";
      let Dishimg = document.createElement("img");

      let imgSRC = DishItemsArray[i].imagePath;
      // console.log(imgSRC);
      // let index = imgSRC.indexOf("\\");
      // let newPath = imgSRC.substring(index + 1);

      let pathArray = imgSRC.split("\\"); // Split the file path into an array based on the backslash character
      let newPath = pathArray.slice(2).join("\\"); // Join the array elements starting from the second element using the backslash character
      // console.log("new path" + newPath);

      Dishimg.setAttribute("src", newPath);
      // console.log(spDishimg);
      // console.log(spDishimg);
      DishimgDiv.appendChild(Dishimg);
      DishBlock.appendChild(DishimgDiv);
      let DishBodyDiv = document.createElement("div");
      DishBodyDiv.classList = "menu_dish-body";
      let DishTitle = document.createElement("div");
      DishTitle.classList = "menu_dish-title";
      let dishTitelh5 = document.createElement("h5");
      dishTitelh5.innerText = DishItemsArray[i].name;
      DishTitle.appendChild(dishTitelh5);
      let DishPrice = document.createElement("span");
      DishPrice.classList = "price";
      DishPrice.innerText = "$" + DishItemsArray[i].price;
      DishTitle.appendChild(DishPrice);
      let addTOCartDiv = document.createElement("div");
      addTOCartDiv.classList = "add_to_cart-menu_btn";
      addTOCartDiv.setAttribute(
        "onclick",
        `addToCart(${DishItemsArray[i].id})`
      );
      let dishCartIcon = document.createElement("i");
      dishCartIcon.classList = "fa-solid fa-cart-shopping";
      addTOCartDiv.appendChild(dishCartIcon);
      DishTitle.appendChild(addTOCartDiv);
      DishBodyDiv.appendChild(DishTitle);
      let DishDetails = document.createElement("p");
      DishDetails.classList = "menu_dish-details text-center";
      DishDetails.innerText = DishItemsArray[i].description;
      DishBodyDiv.appendChild(DishDetails);
      let DishBtnDiv = document.createElement("div");
      DishBtnDiv.classList = "dish-buttons d-flex justify-content-around";
      let customizebtn = document.createElement("button");
      customizebtn.classList = "dish-btn";
      customizebtn.setAttribute("id", `customizebtn${DishItemsArray[i].id}`);

      let addonArrayStringified = JSON.stringify(
        DishItemsArray[i].addonListArray
      );
      customizebtn.setAttribute(
        "onclick",
        `customeAddons(${DishItemsArray[i].id}, ${addonArrayStringified})`
      ); //${DishItemsArray[i].addonListArray}
      customizebtn.innerHTML = "Customize";
      DishBtnDiv.appendChild(customizebtn);
      let serveCountDiv = document.createElement("div");
      serveCountDiv.classList = "serve_count d-flex justify-content-between";
      // serveCountDiv.setAttribute("id", "scdiv" + `${DishItemsArray[i].id}`);
      let countMinus = document.createElement("span");
      countMinus.classList = "count-minus";
      countMinus.setAttribute(
        "onclick",
        `quantityCounter(${DishItemsArray[i].id},"minus")`
      );
      // countMinus.setAttribute(
      //   "onclick",
      //   `serveCountMinus(${DishItemsArray[i].id})`
      // );
      // countMinus.setAttribute("id", "countMinus" + `${DishItemsArray[i].id}`);
      let minusIcon = document.createElement("i");
      minusIcon.classList = "fa-solid fa-minus";
      countMinus.appendChild(minusIcon);
      serveCountDiv.appendChild(countMinus);
      let counterSpan = document.createElement("span");
      counterSpan.setAttribute("id", "count" + `${DishItemsArray[i].id}`);
      counterSpan.innerText = 1;
      serveCountDiv.appendChild(counterSpan);
      let countPlus = document.createElement("span");
      countPlus.classList = "count-plus";
      countPlus.setAttribute(
        "onclick",
        `quantityCounter(${DishItemsArray[i].id},"plus")`
      );
      // countPlus.setAttribute(
      //   "onclick",
      //   `serveCountPlus(${DishItemsArray[i].id})`
      // );

      // countPlus.setAttribute("id", "countPlus" + `${DishItemsArray[i].id}`);

      let plusIcon = document.createElement("i");
      plusIcon.classList = "fa-solid fa-plus";
      countPlus.appendChild(plusIcon);
      serveCountDiv.appendChild(countPlus);
      DishBtnDiv.appendChild(serveCountDiv);
      let orderNowbtn = document.createElement("button");
      orderNowbtn.classList = "dish-btn";
      orderNowbtn.innerHTML = "Order Now";
      DishBtnDiv.appendChild(orderNowbtn);
      orderNowbtn.setAttribute("id", "orderNow" + `${DishItemsArray[i].id}`);
      orderNowbtn.setAttribute("onclick", `orderNow()`);
      // console.log(orderNowbtn);
      // output

      DishBlock.appendChild(DishBodyDiv);
      DishBlock.appendChild(DishBtnDiv);
      dishItemsContainer.appendChild(DishBlock);
      // console.log(dishItemsContainer);
    }
  }
}
// order customization

const orderModal = document.querySelector(".customize-order");
//opens modal

function customeAddons(dishID, stringifiedAddons) {
  const addonList = document.querySelector(".addon_list");
  orderModal.style.display = "grid";
  console.log(dishID, "dishID");
  console.log(stringifiedAddons, "addonArrayString");
  // createAddons(stringifiedAddons);
  addonList.innerHTML = "";
  if (stringifiedAddons.length) {
    let addons = document.createElement("div");
    addons.classList = `addons_for${dishID}`;
    for (var i = 0; i < stringifiedAddons.length; i++) {
      let addon = document.createElement("div");
      addon.classList = `addon  d-flex justify-content-start p-1`;
      addon.setAttribute("id", `addon${stringifiedAddons.id}`);
      let addonCheckbox = document.createElement("input");
      addonCheckbox.setAttribute("type", "checkbox");
      addonCheckbox.setAttribute("value", `${stringifiedAddons[i].name}`);
      addonCheckbox.setAttribute("data-price", `${stringifiedAddons[i].price}`);
      addon.appendChild(addonCheckbox);
      let addonTitle = document.createElement("span");
      addonTitle.classList = "addon_title ms-1";
      addonTitle.innerHTML = stringifiedAddons[i].name;
      addon.appendChild(addonTitle);
      let addonPrice = document.createElement("span");
      addonPrice.classList = "price ms-3";
      addonPrice.innerHTML = "$" + stringifiedAddons[i].price;
      addon.appendChild(addonPrice);
      addons.appendChild(addon);
      // console.log(stringifiedAddons[i].name);
      // console.log(stringifiedAddons[i].price);
    }
    addons.innerHTML += `<button class=" dish-btn mt-2" id="addon_add-btn" onclick=addAddons(${dishID})>ADD</button>`;
    addonList.appendChild(addons);
  } else {
    addonList.innerHTML = ` <img class="empty_addon_img" src="/images/empty_addon2.png" alt="">`;
  }
}

//closes modal
const closeOrderModal = (event) => {
  if (event.target.classList.contains("customize-order")) {
    orderModal.style.display = "none";
  }
};

orderModal.addEventListener("click", closeOrderModal);
var addedAddonsArray = [];
addonAddBTN = document.querySelector("#addon_add-btn");
function addAddons(dish_id) {
  orderModal.style.display = "none";
  console.log(DishItemsArray[DishItemsArray.length - 1].addonListArray);
  var checkedAddonCost = 0;
  var checkedAddonString = "";
  const checkboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  checkboxes.forEach((checkbox, index) => {
    if (index > 0) {
      //index == checkboxes.length - 1
      checkedAddonString += ",";
    }
    checkedAddonString += checkbox.value;
    checkedAddonCost += parseFloat(checkbox.dataset.price);
  });
  console.log(
    "CheckedAddons: " +
      checkedAddonString +
      "\nchecked Addon price: $" +
      checkedAddonCost
  );
  var adddonOBJ = {
    addonDishID: dish_id,
    addonItems: checkedAddonString,
    addonItemsCost: checkedAddonCost,
  };
  addedAddonsArray.push(adddonOBJ);
  console.log(addedAddonsArray, "added adddons");
}

// // customized order
// // function customAddons() {
//   const customize = document.querySelector("#customize");
//   const orderModal = document.querySelector(".customize-order");
//   // order customization

//   //opens modal

//   const openOrderModal = () => {
//     orderModal.style.display = "grid";
//   };
//   customize.addEventListener("click", openOrderModal);
//   //closses modal
//   const closeOrderModal = (event) => {
//     if (event.target.classList.contains("customize-order")) {
//       orderModal.style.display = "none";
//     }
//   };
//   orderModal.addEventListener("click", closeOrderModal);
//   // }

// From menupage
// // menu items header text
// const menuHeaderList = document.querySelectorAll(".menu-tabs-header-text");
// const weekdayLunch = document.querySelector("#weekday_lunch");
// const weekdayLunchDishes = document.querySelector("#weekday_lunch-dishes");
// const dinner = document.querySelector("#dinner");
// const dinnerDishes = document.querySelector("#dinner-dishes");
// console.log(1, weekdayLunch);
// // remove active class from menu items
// const removeActiveItem = () => {
//   menuHeaderList.forEach((item) => {
//     item.classList.remove("active");
//   });
// };
// // MENU HEADER ADD ACTIVE ITEMS
// menuHeaderList.forEach((item) => {
//   console.log(item);

//   item.addEventListener("click", () => {
//     removeActiveItem();
//     item.classList.add("active");
//     console.log(item.id);
//     if (item.id == "weekday_lunch") {
//       weekdayLunchDishes.style.display = "flex";
//       dinnerDishes.style.display = "none";
//     } else if (item.id == "dinner") {
//       console.log(item.id);
//       weekdayLunchDishes.style.display = "none";
//       dinnerDishes.style.display = "flex";
//     } else console.log("paynai");
//   });
// });
