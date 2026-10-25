/* ============================================================
   إعدادات متجر بَلسَم — عدّل هذا الملف فقط لتغيير بيانات المتجر
   ============================================================ */
window.STORE = {
  name: "بَلسَم",
  tagline: "أعشاب علاجية طبيعية",
  currency: "د.ع",

  // رقم واتساب المتجر الذي تصله الطلبات (بالصيغة الدولية بدون + أو أصفار)
  whatsapp: "9647700000000",
  phone: "0770 000 0000",
  email: "info@balsam-iq.com",
  city: "بغداد، العراق",

  // أجور التوصيل
  delivery: { baghdad: 5000, other: 7000 },

  // أرقام المحافظ/الحسابات التي يحوّل لها الزبون (غيّرها لأرقامك الحقيقية)
  accounts: {
    superqi: "07700000000",
    zaincash: "07800000000",
    fastpay: "07500000000"
  }
};

/* المنتجات — أضف/عدّل هنا.
   images: قائمة صور داخل assets/products/ (الأولى هي الرئيسية)، أو اتركها فارغة لصورة تجريبية
   sections: أقسام تفصيلية اختيارية تظهر في صفحة المنتج */
window.PRODUCTS = [
  {
    id: "vanica",
    name: "فانيكا — زيت + كريم هدية",
    subtitle: "عناية بالجسم للنعومة الدائمة",
    price: 25000,
    images: [
      "assets/products/vanica-1.jpg?v=2",
      "assets/products/vanica-2.jpg?v=2",
      "assets/products/vanica-3.jpg?v=2",
      "assets/products/vanica-4.jpg?v=2",
      "assets/products/vanica-5.jpg?v=2",
      "assets/products/vanica-6.jpg?v=2"
    ],
    tone: "olive",
    weight: "زيت + كريم",
    badge: "كريم هدية",
    description: "طقم فانيكا (Vanica Body Care For Smoothness) لنعومة دائمة وبشرة مشرقة. يحتوي على زيت لعلاج الشعر تحت الجلد وتقليل نمو الشعر، ومعه كريم هدية لتقليل الشعر وتفتيح لون البشرة. بتركيبة فريدة غنية بالزيوت الطبيعية والمكوّنات المغذية التي تساعد على تحسين مرونة البشرة وترطيبها. مناسب لجميع أجزاء الجسم.",
    points: ["غني بالزيوت الطبيعية", "مختبر من أطباء الجلدية (Dermatologically Tested)", "مناسب لجميع أجزاء الجسم", "الكريم هدية مع الزيت"],
    sections: [
      {
        title: "فوائد زيت فانيكا",
        items: ["يعالج من يعانون من آثار الشعر تحت الجلد", "يساعد على نعومة وحيوية الشعر ويعالجه من التلف", "يساعد على التخلص من البقع والتشققات"]
      },
      {
        title: "فوائد كريم فانيكا",
        items: ["منعّم ومرطّب للبشرة", "يقلل من خشونة البشرة ويساعد في تقليل التجاعيد", "يساعد على التخلص من البقع والتشققات", "يساعد على تقليل الشعر وتفتيح لون البشرة"]
      }
    ]
  },
  {
    id: "insucure",
    name: "InsuCure — إنسوكيور",
    subtitle: "توازن طبيعي لمستوى السكر",
    price: 25000,
    images: [
      "assets/products/insucure-1.jpg?v=2",
      "assets/products/insucure-2.jpg?v=2",
      "assets/products/insucure-3.jpg?v=2",
      "assets/products/insucure-4.jpg?v=2",
      "assets/products/insucure-5.jpg?v=2",
      "assets/products/insucure-6.jpg?v=2"
    ],
    tone: "olive",
    weight: "Organic",
    description: "InsuCure — توازن طبيعي لمستوى السكر من قلب الطبيعة. تركيبة طبيعية من الأعشاب تساهم في خفض مستويات السكر، وتساعد على تحسين وظيفة البنكرياس وتنظيم إفراز الأنسولين، مع دعم كامل لأداء الجسم ليستعيد توازنه بشكل أسرع.",
    points: ["تركيبة عشبية طبيعية (Organic)", "تساعد على خفض مستويات السكر", "تدعم وظيفة البنكرياس وتنظيم إفراز الأنسولين"],
    sections: [
      { title: "طريقة الاستخدام", items: ["ملعقة كبيرة مرتين يومياً", "مرة قبل الإفطار", "ومرة قبل العشاء"] },
      { title: "تنبيه", items: ["لا يغني عن أدوية السكري الموصوفة من الطبيب", "يُنصح بمتابعة مستوى السكر واستشارة الطبيب قبل الاستخدام"] }
    ]
  },
  {
    id: "energyman",
    name: "Energy Man — عسل الطاقة",
    subtitle: "عسل طبيعي للطاقة والحيوية",
    price: 25000,
    images: [
      "assets/products/energyman-1.jpg?v=2",
      "assets/products/energyman-2.jpg?v=2",
      "assets/products/energyman-3.jpg?v=2",
      "assets/products/energyman-4.jpg?v=2",
      "assets/products/energyman-5.jpg?v=2"
    ],
    fit: "contain",
    bg: "#1c1712",
    tone: "olive",
    weight: "250 غم",
    description: "Energy Man عسل طبيعي (Natural Honey) مخصّص للرجال، لدعم الطاقة والحيوية والقوة البدنية طوال اليوم. عبوة 250 غم محكمة الإغلاق.",
    points: ["عسل طبيعي 100%", "يدعم الطاقة والحيوية والنشاط", "عبوة 250 غم / 250 مل"]
  },
  {
    id: "africangel",
    name: "الجل الأفريقي",
    subtitle: "African Gel للرجال",
    price: 25000,
    images: ["assets/products/africangel-1.jpg?v=2"],
    fit: "contain",
    tone: "olive",
    weight: "نوعان",
    description: "الجل الأفريقي (African Gel) للرجال، للاستعمال الخارجي. عبوة بمضخة سهلة الاستخدام، ومتوفر بنوعين: الأحمر والأخضر.",
    points: ["للاستعمال الخارجي فقط", "عبوة بمضخة عملية", "متوفر بنوعين: أحمر وأخضر"],
    variants: [
      { id: "red", name: "الأحمر", color: "#9b1c1c" },
      { id: "green", name: "الأخضر", color: "#9dc12f" }
    ]
  }
];
