// var buttonActive = document.querySelector(".Button");
// console.log(buttonActive);
// buttonActive.addEventListener('click',function(){
//     if(buttonActive=="Button p-4")
//     {
//         buttonActive.classList.add('active');
//     }
// })

const orderData = [];
const itemData = [];
const orderDatahis = [];
const itemDatahis = [];
// console.log("Eureka!");

function active(num) {
  const home = document.getElementById("core_container_home");
  const orderHistory = document.getElementById("core_container_Order-History");
  const Messages = document.getElementById("core_container_Messages");
  const FoodReady = document.getElementById("core_container_food_ready");

  const buttonHome = document.getElementById("home");
  const buttonOrderHistory = document.getElementById("Order_History");
  const buttonFoodReady = document.getElementById("food_ready");
  const buttonMessages = document.getElementById("Messages");
  if (num == 1) {
    home.style.display = "block";
    orderHistory.style.display = "none";
    FoodReady.style.display = "none";
    Messages.style.display = "none";
    buttonHome.classList.add("active");
    buttonOrderHistory.classList.remove("active");
    buttonMessages.classList.remove("active");
    buttonFoodReady.classList.remove("active");
    onload();
  } else if (num == 2) {
    home.style.display = "none";
    orderHistory.style.display = "block";
    FoodReady.style.display = "none";
    Messages.style.display = "none";
    buttonHome.classList.remove("active");
    buttonOrderHistory.classList.add("active");
    buttonMessages.classList.remove("active");
    buttonFoodReady.classList.remove("active");
    foodHistory();
  } else if (num == 3) {
    home.style.display = "none";
    orderHistory.style.display = "none";
    FoodReady.style.display = "block";
    Messages.style.display = "none";
    buttonHome.classList.remove("active");
    buttonOrderHistory.classList.remove("active");
    buttonFoodReady.classList.add("active");
    buttonMessages.classList.remove("active");
    foodReady();
  } else if (num == 4) {
    home.style.display = "none";
    orderHistory.style.display = "none";
    FoodReady.style.display = "none";
    Messages.style.display = "block";
    buttonHome.classList.remove("active");
    buttonOrderHistory.classList.remove("active");
    buttonFoodReady.classList.remove("active");
    buttonMessages.classList.add("active");
  }
}
function foodReady() {
  var ORP = document.getElementById("order_Ready_parent");
  if (ORP != null || ORP != "") {
    ORP.innerHTML = "";
  }
  fetch("http://192.168.2.102:8095/api/order/getallorderlist")
    .then((response) => response.json())
    .then((orderdata) => {
      console.log("food ready started");

      console.log(orderdata);
      // load();
      // const a = orderData.length;
      // console.log(orderdata);
      console.log(itemData);
      //     console.log(a);
      // const a = orderData.length;
      console.log(orderData);
      var z = 0;
      for (var i = orderdata.length - 1; i > 0; i--) {
        // console.log("hi");
        for (var j = 0; j < itemData.length; j++) {
          if (orderdata[i].order_status == "cooking") {
            // if (orderdata[i].item_id == itemData[j].id) {
            var imgpath = itemData[j].imagePath;
            let pathArray = imgpath.split("\\");
            let newPath = pathArray.slice(2).join("\\");
            // console.log(imgpath);
            var p = orderdata[i].order_total_cost / orderdata[i].quantity;
            var tb = document.getElementById("order_Ready_parent");
            // tb.innerHTML="";
            var x = document.createElement("div");
            x.style.width = "45%";
            x.style.paddingRight = "25px";
            x.innerHTML = `
                    <div id="order_list_one" class="p-3 m-3 bg-white w-100 rounded-3">
                    <!-- <div id="order_list" class=""> -->
                      <div class="d-flex justify-content-between">
                        <div class="text-start m-2">
                          <h5>Order #TN-<label>${orderdata[i].table_number}</label></h5>
                          <p>${orderdata[i].order_datetime}</p>
                        </div>
                        <img
                          class="profile_photo"
                          src="/images/user_icon_1.png"
                          alt=""
                        />
                      </div>
                      <div id="readyoverflow${z}" class="">
                      </div>
                      <div
                        class="m-3"
                        style="height: 1.2px; background: #c1c3cd"
                      ></div>
                      <div class="d-flex justify-content-between">
                        <div class="text-start">
                          <p style="font-size: larger">1 Items</p>
                          <h3>$${orderdata[i].order_total_cost}</h3>
                        </div>
                        <div class="text-center pt-3">
                          <p
                            id="conform"
                            onclick="orderselectionone(${orderdata[i].order_id},'cooking')"
                            class="btn btn-outline-success"
                          >
                            Cooking start
                          </p>
                        </div>
                      </div>
                    <!-- </div> -->
                  </div>
                  `;
            console.log(z);
            z++;
            // tb.innerText=orderData[i].tablenumber;
            var img = document.querySelector(".foodItem_photo");
            // console.log(img);
            // img.setAttribute("src", newPath);
            tb.appendChild(x);
            // var itemOverflow=document.getElementById("overflow");
            j = j + 100;
            // console.log("readyoverflow",document.getElementById(`readyoverflow-${z}`));

            // }
          }
          // console.log("hello")
        }
      }
      foodreadyOverflow(orderdata, itemData);
    });
}
function foodreadyOverflow(orderData, itemData) {
  console.log("foodreadyOverflow start");

  console.log(orderData);
  console.log(itemData);
  var m = 0;
  for (var i = orderData.length - 1; i > 0; i--) {
    // debugger
    if (orderData[i].order_status == "cooking") {
      var p = orderData[i].order_total_cost / orderData[i].quantity;
      // console.log(itemOverflow);
      for (var x = 0; x < orderData[i].item_id.length; x++) {
        for (var j = 0; j < itemData.length; j++) {
          if (orderData[i].item_id[x] == itemData[j].id) {
            var itemOverflow = document.getElementById("readyoverflow" + m);
            var imgpath = itemData[j].imagePath;
            let pathArray = imgpath.split("\\");
            let newPath = pathArray.slice(2).join("\\");
            var newdiv = document.createElement("div");
            newdiv.innerHTML = `
                      <div class="d-flex justify-content-around mb-4">
                      <img id=img5
                        class="foodItem_photo me-5"
                        src="/${newPath}"
                        alt=""
                      />
                      <div>
                        <h5>${itemData[j].name}</h5>
                        <p id="dis">${itemData[j].description}</p>
                        <div class="d-flex justify-content-around">
                          <h5>$${itemData[j].price}</h5>
                          <h5>Qty:${orderData[i].quantity[x]}</h5>
                        </div>
                      </div>
                    </div>
                  `;
            // var ll= orderData[i].item_id[x];

            itemOverflow.appendChild(newdiv);

            j = j + 100;
          }

          // }
        }
      }
      console.log("append", itemOverflow);
      console.log("m", m);
      m++;
      // console.log(itemOverflow);
    }
  }
}
function foodHistory() {
  var OCH = document.getElementById("order_Cards_In_History");
  if (OCH != null || OCH != "") {
    OCH.innerHTML = "";
  }
  fetch("http://192.168.2.102:8095/api/order/getallorderlist")
    .then((response) => response.json())
    .then((orderdata) => {
      // console.log("food ready started");

      console.log(orderdata);
      // load();
      // const a = orderData.length;
      // console.log(orderdata);
      console.log(itemData);
      //     console.log(a);
      // const a = orderData.length;
      console.log(orderData);
      var z = 0;
      for (var i = orderdata.length - 1; i > 0; i--) {
        // console.log("hi");
        for (var j = 0; j < itemData.length; j++) {
          if (orderdata[i].order_status == "ready") {
            // if (orderdata[i].item_id == itemData[j].id) {
            var imgpath = itemData[j].imagePath;
            let pathArray = imgpath.split("\\");
            let newPath = pathArray.slice(2).join("\\");
            // console.log(imgpath);
            var p = orderdata[i].order_total_cost / orderdata[i].quantity;
            var tb = document.getElementById("order_Cards_In_History");
            // tb.innerHTML="";
            var x = document.createElement("div");
            x.style.width = "45%";
            x.style.paddingRight = "25px";
            x.innerHTML = `
                    <div id="order_list_one" class="p-3 m-3 bg-white w-100 rounded-3">
                    <!-- <div id="order_list" class=""> -->
                      <div class="d-flex justify-content-between">
                        <div class="text-start m-2">
                          <h5>Order #TN-<label>${orderdata[i].table_number}</label></h5>
                          <p>${orderdata[i].order_datetime}</p>
                        </div>
                        <img
                          class="profile_photo"
                          src="/images/user_icon_1.png"
                          alt=""
                        />
                      </div>
                      <div id="historyoverflow${z}" class="">
                      </div>
                      <div
                        class="m-3"
                        style="height: 1.2px; background: #c1c3cd"
                      ></div>
                      <div class="d-flex justify-content-between">
                        <div class="text-start">
                          <p style="font-size: larger">1 Items</p>
                          <h3>$${orderdata[i].order_total_cost}</h3>
                        </div>
                        <div class="text-center pt-3">
                          <p
                            id="conform"
                            class="btn btn-outline-success"
                          >
                            food ready
                          </p>
                        </div>
                      </div>
                    <!-- </div> -->
                  </div>
                  `;
            console.log(z);
            z++;
            // tb.innerText=orderData[i].tablenumber;
            var img = document.querySelector(".foodItem_photo");
            // console.log(img);
            // img.setAttribute("src", newPath);
            tb.appendChild(x);
            // var itemOverflow=document.getElementById("overflow");
            j = j + 100;
            // console.log("readyoverflow",document.getElementById(`readyoverflow-${z}`));

            // }
          }
          // console.log("hello")
        }
      }
      foodhistoryOverflow(orderdata, itemData);
    });
}
function foodhistoryOverflow(orderData, itemData) {
  console.log("foodreadyOverflow start");

  console.log(orderData);
  console.log(itemData);
  var m = 0;
  for (var i = orderData.length - 1; i > 0; i--) {
    // debugger
    if (orderData[i].order_status == "ready") {
      var p = orderData[i].order_total_cost / orderData[i].quantity;
      // console.log(itemOverflow);
      for (var x = 0; x < orderData[i].item_id.length; x++) {
        for (var j = 0; j < itemData.length; j++) {
          var itemOverflow = document.getElementById("historyoverflow" + m);

          if (orderData[i].item_id[x] == itemData[j].id) {
            var imgpath = itemData[j].imagePath;
            let pathArray = imgpath.split("\\");
            let newPath = pathArray.slice(2).join("\\");
            var newdiv = document.createElement("div");
            newdiv.innerHTML = `
                      <div class="d-flex justify-content-around mb-4">
                      <img id=img5
                        class="foodItem_photo me-5"
                        src="/${newPath}"
                        alt=""
                      />
                      <div>
                        <h5>${itemData[j].name}</h5>
                        <p id="dis">${itemData[j].description}</p>
                        <div class="d-flex justify-content-around">
                          <h5>$${itemData[j].price}</h5>
                          <h5>Qty:${orderData[i].quantity[x]}</h5>
                        </div>
                      </div>
                    </div>
                  `;
            // var ll= orderData[i].item_id[x];

            itemOverflow.appendChild(newdiv);

            j = j + 100;
          }

          // }
        }
      }
      console.log("append", itemOverflow);
      console.log("m", m);
      m++;
      // console.log(itemOverflow);
    }
  }
}
// conformOder
function orderselectionone(id, status) {
  // var value ="false";
  //?value=true
  console.log(id, status);
  const obj = {
    order_status: status,
  };

  console.log(obj);
  fetch(`http://192.168.2.103:50/api/order/${id}`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
      // "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("success", data);
      //window.location.href="http://127.0.0.1:5001/Admin/viewOrders.html";
    })
    .catch((err) => {
      console.log("error:", err);
      //window.location.href="http://127.0.0.1:5001/Admin/viewOrders.html";
    });
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

