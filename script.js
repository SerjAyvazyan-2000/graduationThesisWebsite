// Progress bar
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const prog = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
  document.getElementById('progress-bar').style.width = prog + '%';
});

// Fade-in on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// Active nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let cur = '';

  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) cur = s.id;
  });

  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

// Checklist
function toggleCheck(el) {
  el.classList.toggle('done');
}

// Generate blog idea
function generateBlogIdea() {
  const name = document.getElementById('blog-name').value.trim();
  const cat = document.getElementById('blog-category').value;
  const reason = document.getElementById('blog-reason').value.trim();
  const box = document.getElementById('idea-result');

  if (!name || !cat) {
    box.innerHTML = '⚠️ Լրացրեք բլոգի անունն ու ընտրեք կատեգորիա';
    box.classList.add('visible');
    return;
  }

  const ideas = {
    'Գիտություն ու Տեխնոլոգիա': [
      '«Ֆիզիկայի Հրաշքները» — ամեն շաբաթ մի գիտական բացատրություն',
      '«Ապագայի Տեխնոլոգիա» — AI, ռոբոտներ, տիեզերք'
    ],
    'Սպորտ ու Ֆիտնես': [
      '«Երիտասարդ Մարզիկ» — մարզումներ, խորհուրդ, արդյունքներ',
      '«Ֆուտբոլ-Ֆակտ» — ֆուտբոլի անհայտ փաստեր'
    ],
    'Արվեստ ու Ստեղծագործություն': [
      '«Ոչ Սովորական Նկարիչ» — նկարչության ճամփա',
      '«Գույն + Ձև» — ամեն շաբաթ մի ստեղծագործություն'
    ],
    'Ճամփորդություն ու Բնություն': [
      '«Հայ Ոտնահետք» — Հայաստան քայլ առ քայլ',
      '«Բնության Ձայն» — հայ բնության գրառումներ'
    ],
    'Ճաշ ու Բաղադրատոմս': [
      '«Ճաշ 15 Րոպե» — արագ ու համով բաղադրատոմսեր',
      '«Ազգային Ճաշ» — հայ ու աշխարհի ճաշատեսակներ'
    ],
    'Երաժշտություն ու Կինո': [
      '«Ականջ + Ակն» — երաժշտություն և կինո ամեն շաբաթ',
      '«Cinema Club» — ֆիլմեր ու քննարկումներ'
    ],
    'Գրականություն ու Գրքեր': [
      '«Կարդում եմ, Կիսվում եմ» — գրքերի ակնարկ',
      '«Բառ ու Կյանք» — գրականություն ու առօրյա'
    ],
    'Ծրագրավորում ու Խաղեր': [
      '«Կոդ + Խաղ» — ծրագրավորում սկսնակների համար',
      '«Geek Հայ» — տեխ ու game culture'
    ],
    'Պատմություն ու Մշակույթ': [
      '«Հայ Հետք» — Հայաստանի պատմության անհայտ էջեր',
      '«Մշակույթ Ամեն Օր» — ավանդույթ ու ժամանակակից'
    ],
  };

  const sug = ideas[cat] || [
    '«' + name + '» — ձեր ունիկալ բլոգ',
    'Ստեղծագործեք նոր թեմայով'
  ];

  const picked = sug[Math.floor(Math.random() * sug.length)];

  box.innerHTML = `
    ✅ <strong>Ձեր բլոգի նախագիծը</strong><br><br>
    📌 Բլոգի անուն: <strong>${name}</strong><br>
    🗂 Կատեգորիա: <strong>${cat}</strong><br>
    💡 Հոդվածի գաղափար: <em>${picked}</em><br>
    ✨ Կարևոր խորհուրդ: Ամեն շաբաթ մի նոր հոդված, 300-500 բառ, նկարներով!<br><br>
    ${reason ? `📝 Ձեր մտքերը: <em style="color:var(--muted)">${reason}</em><br><br>` : ''}
    🚀 <em>Կարող եք սկսել — բլոգ ստեղծելը հեշտ է!</em>
  `;

  box.classList.add('visible');
}

