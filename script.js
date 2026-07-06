/* ============ MAHOOR · Premium Manteau Store ============ */
'use strict';

/* ---------- Helpers ---------- */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const faNum = n => n.toLocaleString('fa-IR');
const toman = n => faNum(n) + ' تومان';

/* ---------- Data ---------- */
const COLORS = {
  'مشکی': '#1c1c1c', 'کرم': '#e7d7bf', 'زیتونی': '#6b6b3a',
  'طوسی': '#8a8a8a', 'شرابی': '#7a2e3a'
};
const IMG = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg'
];
const src = (file, size = '') => `img/${file}`;

const PRODUCTS = [
  { id:1, name:'مانتو مجلسی آوا', cat:'مجلسی', price:2850000, old:3400000, rate:4.9, reviews:214, colors:['مشکی','شرابی','کرم'], sizes:['S','M','L','XL'], img:IMG[0], fabric:'کرپ ژاپنی درجه یک · آستر ساتن · دوخت دست', desc:'مانتویی بلند و باشکوه برای مهمانی‌های خاص؛ برشی زنانه با جزئیات دوختِ ظریف که اندام را می‌پوشاند و برازنده می‌کند.', new:true, trend:true },
  { id:2, name:'مانتو روزمره سِلین', cat:'روزمره', price:1290000, old:0, rate:4.7, reviews:389, colors:['کرم','طوسی','زیتونی'], sizes:['S','M','L'], img:IMG[3], fabric:'لینن نخی · تنفس‌پذیر · مناسب چهارفصل', desc:'راحتی و شیک بودن در یک قاب؛ مانتویی سبک برای استفاده‌ی روزانه، دانشگاه و محل کار.', new:false, trend:true },
  { id:3, name:'مانتو لاکچری رُها', cat:'لاکچری', price:4650000, old:5200000, rate:5.0, reviews:98, colors:['مشکی','شرابی'], sizes:['S','M','L','XL'], img:IMG[2], fabric:'مخمل کبریتی · دکمه صدفی · تولید محدود', desc:'شاهکار دوختِ دست از کالکشن امضای ماهور؛ برای زنی که کیفیت را می‌شناسد و می‌درخشد.', new:true, trend:true },
  { id:4, name:'مانتو پاییزه ثمین', cat:'فصلی', price:1980000, old:2300000, rate:4.6, reviews:156, colors:['زیتونی','طوسی','کرم'], sizes:['M','L','XL'], img:IMG[4], fabric:'کشمیر ترکیبی · گرم و سبک', desc:'همراه گرم روزهای خنک؛ رنگ‌های زمینی و برشی امروزی برای استایل پاییزی شما.', new:false, trend:false },
  { id:5, name:'مانتو مجلسی دیبا', cat:'مجلسی', price:3200000, old:0, rate:4.8, reviews:127, colors:['مشکی','کرم'], sizes:['S','M','L'], img:IMG[1], fabric:'ساتن مات · یقه هفت · کمربند مجزا', desc:'ظرافتی مدرن برای شب‌های به‌یادماندنی؛ درخششی آرام و کلاس بالا.', new:true, trend:false },
  { id:6, name:'مانتو روزمره نیکا', cat:'روزمره', price:1150000, old:1450000, rate:4.5, reviews:271, colors:['طوسی','مشکی','زیتونی'], sizes:['S','M','L','XL'], img:IMG[5], fabric:'گاباردین کش‌دار · ضدچروک', desc:'انتخابی هوشمندانه برای هر روز؛ ضدچروک، بادوام و همیشه مرتب.', new:false, trend:true },
  { id:7, name:'مانتو لاکچری آرتمیس', cat:'لاکچری', price:5400000, old:0, rate:5.0, reviews:64, colors:['مشکی','شرابی'], sizes:['S','M','L'], img:IMG[6], fabric:'ابریشم مصنوعی · گلدوزی دست · لیمیتد', desc:'اثری هنری بر تنِ شما؛ گلدوزی دستِ استادکاران ماهور، منحصر برای زنانِ خاص.', new:true, trend:true },
  { id:8, name:'مانتو بهاره پرنیان', cat:'فصلی', price:1690000, old:1990000, rate:4.7, reviews:203, colors:['کرم','زیتونی'], sizes:['S','M','L','XL'], img:IMG[7], fabric:'کتان لطیف · رنگ‌های روشن بهاری', desc:'نسیم بهار در قالب یک مانتو؛ سبک، خنک و پر از حس تازگی.', new:true, trend:false }
];

