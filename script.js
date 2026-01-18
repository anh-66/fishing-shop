const products = [
  {
    id: 1,
    name: "Cần câu Carbon",
    price: 1200000,
  },
  {
    id: 2,
    name: "Máy câu Shimano",
    price: 2500000,
  },
];

console.log("Danh sách sản phẩm:", products);

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find(p => p.id === productId);

  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Đã thêm vào giỏ hàng!");
}