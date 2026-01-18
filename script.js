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

  const product = products.find((p) => p.id === productId);
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Đã thêm vào giỏ hàng!");
}