/* ---------- State ---------- */
let cart = [];
let wish = [];
let promoApplied = false;
let currentProduct = null;

/* ============ LOADER + PAGE LOAD ============ */
window.addEventListener('load', () => {
  setTimeout(() => {
    $('#loader').classList.add('hide');
    document.body.classList.add('loaded');
  }, 900);
});

/* ============ RENDER PRODUCTS ============ */
function cardHTML(p) {
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const stars = '★'.repeat(Math.round(p.rate)) + '☆'.repeat(5 - Math.round(p.rate));
  const dots = p.colors.map(c => `<i style="background:${COLORS[c]}"></i>`).join('');
  return `<article class="product-card tilt reveal" data-id="${p.id}" data-style="${p.cat}" data-color="${p.colors.join(',')}" data-size="${p.sizes.join(',')}" data-price="${p.price}">
    <div class="pc-media">
      <img src="${src(p.img)}" alt="${p.name}" loading="lazy"/>
      <div class="pc-tags">
        ${p.new ? '<span class="pc-tag new">جدید</span>' : ''}
        ${off ? `<span class="pc-tag off">${faNum(off)}٪ تخفیف</span>` : ''}
      </div>
      <button class="pc-wish ${wish.includes(p.id) ? 'on' : ''}" data-wish="${p.id}" aria-label="علاقه‌مندی">${wish.includes(p.id) ? '♥' : '♡'}</button>
      <div class="pc-quick"><button data-add="${p.id}">افزودن به سبد خرید</button></div>
    </div>
    <div class="pc-body">
      <div class="pc-cat">${p.cat}</div>
      <h3 class="pc-name">${p.name}</h3>
      <div class="pc-rate"><span class="s">${stars}</span> ${p.rate} · ${faNum(p.reviews)} نظر</div>
      <div class="pc-price">
        <b>${toman(p.price)}</b>
        ${p.old ? `<s>${toman(p.old)}</s>` : ''}
      </div>
      <div class="pc-colors">${dots}</div>
    </div>
  </article>`;
}

function renderCatalog() {
  const styleF = $('.chip.active').dataset.filterStyle;
  const colorF = $('#colorFilter').value;
  const sizeF = $('#sizeFilter').value;
  const priceF = $('#priceFilter').value;
  const sortF = $('#sortBy').value;

  let list = PRODUCTS.filter(p => {
    if (styleF !== 'all' && p.cat !== styleF) return false;
    if (colorF !== 'all' && !p.colors.includes(colorF)) return false;
    if (sizeF !== 'all' && !p.sizes.includes(sizeF)) return false;
    if (priceF === 'low' && p.price >= 1500000) return false;
    if (priceF === 'mid' && (p.price < 1500000 || p.price > 3000000)) return false;
    if (priceF === 'high' && p.price <= 3000000) return false;
    return true;
  });

  if (sortF === 'cheap') list.sort((a, b) => a.price - b.price);
  if (sortF === 'expensive') list.sort((a, b) => b.price - a.price);
  if (sortF === 'pop') list.sort((a, b) => b.reviews - a.reviews);

  $('#productsGrid').innerHTML = list.map(cardHTML).join('');
  $('#emptyNote').hidden = list.length !== 0;
  bindCards();
  observeReveals();
  initTilt();
}

function renderTrend() {
  $('#trendRail').innerHTML = PRODUCTS.filter(p => p.trend).map(cardHTML).join('');
}