// Preview post
function previewPost() {
  const title = document.getElementById('post-title').value.trim();
  const intro = document.getElementById('post-intro').value.trim();
  const body = document.getElementById('post-body').value.trim();
  const box = document.getElementById('post-result');

  if (!title) {
    box.innerHTML = '⚠️ Պետք է լրացնեք հոդվածի վերնագիրը';
    box.classList.add('visible');
    return;
  }

  const wordCount = (intro + ' ' + body)
    .split(/\s+/)
    .filter(w => w).length;

  const readMin = Math.max(1, Math.ceil(wordCount / 150));

  box.innerHTML = `
    <strong>📄 Ձեր հոդվածի նախադիտումը</strong><br><br>
    <strong style="font-size:1rem;color:var(--text)">${title}</strong><br><br>
    ${intro ? `<em style="color:var(--accent2)">${intro}</em><br><br>` : ''}
    ${body ? body.split('\n').filter(l => l.trim()).map(l => `• ${l}`).join('<br>') + '<br><br>' : ''}
    <span style="font-size:0.75rem;opacity:0.6">📊 Բառաքանակ: ~${wordCount} | ⏱ Կարդալու ժամանակ: ~${readMin} րոպե</span>
  `;

  box.classList.add('visible');
}

function buildOutline() {
  const audience = document.getElementById('audience-input').value.trim();
  const outline = document.getElementById('outline-input').value
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean);
  const box = document.getElementById('outline-result');

  const tips = [];
  if (!audience) tips.push('Նշեք, թե ով է ձեր ընթերցողը։');
  if (outline.length < 3) tips.push('Ավելացրեք առնվազն 3 ենթավերնագիր։');
  if (outline.some(item => item.length < 8)) tips.push('Ենթավերնագրերը դարձրեք ավելի հստակ։');

  if (tips.length) {
    box.innerHTML = '🧠 <strong>Պլանը դեռ կարելի է լավացնել.</strong><br>' + tips.map(t => '• ' + t).join('<br>');
  } else {
    box.innerHTML = `
      ✅ <strong>Հիանալի պլան է։</strong><br><br>
      👥 Ընթերցողներ: <strong>${audience}</strong><br>
      🧩 Կառուցվածք:<br>
      ${outline.map((item, i) => `${i + 1}. ${item}`).join('<br>')}<br><br>
      ✨ Խորհուրդ. Յուրաքանչյուր ենթավերնագրի տակ գրեք 4-6 նախադասություն և ավելացրեք մեկ նկար կամ օրինակ։
    `;
  }

  box.classList.add('visible');
}

function checkSafety() {
  const text = document.getElementById('safety-input').value.trim().toLowerCase();
  const box = document.getElementById('safety-result');

  if (!text) {
    box.innerHTML = '⚠️ Գրեք, թե ինչ նյութ եք ուզում հրապարակել։';
    box.classList.add('visible');
    return;
  }

  const riskyWords = ['հասցե', 'հեռախոս', 'գաղտնաբառ', 'դպրոցի հասցե', 'անձնագիր', 'բանկ', 'տուն', 'քարտ'];
  const privatePhotoWords = ['ընկեր', 'ընկերոջ', 'դասընկեր', 'նկար', 'լուսանկար'];
  const hasRisk = riskyWords.some(word => text.includes(word));
  const hasPhoto = privatePhotoWords.some(word => text.includes(word));

  if (hasRisk) {
    box.innerHTML = '🚫 <strong>Զգուշացում.</strong> Մի հրապարակեք անձնական տվյալներ՝ հասցե, հեռախոս, գաղտնաբառ, քարտի տվյալներ կամ դպրոցի ճշգրիտ վայր։';
  } else if (hasPhoto) {
    box.innerHTML = '🟡 <strong>Ստուգեք թույլտվությունը.</strong> Եթե նկարում ուրիշ մարդիկ կան, նախ հարցրեք նրանց կամ ծնողներին։ Կարող եք նաև դեմքերը փակել։';
  } else {
    box.innerHTML = '✅ <strong>Ավելի անվտանգ է թվում։</strong> Մինչ հրապարակելը մեկ անգամ էլ ստուգեք՝ չկա՞ անձնական տվյալ, վիրավորական խոսք կամ ուրիշի հեղինակային նյութ առանց նշելու։';
  }

  box.classList.add('visible');
}

