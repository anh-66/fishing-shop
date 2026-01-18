function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("total-price");

  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
  <h3>${item.name}</h3>
  <p>Giá: ${item.price.toLocaleString()} VNĐ</p>

  <div class="quantity-control">
    <button onclick="decreaseQuantity(${index})">-</button>
    <span>${item.quantity}</span>
    <button onclick="increaseQuantity(${index})">+</button>
  </div>

  <p>Thành tiền: ${(item.price * item.quantity).toLocaleString()} VNĐ</p>
  <button onclick="removeFromCart(${index})">Xóa</button>
`;
    cartItemsDiv.appendChild(div);
  });

  totalPriceEl.innerText = "Tổng tiền: " + total.toLocaleString() + " VNĐ";
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const countEl = document.getElementById("cart-count");
  if (countEl) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countEl.innerText = totalItems;
  }
}

updateCartCount();

function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

const clearCartBtn = document.getElementById("clear-cart");

if (clearCartBtn) {
  clearCartBtn.addEventListener("click", function () {
    const confirmClear = confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?");
    if (confirmClear) {
      localStorage.removeItem("cart");
      loadCart();
      updateCartCount();
    }
  });
}

function loadCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderDiv = document.getElementById("order-summary");
  const totalDiv = document.getElementById("checkout-total");

  if (!orderDiv || !totalDiv) return;

  orderDiv.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Số lượng: ${item.quantity}</p>
      <p>Thành tiền: ${(item.price * item.quantity).toLocaleString()} VNĐ</p>
    `;
    orderDiv.appendChild(div);
  });

  totalDiv.innerText = "Tổng tiền: " + total.toLocaleString() + " VNĐ";
}

loadCheckout();

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
 checkoutForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  const newOrder = {
    id: Date.now(),
    name,
    phone,
    address,
    items: cart,
    total,
    date: new Date().toLocaleString("vi-VN")
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");
  updateCartCount();

  alert("🎉 Đặt hàng thành công! Đơn hàng đã được lưu.");

  window.location.href = "index.html";
});
}

function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersDiv = document.getElementById("orders-list");

  if (!ordersDiv) return;

  ordersDiv.innerHTML = "";

  if (orders.length === 0) {
    ordersDiv.innerHTML = "<p>Bạn chưa có đơn hàng nào.</p>";
    return;
  }

  orders.forEach(order => {
    const div = document.createElement("div");
    div.className = "product";

    let itemsHTML = "";
    order.items.forEach(item => {
      itemsHTML += `
        <li>${item.name} × ${item.quantity} (${(item.price * item.quantity).toLocaleString()} VNĐ)</li>
      `;
    });

    div.innerHTML = `
      <h3>🧾 Mã đơn: ${order.id}</h3>
      <p><strong>Khách hàng:</strong> ${order.name}</p>
      <p><strong>SĐT:</strong> ${order.phone}</p>
      <p><strong>Địa chỉ:</strong> ${order.address}</p>
      <p><strong>Thời gian:</strong> ${order.date}</p>
      <ul>${itemsHTML}</ul>
      <p><strong>Tổng tiền:</strong> ${order.total.toLocaleString()} VNĐ</p>
    `;

    ordersDiv.appendChild(div);
  });
}

loadOrders();