/* ---------- Bind card interactions ---------- */
function bindCards() {
  $$('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('[data-wish]') || e.target.closest('[data-add]')) return;
      openProduct(+card.dataset.id);
    });
  });
  $$('[data-add]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); addToCart(+b.dataset.add); }));
  $$('[data-wish]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); toggleWish(+b.dataset.wish); }));
}

/* ============ FILTERS ============ */
$$('#styleFilter .chip').forEach(c => c.addEventListener('click', () => {
  $$('#styleFilter .chip').forEach(x => x.classList.remove('active'));
  c.classList.add('active'); renderCatalog();
}));
['colorFilter', 'sizeFilter', 'priceFilter', 'sortBy'].forEach(id => $('#' + id).addEventListener('change', renderCatalog));

// collection cards jump to filter
$$('.coll-card').forEach(c => c.addEventListener('click', () => {
  const cat = c.dataset.cat;
  $$('#styleFilter .chip').forEach(x => x.classList.toggle('active', x.dataset.filterStyle === cat));
  renderCatalog();
}));

/* ============ CART ============ */
function addToCart(id, color, size) {
  const p = PRODUCTS.find(x => x.id === id);
  color = color || p.colors[0]; size = size || p.sizes[0];
  const key = id + color + size;
  const ex = cart.find(i => i.key === key);
  if (ex) ex.qty++;
  else cart.push({ key, id, color, size, qty: 1 });
  updateCart(); toast(`«${p.name}» به سبد اضافه شد`);
  pulse('#cartCount');
}
function updateCart() {
  $('#cartCount').textContent = faNum(cart.reduce((s, i) => s + i.qty, 0));
  const box = $('#cartItems');
  if (!cart.length) { box.innerHTML = '<p class="empty-drawer">سبد خرید شما خالی است.</p>'; }
  else {
    box.innerHTML = cart.map(i => {
      const p = PRODUCTS.find(x => x.id === i.id);
      return `<div class="cart-item">
        <img src="${src(p.img, 200)}" alt="${p.name}"/>
        <div class="ci-info">
          <h4>${p.name}</h4>
          <span>${i.color} · سایز ${i.size}</span>
          <b>${toman(p.price * i.qty)}</b>
          <div class="ci-qty">
            <button data-dec="${i.key}">−</button><span>${faNum(i.qty)}</span><button data-inc="${i.key}">+</button>
          </div>
        </div>
        <button class="ci-remove" data-rem="${i.key}">×</button>
      </div>`;
    }).join('');
    $$('[data-inc]').forEach(b => b.onclick = () => { cart.find(i => i.key === b.dataset.inc).qty++; updateCart(); });
    $$('[data-dec]').forEach(b => b.onclick = () => { const it = cart.find(i => i.key === b.dataset.dec); it.qty--; if (it.qty < 1) cart = cart.filter(i => i.key !== it.key); updateCart(); });
    $$('[data-rem]').forEach(b => b.onclick = () => { cart = cart.filter(i => i.key !== b.dataset.rem); updateCart(); });
  }
  let total = cart.reduce((s, i) => s + PRODUCTS.find(x => x.id === i.id).price * i.qty, 0);
  if (promoApplied) total = Math.round(total * 0.65);
  $('#cartTotal').textContent = toman(total);
  $('#checkoutTotal').textContent = toman(total);
}

/* ============ WISHLIST ============ */
function toggleWish(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (wish.includes(id)) { wish = wish.filter(w => w !== id); toast('از علاقه‌مندی حذف شد'); }
  else { wish.push(id); toast(`«${p.name}» به علاقه‌مندی‌ها اضافه شد`); pulse('#wishCount'); }
  $('#wishCount').textContent = faNum(wish.length);
  $$('[data-wish]').forEach(b => { const on = wish.includes(+b.dataset.wish); b.classList.toggle('on', on); b.textContent = on ? '♥' : '♡'; });
  updateWishDrawer();
  if (currentProduct) { const h = $('#modalWish'); const on = wish.includes(currentProduct.id); h.classList.toggle('on', on); h.textContent = on ? '♥' : '♡'; }
}
function updateWishDrawer() {
  const box = $('#wishItems');
  if (!wish.length) { box.innerHTML = '<p class="empty-drawer">هنوز محصولی نپسندیده‌اید.</p>'; return; }
  box.innerHTML = wish.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    return `<div class="cart-item">
      <img src="${src(p.img, 200)}" alt="${p.name}"/>
      <div class="ci-info"><h4>${p.name}</h4><span>${p.cat}</span><b>${toman(p.price)}</b>
      <div class="ci-qty"><button data-wadd="${id}" style="width:auto;padding:0 10px">افزودن به سبد</button></div></div>
      <button class="ci-remove" data-wrem="${id}">×</button>
    </div>`;
  }).join('');
  $$('[data-wadd]').forEach(b => b.onclick = () => addToCart(+b.dataset.wadd));
  $$('[data-wrem]').forEach(b => b.onclick = () => toggleWish(+b.dataset.wrem));
}