const QUESTIONS = [
  {
    q: "Ի՞նչ է բլոգը",
    opts: [
      "Ֆոտոխմբագրման ծրագիր",
      "Ինտերնետային հրապարակման հարթակ, որտեղ կարող ես կիսվել մտքերով ու հոդվածներով",
      "Տեսախաղերի հավելված",
      "Ֆիլմ դիտելու կայք"
    ],
    correct: 1,
    explain: "Բլոգը (weblog) ինտերնետային կայք է, որտեղ հեղինակը կանոնավոր կերպով հրապարակում է հոդվածներ, մտքեր կամ ստեղծագործություններ։"
  },
  {
    q: "Ո՞ր հարթակն է հայտնի և անվճար բլոգ ստեղծելու համար և Google-ին է պատկանում",
    opts: ["WordPress", "Wix", "Blogger", "Squarespace"],
    correct: 2,
    explain: "Blogger-ը Google-ի կողմից ստեղծված անվճար բլոգ հարթակ է, որն ակտիվ է 1999 թ.-ից:"
  },
  {
    q: "Ի՞նչ է «post»-ը բլոգի համատեքստում",
    opts: [
      "Բլոգի ամբողջ կայքը",
      "Բլոգի ֆոնային ձևավորումը",
      "Առանձին հրապարակված հոդված կամ գրառում",
      "Կայքի ֆայլերի հավաքածու"
    ],
    correct: 2,
    explain: "«Post»-ը (գրառում) բլոգի մեկ հրապարակված հոդվածն է, որն ունի վերնագիր, բովանդակություն և հրապարակման ամսաթիվ:"
  },
  {
    q: "Ո՞ր տարրերն են  կարևոր հոդվածի վերնագրի համար",
    opts: [
      "Հնարավորինս երկար լինի — 30+ բառ",
      "Ուշադրություն գրավի ու հստակ ասի, թե ինչ կա հոդվածում",
      "Միայն մեծ տառերով գրված լինի",
      "Պետք չէ վերնագիր — բանն ամեն ինչ կասի"
    ],
    correct: 1,
    explain: "Լավ վերնագիրը կարճ, ուշադրություն գրավող է ու ճշգրտորեն արտացոլում է հոդվածի բովանդակությունը:"
  },
  {
    q: "«Թեմա» (theme) ասելով WordPress/Blogger-ում ի՞նչ է հասկացվում",
    opts: [
      "Բլոգի բովանդակային ոլորտը (սպորտ, ճաշ, գիտություն)",
      "Կայքի տեսողական ձևավորումն ու դիզայնի կաղապարը",
      "Հոդվածների կատեգորիաները",
      "Կայքի domain-ի անունը"
    ],
    correct: 1,
    explain: "«Theme»-ը կայքի դիզայնի կաղապարն է — գույներ, տառատեսակ, դասավայրման ոճ: Բովանդակային ոլորտն առանձին հասկացություն է:"
  },
  {
    q: "Ո՞ր մոտեցումն է ավելի ճիշտ կանոնավոր բլոգ վարելու համար",
    opts: [
      "Ամեն օր 20+ հոդված հրապարակել",
      "Կանոնավոր ժամանակացույցով (օրինակ՝ շաբաթական 1-2 հոդված) որակյալ գրառումներ",
      "Սոց. ցանցի մեկ գրառումը copy-paste անել",
      "Միայն ուրիշների հոդվածները թարգմանել"
    ],
    correct: 1,
    explain: "Կանոնավոր հրապարակումն ու բնօրինակ բովանդակությունն ընթերցողների վստահությունն ու հաճախությունը պահում են:"
  },
  {
    q: "«SEO» հասկացությունն ի՞նչ է նշանակում",
    opts: [
      "Social Emoji Optimizer — emo-ջիների ճիշտ ընտրություն",
      "Search Engine Optimization — կայքի բարձրացում որոնողական արդյունքներում",
      "Secure Encrypted Output — կայքի անվտանգության կոդ",
      "Simple Edit Option — HTML խմբագրման ռեժիմ"
    ],
    correct: 1,
    explain: "SEO (Search Engine Optimization) — կայքի ու բովանդակության հարմարեցումը, որ Google-ը ու այլ որոնողներ հեշտ գտնեն ու բարձր ցուցադրեն:"
  },
  {
    q: "Ո՞ր ֆորմատն է ավելի հարմար բլոգ հոդվածի կառուցվածքի համար",
    opts: [
      "Ամեն ինչ մի երկար պարբերությամբ, առանց վերնագրերի",
      "Ներածություն → Բաժիններ վերնագրերով → Եզրակացություն",
      "Միայն նկարներ, բնագիր ընդհանրապես չկա",
      "Կարճ SMS-ոճ — 2-3 նախադասություն"
    ],
    correct: 1,
    explain: "Կառուցված հոդվածն ավելի հեշտ է կարդալ: Ներածություն, հիմնական բաժիններ ու եզրակացություն — դասական ու արդյունավետ կառուցվածք:"
  },
  {
    q: "Ո՞ր պլատֆորմն ամենից հեշտ drag-and-drop ձևով կայք ստեղծելու հնարավորություն է տալիս",
    opts: ["Blogger", "GitHub Pages", "Wix", "Reddit"],
    correct: 2,
    explain: "Wix-ն իր drag-and-drop (քաշ-թողնել) խմբագրիչով ամենաշատ օգտագործվող հարթակներից է, հատկապես ծրագրավորման փորձ չունեցողների համար:"
  },
  {
    q: "Բլոգի հոդվածին նկար ավելացնելու ի՞նչ հիմնական նշանակություն ունի",
    opts: [
      "Բացարձակ ոչ մի — ընթերցողին ձանձրույթ պատճառում է",
      "Ֆայլի ծավալն ավելացնելու համար",
      "Հոդվածն ավելի գրավիչ է դառնում, ուշադրություն է գրավում, SEO-ն բարելավվում է",
      "Միայն Google-ի ալգորիթմի համար է անհրաժեշտ"
    ],
    correct: 2,
    explain: "Նկարներն ու տեսողական բովանդակությունն ուշադրություն են գրավում, կարդայելն ավելի հաճելի են դարձնում ու SEO-ն բարելավում:"
  },
  {
    q: "Ինչո՞ւ է կարևոր հոդվածում աղբյուր նշել",
    opts: ["Որ հոդվածը երկար երևա", "Որ ընթերցողը կարողանա ստուգել տեղեկությունը", "Որ բոլոր բառերը կապույտ լինեն", "Որ բլոգը դանդաղ բացվի"],
    correct: 1,
    explain: "Աղբյուրները ցույց են տալիս, թե որտեղից է տեղեկությունը, և բարձրացնում են վստահությունը։"
  },
  {
    q: "Ի՞նչ է բլոգի «մենյուն»",
    opts: ["Կայքի բաժիններին տանող ցանկ", "Միայն նկարների պահոց", "Գաղտնաբառի տեսակ", "Տեքստը մեծացնող կոճակ"],
    correct: 0,
    explain: "Մենյուն օգնում է արագ գտնել էջերը՝ Գլխավոր, Հոդվածներ, Իմ մասին, Կապ և այլն։"
  },
  {
    q: "Ո՞րն է ավելի անվտանգ հրապարակում աշակերտի բլոգում",
    opts: ["Տան հասցեն ու հեռախոսը", "Ընդհանուր հոբբիները և ուսումնական նախագիծը", "Գաղտնաբառի նկար", "Դասընկերոջ լուսանկարը առանց թույլտվության"],
    correct: 1,
    explain: "Բլոգում պետք է խուսափել անձնական տվյալներից և ուրիշների նկարներից առանց թույլտվության։"
  },
  {
    q: "Ի՞նչ է նշանակում «draft»",
    opts: ["Հոդվածի սևագիր տարբերակ", "Կայքի վերջնական հասցե", "Մեկնաբանություն", "Վճարովի գովազդ"],
    correct: 0,
    explain: "Draft-ը դեռ չհրապարակված սևագիրն է, որը կարելի է խմբագրել։"
  },
  {
    q: "Ո՞րն է լավ ներածության նպատակը",
    opts: ["Միանգամից փակել թեման", "Գրավել ընթերցողին և բացատրել ինչի մասին է հոդվածը", "Միայն հեղինակի անունը գրել", "Փոխարինել ամբողջ հոդվածը"],
    correct: 1,
    explain: "Ներածությունը ընթերցողին ասում է՝ ինչու արժե շարունակել կարդալ։"
  },
  {
    q: "Ինչպե՞ս կարելի է դարձնել երկար հոդվածը հեշտ կարդացվող",
    opts: ["Գրել ամբողջը մեկ տողով", "Օգտագործել ենթավերնագրեր, կարճ պարբերություններ և ցուցակներ", "Ջնջել բոլոր նկարները", "Օգտագործել միայն մեծատառեր"],
    correct: 1,
    explain: "Ենթավերնագրերն ու կարճ պարբերությունները օգնում են արագ հասկանալ նյութի կառուցվածքը։"
  },
  {
    q: "Ի՞նչ է բլոգի «կատեգորիան»",
    opts: ["Հոդվածների թեմատիկ խումբ", "Միայն ֆոնի գույն", "Մկնիկի տեսակ", "Ինտերնետի արագություն"],
    correct: 0,
    explain: "Կատեգորիաները դասավորում են հոդվածները ըստ թեմաների՝ գիտություն, սպորտ, գրքեր և այլն։"
  },
  {
    q: "Ո՞ր նախադասությունն է ավելի լավ վերնագիր",
    opts: ["Իմ հոդվածը", "Ինչպես պատրաստել առողջ նախաճաշ 10 րոպեում", "Բարև", "Շատ երկար և անհասկանալի վերնագիր բոլոր բաների մասին"],
    correct: 1,
    explain: "Լավ վերնագիրը կոնկրետ է, հետաքրքիր և ցույց է տալիս հոդվածի օգուտը։"
  },
  {
    q: "Ինչո՞ւ է պետք նախադիտել հոդվածը հրապարակելուց առաջ",
    opts: ["Սխալները, նկարները և դասավորությունը ստուգելու համար", "Որ համակարգիչը անջատվի", "Որ վերնագիրը կորի", "Դա պարտադիր չէ երբեք"],
    correct: 0,
    explain: "Նախադիտումը օգնում է գտնել սխալներ և համոզվել, որ ամեն ինչ գեղեցիկ է երևում։"
  },
  {
    q: "Ի՞նչը կարող է օգնել ընթերցողին մեկնաբանություն թողնել",
    opts: ["Հոդվածի վերջում հարց տալը", "Բոլոր մեկնաբանությունները անջատելը", "Միայն բարդ բառեր օգտագործելը", "Թեման չնշելը"],
    correct: 0,
    explain: "Հարցը հոդվածի վերջում ընթերցողին հրավիրում է մասնակցել քննարկմանը։"
  },
  {
    q: "Ո՞րն է հեղինակային իրավունքի ճիշտ պահպանումը",
    opts: ["Ուրիշի նկարը վերցնել առանց նշելու", "Օգտագործել սեփական նկար կամ նշել աղբյուրը", "Ջնջել նկարի հեղինակի անունը", "Ներկայացնել ուրիշի նյութը որպես սեփական"],
    correct: 1,
    explain: "Սեփական նյութը կամ ճիշտ նշված աղբյուրը ավելի ազնիվ և անվտանգ ընտրություն է։"
  },
  {
    q: "Ինչի՞ համար է «Իմ մասին» էջը",
    opts: ["Հեղինակին ներկայացնելու և բլոգի նպատակը բացատրելու", "Միայն գաղտնաբառ պահելու", "Կայքը փակելու", "Հոդվածները ջնջելու"],
    correct: 0,
    explain: "«Իմ մասին» էջը օգնում է ընթերցողին ճանաչել հեղինակին և հասկանալ բլոգի թեման։"
  },
  {
    q: "Ի՞նչ է լավ բլոգային սովորություն",
    opts: ["Հրապարակել առանց կարդալու", "Պարբերաբար գրել և խմբագրել", "Միշտ պատճենել ուրիշներից", "Չպատասխանել մեկնաբանություններին"],
    correct: 1,
    explain: "Լավ բլոգերը գրում է պարբերաբար, ստուգում է տեքստը և հարգում ընթերցողներին։"
  },
  {
    q: "Ո՞րն է բլոգի համար հարմար նկար",
    opts: ["Թեմային համապատասխան պարզ նկար", "Շատ մութ ու անհասկանալի նկար", "Ուրիշի անձնական նկարը առանց թույլտվության", "Նկար, որը կապ չունի թեմայի հետ"],
    correct: 0,
    explain: "Նկարը պետք է օգնի հասկանալ թեման և լինի անվտանգ օգտագործման համար։"
  },
  {
    q: "Ի՞նչ է «թեգը»",
    opts: ["Կարճ բառ կամ արտահայտություն, որով նշվում է հոդվածի թեման", "Հոդվածը ջնջող կոճակ", "Տառատեսակի անուն", "Բլոգի գաղտնի կոդ"],
    correct: 0,
    explain: "Թեգերը օգնում են որոնել և խմբավորել հոդվածները ըստ կարևոր բառերի։"
  }
];

