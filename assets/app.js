(function () {
  const S = window.STORE, P = window.PRODUCTS;
  const $ = (s, r = document) => r.querySelector(s);
  const fmt = n => Number(n).toLocaleString("en-US");
  const money = n => `${fmt(n)} <small>${S.currency}</small>`;
  const qs = new URLSearchParams(location.search);
  const findP = id => P.find(p => p.id === id);
  const clampQ = q => Math.min(99, Math.max(1, parseInt(q, 10) || 1));

  const ICON = {
    leaf: `<svg class="leaf" viewBox="0 0 64 64" fill="none"><path d="M52 8C28 8 12 22 12 42c0 5 1 9 3 12 3-14 12-24 26-30-11 8-19 18-22 32 4 2 8 2 12 1 18-4 25-22 21-49Z" fill="#1f3a32" opacity=".78"/><path d="M15 54c3-14 12-24 26-30" stroke="#fffdf7" stroke-width="2" stroke-linecap="round" opacity=".7"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>`,
    lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>`,
    truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>`,
    cash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/></svg>`,
    bag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>`,
    shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>`,
    wa: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.6-.1 1.2Z"/></svg>`
  };

  const LOGO = `<svg viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="#178f88"/><path d="M36 11c-14 0-24 8-24 20 0 3 .6 5.4 1.8 7.2C15.6 30 21 24 29 20.5c-6.5 4.8-11 10.6-12.8 18.8 2.4 1.2 4.8 1.2 7.2.6C34 37.5 38.4 27 36 11Z" fill="#f5f2e8"/><circle cx="35" cy="36" r="3" fill="#a9b46e"/></svg>`;

  const PAY = {
    superqi: { name: "سوبر كي", en: "SuperQi", img: "assets/pay/superqi.png", note: "ادفع عبر تطبيق سوبر كي (كي كارد). بعد تأكيد الطلب ستظهر لك تفاصيل الدفع." },
    zaincash: { name: "زين كاش", en: "ZainCash", img: "assets/pay/zaincash.png", note: "ادفع عبر محفظة زين كاش. بعد تأكيد الطلب ستظهر لك تفاصيل الدفع." },
    fastpay: { name: "فاست باي", en: "FastPay", img: "assets/pay/fastpay.png", note: "ادفع عبر محفظة فاست باي. بعد تأكيد الطلب ستظهر لك تفاصيل الدفع." },
    card: { name: "بطاقة فيزا / ماستر كارد", en: "Visa / Mastercard", note: "سيصلك رابط دفع آمن على رقم هاتفك لإتمام الدفع بالبطاقة." },
    cod: { name: "الدفع عند الاستلام", en: "Cash on delivery", note: "تدفع المبلغ نقداً لمندوب التوصيل عند استلام طلبك." }
  };

  const GOVS = ["بغداد", "البصرة", "نينوى", "أربيل", "النجف", "كربلاء", "بابل", "الأنبار", "ديالى", "ذي قار", "السليمانية", "دهوك", "كركوك", "صلاح الدين", "واسط", "ميسان", "المثنى", "الديوانية", "حلبجة"];

  const payStrip = cls => `
    <div class="${cls}">
      <span class="pl app" title="سوبر كي"><img src="assets/pay/superqi.png" alt="SuperQi"></span>
      <span class="pl app" title="زين كاش"><img src="assets/pay/zaincash.png" alt="ZainCash"></span>
      <span class="pl app" title="فاست باي"><img src="assets/pay/fastpay.png" alt="FastPay"></span>
      <span class="pl cardlogo" title="Visa"><img src="assets/pay/visa.svg" alt="Visa"></span>
      <span class="pl cardlogo" title="Mastercard"><img src="assets/pay/mastercard.svg" alt="Mastercard"></span>
    </div>`;

  const photo = (p, tag) => `
    <div class="ph ${p.tone || "olive"}">
      ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : ICON.leaf}
      ${tag ? `<span class="tag">${tag}</span>` : ""}
    </div>`;

  /* ---------- الهيكل المشترك ---------- */
  function shell() {
    const page = document.body.dataset.page;
    document.body.insertAdjacentHTML("afterbegin", `
      <div class="topbar">توصيل لجميع محافظات العراق · <b>الدفع عند الاستلام متاح</b></div>
      <header class="site"><div class="wrap">
        <a class="brand" href="./">${LOGO}<span><span class="n">${S.name}</span><span class="t">${S.tagline}</span></span></a>
        <nav class="main">
          <a class="keep ${page === "home" ? "on" : ""}" href="./">المنتجات</a>
          <a class="${page === "privacy" ? "on" : ""}" href="privacy.html">سياسة الخصوصية</a>
          <a class="${page === "terms" ? "on" : ""}" href="terms.html">الشحن والاسترجاع</a>
        </nav>
      </div></header>`);
    document.body.insertAdjacentHTML("beforeend", `
      <footer class="site"><div class="wrap">
        <div class="cols">
          <div>
            <a class="brand" href="./">${LOGO}<span><span class="n" style="color:var(--cream)">${S.name}</span><span class="t">${S.tagline}</span></span></a>
            <p style="margin-top:12px;max-width:340px">متجر عراقي متخصص بالأعشاب العلاجية والمنتجات الطبيعية، نوصل لكل المحافظات.</p>
            ${payStrip("pays")}
          </div>
          <div><h4>روابط</h4><ul>
            <li><a href="./">المنتجات</a></li>
            <li><a href="privacy.html">سياسة الخصوصية</a></li>
            <li><a href="terms.html">سياسة الشحن والاسترجاع</a></li>
          </ul></div>
          <div><h4>تواصل معنا</h4><ul>
            <li><a href="tel:${S.phone.replace(/\s/g, "")}" dir="ltr">${S.phone}</a></li>
            <li><a href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener">واتساب</a></li>
            <li>${S.email}</li>
            <li>${S.city}</li>
          </ul></div>
        </div>
        <div class="copy"><span>© ${new Date().getFullYear()} ${S.name} — جميع الحقوق محفوظة</span><span>المنتجات الطبيعية لا تغني عن استشارة الطبيب</span></div>
      </div></footer>`);
  }

  /* ---------- الصفحة الرئيسية: المنتجات ---------- */
  function home() {
    $("#grid").innerHTML = P.map(p => `
      <a class="card" href="product.html?id=${p.id}">
        ${photo(p, p.weight)}
        <div class="body">
          <span class="sub">${p.subtitle}</span>
          <h3>${p.name}</h3>
          <div class="row"><span class="price">${money(p.price)}</span><span class="chip">اطلب الآن</span></div>
        </div>
      </a>`).join("");
    $("#count").textContent = `${P.length} منتجات`;
  }

  /* ---------- صفحة المنتج ---------- */
  function product() {
    const p = findP(qs.get("id"));
    const root = $("#product");
    if (!p) { root.innerHTML = `<div class="empty"><h2>المنتج غير موجود</h2><p><a href="./" style="color:var(--teal)">العودة إلى المنتجات</a></p></div>`; return; }
    document.title = `${p.name} | ${S.name}`;
    $("#crumb").textContent = p.name;
    root.innerHTML = `
      <div class="product">
        ${photo(p, p.weight)}
        <div class="pinfo">
          <span class="sub">${p.subtitle}</span>
          <h1>${p.name}</h1>
          <div class="price">${money(p.price)}</div>
          <p class="desc">${p.description}</p>
          <ul class="points">${p.points.map(x => `<li>${x}</li>`).join("")}</ul>
          <div class="buybox">
            <label class="l" for="q">عدد القطع</label>
            <div class="qty"><button type="button" data-d="1" aria-label="زيادة">+</button><input id="q" type="number" min="1" max="99" value="1" inputmode="numeric"><button type="button" data-d="-1" aria-label="إنقاص">−</button></div>
            <div class="total"><span>السعر الإجمالي</span><b id="tot"></b></div>
            <button class="btn" id="buy">${ICON.bag} شراء الآن</button>
            <div class="safe">${ICON.lock} دفع آمن · توصيل لكل العراق · الدفع عند الاستلام متاح</div>
            ${payStrip("paystrip")}
          </div>
        </div>
      </div>`;
    const q = $("#q");
    const upd = () => { q.value = clampQ(q.value); $("#tot").innerHTML = money(p.price * q.value); };
    root.querySelectorAll(".qty button").forEach(b => b.onclick = () => { q.value = clampQ(+q.value + +b.dataset.d); upd(); });
    q.addEventListener("change", upd);
    upd();
    $("#buy").onclick = () => location.href = `checkout.html?id=${p.id}&q=${clampQ(q.value)}`;
  }

  /* ---------- صفحة الدفع ---------- */
  function checkout() {
    const p = findP(qs.get("id"));
    if (!p) { location.replace("./"); return; }
    let qty = clampQ(qs.get("q"));

    $("#gov").innerHTML = `<option value="">اختر المحافظة</option>` + GOVS.map(g => `<option>${g}</option>`).join("");
    $("#methods").innerHTML = Object.entries(PAY).map(([k, m], i) => {
      let logo;
      if (k === "card") logo = `<span class="logo cards"><img src="assets/pay/visa.svg" alt="Visa"><img src="assets/pay/mastercard.svg" alt="Mastercard"></span>`;
      else if (k === "cod") logo = `<span class="logo cod">${ICON.cash}</span>`;
      else logo = `<span class="logo app"><img src="${m.img}" alt="${m.en}"></span>`;
      return `<label class="method"><input type="radio" name="pay" value="${k}" ${k === "cod" ? "checked" : ""}>${logo}<span class="txt"><b>${m.name}</b><small>${m.en}</small></span><span class="dot"></span></label>`;
    }).join("");

    $("#sitem").innerHTML = `${photo(p)}<div><b>${p.name}</b><small>${p.subtitle} · ${p.weight}</small><div class="price" style="font-size:.95rem">${money(p.price)}</div></div>`;

    const ship = () => !$("#gov").value ? null : ($("#gov").value === "بغداد" ? S.delivery.baghdad : S.delivery.other);
    const render = () => {
      $("#cq").value = qty;
      const sub = p.price * qty, s = ship();
      $("#l-sub").innerHTML = money(sub);
      $("#l-qty").textContent = `× ${qty}`;
      $("#l-ship").innerHTML = s === null ? `<span style="color:var(--muted);font-size:.85rem">اختر المحافظة</span>` : money(s);
      $("#l-tot").innerHTML = money(sub + (s || 0));
    };
    document.querySelectorAll(".editq button").forEach(b => b.onclick = () => { qty = clampQ(qty + +b.dataset.d); render(); });
    $("#cq").addEventListener("change", e => { qty = clampQ(e.target.value); render(); });
    $("#gov").addEventListener("change", render);

    const note = () => { const m = PAY[document.querySelector("[name=pay]:checked").value]; $("#mnote").textContent = m.note; $("#mnote").classList.add("show"); };
    document.querySelectorAll("[name=pay]").forEach(r => r.addEventListener("change", note));
    note(); render();

    const rules = {
      name: v => v.trim().length >= 3 || "يرجى كتابة الاسم الكامل",
      phone: v => /^07[3-9]\d{8}$/.test(v.replace(/[\s-]/g, "").replace(/^\+?964/, "0")) || "رقم الهاتف غير صحيح (مثال: 07701234567)",
      gov: v => !!v || "يرجى اختيار المحافظة",
      area: v => v.trim().length >= 2 || "يرجى كتابة المنطقة / الحي",
      address: v => v.trim().length >= 5 || "يرجى كتابة العنوان الكامل"
    };
    const check = id => {
      const el = $("#" + id), r = rules[id](el.value), box = el.closest(".f");
      box.classList.toggle("bad", r !== true);
      if (r !== true) box.querySelector(".err").textContent = r;
      return r === true;
    };
    Object.keys(rules).forEach(id => $("#" + id).addEventListener("blur", () => check(id)));

    $("#form").addEventListener("submit", e => {
      e.preventDefault();
      const ok = Object.keys(rules).map(check).every(Boolean);
      if (!ok) { document.querySelector(".f.bad input, .f.bad select, .f.bad textarea").focus(); return; }
      const btn = $("#place"); btn.disabled = true; btn.textContent = "جارٍ تأكيد الطلب…";
      const s = ship();
      const order = {
        id: "BLS-" + Date.now().toString(36).toUpperCase().slice(-6),
        date: new Date().toISOString(),
        product: p.id, name: p.name, price: p.price, qty,
        subtotal: p.price * qty, shipping: s, total: p.price * qty + s,
        pay: document.querySelector("[name=pay]:checked").value,
        customer: {
          name: $("#name").value.trim(),
          phone: $("#phone").value.replace(/[\s-]/g, ""),
          gov: $("#gov").value, area: $("#area").value.trim(),
          address: $("#address").value.trim(), landmark: $("#landmark").value.trim(),
          notes: $("#notes").value.trim()
        }
      };
      // نحفظ الطلب في الجلسة فقط حتى لا تظهر بيانات الزبون في الرابط
      let url = "success.html";
      try { sessionStorage.setItem("balsam_order", JSON.stringify(order)); }
      catch (_) { url += "#" + encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(order))))); }
      setTimeout(() => location.href = url, 700);
    });
  }

  /* ---------- تأكيد الطلب ---------- */
  function success() {
    let o = null;
    try { o = JSON.parse(sessionStorage.getItem("balsam_order")); } catch (_) {}
    if (!o && location.hash) try { o = JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(location.hash.slice(1)))))); } catch (_) {}
    const root = $("#done");
    if (!o) { root.innerHTML = `<div class="empty"><h2>لا يوجد طلب</h2><p><a href="./" style="color:var(--teal)">تصفح المنتجات</a></p></div>`; return; }
    const m = PAY[o.pay], c = o.customer;
    const msg = [
      `طلب جديد من متجر ${S.name}`, `رقم الطلب: ${o.id}`, ``,
      `المنتج: ${o.name}`, `العدد: ${o.qty}`, `المجموع: ${fmt(o.subtotal)} ${S.currency}`,
      `التوصيل: ${fmt(o.shipping)} ${S.currency}`, `الإجمالي: ${fmt(o.total)} ${S.currency}`, ``,
      `الاسم: ${c.name}`, `الهاتف: ${c.phone}`, `المحافظة: ${c.gov}`, `المنطقة: ${c.area}`,
      `العنوان: ${c.address}`, c.landmark ? `أقرب نقطة دالة: ${c.landmark}` : "", ``,
      `طريقة الدفع: ${m.name}`, c.notes ? `ملاحظات: ${c.notes}` : ""
    ].filter((x, i, a) => x !== "" || a[i - 1] !== "").join("\n");
    const wa = `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;

    let payHtml = "";
    if (S.accounts[o.pay]) {
      payHtml = `<div class="paybox"><b>أكمل الدفع عبر ${m.name}</b>
        <p style="font-size:.9rem;opacity:.85;margin-top:4px">حوّل مبلغ <b>${fmt(o.total)} ${S.currency}</b> إلى الرقم التالي، ثم أرسل لنا صورة الإيصال على واتساب مع رقم الطلب.</p>
        <div class="acc"><span>${S.accounts[o.pay]}</span><button type="button" id="copy">نسخ</button></div></div>`;
    } else if (o.pay === "card") {
      payHtml = `<div class="paybox"><b>الدفع بالبطاقة</b><p style="font-size:.9rem;opacity:.85;margin-top:4px">سيتواصل معك فريقنا خلال وقت قصير ويرسل لك رابط دفع آمن لإتمام الدفع بفيزا أو ماستر كارد. لن نطلب منك بيانات بطاقتك عبر الهاتف أبداً.</p></div>`;
    } else {
      payHtml = `<div class="paybox"><b>الدفع عند الاستلام</b><p style="font-size:.9rem;opacity:.85;margin-top:4px">جهّز مبلغ <b>${fmt(o.total)} ${S.currency}</b> لتسليمه لمندوب التوصيل عند استلام الطلب.</p></div>`;
    }

    root.innerHTML = `
      <div class="ok">${ICON.check}</div>
      <h1>تم استلام طلبك بنجاح</h1>
      <p style="color:var(--muted)">شكراً ${c.name}، سنتواصل معك على الرقم <span dir="ltr">${c.phone}</span> لتأكيد الطلب.</p>
      <div class="oid">${o.id}</div>
      ${payHtml}
      <div class="panel"><div class="kv">
        <div><span>المنتج</span><b>${o.name} × ${o.qty}</b></div>
        <div><span>المجموع</span><span>${fmt(o.subtotal)} ${S.currency}</span></div>
        <div><span>التوصيل</span><span>${fmt(o.shipping)} ${S.currency}</span></div>
        <div><span>الإجمالي</span><b style="color:var(--teal-deep)">${fmt(o.total)} ${S.currency}</b></div>
        <div><span>طريقة الدفع</span><span>${m.name}</span></div>
        <div><span>العنوان</span><span>${c.gov} — ${c.area} — ${c.address}</span></div>
      </div></div>
      <div class="actions">
        <a class="btn wa" href="${wa}" target="_blank" rel="noopener">${ICON.wa} إرسال الطلب على واتساب</a>
        <a class="btn ghost" href="./">متابعة التسوق</a>
      </div>`;
    const cp = $("#copy");
    if (cp) cp.onclick = () => navigator.clipboard.writeText(S.accounts[o.pay]).then(() => { cp.textContent = "تم النسخ ✓"; });
  }

  shell();
  ({ home, product, checkout, success }[document.body.dataset.page] || (() => {}))();
  window.BALSAM = { ICON };
})();