/* ============ PRODUCT MODAL ============ */
function openProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  currentProduct = p;
  $('#modalCat').textContent = p.cat;
  $('#modalName').textContent = p.name;
  $('#modalDesc').textContent = p.desc;
  $('#modalFabric').innerHTML = '🧵 ' + p.fabric;
  $('#modalStars').textContent = '★'.repeat(Math.round(p.rate)) + '☆'.repeat(5 - Math.round(p.rate));
  $('#modalReviews').textContent = ` ${p.rate} · ${faNum(p.reviews)} نظر`;
  $('#modalPrice').textContent = toman(p.price);
  $('#modalImg').src = src(p.img, 900);

  const gallery = [p.img, IMG[(p.id) % IMG.length], IMG[(p.id + 2) % IMG.length]];
  $('#modalThumbs').innerHTML = gallery.map((g, i) => `<img src="${src(g, 200)}" class="${i === 0 ? 'active' : ''}" data-full="${src(g, 900)}" alt="نمای ${i + 1}"/>`).join('');
  $$('#modalThumbs img').forEach(t => t.onclick = () => { $('#modalImg').src = t.dataset.full; $$('#modalThumbs img').forEach(x => x.classList.remove('active')); t.classList.add('active'); });

  let selColor = p.colors[0], selSize = p.sizes[0];
  $('#modalColors').innerHTML = p.colors.map((c, i) => `<button class="swatch ${i === 0 ? 'active' : ''}" style="background:${COLORS[c]}" title="${c}" data-c="${c}"></button>`).join('');
  $('#modalSizes').innerHTML = p.sizes.map((s, i) => `<button class="${i === 0 ? 'active' : ''}" data-s="${s}">${s}</button>`).join('');
  $$('#modalColors .swatch').forEach(b => b.onclick = () => { selColor = b.dataset.c; $$('#modalColors .swatch').forEach(x => x.classList.remove('active')); b.classList.add('active'); });
  $$('#modalSizes button').forEach(b => b.onclick = () => { selSize = b.dataset.s; $$('#modalSizes button').forEach(x => x.classList.remove('active')); b.classList.add('active'); });

  const h = $('#modalWish'); const on = wish.includes(p.id); h.classList.toggle('on', on); h.textContent = on ? '♥' : '♡';
  h.onclick = () => toggleWish(p.id);
  $('#modalAdd').onclick = () => { addToCart(p.id, selColor, selSize); };
  $('#modalBuy').onclick = () => { addToCart(p.id, selColor, selSize); closeModal($('#productModal')); openCheckout(); };

  openModal($('#productModal'));
}

/* Zoom */
const zf = $('#zoomFrame');
const modalImg = $('#modalImg');