const QUIZ_SIZE = 10;
let activeQuestions = [];
let currentQ = 0;
let score = 0;
let answered = false;
let userAnswers = [];

function shuffleList(list) {
  return [...list].sort(() => Math.random() - 0.5);
}

function startQuiz() {
  currentQ = 0;
  score = 0;
  answered = false;
  userAnswers = [];
  activeQuestions = shuffleList(QUESTIONS).slice(0, QUIZ_SIZE);

  document.getElementById('quiz-results').classList.remove('show');
  document.getElementById('quiz-card').style.display = 'block';
  document.getElementById('qscore-live').style.display = 'block';

  document.querySelectorAll('.quiz-progress-wrap').forEach(el => {
    el.style.display = 'flex';
  });

  updateScoreLive();
  renderQuestion();
}

function renderQuestion() {
  answered = false;

  const q = activeQuestions[currentQ];

  document.getElementById('q-num').textContent = 'ՀԱՐՑ ' + (currentQ + 1);
  document.getElementById('q-text').textContent = q.q;

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';

  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    grid.appendChild(btn);
  });

  const fb = document.getElementById('q-feedback');
  fb.className = 'q-feedback';
  fb.textContent = '';

  document.getElementById('btn-next').classList.remove('show');

  const pct = (currentQ / activeQuestions.length) * 100;
  document.getElementById('qpbar').style.width = pct + '%';
  document.getElementById('qplabel').textContent = 'Հարց ' + (currentQ + 1) + ' / ' + activeQuestions.length;
}

