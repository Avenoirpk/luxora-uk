const products=[
 {id:1,name:"Fresh Carrots",desc:"Organic • 500g",price:2.90,tag:"-20%",bg:"#ffe8a9",img:"https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=500&q=85"},
 {id:2,name:"Fresh Capsicum",desc:"Red pepper • 1kg",price:3.40,tag:"-15%",bg:"#ffd1cf",img:"https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=500&q=85"},
 {id:3,name:"Mustard Greens",desc:"Green leaves • 500g",price:2.90,tag:"NEW",bg:"#d9e9bf",img:"https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=500&q=85"},
 {id:4,name:"Fresh Radish",desc:"Pink radish • 1kg",price:2.90,tag:"-10%",bg:"#f1d5e8",img:"https://images.unsplash.com/photo-1593026125722-9d7e2f4a2a17?auto=format&fit=crop&w=500&q=85"},
 {id:5,name:"Avocado",desc:"Premium • 2 pcs",price:4.80,tag:"BEST",bg:"#d7e9c2",img:"https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=85"},
 {id:6,name:"Cherry Tomatoes",desc:"Sweet • 250g",price:3.20,tag:"NEW",bg:"#ffd4c9",img:"https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=500&q=85"},
 {id:7,name:"Broccoli",desc:"Fresh green • 500g",price:3.90,tag:"-12%",bg:"#d8e9d2",img:"https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=85"},
 {id:8,name:"Red Onion",desc:"Crisp • 1kg",price:2.60,tag:"-10%",bg:"#ead6e8",img:"https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=500&q=85"}
];
let cart=JSON.parse(localStorage.getItem("avenoir-cart")||"[]"), offset=0;
const productsEl=document.getElementById("products");
function render(){let shown=[0,1,2,3].map(i=>products[(i+offset)%products.length]);productsEl.innerHTML=shown.map(p=>`<article class="product"><div class="pimg" style="background:${p.bg}"><span class="tag">${p.tag}</span><img src="${p.img}" alt="${p.name}"></div><div class="pbody"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">$${p.price.toFixed(2)}</span><button class="add" onclick="addToCart(${p.id})">+</button></div></div></article>`).join("")}
function addToCart(id){const p=products.find(x=>x.id===id), old=cart.find(x=>x.id===id);old?old.qty++:cart.push({...p,qty:1});save();openCart()}
function save(){localStorage.setItem("avenoir-cart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);renderCart()}
function renderCart(){const el=document.getElementById("cartItems");el.innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><img src="${x.img}" alt=""><div><b>${x.name}</b><small>$${x.price.toFixed(2)} × ${x.qty}</small></div><button onclick="removeItem(${x.id})" style="margin-left:auto;border:0;background:transparent;cursor:pointer">×</button></div>`).join(""):'<p style="color:#999;font-size:13px;padding-top:25px">Your cart is empty.</p>';document.getElementById("cartTotal").textContent="$"+cart.reduce((a,x)=>a+x.price*x.qty,0).toFixed(2)}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save()}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("next").onclick=()=>{offset=(offset+1)%products.length;render()};document.getElementById("prev").onclick=()=>{offset=(offset-1+products.length)%products.length;render()};
document.getElementById("searchInput").addEventListener("input",e=>{const q=e.target.value.toLowerCase();const matches=products.filter(p=>(p.name+" "+p.desc).toLowerCase().includes(q));productsEl.innerHTML=matches.map(p=>`<article class="product"><div class="pimg" style="background:${p.bg}"><span class="tag">${p.tag}</span><img src="${p.img}" alt="${p.name}"></div><div class="pbody"><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">$${p.price.toFixed(2)}</span><button class="add" onclick="addToCart(${p.id})">+</button></div></div></article>`).join("")||'<p style="grid-column:1/-1;color:#888">No products found.</p>'});
document.getElementById("checkout").onclick=()=>alert("Checkout demo: connect your preferred payment/order backend here.");
render();save();