if (zf && modalImg) {

  zf.addEventListener('mousemove', e => {

    if (!zf.classList.contains('zoom')) return;

    const r = zf.getBoundingClientRect();

    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;

    modalImg.style.transformOrigin = `${x}% ${y}%`;

  });

  zf.addEventListener('click', () => {

    zf.classList.toggle('zoom');

  });

}
/* ============ MODAL / DRAWER GENERIC ============ */
function openModal(m) { m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeModal(m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; zf.classList.remove('zoom'); }
$$('[data-close]').forEach(b => b.addEventListener('click', () => closeModal(b.closest('.modal'))));

function openDrawer(d) { d.classList.add('open'); d.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
function closeDrawer(d) { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
$$('[data-drawer-close]').forEach(b => b.addEventListener('click', () => closeDrawer(b.closest('.drawer'))));

$('#cartBtn').onclick = () => { updateCart(); openDrawer($('#cartDrawer')); };
$('#wishBtn').onclick = () => { updateWishDrawer(); openDrawer($('#wishDrawer')); };

document.addEventListener('keydown', e => { if (e.key === 'Escape') { $$('.modal.open').forEach(closeModal); $$('.drawer.open').forEach(closeDrawer); } });

/* ============ PROMO ============ */
$('#promoBtn').onclick = () => {
  if ($('#promoInput').value.trim().toUpperCase() === 'MAHOOR35') { promoApplied = true; toast('کد تخفیف ۳۵٪ اعمال شد ✓'); }
  else toast('کد تخفیف نامعتبر است');
  updateCart();
};


/* ============ CHECKOUT ============ */

let cStep = 1;

function openCheckout() {

  if (!cart.length) {
    toast('سبد خرید شما خالی است');
    return;
  }

  cStep = 1;
  renderCheckout();
  openModal($('#checkoutModal'));

}

$('#checkoutBtn').onclick = () => {
  closeDrawer($('#cartDrawer'));
  openCheckout();
};

function renderCheckout() {

  $$('.cstep').forEach(step => {
    step.hidden = (+step.dataset.cstep !== cStep);
  });

  $$('.step').forEach(step => {
    step.classList.toggle('active', +step.dataset.step === cStep);
  });

  $('#cPrev').hidden = (cStep === 1);

  $('#cNext').textContent =
    cStep === 3 ? 'پرداخت نهایی' : 'مرحله‌ی بعد';

}

/* ---------- Validation ---------- */

function validateCheckoutStep() {

  // مرحله اول
  if (cStep === 1) {

    const name = $('#customerName');
    const phone = $('#customerPhone');

    if (!name.value.trim()) {
      toast('لطفاً نام و نام خانوادگی را وارد کنید.');
      name.focus();
      return false;
    }

    if (!phone.value.trim()) {
      toast('لطفاً شماره موبایل را وارد کنید.');
      phone.focus();
      return false;
    }

    if (!/^09\d{9}$/.test(phone.value.trim())) {
      toast('شماره موبایل معتبر نیست.');
      phone.focus();
      return false;
    }

  }

  // مرحله دوم
  if (cStep === 2) {

    const city = $('#customerCity');
    const address = $('#customerAddress');

    if (!city.value.trim()) {
      toast('لطفاً شهر را وارد کنید.');
      city.focus();
      return false;
    }

    if (!address.value.trim()) {
      toast('لطفاً آدرس کامل پستی را وارد کنید.');
      address.focus();
      return false;
    }

  }

  return true;

}

/* ---------- Next ---------- */

$('#cNext').onclick = () => {

  if (!validateCheckoutStep()) return;

  if (cStep < 3) {

    cStep++;
    renderCheckout();
    return;

  }

  closeModal($('#checkoutModal'));

  cart = [];
  promoApplied = false;

  updateCart();

  toast('سفارش شما با موفقیت ثبت شد ✓ منتظرتان هستیم');

};

/* ---------- Previous ---------- */

$('#cPrev').onclick = () => {

  if (cStep > 1) {
    cStep--;
    renderCheckout();
  }

};
/* ============ TOAST ============ */
let toastT;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
}
function pulse(sel) { const el = $(sel); el.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 400, easing: 'ease' }); }