function selectAnswer(idx) {
  if (answered) return;

  answered = true;

  const q = activeQuestions[currentQ];
  const btns = document.querySelectorAll('.option-btn');

  btns.forEach(b => {
    b.disabled = true;
  });

  const fb = document.getElementById('q-feedback');

  if (idx === q.correct) {
    score++;
    btns[idx].classList.add('correct');

    fb.className = 'q-feedback ok show';
    fb.innerHTML = '✅ <strong>Ճիշտ է!</strong> ' + q.explain;
  } else {
    btns[idx].classList.add('wrong');
    btns[q.correct].classList.add('reveal-correct');

    fb.className = 'q-feedback fail show';
    fb.innerHTML = '❌ <strong>Սխալ:</strong> Ճիշտ պատասխանն էր՝ «' + q.opts[q.correct] + '»։ ' + q.explain;
  }

  userAnswers.push({
    q: q.q,
    chosen: q.opts[idx],
    correct: q.opts[q.correct],
    ok: idx === q.correct
  });

  updateScoreLive();

  const nextBtn = document.getElementById('btn-next');
  nextBtn.textContent = currentQ < activeQuestions.length - 1 ? 'Հաջորդ հարց →' : '📊 Տեսնել արդյունքները';
  nextBtn.classList.add('show');
}