// function hi() {
//   fetch("http://192.168.2.102:85/GetAllDishItems")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//     });
// }
// var op = document.querySelectorAll("option");
// var s = (op[1].selected = true);
// console.log(s);

//get order informations url => http://192.168.2.103:50/api/order/getallorderlist

function onload() {
  // const alllist=[];
  // const orderData=[];
  // const itemData=[];
  fetch("http://192.168.2.102:8095/api/order/getallorderlist")
    .then((response) => response.json())
    .then((orderdata) => {
      orderDatalength = orderData.length;
      orderdata.forEach((item) => {
        const obj = { ...item }; // spread operator (...)
        // pushing objects to array
        orderData.push(obj);
        // alllist.push(obj);
        // console.log(orderData.length);
      });
      // console.log(alllist);
      // load();
    });
  // console.log(orderdata);
  fetch("http://192.168.2.102:8095/GetAllDishItems")
    .then((response) => response.json())
    .then((itemdata) => {
      // console.log(itemdata);
      itemdata.forEach((item) => {
        const obj = { ...item }; // spread operator (...)
        // pushing objects to array
        itemData.push(obj);
        // alllist.push(obj);
      });
      load();
      // history();
      // console.log(alllist);
    });
}
onload();

function load() {
  var PO = document.getElementById("parentOrder");
  if (PO != null || PO != "") {
    PO.innerHTML = "";
  }
  // const a = orderData.length;
  console.log(orderData);
  console.log(itemData);
  var z = 0;
  for (var i = orderData.length - 1; i > 0; i--) {
    // console.log("hi");
    for (var j = 0; j < itemData.length; j++) {
      if (orderData[i].order_status == "conformed") {
        if (orderData[i].item_id == itemData[j].id) {
          var imgpath = itemData[j].imagePath;
          let pathArray = imgpath.split("\\");
          let newPath = pathArray.slice(2).join("\\");
          // console.log(imgpath);
          var p = orderData[i].order_total_cost / orderData[i].quantity;
          var tb = document.getElementById("parentOrder");
          // tb.innerHTML="";
          var x = document.createElement("div");
          x.style.width = "45%";
          x.style.paddingRight = "25px";
          x.innerHTML = `
               <div id="order_list_one" class="p-3 m-3 bg-white w-100 rounded-3">
               <!-- <div id="order_list" class=""> -->
                 <div class="d-flex justify-content-between">
                   <div class="text-start m-2">
                     <h5>Order #TN-<label>${orderData[i].table_number}</label></h5>
                     <p>${orderData[i].order_datetime}</p>
                   </div>
                   <img
                     class="profile_photo"
                     src="/images/user_icon_1.png"
                     alt=""
                   />
                 </div>
                 <div id="overflow${z}" class="">
                 </div>
                 <div
                   class="m-3"
                   style="height: 1.2px; background: #c1c3cd"
                 ></div>
                 <div class="d-flex justify-content-between">
                   <div class="text-start">
                     <p style="font-size: larger">1 Items</p>
                     <h3>$${orderData[i].order_total_cost}</h3>
                   </div>
                   <div class="text-center pt-3">
                     <p
                       id="conform"
                       onclick="orderselectionone(${orderData[i].order_id},'cooking')"
                       class="btn btn-outline-success"
                     >
                      Cooking start
                     </p>
                   </div>
                 </div>
               <!-- </div> -->
             </div>
             `;
          console.log(z);
          z++;
          // tb.innerText=orderData[i].tablenumber;
          var img = document.querySelector(".foodItem_photo");
          // console.log(img);
          // img.setAttribute("src", newPath);
          tb.appendChild(x);
          // var itemOverflow=document.getElementById("overflow");
          j = j + 8;
        }
      }
      // console.log("hello")
    }
  }
  forOverflow(orderData, itemData);
}
function forOverflow(orderData, itemData) {
  console.log(orderData);
  console.log(itemData);
  var m = 0;
  for (var i = orderData.length - 1; i > 0; i--) {
    // debugger
    if (orderData[i].order_status == "conformed") {
      var p = orderData[i].order_total_cost / orderData[i].quantity;
      // console.log(itemOverflow);
      for (var x = 0; x < orderData[i].item_id.length; x++) {
        for (var j = 0; j < itemData.length; j++) {
          var itemOverflow = document.getElementById("overflow" + m);
          // if (orderData[i].item_id == itemData[j].id)
          // {
          //   // var itemOverflow=document.getElementById("overflow"+m);
          //   // console.log("tu",m);
          //   m++;
          // }
          if (orderData[i].item_id[x] == itemData[j].id) {
            // var itemOverflow=document.getElementById("overflow"+m);
            // console.log("tu",m);
            // m++;
            // console.log(itemOverflow);
            var imgpath = itemData[j].imagePath;
            let pathArray = imgpath.split("\\");
            let newPath = pathArray.slice(2).join("\\");
            var newdiv = document.createElement("div");
            newdiv.innerHTML = `
                       <div class="d-flex justify-content-around mb-4">
                       <img id=img5
                         class="foodItem_photo me-5"
                         src="/${newPath}"
                         alt=""
                       />
                       <div>
                         <h5>${itemData[j].name}</h5>
                         <p id="dis">${itemData[j].description}</p>
                         <div class="d-flex justify-content-around">
                           <h5>$${itemData[j].price}</h5>
                           <h5>Qty:${orderData[i].quantity[x]}</h5>
                         </div>
                       </div>
                     </div>
                   `;
            // var ll= orderData[i].item_id[x];
            // if(itemOverflow!=null){
            itemOverflow.appendChild(newdiv);
            // }
            j = j + 100;
          }

          // }
        }
      }
      console.log("m", m);
      if (m < 18) {
        m++;
      }
      // console.log(itemOverflow);
    }
  }
}
