// var buttonActive = document.querySelector(".Button");
// console.log(buttonActive);
// buttonActive.addEventListener('click',function(){
//     if(buttonActive=="Button p-4")
//     {
//         buttonActive.classList.add('active');
//     }
// })
console.log("Eureka!");

function active(num) {
  const home = document.getElementById("core_container_home");
  const orderHistory = document.getElementById("core_container_Order-History");
  const Messages = document.getElementById("core_container_Messages");
  const Statistics = document.getElementById("core_container_Statistics");
  const Setting = document.getElementById("core_container_Setting");
  const AddFoodItem = document.getElementById("core_container_Add-food-item");

  const buttonHome = document.getElementById("home");
  const buttonOrderHistory = document.getElementById("Order_History");
  const buttonAddFoodItem = document.getElementById("Add_food_item");
  const buttonMessages = document.getElementById("Messages");
  const buttonStatistics = document.getElementById("Statistics");
  const buttonSetting = document.getElementById("Setting");
  if (num == 1) {
    home.style.display = "block";
    orderHistory.style.display = "none";
    AddFoodItem.style.display = "none";
    Messages.style.display = "none";
    Statistics.style.display = "none";
    Setting.style.display = "none";
    buttonHome.classList.add("active");
    buttonOrderHistory.classList.remove("active");
    buttonMessages.classList.remove("active");
    buttonStatistics.classList.remove("active");
    buttonSetting.classList.remove("active");
    buttonAddFoodItem.classList.remove("active");
  } else if (num == 2) {
    home.style.display = "none";
    orderHistory.style.display = "block";
    AddFoodItem.style.display = "none";
    Messages.style.display = "none";
    Statistics.style.display = "none";
    Setting.style.display = "none";
    buttonHome.classList.remove("active");
    buttonOrderHistory.classList.add("active");
    buttonMessages.classList.remove("active");
    buttonStatistics.classList.remove("active");
    buttonSetting.classList.remove("active");
    buttonAddFoodItem.classList.remove("active");
  } else if (num == 3) {
    home.style.display = "none";
    orderHistory.style.display = "none";
    AddFoodItem.style.display = "block";
    Messages.style.display = "none";
    Statistics.style.display = "none";
    Setting.style.display = "none";
    buttonHome.classList.remove("active");
    buttonOrderHistory.classList.remove("active");
    buttonAddFoodItem.classList.add("active");
    buttonMessages.classList.remove("active");
    buttonStatistics.classList.remove("active");
    buttonSetting.classList.remove("active");
  } else if (num == 4) {
    home.style.display = "none";
    orderHistory.style.display = "none";
    AddFoodItem.style.display = "none";
    Messages.style.display = "block";
    Statistics.style.display = "none";
    Setting.style.display = "none";
    buttonHome.classList.remove("active");
    buttonOrderHistory.classList.remove("active");
    buttonAddFoodItem.classList.remove("active");
    buttonMessages.classList.add("active");
    buttonStatistics.classList.remove("active");
    buttonSetting.classList.remove("active");
  } else if (num == 5) {
    home.style.display = "none";
    orderHistory.style.display = "none";
    AddFoodItem.style.display = "none";
    Messages.style.display = "none";
    Statistics.style.display = "block";
    Setting.style.display = "none";
    buttonHome.classList.remove("active");
    buttonOrderHistory.classList.remove("active");
    buttonAddFoodItem.classList.remove("active");
    buttonMessages.classList.remove("active");
    buttonStatistics.classList.add("active");
    buttonSetting.classList.remove("active");
  } else if (num == 6) {
    home.style.display = "none";
    orderHistory.style.display = "none";
    AddFoodItem.style.display = "none";
    Messages.style.display = "none";
    Statistics.style.display = "none";
    Setting.style.display = "block";
    buttonHome.classList.remove("active");
    buttonOrderHistory.classList.remove("active");
    buttonAddFoodItem.classList.remove("active");
    buttonMessages.classList.remove("active");
    buttonStatistics.classList.remove("active");
    buttonSetting.classList.add("active");
  }
}

// conformOder
function orderselectionone(num) {
  const parentOrderList = document.getElementById("order_list_one");
  // const order = document.getElementById("order_list");
  const orderCardsInHistory = document.getElementById("order_Cards_In_History");
  console.log("inside fun", parentOrderList);
  // const firstOrder = document.getElementById("first_order");
  if (num == 1) {
    console.log(1, orderCardsInHistory);
    var a = orderCardsInHistory.appendChild(parentOrderList);
    // parentOrderList.style.display="none";
    console.log(a);
  }
}
function orderselectiontwo(num) {
  const parentOrderList = document.getElementById("order_list_two");
  // const order = document.getElementById("order_list");
  const orderCardsInHistory = document.getElementById("order_Cards_In_History");
  console.log("inside fun", parentOrderList);
  // const firstOrder = document.getElementById("first_order");
  if (num == 1) {
    console.log(1, orderCardsInHistory);
    var a = orderCardsInHistory.appendChild(parentOrderList);
    // parentOrderList.style.display="none";
    console.log(a);
  }
}

//add list
function addDishItems() {
  var Name = document.getElementById("Name").value;
  console.log(Name);
  var ParentMenuID = document.getElementById("parentMenuID").value;
  console.log(ParentMenuID);
  var Price = document.getElementById("Price").value;
  console.log(Price);
  var Description = document.getElementById("Description").value;
  console.log(Description);
  var fileInput = document.getElementById("ImageFile");
  const file = fileInput.files[0];
  console.log("Full Image: " + file);
  console.log("Image Name: " + file.name);
  console.log("Image Type: " + file.type);
  console.log("Splited Type: " + file.type.split("/")[1]);
  //   random name
  const randomString = Math.random().toString(36).substring(2);
  const timestamp = Date.now();
  const imageType = file.type.split("/")[1];
  const randomName = `${randomString}-${timestamp}.${imageType}`;
  console.log(randomName);
  const formData = new FormData();
  formData.append("Name", Name);
  formData.append("ParentMenuID", ParentMenuID);
  formData.append("Price", Price);
  formData.append("Description", Description);
  formData.append("Image", file);
  formData.append("ImageName", randomName);
  console.log(formData);

  fetch(" http://localhost:85/AddDishItems", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data" + data);
    })
    .catch((err) => console.log(err));

  // clear input fields
  const inputs = document.querySelectorAll("input,textarea");
  document.getElementById("parentMenuID");
  inputs.forEach((input) => {
    // console.log(input);
    input.value = "";
  });
}

function hi() {
  fetch("http://192.168.2.102:85/GetAllDishItems")
    .then((response) => response.json())
    .then((person1) => {
      console.log(person1);
    });
}
function SideBar() {
  fetch("http://192.168.2.102:85/GetAllSidebarItems")
    .then((response) => response.json())
    .then((person1) => {
      console.log(person1);
    });
}
SideBar();
var op = document.querySelectorAll("option");
var s = (op[1].selected = true);
console.log(s);