function nextQuestion() {
  currentQ++;

  if (currentQ >= activeQuestions.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

function updateScoreLive() {
  document.getElementById('qscore-live').textContent = '⭐ Միավոր: ' + score;
}

function showResults() {
  document.getElementById('quiz-card').style.display = 'none';
  document.getElementById('qscore-live').style.display = 'none';

  document.querySelectorAll('.quiz-progress-wrap').forEach(el => {
    el.style.display = 'none';
  });

  const total = activeQuestions.length;
  const wrong = total - score;
  const pct = Math.round((score / total) * 100);

  document.getElementById('res-score').textContent = score;
  document.getElementById('res-outof').textContent = '/ ' + total;
  document.getElementById('res-correct').textContent = score;
  document.getElementById('res-wrong').textContent = wrong;
  document.getElementById('res-pct').textContent = pct + '%';

  let grade;
  let msg;
  let gradeColor;

  if (pct === 100) {
    grade = '🏆 Կատարյալ!';
    msg = 'Բոլոր հարցերն ճիշտ! Դուք հիանալի եք յուրացրել բլոգ ստեղծելու թեման։';
    gradeColor = '#4ecd9c';
  } else if (pct >= 80) {
    grade = '⭐ Հիանալի';
    msg = 'Շատ լավ արդյունք! Ձեր գիտելիքները բլոգի մասին գերազանց մակարդակի են։';
    gradeColor = '#4ecd9c';
  } else if (pct >= 60) {
    grade = '👍 Լավ';
    msg = 'Լավ արդյունք! Մի քանի կետ կարող եք կրկնել ու ամրապնդել։';
    gradeColor = 'var(--highlight)';
  } else if (pct >= 40) {
    grade = '📖 Բավական';
    msg = 'Դեռ կան բաներ, որ կարդալ ու սովորել է հարկավոր։ Կրկին փորձեք!';
    gradeColor = 'var(--accent2)';
  } else {
    grade = '💡 Կրկնեք Դասը';
    msg = 'Խորհուրդ ենք տալիս կրկնաբոց անցնել բոլոր բաժինները, հետո նորից փորձել։';
    gradeColor = '#ff9a9a';
  }

  const gradeEl = document.getElementById('res-grade');
  gradeEl.textContent = grade;
  gradeEl.style.color = gradeColor;

  document.getElementById('res-msg').textContent = msg;

  const rl = document.getElementById('review-list');
  rl.innerHTML = '<h4>📋 Հարց-Պատասխան Ամփոփում</h4>';

  userAnswers.forEach((a, i) => {
    const div = document.createElement('div');
    div.className = 'review-item ' + (a.ok ? 'r-ok' : 'r-fail');

    div.innerHTML = `
      <div class="r-q">${i + 1}. ${a.q}</div>
      <div class="r-ans">Ձեր պատասխանը: <span style="color:${a.ok ? '#4ecd9c' : '#ff9a9a'}">${a.chosen}</span></div>
      ${!a.ok ? `<div class="r-ans">Ճիշտ պատասխան: <span class="r-correct-ans">${a.correct}</span></div>` : ''}
    `;

    rl.appendChild(div);
  });

  document.getElementById('qpbar').style.width = '100%';
  document.getElementById('quiz-results').classList.add('show');
}

// Auto-start quiz when section comes into view
let quizStarted = false;

const quizObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !quizStarted) {
      quizStarted = true;
      startQuiz();
    }
  });
}, { threshold: 0.05 });

