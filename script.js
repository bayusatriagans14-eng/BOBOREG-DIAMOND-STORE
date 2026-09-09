const ADMIN_WHATSAPP = "6281234567890";
let selectedDiamond = null;
let cart = [];

function selectDiamond(amount, price, element) {
  selectedDiamond = {amount, price};
  document.querySelectorAll(".diamond-grid button").forEach(b => b.classList.remove("selected"));
  element.classList.add("selected");
}
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(number);
}
function sendWhatsApp(message) {
  window.open("https://wa.me/"+ADMIN_WHATSAPP+"?text="+encodeURIComponent(message),"_blank");
}
function orderDiamond() {
  const gameId=document.getElementById("gameId").value.trim();
  const serverId=document.getElementById("serverId").value.trim();
  const phone=document.getElementById("customerPhone").value.trim();
  if(!gameId)return alert("Silakan masukkan ID Game.");
  if(!serverId)return alert("Silakan masukkan Server ID.");
  if(!phone)return alert("Silakan masukkan nomor WhatsApp.");
  if(!selectedDiamond)return alert("Silakan pilih jumlah Diamond.");
  sendWhatsApp(`Halo LEK BAYU STORE 👋\n\nSaya ingin melakukan Top Up Mobile Legends.\n\n🎮 ID Game: ${gameId}\n🆔 Server ID: ${serverId}\n💎 Diamond: ${selectedDiamond.amount}\n💰 Harga: ${formatRupiah(selectedDiamond.price)}\n📱 WhatsApp: ${phone}\n\nMohon informasi pembayaran dan proses selanjutnya.\n\nTerima kasih.`);
}
function addSkin(name){cart.push(name);updateCart();openCart();}
function updateCart(){
  document.getElementById("cartCount").textContent=cart.length;
  const container=document.getElementById("cartItems");
  if(!cart.length){container.innerHTML='<p class="empty">Belum ada pesanan.</p>';return;}
  container.innerHTML="";
  cart.forEach((item,index)=>{
    const div=document.createElement("div");div.className="cart-item";
    div.innerHTML=`<span>🎨 ${item}</span><button class="remove" onclick="removeCart(${index})">Hapus</button>`;
    container.appendChild(div);
  });
}
function removeCart(index){cart.splice(index,1);updateCart();}
function openCart(){document.getElementById("cartOverlay").classList.add("active");}
function closeCart(event){if(!event||event.target.id==="cartOverlay")document.getElementById("cartOverlay").classList.remove("active");}
function orderCart(){
  if(!cart.length)return alert("Belum ada skin yang dipilih.");
  let message="Halo LEK BAYU STORE 👋\n\nSaya ingin memesan skin Mobile Legends:\n\n";
  cart.forEach((item,index)=>message+=`${index+1}. ${item}\n`);
  message+="\nMohon informasi harga, ketersediaan dan proses pembelian.\n\nTerima kasih.";
  sendWhatsApp(message);
}
function filterSkins(){
  const search=document.getElementById("searchSkin").value.toLowerCase();
  const category=document.getElementById("categoryFilter").value;
  document.querySelectorAll(".skin-card").forEach(card=>{
    const matchName=card.dataset.name.includes(search);
    const matchCategory=category==="all"||card.dataset.category===category;
    card.style.display=matchName&&matchCategory?"":"none";
  });
}
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("contactWhatsapp").href="https://wa.me/"+ADMIN_WHATSAPP;
  updateCart();
});