/* ============ NAVBAR ============ */
const nav = $('#navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

$('#burger').onclick = () => { $('#burger').classList.toggle('open'); $('#navLinks').classList.toggle('open'); };
$$('#navLinks a').forEach(a => a.onclick = () => { $('#burger').classList.remove('open'); $('#navLinks').classList.remove('open'); });

/* ============ REVEAL ON SCROLL ============ */
let revealObs;
function observeReveals() {
  if (!revealObs) {
    revealObs = new IntersectionObserver((entries) => {
      entries.forEach((en, i) => {
        if (en.isIntersecting) {
          en.target.style.transitionDelay = (en.target.dataset.delayed ? 0 : (i % 6) * 80) + 'ms';
          en.target.classList.add('in');
          en.target.dataset.delayed = '1';
          revealObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
  }
  $$('.reveal:not(.in)').forEach(el => revealObs.observe(el));
}

/* ============ COUNTERS ============ */
function animCounters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.target; let cur = 0;
      const step = target / 60;
      const run = () => { cur += step; if (cur < target) { el.textContent = faNum(Math.floor(cur)); requestAnimationFrame(run); } else el.textContent = faNum(target); };
      run(); obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('.counter').forEach(c => obs.observe(c));
}

/* ============ 3D TILT ============ */
function initTilt() {
  $$('.tilt').forEach(card => {
    if (card.dataset.tilt) return; card.dataset.tilt = '1';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${px * -8}deg) rotateX(${py * 8}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ============ MAGNETIC BUTTONS ============ */
$$('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ============ PARALLAX ============ */
const parallaxEls = $$('[data-parallax]');
window.addEventListener('scroll', () => {
  const y = scrollY;
  parallaxEls.forEach(el => { const sp = +el.dataset.parallax; el.style.transform = `translateY(${y * sp * -1}px)`; });
}, { passive: true });

/* ============ SIZE GUIDE ============ */
function calcSize() {
  const h = +$('#sgHeight').value, w = +$('#sgWeight').value;
  $('#sgHeightVal').textContent = faNum(h);
  $('#sgWeightVal').textContent = faNum(w);
  const bmi = w / ((h / 100) ** 2);
  let s, hint;
  if (bmi < 19) { s = 'S'; hint = 'اندام باریک؛ این سایز فیت زیبایی برایتان دارد.'; }
  else if (bmi < 24) { s = 'M'; hint = 'این سایز برای اندام شما فیت استاندارد دارد.'; }
  else if (bmi < 28) { s = 'L'; hint = 'برای راحتی بیشتر، این سایز پیشنهاد می‌شود.'; }
  else { s = 'XL'; hint = 'این سایز آزادی و راحتی کامل را فراهم می‌کند.'; }
  $('#sgBadge').textContent = s; $('#sgHint').textContent = hint;
}
$('#sgHeight').oninput = calcSize; $('#sgWeight').oninput = calcSize;

/* ============ OFFER TIMER ============ */
const deadline = Date.now() + (4 * 24 * 3600 + 6 * 3600 + 42 * 60) * 1000;
function tick() {
  let d = Math.max(0, deadline - Date.now());
  const dd = Math.floor(d / 86400000); d %= 86400000;
  const hh = Math.floor(d / 3600000); d %= 3600000;
  const mm = Math.floor(d / 60000); d %= 60000;
  const ss = Math.floor(d / 1000);
  const pad = n => faNum(n).padStart(2, '۰');
  $('#dd').textContent = pad(dd); $('#hh').textContent = pad(hh); $('#mm').textContent = pad(mm); $('#ss').textContent = pad(ss);
}
setInterval(tick, 1000); tick();

/* ============ NEWSLETTER ============ */
const newsForm = $('#newsForm');
if(newsForm){
  newsForm.addEventListener('submit', e=>{
    e.preventDefault();
      e.target.reset();
        toast('عضویت شما ثبت شد ✓ خوش آمدید');
      });
}
/* ============ INIT ============ */
renderCatalog();
renderTrend();
observeReveals();
animCounters();
initTilt();
updateCart();
updateWishDrawer();
calcSize();