const qEngineEl = document.getElementById('quiz-engine');

if (qEngineEl) {
  quizObserver.observe(qEngineEl);
}

const BUILDER_ITEMS = [
  { id: 'title', label: 'Հստակ վերնագիր', icon: '🏷️', useful: true, slot: 0 },
  { id: 'menu', label: 'Բաժինների մենյու', icon: '🧭', useful: true, slot: 1 },
  { id: 'intro', label: 'Կարճ ներածություն', icon: '✨', useful: true, slot: 2 },
  { id: 'image', label: 'Թեմային համապատասխան նկար', icon: '🖼️', useful: true, slot: 3 },
  { id: 'article', label: 'Ենթավերնագրերով հոդված', icon: '📝', useful: true, slot: 4 },
  { id: 'source', label: 'Աղբյուր և անվտանգություն', icon: '🛡️', useful: true, slot: 5 },
  { id: 'password', label: 'Գաղտնաբառի նկար', icon: '🔐', useful: false },
  { id: 'noise', label: 'Շատ շարժվող գովազդ', icon: '💥', useful: false },
  { id: 'address', label: 'Տան հասցե', icon: '📍', useful: false }
];

let selectedBuilderItems = [];

function startBuilderGame() {
  selectedBuilderItems = [];
  renderBuilderGame();
}

