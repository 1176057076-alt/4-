const key='lumea_cart_v1';
const getCart=()=>JSON.parse(localStorage.getItem(key)||'[]');
const setCart=(c)=>localStorage.setItem(key,JSON.stringify(c));
const addItem=(item)=>{const c=getCart();const f=c.find(i=>i.id===item.id);if(f)f.qty+=1;else c.push({...item,qty:1});setCart(c);updateBadge();};
const total=(c)=>c.reduce((s,i)=>s+i.price*i.qty,0);
function updateBadge(){document.querySelectorAll('[data-cart-badge]').forEach(el=>{el.textContent=getCart().reduce((n,i)=>n+i.qty,0)});} 
updateBadge();

document.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>{addItem(JSON.parse(btn.dataset.add));btn.textContent='已加入';setTimeout(()=>btn.textContent='加入购物袋',900);}));

const list=document.getElementById('cart-list');
if(list){const c=getCart();list.innerHTML='';c.forEach(i=>{const li=document.createElement('div');li.className='panel';li.innerHTML=`<strong>${i.name}</strong><p class="muted">¥${i.price} × ${i.qty}</p>`;list.appendChild(li)});document.getElementById('cart-total').textContent='¥'+total(c);}

const checkout=document.getElementById('checkout-form');
if(checkout){checkout.addEventListener('submit',(e)=>{e.preventDefault();if(getCart().length===0){alert('购物袋为空');return;}localStorage.removeItem(key);location.href='success.html';});}

const filters=document.querySelectorAll('[data-filter]');
if(filters.length){filters.forEach(f=>f.addEventListener('click',()=>{const cat=f.dataset.filter;document.querySelectorAll('.product-card').forEach(c=>{c.style.display=cat==='all'||c.dataset.cat===cat?'block':'none';});}));}
