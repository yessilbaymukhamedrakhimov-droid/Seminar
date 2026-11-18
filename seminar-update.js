/* Regional seminar additions. Existing slide IDs remain stable. */
(() => {
  'use strict';
  const tr=(kk,ru)=>lang==='kz'?kk:ru;
  const regions=[
    ['akmola','Ақмола облысы','Акмолинская область'],['aktobe','Ақтөбе облысы','Актюбинская область'],
    ['almaty-region','Алматы облысы','Алматинская область'],['atyrau','Атырау облысы','Атырауская область'],
    ['east','Шығыс Қазақстан облысы','Восточно-Казахстанская область'],['almaty','Алматы қаласы','г. Алматы'],
    ['astana','Астана қаласы','г. Астана'],['shymkent','Шымкент қаласы','г. Шымкент'],
    ['zhambyl','Жамбыл облысы','Жамбылская область'],['west','Батыс Қазақстан облысы','Западно-Казахстанская область'],
    ['karaganda','Қарағанды облысы','Карагандинская область'],['kostanay','Қостанай облысы','Костанайская область'],
    ['kyzylorda','Қызылорда облысы','Кызылординская область'],['mangystau','Маңғыстау облысы','Мангистауская область'],
    ['abai','Абай облысы','Область Абай'],['zhetysu','Жетісу облысы','Область Жетысу'],
    ['ulytau','Ұлытау облысы','Область Ұлытау'],['pavlodar','Павлодар облысы','Павлодарская область'],
    ['north','Солтүстік Қазақстан облысы','Северо-Казахстанская область'],['turkestan','Түркістан облысы','Туркестанская область']
  ];
  const enhanced=new Set(['west','karaganda','kyzylorda','mangystau','abai','zhetysu','ulytau','pavlodar','north','turkestan']);
  const ids={regions:25,meet:26,shift:27,tasks:28,research:29,challenge:30,ideas:31,support:32,data:33,feedback:34,wifi:35,actions:36,wifiSite:37,pluginLocation:38,skillExamples:39,practicum:40,platform:41};
  const extraIds=new Set(Object.values(ids).filter(x=>x!==ids.regions));
  const originalChapters=CHAPTERS.map(c=>({...c,slides:[...c.slides]}));
  // Omit the selected introduction, research, ideas, activity and feedback slides.
  const removedSlides=new Set([2,3,15,18,24,25,27,29,31,33,34,35,36,37]);
  const removedSlideTargets={35:22,37:22,24:22,36:22,2:4,3:4,15:24,18:22,25:7,27:7,29:11,31:22,33:22,34:22};
  for(const [id,target] of Object.entries(REDIRECT)){
    if(removedSlides.has(target))REDIRECT[id]=removedSlideTargets[target];
  }
  Object.assign(REDIRECT,removedSlideTargets);
  const initialHash=window.VACANCY_INITIAL_HASH||location.hash;
  let selected='',showRegionChoices=false;
  try{selected=new URL(location.href).searchParams.get('region')||localStorage.getItem('seminar-region')||'';}catch{}
  if(!regions.some(r=>r[0]===selected))selected='';
  const enabled=()=>enhanced.has(selected);
  const regionName=(id=selected)=>{const r=regions.find(r=>r[0]===id);return r?r[lang==='kz'?1:2]:'';};
  let dataRegion=['turkestan','kyzylorda'].includes(selected)?selected:'turkestan';
  let search='',inactiveOnly=false;
  const titles={
    41:["ChatGPT — чаттан да кең платформа","ChatGPT — больше, чем чат"],
    40:['Pedagog BilimAI College: жұмыс үлгісі','Pedagog BilimAI College: пример работы'],
    39:['Pedagog BilimAI College: жұмыс мысалы','Pedagog BilimAI College: пример работы'],
    38:['Плагиндерді қайдан табуға болады','Где найти плагины'],
    37:['Wi-Fi: интерактивті пәтер зертханасы','Wi-Fi: интерактивная лаборатория квартиры'],
    36:['Сіздің келесі қадамдарыңыз','Ваши дальнейшие действия'],
    35:['Жағдаят: үйдегі Wi-Fi нашар жұмыс істейді','Ситуация: дома плохо работает Wi-Fi'],
    25:['Өңіріңізді таңдаңыз','Выберите свой регион'],
    26:['ChatGPT пайдалану тәжірибелеріңізбен бөлісіңіздер','Поделитесь своим опытом использования ChatGPT'],
    27:['ЖИ-мен жұмыс: назар неге ауысады?','Как меняется наша работа с AI'],
    28:['Кесте бойынша тапсырмалар','Задачи по расписанию'],
    29:['Жеке тәжірибе: зерттеу және AI','Личный опыт: исследование и AI'],
    30:['CODEX CHALLENGE · Қатысу','CODEX CHALLENGE · Участие'],
    31:['Сіздің идеяларыңыз — болашақ әзірлемелерге негіз','Ваши идеи — основа будущих разработок'],
    32:['Техникалық қолдау','Техническая поддержка'],
    33:['Өңірлердегі қатысу және белсенділік','Участие и активность в регионах'],
    34:['Кері байланыс','Обратная связь']
  };
  const subtitles={
    41:["Өз міндеттеріңіз үшін сервистер мен плагиндерді қосып, мүмкіндіктерін кеңейтіңіз.","Это платформа: подключайте сервисы и плагины, чтобы расширять её возможности под свои задачи."],
    40:['Дағды: «3D шолу» · фото бойынша модель','Навык: «3D-обзор» · модель по фотографии'],
    39:['Дағдылар: «3D-модельдер» + «Тренажёрлер». «Ғимараттар мен құрылыстарды салу және пайдалану» мамандығына арналған «Ғимарат инспекторы» мысалы. Тренажёр практикалық әрекеттерді кері байланыспен пысықтау үшін қажет.','Навыки: «3D-модели» + «Тренажёры». Пример — «Инспектор здания» для специальности «Строительство и эксплуатация зданий и сооружений». Тренажёр нужен для отработки практических действий с обратной связью.'],
    38:['Жұмыс → Плагиндер → ChatGPT Edu — Colleges → көмекшіні таңдаңыз.','Откройте «Плагины» под полем запроса или через значок слева → ChatGPT Edu — Colleges → выберите помощника.'],
    37:['QR-кодты сканерлеңіз немесе сайтты ашыңыз.','Отсканируйте QR-код или откройте сайт.'],
    36:['',''],
    35:['Тегін ChatGPT — 1 минут','Бесплатный ChatGPT — 1 минута'],
    25:['Семинарды жалғастыру үшін облысты немесе қаланы таңдаңыз.','Выберите область или город, чтобы продолжить семинар.'],
    26:['',''],
    27:['Негізгі назар — AI жауабын тексеру, түсіну және жетілдіру.','В центре внимания — проверка, осмысление и доработка ответа AI.'],
    28:['Тапсырманы бір рет сипаттаңыз және оның орындалу уақытын белгілеңіз.','Опишите задачу и задайте время её выполнения.'],
    29:['Ғылыми мақалаға арналған зерттеуде AI қолдану тәжірибесі.','Опыт использования AI в исследовании для научной статьи.'],
    30:['QR-кодты сканерлеп, қатысу туралы ақпаратқа өтіңіз.','Отсканируйте QR-код, чтобы перейти к информации об участии.'],
    31:['Болашақ әзірлемелерге арналған ұсыныстарыңызды бірге талқылайық.','Обсудим ваши предложения для будущих разработок.'],
    32:['Сұрағыңыз болса, Telegram-дағы қолдау қызметіне жазыңыз.','Если нужна помощь, напишите в службу поддержки в Telegram.'],
    33:['Облыс → аудан → колледж → педагогтер.','Область → район → колледж → педагоги.'],
    34:['Семинар туралы пікіріңізбен бөлісіңіз.','Поделитесь впечатлениями о семинаре.']
  };
  for(const l of ['kz','ru'])for(const [id,t] of Object.entries(titles)){
    const k=l==='kz'?0:1;DATA[l][+id]=['','','',subtitles[id][k]];
    FINAL_UI[l].titles[id]=t[k];FINAL_UI[l].subtitles[id]=subtitles[id][k];
    DETAILS[l][id]={notes:subtitles[id][k],links:[]};
  }
  const originalActivationSubtitle={kz:FINAL_UI.kz.subtitles[18],ru:FINAL_UI.ru.subtitles[18]};
  function rebuild(){
    const next=originalChapters.map(c=>({...c,slides:[...c.slides]}));
    const tools=next.find(c=>c.slides.includes(7));
    tools.slides.unshift(ids.meet,...(enabled()?[ids.shift]:[]));
    tools.slides.splice(tools.slides.indexOf(7)+1,0,ids.platform);
    if(enabled()){
      next.find(c=>c.slides.includes(11)).slides.unshift(ids.research);
      next.find(c=>c.slides.includes(24)).slides.push(ids.challenge,ids.ideas);
      const last=next.find(c=>c.slides.includes(22));last.slides.splice(last.slides.indexOf(22),0,ids.support,ids.data,ids.feedback);
    }
    const challenge=next.find(c=>c.slides.includes(24));
    challenge.slides.splice(challenge.slides.indexOf(24)+1,0,ids.actions);
    const pluginsChapter=next.find(c=>c.slides.includes(10));
    pluginsChapter.slides.splice(pluginsChapter.slides.indexOf(10)+1,0,ids.pluginLocation);
    const practice=next.find(c=>c.slides.includes(13));
    practice.slides.splice(practice.slides.indexOf(13)+1,0,ids.wifi,ids.wifiSite);
    const exampleChapter=next.find(c=>c.slides.includes(13));
    exampleChapter.slides.splice(exampleChapter.slides.indexOf(13)+1,0,ids.skillExamples,ids.practicum);
    for(const chapter of next)chapter.slides=chapter.slides.filter(id=>!removedSlides.has(id));
    CHAPTERS.splice(0,CHAPTERS.length,...next.filter(chapter=>chapter.slides.length));FLOW.splice(0,FLOW.length,...CHAPTERS.flatMap(c=>c.slides));
    if(!enabled()&&R.mode==='tasks')R.mode='modes';
    for(const l of ['kz','ru'])FINAL_UI[l].subtitles[18]=enabled()?(l==='kz'?'Алдымен іске қосу қадамдарын орындаңыз, қажет болса бейненұсқаулықты ашыңыз.':'Начните с шагов активации, затем при необходимости откройте видеоинструкцию.'):originalActivationSubtitle[l];
  }
  rebuild();R.activation=enabled()?'steps':'video';
  function allowed(n){
    if(n===ids.tasks){R.mode=enabled()?'tasks':'modes';n=7;}
    if(!FLOW.includes(n))n=REDIRECT[n]??0;
    if(!FLOW.includes(n))n=0;
    return n;
  }
  parseHash=function(){const m=location.hash.match(/^#(kz|ru|en)\/(\d+)$/);if(m){lang=m[1]==='en'?'ru':m[1];idx=allowed(Number(m[2])-1);}};
  const previousGo=go;
  go=function(n){if(n===ids.regions||FLOW.includes(n)||extraIds.has(n))return previousGo(allowed(n));return previousGo(allowed(REDIRECT[n]??n));};
  const jump=(label,id,icon='arrow',cls='action')=>B(label,'goto',icon,cls,`data-index="${id}"`);
  const link=(label,url,cls='action')=>`<a class="${cls}" href="${E(url)}" target="_blank" rel="noopener noreferrer">${E(label)}${I('link')}</a>`;
  function driveDemoSvg(){
    const prompts=lang==='kz'?['жаса…','өзгерт…','атауын өзгерт…','аудар…']:['создай…','измени…','переименуй…','переведи…'];
    return `<svg class="drive-chat-svg drive-composer-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 260" role="img" aria-label="${tr('Google Drive бар ChatGPT сұрау өрісі','Поле запроса ChatGPT с подключённым Google Drive')}"><style>.drive-prompt{opacity:0;animation:drivePrompt 20s linear infinite}.drive-typing{animation:driveTyping 5s steps(42,end) infinite}.drive-caret{animation:driveCaret .7s steps(1) infinite}@keyframes drivePrompt{0%,23%{opacity:1}24%,100%{opacity:0}}@keyframes driveTyping{0%,9%{width:0}64%,100%{width:700px}}@keyframes driveCaret{50%{opacity:0}}@media(prefers-reduced-motion:reduce){.drive-prompt{animation:none;opacity:0}.drive-prompt:first-of-type{opacity:1}.drive-typing{animation:none;width:700px}}</style><defs><filter id="composer-shadow" x="-10%" y="-60%" width="120%" height="220%"><feDropShadow dx="0" dy="7" stdDeviation="12" flood-color="#172437" flood-opacity=".06"/></filter><clipPath id="composer-type"><rect class="drive-typing" x="230" y="81" width="700" height="38"/></clipPath></defs><rect x="18" y="55" width="964" height="154" rx="37" fill="white" stroke="#e6e6e6" filter="url(#composer-shadow)"/><g transform="translate(45 88) scale(.72)"><path d="M8 22L18 5h10L18 22z" fill="#0f9d58"/><path d="M18 5h10l10 17H28z" fill="#fbbc04"/><path d="M8 22h30l-5 9H13z" fill="#4285f4"/></g><text x="79" y="111" font-family="Arial,sans-serif" font-size="21" fill="#0673e8" font-weight="600">Google Drive</text>${prompts.map((text,i)=>`<g class="drive-prompt" style="animation-delay:-${20-i*5}s"><g clip-path="url(#composer-type)"><text x="235" y="111" font-family="Arial,sans-serif" font-size="21" fill="#171717">${E(text)}</text></g></g>`).join('')}<path d="M43 174h18m-9-9v18" stroke="#171717" stroke-width="2" stroke-linecap="round"/><text x="723" y="179" font-family="Arial,sans-serif" font-size="16" fill="#242424">GPT-6 Sol<tspan fill="#929292"> ${tr('Жеңіл','Лёгкое')}</tspan></text><g fill="none" stroke="#242424" stroke-width="1.7" stroke-linecap="round"><rect x="886" y="159" width="8" height="15" rx="4"/><path d="M882 170q0 11 8 11t8-11m-8 11v5m-4 0h8"/></g><circle cx="948" cy="173" r="23" fill="#2d66c8"/><path d="M948 183v-21m-8 8 8-8 8 8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  function qrSlide(kind,url,label){
    return `${head()}<div class="seminar-qr-layout"><a class="seminar-qr-link" href="${E(url)}" target="_blank" rel="noopener noreferrer" aria-label="${E(label)}"><img class="seminar-qr ${['challenge','support'].includes(kind)?'branded':''}" src="seminar-assets/${kind}-qr.png" alt="${E(label)} · QR"></a><div class="seminar-qr-caption">${link(label,url,'action secondary')}<span>${E(url.replace('https://',''))}</span></div>${kind==='meet-curipod'?`<div class="curipod-help-action"><button class="quiet-btn" data-seminar="curipod-help" aria-haspopup="dialog">${I('note')}${tr('Жүргізушіге арналған нұсқаулық','Инструкция для ведущего')}</button></div>`:''}</div>`;
  }
  function activityView(kind){
    const config={
      meet:{icon:'chat',url:'https://tinyurl.com/23t39fhd',label:tr('Танысуды бастау','Начать знакомство'),lead:tr('Сіз және ChatGPT','Вы и ChatGPT'),body:tr('Қандай міндеттерде қолданасыз? Қандай тәжірибеңізбен бөліскіңіз келеді?','В каких задачах вы его используете? Каким опытом хотите поделиться?'),items:[tr('Тәжірибе','Опыт'),tr('Күнделікті міндеттер','Повседневные задачи'),tr('Жаңа мүмкіндіктер','Новые возможности')]},
      ideas:{icon:'spark',url:'https://tinyurl.com/3zw9yzk9',label:tr('Идеямен бөлісу','Поделиться идеей'),lead:tr('Келесі қадамды бірге ойластырайық','Вместе определим следующий шаг'),body:tr('Жұмысыңызды жеңілдететін жаңа құралдар мен мүмкіндіктер туралы идеяларыңызды бөлісіңіз.','Поделитесь идеями новых инструментов и возможностей, которые упростят вашу работу.'),items:[tr('Қажеттіліктер','Потребности'),tr('Ұсыныстар','Предложения'),tr('Болашақ әзірлемелер','Будущие разработки')]},
      feedback:{icon:'note',url:'https://tinyurl.com/y2cv7hyx',label:tr('Кері байланысты ашу','Открыть обратную связь'),lead:tr('Сіздің пікіріңіз маңызды','Ваше мнение важно'),body:tr('Не пайдалы болды? Нені тереңірек қарастырғыңыз келеді? Семинар туралы ойларыңызбен бөлісіңіз.','Что было полезно? Что хотелось бы разобрать подробнее? Поделитесь впечатлениями о семинаре.'),items:[tr('Пайдалы тұстар','Полезные моменты'),tr('Сұрақтар','Вопросы'),tr('Ұсыныстар','Предложения')]}
    }[kind];
    return `${head()}<section class="activity-card activity-${kind}"><div class="activity-copy"><span class="activity-icon">${I(config.icon)}</span><h3>${config.lead}</h3><p>${config.body}</p>${link(config.label,config.url,'action activity-open')}</div><div class="activity-topics" aria-hidden="true"><span class="activity-orbit"></span>${config.items.map((x,i)=>`<div class="activity-topic"><span>0${i+1}</span>${E(x)}</div>`).join('')}</div></section>`;
  }
  function modesTabs(){return tabs([['modes','Chat / Work / Codex'],...(enabled()?[['tasks',tr('Кесте бойынша тапсырма','Задачи по расписанию')]]:[]),['power',tr('Қуатты таңдау','Выбор мощностей/моделей')],['usage',tr('Лимиттер және қолдану мәдениеті','Лимиты и культура использования')],['astra',tr('Astra: жоба мысалдары','Astra: примеры проектов')]],'mode');}
  function usageCultureView(compact=false){
    const rules=[
      [tr('Нақты тапсырма','Конкретная задача'),tr('Мақсат, аудитория, пішім.','Цель, аудитория, формат.')],
      [tr('Міндетке сай модель','Модель под задачу'),tr('Қарапайым түзетуге — жеңіл модель.','Для простой правки — лёгкая модель.')],
      [tr('Нүктелі түзету','Точечные правки'),tr('Бәрін емес, қажетті бөлікті өзгертіңіз.','Меняйте нужный фрагмент, а не всё.')],
      [tr('Жауапкершілік','Ответственность'),tr('Нәтижені тексеріңіз. Дербес деректерді жүктемеңіз.','Проверяйте результат. Не загружайте персональные данные.')]
    ];
    if(compact)return `<section class="power-usage" aria-label="${tr('Лимиттер және қолдану мәдениеті','Лимиты и культура использования')}"><header><span class="soft-label">${tr('ЛИМИТТЕР ЖӘНЕ ҚОЛДАНУ МӘДЕНИЕТІ','ЛИМИТЫ И КУЛЬТУРА ИСПОЛЬЗОВАНИЯ')}</span><h3>${tr('Ресурс — міндетке сай','Ресурс — под задачу')}</h3><p>${tr('Тегін қолжетімділік шексіз ресурс емес. Ағымдағы лимиттерді ChatGPT хабарламаларынан тексеріңіз.','Бесплатный доступ не означает безлимит. Текущие ограничения проверяйте в уведомлениях ChatGPT.')}</p></header><div class="power-usage-rules">${rules.map((r,i)=>`<article><span>0${i+1}</span><div><h4>${r[0]}</h4><p>${r[1]}</p></div></article>`).join('')}</div><details class="power-usage-limits"><summary>${tr('Лимиттердің жаңаруы қалай көрсетіледі','Как показывается обновление лимитов')}</summary><p>${tr('Шартты оқу мысалы. Нақты лимиттер модельге және ұйым шарттарына байланысты.','Условный учебный пример. Реальные лимиты зависят от модели и условий организации.')}</p><img src="seminar-assets/usage-limits-animated${lang==='kz'?'-kz':''}.svg" alt="${tr('Лимиттердің жаңаруын түсіндіретін анимация','Анимация, поясняющая обновление лимитов')}"></details></section>`;
    return `<section class="usage-brief"><header><span class="soft-label">${tr('Саналы пайдалану','Осознанное использование')}</span><h3>«Судың да сұрауы бар»</h3><p>${tr('Тегін қолжетімділік ≠ шексіз ресурс','Бесплатный доступ ≠ безлимит')}</p></header><div class="usage-brief-columns"><div class="usage-brief-rules">${rules.map((r,i)=>`<article><span>0${i+1}</span><div><h4>${r[0]}</h4><p>${r[1]}</p></div></article>`).join('')}</div><aside class="usage-brief-animation"><img src="seminar-assets/usage-limits-animated${lang==='kz'?'-kz':''}.svg" alt="${tr('5 сағаттық және апталық лимиттердің жаңару мысалы','Пример обновления пятичасового и недельного лимитов')}"></aside></div><div class="usage-brief-example">${I('chat')}<p>${tr('«Тек 3-слайдты қысқарт. Қалғанын сақта».','«Сократи только третий слайд. Остальное сохрани».')}</p></div></section>`;
  }
  function shiftView(){
    const prep=tr('Іздеу, зерттеу, дайындық','Поиск, исследование, подготовка'),check=tr('Нәтижені тексеру','Проверка результата');
    return `${head()}<div class="seminar-shift"><div class="shift-legend"><span><i class="prep"></i>${prep}</span><span><i class="validation"></i>${check}</span></div>${[[tr('AI пайда болғанға дейін','До появления AI'),90,10],[tr('AI көмекшісімен','С AI-ассистентом'),10,90]].map(([name,p,v])=>`<article class="shift-row"><div class="shift-row-heading"><h3>${name}</h3><span>100%</span></div><div class="shift-track" role="img" aria-label="${E(name+': '+prep+' '+p+'%, '+check+' '+v+'%')}"><div class="prep" style="width:${p}%"><strong>${p}%</strong></div><div class="validation" style="width:${v}%"><strong>${v}%</strong></div></div></article>`).join('')}<div class="shift-takeaway">${I('check')}<p>${tr('AI ұсынады. Біз тексереміз, бағалаймыз және жетілдіреміз.','AI предлагает. Мы проверяем, оцениваем и дорабатываем.')}</p></div><p class="input-note">${tr('90/10 — жұмыс фокусының өзгеруін көрсететін шартты үлгі.','90/10 — условная иллюстрация изменения фокуса работы.')}</p></div>`;
  }
  function taskPrompt(){return tr('Әр дүйсенбіде Қазақстан уақытымен (UTC+5) сағат 08:00-де колледж студенттеріне арналған үш қысқа интерактивті тапсырма идеясын ұсын. Әрқайсысы үшін мақсатын, өткізу уақытын және қажетті материалдарды көрсет.','Каждый понедельник в 08:00 по времени Казахстана (UTC+5) предлагай три идеи коротких интерактивных заданий для студентов колледжа. Для каждой укажи цель, время проведения и необходимые материалы.');}
  function tasksView(){return `<div class="scheduled-panel"><div class="scheduled-layout"><section><div class="schedule-clock">${I('clock')}<div><strong>08:00</strong><span>${tr('Әр дүйсенбі · UTC+5','Каждый понедельник · UTC+5')}</span></div></div><ol class="schedule-steps">${[tr('Тапсырманы сипаттаңыз','Опишите задачу'),tr('Уақыт пен қайталану жиілігін көрсетіңіз','Укажите время и периодичность'),tr('ChatGPT растауын тексеріңіз','Проверьте подтверждение ChatGPT')].map(x=>`<li>${x}</li>`).join('')}</ol><p>${tr('Бір реттік еске салулар, тұрақты тапсырмалар және мерзімді шолулар. Хабарландыруларды баптаулардан қосуға болады.','Разовые напоминания, повторяющиеся задания и регулярные обзоры. Уведомления можно включить в настройках.')}</p></section><section class="schedule-prompt"><span class="soft-label">${tr('Педагогке арналған мысал','Пример для педагога')}</span><textarea id="scheduled-prompt" aria-label="${tr('Тапсырма сұрауы','Запрос для задачи')}" readonly>${E(taskPrompt())}</textarea><div class="actions"><button class="action" data-seminar="copy-task">${tr('Сұрауды көшіру','Скопировать запрос')}${I('copy')}</button>${link(tr('ChatGPT ашу','Открыть ChatGPT'),'https://chatgpt.com/','action secondary')}</div></section></div><p class="input-note schedule-note">${tr('Қолжетімділік аккаунт пен жұмыс кеңістігінің баптауларына байланысты. Тапсырмаларды Scheduled бөлімінде басқаруға болады.','Доступность зависит от аккаунта и настроек рабочего пространства. Управляйте задачами в разделе Scheduled.')}</p>${externalSources([['OpenAI · Scheduled tasks','https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt']])}</div>`;}
  const metricLabels=()=>[tr('Модульді бастады','Начали модуль'),tr('Модульді аяқтады','Завершили модуль'),tr('Лицензияны іске қосты','Активировали лицензию'),tr('Лицензияны қолданады','Используют лицензию')];
  const teachers=c=>c.teachers;
  const people=d=>d.colleges.flatMap(teachers);
  const inactive=p=>!(Number(p.values[3])>0);
  const number=v=>v==null?'—':E(v);
  function metrics(totals,cls=''){return `<div class="regional-metrics ${cls}">${metricLabels().map((s,j)=>`<div><strong>${number(totals[j])}</strong><span>${s}</span></div>`).join('')}</div>`;}
  function dataset(){return window.SEMINAR_REGIONAL_DATA.find(r=>r.id===dataRegion);}
  function dataResults(){
    const r=dataset(),q=search.trim().toLocaleLowerCase();let shown=0;
    const districts=r.districts.map((d,di)=>{
      const districtMatches=d.name.toLocaleLowerCase().includes(q);
      const colleges=d.colleges.map((c,ci)=>{
        const collegeMatches=c.name.toLocaleLowerCase().includes(q);
        const list=c.teachers.filter(p=>(!inactiveOnly||inactive(p))&&(!q||districtMatches||collegeMatches||p.name.toLocaleLowerCase().includes(q)));
        if(!list.length&&(q||inactiveOnly))return '';shown+=list.length;
        return `<details class="regional-college" ${q?'open':''}><summary><span>${E(c.name)}</span><small>${tr('Жазбалар','Записей')}: ${c.teachers.length} · ${tr('Белсенді емес','Неактивных')}: ${c.teachers.filter(inactive).length}</small></summary>${metrics(c.totals,'compact')}<div class="regional-table-wrap"><table class="regional-table"><thead><tr><th scope="col">${tr('Педагог','Педагог')}</th>${metricLabels().map(x=>`<th scope="col">${x}</th>`).join('')}<th scope="col">${tr('Мәртебе','Статус')}</th></tr></thead><tbody>${list.map(p=>`<tr class="${inactive(p)?'inactive':''}"><th scope="row">${E(p.name)}</th>${p.values.map(v=>`<td class="${!(Number(v)>0)?'missing':''}">${number(v)}</td>`).join('')}<td><span class="person-status ${inactive(p)?'off':'on'}">${inactive(p)?tr('Белсенді емес','Неактивен'):tr('Белсенді','Активен')}</span></td></tr>`).join('')}</tbody></table></div></details>`;
      }).filter(Boolean).join('');
      if(!colleges)return '';
      return `<details class="regional-district" ${q||inactiveOnly?'open':''}><summary><span>${E(d.name)}</span><small>${d.colleges.length} ${tr('колледж','колледжей')} · ${people(d).length} ${tr('жазба','записей')}</small></summary>${metrics(d.totals,'compact')}<div class="regional-colleges">${colleges}</div></details>`;
    }).filter(Boolean).join('');
    return `<p class="regional-result-count" role="status">${tr('Көрсетілген педагог жазбалары','Показано записей педагогов')}: ${shown}</p>${districts||`<p class="regional-empty">${tr('Сәйкес жазба табылмады.','Подходящих записей не найдено.')}</p>`}`;
  }
  function dataView(){
    const r=dataset(),count=r.districts.flatMap(people).length;
    return `${head()}<div class="regional-toolbar"><label>${tr('Облыс','Область')}<select id="regional-area">${window.SEMINAR_REGIONAL_DATA.map(a=>`<option value="${a.id}" ${a.id===dataRegion?'selected':''}>${E(regionName(a.id))}</option>`).join('')}</select></label><label class="regional-search-label">${tr('Аудан, колледж немесе педагог','Район, колледж или педагог')}<input id="regional-search" type="search" value="${E(search)}" placeholder="${tr('Іздеу…','Поиск…')}"></label><label class="regional-filter"><input id="regional-inactive" type="checkbox" ${inactiveOnly?'checked':''}>${tr('Тек белсенді емес','Только неактивные')}</label></div>${metrics(r.totals)}<p class="regional-note">${r.districts.length} ${tr('аудан / қала','районов / городов')} · ${r.districts.reduce((n,d)=>n+d.colleges.length,0)} ${tr('колледж','колледжей')} · ${count} ${tr('педагог жазбасы','записей педагогов')}. ${tr('Жиынтықтар Excel-дегі Total жолдарынан алынған. Бастапқы 2 мәндері сақталған. Қызыл түс — белгі жоқ; белсенділік лицензияны қолдану бағанымен анықталады.','Итоги взяты из строк Total в Excel. Исходные значения 2 сохранены. Красный цвет — нет отметки; активность определяется по использованию лицензии.')}</p><div id="regional-results">${dataResults()}</div>`;
  }
  const oldContent=content;
  function leafDiagram(){
    return `<svg class="lesson-leaf-svg" viewBox="0 0 640 480" role="img" aria-label="${tr('Жапырақтың бөліктері: тақтасы, жүйкелері, сағағы','Части листа: пластинка, жилки, черешок')}" xmlns="http://www.w3.org/2000/svg"><rect width="640" height="480" fill="#f3faf5"/><path d="M260 395C155 390 110 300 140 215C163 153 214 100 260 55C308 120 350 160 378 215C407 288 376 369 260 395Z" fill="#93d6a1" stroke="#248454" stroke-width="5"/><path d="M260 55V430M260 330L161 271M260 272L160 217M260 213L193 154M260 329L367 267M260 269L365 215M260 211L327 155" fill="none" stroke="#248454" stroke-width="5" stroke-linecap="round"/><g class="leaf-annotation" fill="none" stroke="#5a6f7d" stroke-width="2"><path d="M366 211L419 145H443"/><path d="M282 268H443"/><path d="M262 420L418 374H443"/></g><g class="leaf-annotation" fill="#1c4937" font-family="Segoe UI,Arial,sans-serif" font-size="18" font-weight="600"><text x="449" y="150">${tr('Тақтасы','Пластинка')}</text><text x="449" y="273">${tr('Жүйкелері','Жилки')}</text><text x="449" y="379">${tr('Сағағы','Черешок')}</text></g></svg>`;
  }
  function svgLessonComparison(){
    const diagram=leafDiagram().replace('viewBox="0 0 640 480"','viewBox="110 25 300 430"');
    return `<section class="college-skill-panel svg-mini" role="tabpanel" id="college-panel-pedagog" aria-labelledby="college-tab-pedagog-4"><h3>${tr('Бір мысал: фотореализм және SVG','Один пример: фотореализм и SVG')}</h3><div class="svg-mini-grid"><figure><img src="seminar-assets/leaf-photorealistic.png" alt="${tr('Жапырақтың фотореалистік бейнесі','Фотореалистичное изображение листа')}"><figcaption><strong>${tr('Фотореализм','Фотореализм')}</strong><span>${tr('Шынайы көрініс пен фактура. Генерация лимит жұмсайды.','Реалистичный вид и фактура. Генерация расходует лимит.')}</span></figcaption></figure><figure>${diagram}<figcaption><strong>${tr('Оқу SVG-иллюстрациясы','Учебная SVG-иллюстрация')}</strong><span>${tr('Қарапайым сызба, өңделетін пішіндер. Кодпен жасалады.','Простая схема, редактируемые формы. Создаётся кодом.')}</span></figcaption></figure></div><p class="svg-mini-takeaway">${tr('Сабақта құрылымды немесе байланысты түсіндіру үшін көбіне SVG жеткілікті. Сурет генераторы қажет емес; ИИ сұрауларының лимиттері сақталады.','Для объяснения строения или связей на занятии часто достаточно SVG. Генератор изображений не нужен; лимиты запросов к ИИ сохраняются.')}</p></section>`;
  }

  DETAILS.ru[ids.practicum].notes='Покажите, что результат одного запроса с фотографией — интерактивная HTML-сцена. Это пример скилла «3D-обзор» плагина Pedagog BilimAI College: он воссоздаёт внешний вид и планировку по фото, эскизу или плану. Поверните кабинет мышью, включите вид сверху, ракурс фото и медленный автообзор; затем остановите его. Невидимые на исходной фотографии части и размеры — приближённая реконструкция. Это обзор пространства, не инженерный обмер и не объяснение работы механизмов. Готовый пример создан заранее и встроен в слайд; генерация по запросу во время показа не запускается. Навык работает в тестовом режиме.';
  DETAILS.kz[ids.practicum].notes='Фотосуреті бар бір сұраудың нәтижесі интерактивті HTML-көрініс болатынын көрсетіңіз. Бұл — Pedagog BilimAI College плагинінің «3D шолу» дағдысының мысалы: фото, эскиз немесе жоспар бойынша сыртқы көрініс пен орналасуды жаңғыртады. Кабинетті бұрып, жоғарыдан көріністі, фото ракурсын және баяу автошолуды көрсетіңіз; кейін тоқтатыңыз. Бастапқы фотода көрінбейтін бөліктер мен өлшемдер шамамен қалпына келтірілген. Бұл — кеңістікті шолу, инженерлік өлшеу немесе механизм жұмысын түсіндіру емес. Дайын мысал алдын ала жасалып, слайдқа ендірілген; көрсету кезінде генерация іске қосылмайды. Дағды сынақ режимінде жұмыс істейді.';
  content=function(){
    if(idx===ids.practicum)return `${head()}<div class="overview-showcase"><aside class="overview-showcase-copy"><span class="soft-label">${tr('БІР СҰРАУ + ФОТО','ОДИН ЗАПРОС + ФОТО')}</span><h3>${tr('Фотодан — 3D-кабинетке','Из фотографии — в 3D-кабинет')}</h3><p>${tr('Жай сурет емес: бұруға, жақындатуға және әр ракурстан қарауға болатын модель.','Модель можно вращать, приближать и рассматривать с разных ракурсов.')}</p><figure class="overview-reference"><img src="seminar-assets/computer-room-reference.jpg" alt="${tr('3D-модель жасалған компьютерлік кабинеттің бастапқы фотосы','Исходное фото компьютерного кабинета для создания 3D-модели')}" width="640" height="426"><figcaption>${tr('Референс: кабинеттің бастапқы фотосы','Референс: исходное фото кабинета')}</figcaption></figure><div class="overview-prompt"><span>${tr('ПРОМПТ МЫСАЛЫ','ПРИМЕР ПРОМПТА')}</span><blockquote>${tr('@Pedagog BilimAI College осы фото бойынша компьютерлік кабинеттің интерактивті 3D-моделін жаса.','@Pedagog BilimAI College по этому фото создай интерактивную 3D-модель компьютерного кабинета.')}</blockquote></div><p class="overview-showcase-note">${tr('Сынақ режимі. Өлшемдер мен фотода көрінбейтін бөліктер шамамен қалпына келтірілген.','Тестовый режим. Размеры и части вне кадра восстановлены приблизительно.')}</p></aside><iframe class="overview-showcase-frame" src="seminar-assets/computer-room-3d.html?v=20261118-auto-reference" title="${tr('Компьютерлік кабинеттің интерактивті 3D-шолуы','Интерактивный 3D-обзор компьютерного кабинета')}" allow="fullscreen" allowfullscreen loading="lazy"></iframe></div>`;

    if(idx===ids.skillExamples)return `${head()}<div class="skill-example-layout"><aside class="skill-example-intro"><span class="soft-label">${tr('3D-МОДЕЛЬ + ТРЕНАЖЁР','3D-МОДЕЛЬ + ТРЕНАЖЁР')}</span><ul><li>${tr('3D-модельді айналдыру және зерттеу','Вращение и изучение 3D-модели')}</li><li>${tr('Практикалық жағдайларды талдау','Разбор практических ситуаций')}</li><li>${tr('Шешім таңдау және кері байланыс','Выбор решения и обратная связь')}</li></ul><a class="action secondary" href="seminar-assets/building-inspector/index.html?v=cinematic-1" target="_blank" rel="noopener noreferrer">${tr('Толық экранда ашу','Открыть отдельно')}${I('link')}</a></aside><iframe class="skill-example-frame" src="seminar-assets/building-inspector/index.html?v=cinematic-1" title="${tr('Ғимарат инспекторы — интерактивті оқу тренажёры','Инспектор здания — интерактивный учебный тренажёр')}" allowfullscreen loading="lazy"></iframe></div>`;

    if(idx===ids.platform)return `${head()}<figure class="large-plugin-catalog"><div class="large-plugin-crop"><img src="seminar-assets/plugins-catalog-original.png" alt="${tr('ChatGPT плагиндер каталогы','Каталог плагинов ChatGPT')}"></div><figcaption><span>${tr('Плагиндер каталогы','Каталог плагинов')}</span><button class="quiet-btn" data-seminar="platform-zoom" aria-haspopup="dialog">${tr('Үлкейту','Увеличить скриншот')}</button></figcaption></figure><div class="simple-drive-example"><div class="simple-drive-intro"><span class="soft-label">${tr("Мысал: Google Drive плагині","Пример: плагин Google Диска")}</span><p>${tr('Қосылған сервисті таңдаңыз да, тапсырманы жазыңыз.','Выберите подключённый сервис и напишите задачу.')}</p></div><div class="drive-demo-panel simple-drive-panel"><div class="drive-svg-demo">${driveDemoSvg()}</div><div class="drive-demo-controls"><button class="quiet-btn" data-seminar="drive-pause">${tr('Кідірту','Пауза')}</button><button class="quiet-btn" data-seminar="plugin-replay">${tr('Басынан','Сначала')}</button></div></div></div>`;

    if(idx===ids.pluginLocation)return `${head()}<div class="plugin-location-demo">${window.PLUGIN_LOCATION_SVG}</div><div class="plugin-location-controls"><button class="quiet-btn" data-seminar="plugin-pause">${tr('Кідірту','Пауза')}</button><button class="quiet-btn" data-seminar="plugin-replay">${tr('Қайталау','Повторить')}</button><a class="action secondary" href="https://chatgpt.com/plugins?directoryTab=workspace" target="_blank" rel="noopener noreferrer">${tr('Плагиндерді ашу','Открыть плагины')}${I('link')}</a></div>`;

    if(idx===ids.wifiSite)return qrSlide('wifi-site-20261106','https://wifi-apartment-lab.chatgpt-edu-9818.chatgpt.site/',tr('Wi-Fi зертханасын ашу','Открыть Wi-Fi-лабораторию'));
    if(idx===ids.actions)return `<div class="next-actions-layout"><div><div class="next-actions-kicker">${tr('СЕМИНАРДАН — ТӘЖІРИБЕГЕ','ОТ СЕМИНАРА — К ПРАКТИКЕ')}</div><h2 class="next-actions-title">${tr('Сіздің келесі<br>қадамдарыңыз','Ваши дальнейшие<br>действия')}</h2></div><div class="next-actions-cards">${[[tr('Лицензия алу','Получение лицензии'),'check'],[tr('Алған біліммен бөлісу','Поделиться полученными знаниями'),'chat'],[tr('Сабақта қолданып көру','Попробовать на занятиях'),'spark']].map(([text,icon],i)=>`<article class="next-actions-card"><div class="next-actions-card-top"><span class="next-actions-icon">${I(icon)}</span><span class="next-actions-number">0${i+1}</span></div><h3>${text}</h3></article>`).join('')}</div></div>`;

    if(idx===ids.wifi)return `${head()}<div style="display:grid;gap:24px;max-width:1150px"><article style="padding:28px 32px;border:1px solid #e2d9fa;border-radius:22px;background:#fff"><span class="soft-label">${tr('ЖАҒДАЯТ','СИТУАЦИЯ')}</span><p style="font-size:clamp(22px,2.1vw,32px);margin-top:14px">${tr('Пәтерде бірнеше бөлме бар. Роутер дәлізде тұр: қонақ бөлмеде Wi-Fi жақсы, ал жатын бөлме мен жұмыс бөлмесінде бейнебайланыс үзіліп қалады. Қабырғалар әртүрлі материалдан жасалған. Роутерді қайда қойған дұрыс?','В квартире несколько комнат. Роутер стоит в прихожей: в гостиной Wi-Fi хороший, а в спальне и кабинете видеосвязь прерывается. Между комнатами — стены из разных материалов. Где лучше поставить роутер?')}</p></article></div>`;

    if(idx===ids.meet)return qrSlide('meet-curipod','https://curipod.com/0748f247-656b-5570-98bf-f46494e47fdc/lessons/c6a88a02-8254-43cf-8fcb-72097f3ec6f6/edit',tr('Танысуды бастау','Начать знакомство'));
    if(idx===7&&R.mode==='usage')return head()+modesTabs()+usageCultureView();
    if(idx===ids.regions&&['atyrau','kostanay','aktobe','almaty-region','east'].includes(selected)&&!showRegionChoices){
      const workbook=selected==='east'?'https://onedrive.live.com/:x:/g/personal/7439eb7ce95bb850/IQAbjhe_ZRl8TLLZC5g7RIEdAeerECeMXyL848agiUiYizU':selected==='almaty-region'?'https://onedrive.live.com/:x:/g/personal/7439eb7ce95bb850/IQCW2jtwjbUjT7bAJOk37Zn6ATTF1W3s1SQPmM4F5886YeQ':selected==='aktobe'?'https://onedrive.live.com/:x:/g/personal/7439eb7ce95bb850/IQDtb0Y-l7RaRoK5s5NlVsGTAd1M9R-KueMYhoRgZW6IfLE':selected==='kostanay'?'https://onedrive.live.com/:x:/g/personal/7439EB7CE95BB850/IQCUBpc0OTlZSKbw85SePdUCAWRuQkxpGqcDglbihQOvSzE':'https://onedrive.live.com/:x:/g/personal/7439eb7ce95bb850/IQD3Az2fXryfQr5NAssvPvnKAfcTaHvH8H5vULIJNPSpOf8';
      const title=regionName()+' — '+tr('лицензияны пайдаланбайтын педагогтер','не используют лицензию');
      return `<header class="slide-head"><h2>${E(title)}</h2></header><div class="atyrau-workbook-actions"><button class="action secondary" data-seminar="change-region">${tr('Өңірді өзгерту','Сменить регион')}${I('arrow')}</button>${link(tr('Кестені бөлек ашу','Открыть таблицу отдельно'),workbook,'action secondary')}</div><iframe class="atyrau-workbook" title="${E(title)}" src="${E(workbook+'?action=embedview&wdAllowInteractivity=True&wdHideGridlines=True')}" allowfullscreen></iframe>`;
    }
    if(idx===ids.regions)return `${head()}<div class="region-grid">${regions.map((r,j)=>`<button class="region-choice" data-region="${r[0]}" aria-pressed="${selected===r[0]}"><span class="region-number">${String(j+1).padStart(2,'0')}</span><span>${E(regionName(r[0]))}</span>${selected===r[0]?I('check'):I('arrow')}</button>`).join('')}</div>`;
    if(enabled()){
      if(idx===ids.shift)return shiftView();
      if(idx===7&&R.mode==='tasks')return head()+modesTabs()+tasksView();
      if(idx===ids.research)return `${head()}<article class="research-showcase"><div class="research-emblem" aria-hidden="true">${I('work')}<span>Research<br>Atlas</span></div><div><span class="soft-label">${tr('Менің зерттеу тәжірибем','Моя исследовательская практика')}</span><h3>AI · Research Atlas</h3><p>${tr('Зерттеу материалдарын жүйелеу және ғылыми мақала дайындау барысында AI қолданған жеке жұмысымды көрсетемін.','Покажу свою работу с AI: как я систематизировала исследовательские материалы и готовила научную статью.')}</p>${link(tr('Зерттеу сайтын ашу','Открыть исследовательский сайт'),'https://nazym-research-atlas.lemony-vale-1204.chatgpt.site/')}<p class="input-note">${tr('Сайт жаңа қойындыда ашылады. ChatGPT арқылы кіру қажет болуы мүмкін.','Сайт откроется в новой вкладке. Может потребоваться вход через ChatGPT.')}</p></div></article>`;
      if(idx===ids.challenge)return qrSlide('challenge','https://t.me/+K19oya4nN-0xYTA6',tr('Челленджге қатысу','Участвовать в челлендже'));
      if(idx===ids.ideas)return activityView('ideas');
      if(idx===ids.support)return qrSlide('support','https://t.me/BilimAIHelpBot','@BILIMAIHELPBOT');
      if(idx===ids.data)return dataView();
      if(idx===ids.feedback)return activityView('feedback');
      if(idx===18)return `${head()}${tabs([['steps',tr('Іске қосу қадамдары','Шаги активации')],['video',tr('Бейненұсқаулық','Видеоинструкция')]],'activation')}${R.activation==='video'?media('youtube','youtube13'):baseContent().replace(head(),'')}`;
    }
    let result=oldContent();
    if(idx===7&&R.mode==='power')result=result.replace(/<img class="power-hero"[^>]*>/,()=>usageCultureView(true));
    if(idx===11&&collegeSkillSelection.pedagog===4)result=result.replace(/<section class="college-skill-panel"[\s\S]*?<\/section>/,svgLessonComparison());

    if(idx===24)result=result.replace('<p class="champions-cta">',`<a class="champions-channel-qr" href="https://t.me/CHATGPTEDU_COLLEGES" target="_blank" rel="noopener noreferrer"><img src="seminar-assets/college-telegram-qr.png" alt="${tr('Колледж педагогтеріне арналған Telegram арнасының QR-коды','QR-код Telegram-канала для педагогов колледжей')}"><span>@CHATGPTEDU_COLLEGES ${I('link')}</span></a><p class="champions-cta">`);
    if(enabled()&&idx===24)result=result.replace(/(<p class="champions-cta">[\s\S]*?<\/p>)/,`$1<p class="pr-campaign">${tr('PR-кампания: белсенді қолданушыларды іздейміз','PR-кампания: ищем активных пользователей')}</p>`);
    if(idx===7)result=result.replace(/<nav class="r-tabs"[\s\S]*?<\/nav>/,modesTabs());
    return result;
  };
  const oldRender=render;
  render=function(){
    oldRender();
    const roomFrame=document.querySelector('.overview-showcase-frame');
    if(roomFrame&&window.SEMINAR_ROOM_HTML){roomFrame.removeAttribute('src');roomFrame.srcdoc=window.SEMINAR_ROOM_HTML;}

    document.body.classList.toggle('seminar-enhanced',enabled());
    const slide=document.querySelector('#stage .slide');
    if(idx===ids.actions)slide.classList.add('next-actions-slide');
    if(extraIds.has(idx)||idx===ids.regions)slide.classList.add('seminar-addition',`seminar-page-${idx}`);
    if(idx===ids.regions&&!selected)document.querySelector('#dock [data-action="next"]').disabled=true;
  };
  document.addEventListener('click',async e=>{
    if(e.target.closest('[data-room-open]')&&window.SEMINAR_ROOM_HTML){e.preventDefault();const roomUrl=URL.createObjectURL(new Blob([window.SEMINAR_ROOM_HTML],{type:'text/html'}));window.open(roomUrl,'_blank','noopener');setTimeout(()=>URL.revokeObjectURL(roomUrl),60000);return;}

    if(e.target.closest('[data-seminar="plugin-pause"]')){const demo=document.querySelector('.plugin-location-demo');const paused=demo.classList.toggle('is-paused');e.target.closest('button').textContent=paused?tr('Жалғастыру','Продолжить'):tr('Кідірту','Пауза');return;}
    if(e.target.closest('[data-seminar="plugin-replay"]')){render();return;}

    const choice=e.target.closest('[data-region]');
    if(choice){
      selected=choice.dataset.region;try{localStorage.setItem('seminar-region',selected);}catch{}
      const url=new URL(location.href);url.searchParams.set('region',selected);history.replaceState(null,'',url);
      if(['turkestan','kyzylorda'].includes(selected))dataRegion=selected;
      search='';inactiveOnly=false;showRegionChoices=false;R.activation=enabled()?'steps':'video';rebuild();go(['atyrau','kostanay','aktobe','almaty-region','east'].includes(selected)?ids.regions:enabled()?ids.meet:7);return;
    }
    const b=e.target.closest('[data-seminar]');if(!b)return;
    if(b.dataset.seminar==='drive-pause'){const root=b.closest('.drive-demo-panel');const paused=root.classList.toggle('demo-paused');b.textContent=paused?tr('Жалғастыру','Продолжить'):tr('Кідірту','Пауза');return;}
    if(b.dataset.seminar==='drive-enlarge'){modal('ChatGPT + Google Drive',`<div class="drive-enlarged">${driveDemoSvg()}</div>`);return;}
    if(b.dataset.seminar==='platform-zoom'){modal(tr('ChatGPT плагиндері','Плагины ChatGPT'),`<div class="platform-zoom-scroll"><div class="large-plugin-crop platform-zoom-image"><img src="seminar-assets/plugins-catalog-original.png" alt="${tr('Плагиндер каталогы — толық өлшем','Каталог плагинов — крупный план')}"></div></div>`);return;}
    if(b.dataset.seminar==='curipod-help'){
      modal(tr('Curipod-та танысуды қалай өткізуге болады','Как провести знакомство в Curipod'),`<p class="curipod-help-intro">${tr('Бұл сілтеме төрт сұрағы бар дайын сценарийге апарады. Әр жүргізуші оны өз аккаунтына көшіруі керек.','По ссылке — готовый сценарий с четырьмя вопросами. Каждому ведущему нужно скопировать его в свой аккаунт.')}</p><ol class="curipod-instructions"><li>${tr('Curipod-та тіркеліңіз немесе аккаунтыңызға кіріңіз.','Создайте аккаунт Curipod или войдите в свой.')}</li><li>${tr('Дайын сценарийді ашып, төрт сұрақтың бәрін өз аккаунтыңызға көшіріңіз.','Откройте готовый сценарий и скопируйте все четыре вопроса в свой аккаунт.')}</li><li>${tr('Қаласаңыз, сұрақтарды өз аудиторияңызға бейімдеңіз.','При желании измените вопросы под свою аудиторию.')}</li><li>${tr('Өз көшірмеңізді іске қосып, сауалнама өткізіңіз.','Запустите свою копию и проведите интерактивный опрос.')}</li></ol>${link(tr('Curipod сценарийін ашу','Открыть сценарий Curipod'),'https://curipod.com/0748f247-656b-5570-98bf-f46494e47fdc/lessons/c6a88a02-8254-43cf-8fcb-72097f3ec6f6/edit')}`);return;
    }
    if(b.dataset.seminar==='change-region'){showRegionChoices=true;go(ids.regions);}
    if(b.dataset.seminar==='video'){
      modal('Jeremy Utley',`<video class="jeremy-player" controls playsinline preload="metadata" src="seminar-assets/jeremy-utley.mp4"></video><p class="input-note jeremy-full-video">${tr('Толық видео YouTube-та қолжетімді','Полное видео доступно на YouTube')}:<br><span>How to Master AI Powered Creativity in Just 13 Minutes | Jeremy Utley</span></p>`);
      document.querySelector('#modal').classList.add('seminar-video-modal');
    }
    if(b.dataset.seminar==='copy-task'){
      const area=document.getElementById('scheduled-prompt');let copied=false;
      try{await navigator.clipboard.writeText(area.value);copied=true;}catch{area.focus();area.select();try{copied=document.execCommand('copy');}catch{}}
      toast(copied?T().copied:T().copyFail);
    }
  });
  document.getElementById('modal').addEventListener('close',()=>{
    document.querySelector('#modal video')?.pause();document.querySelector('#modal').classList.remove('seminar-video-modal');
  });
  document.addEventListener('input',e=>{if(e.target.id==='regional-search'){search=e.target.value;document.getElementById('regional-results').innerHTML=dataResults();}});
  document.addEventListener('change',e=>{
    if(e.target.id==='regional-area'){dataRegion=e.target.value;search='';inactiveOnly=false;render();document.getElementById('regional-area').focus();}
    if(e.target.id==='regional-inactive'){inactiveOnly=e.target.checked;document.getElementById('regional-results').innerHTML=dataResults();}
  });
  const m=initialHash.match(/^#(kz|ru|en)\/(\d+)$/);if(m){lang=m[1]==='en'?'ru':m[1];idx=allowed(Number(m[2])-1);}else idx=allowed(idx);
  render();
})();