function renderBuilderGame() {
  const palette = document.getElementById('builder-palette');
  const feedback = document.getElementById('builder-feedback');
  const slots = document.querySelectorAll('.preview-slot');
  const usefulCount = selectedBuilderItems.length;
  const pct = Math.round((usefulCount / 6) * 100);

  document.getElementById('game-score').textContent = 'Հավաքված: ' + usefulCount + ' / 6';
  document.getElementById('game-round').textContent = 'Որակ: ' + pct + '%';
  document.getElementById('builder-title').textContent = usefulCount === 6
    ? 'Բլոգի էջը պատրաստ է'
    : 'Ընտրեք բլոգի համար կարևոր մասերը';

  slots.forEach((slot, index) => {
    const item = BUILDER_ITEMS.find(part => part.slot === index && selectedBuilderItems.includes(part.id));
    slot.className = 'preview-slot ' + (item ? 'filled' : 'empty');
    slot.textContent = item ? item.icon + ' ' + item.label : slot.dataset.label || slot.textContent;
    if (!slot.dataset.label) slot.dataset.label = slot.textContent;
  });

  palette.innerHTML = '';
  BUILDER_ITEMS.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'builder-item ' + (selectedBuilderItems.includes(item.id) ? 'selected' : '');
    btn.innerHTML = `<span>${item.icon}</span>${item.label}`;
    btn.disabled = selectedBuilderItems.includes(item.id);
    btn.onclick = () => chooseBuilderItem(item);
    palette.appendChild(btn);
  });

  feedback.className = 'mission-feedback';
  feedback.textContent = '';

  if (usefulCount === 6) {
    feedback.className = 'mission-feedback show ok';
    feedback.textContent = 'Գերազանց. բլոգի էջում կա վերնագիր, մենյու, ներածություն, նկար, հոդված և անվտանգ հրապարակման մաս։';
  }
}

function chooseBuilderItem(item) {
  const feedback = document.getElementById('builder-feedback');

  if (!item.useful) {
    feedback.className = 'mission-feedback show fail';
    feedback.textContent = 'Այս մասը բլոգում չավելացնենք. այն կարող է շեղել, վտանգավոր լինել կամ վնասել ընթերցողի վստահությանը։';
    return;
  }

  selectedBuilderItems.push(item.id);
  renderBuilderGame();

  if (selectedBuilderItems.length < 6) {
    feedback.className = 'mission-feedback show ok';
    feedback.textContent = 'Լավ ընտրություն. էջը դարձավ ավելի օգտակար և հարմար կարդալու համար։';
  }
}

// Also start on page load if quiz section is already visible
window.addEventListener('load', () => {
  if (!quizStarted) startQuiz();
  startBuilderGame();
});
