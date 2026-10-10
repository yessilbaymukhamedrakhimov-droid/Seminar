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
  const ids={regions:25,meet:26,shift:27,tasks:28,research:29,challenge:30,ideas:31,support:32,data:33,feedback:34};
  const extraIds=new Set(Object.values(ids).filter(x=>x!==ids.regions));
  const originalChapters=CHAPTERS.map(c=>({...c,slides:[...c.slides]}));
  const initialHash=window.VACANCY_INITIAL_HASH||location.hash;
  let selected='';
  try{selected=new URL(location.href).searchParams.get('region')||localStorage.getItem('seminar-region')||'';}catch{}
  if(!regions.some(r=>r[0]===selected))selected='';
  const enabled=()=>enhanced.has(selected);
  const regionName=(id=selected)=>{const r=regions.find(r=>r[0]===id);return r?r[lang==='kz'?1:2]:'';};
  let dataRegion=['turkestan','kyzylorda'].includes(selected)?selected:'turkestan';
  let search='',inactiveOnly=false;
  const titles={
    25:['Өңіріңізді таңдаңыз','Выберите свой регион'],
    26:['Жақынырақ танысайық!','Давайте познакомимся поближе!'],
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
    25:['Семинарды жалғастыру үшін облысты немесе қаланы таңдаңыз.','Выберите область или город, чтобы продолжить семинар.'],
    26:['ChatGPT пайдалану тәжірибелеріңізбен бөлісіңіздер.','Поделитесь своим опытом использования ChatGPT.'],
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
    tools.slides.unshift(ids.regions,...(enabled()?[ids.meet,ids.shift]:[]));
    if(enabled()){
      next.find(c=>c.slides.includes(11)).slides.unshift(ids.research);
      next.find(c=>c.slides.includes(24)).slides.push(ids.challenge,ids.ideas);
      const last=next.find(c=>c.slides.includes(22));last.slides.splice(last.slides.indexOf(22),0,ids.support,ids.data,ids.feedback);
    }
    CHAPTERS.splice(0,CHAPTERS.length,...next);FLOW.splice(0,FLOW.length,...CHAPTERS.flatMap(c=>c.slides));
    if(!enabled()&&R.mode==='tasks')R.mode='modes';
    for(const l of ['kz','ru'])FINAL_UI[l].subtitles[18]=enabled()?(l==='kz'?'Алдымен іске қосу қадамдарын орындаңыз, қажет болса бейненұсқаулықты ашыңыз.':'Начните с шагов активации, затем при необходимости откройте видеоинструкцию.'):originalActivationSubtitle[l];
  }
  rebuild();R.activation=enabled()?'steps':'video';
  function allowed(n){
    if(n===ids.tasks){R.mode=enabled()?'tasks':'modes';n=7;}
    if(!FLOW.includes(n))n=REDIRECT[n]??0;
    if(!FLOW.includes(n))n=0;
    if(!selected&&FLOW.indexOf(n)>FLOW.indexOf(ids.regions))return ids.regions;
    return n;
  }
  parseHash=function(){const m=location.hash.match(/^#(kz|ru|en)\/(\d+)$/);if(m){lang=m[1]==='en'?'ru':m[1];idx=allowed(Number(m[2])-1);}};
  const previousGo=go;
  go=function(n){if(n===ids.regions||FLOW.includes(n)||extraIds.has(n))return previousGo(allowed(n));return previousGo(allowed(REDIRECT[n]??n));};
  const jump=(label,id,icon='arrow',cls='action')=>B(label,'goto',icon,cls,`data-index="${id}"`);
  const link=(label,url,cls='action')=>`<a class="${cls}" href="${E(url)}" target="_blank" rel="noopener noreferrer">${E(label)}${I('link')}</a>`;
  function qrSlide(kind,url,label){
    return `${head()}<div class="seminar-qr-layout"><a class="seminar-qr-link" href="${E(url)}" target="_blank" rel="noopener noreferrer" aria-label="${E(label)}"><img class="seminar-qr ${['challenge','support'].includes(kind)?'branded':''}" src="seminar-assets/${kind}-qr.png" alt="${E(label)} · QR"></a><div class="seminar-qr-caption">${link(label,url,'action secondary')}<span>${E(url.replace('https://',''))}</span></div></div>`;
  }
  function activityView(kind){
    const config={
      meet:{icon:'chat',url:'https://tinyurl.com/23t39fhd',label:tr('Танысуды бастау','Начать знакомство'),lead:tr('Сіз және ChatGPT','Вы и ChatGPT'),body:tr('Қандай міндеттерде қолданасыз? Қандай тәжірибеңізбен бөліскіңіз келеді?','В каких задачах вы его используете? Каким опытом хотите поделиться?'),items:[tr('Тәжірибе','Опыт'),tr('Күнделікті міндеттер','Повседневные задачи'),tr('Жаңа мүмкіндіктер','Новые возможности')]},
      ideas:{icon:'spark',url:'https://tinyurl.com/3zw9yzk9',label:tr('Идеямен бөлісу','Поделиться идеей'),lead:tr('Келесі қадамды бірге ойластырайық','Вместе определим следующий шаг'),body:tr('Жұмысыңызды жеңілдететін жаңа құралдар мен мүмкіндіктер туралы идеяларыңызды бөлісіңіз.','Поделитесь идеями новых инструментов и возможностей, которые упростят вашу работу.'),items:[tr('Қажеттіліктер','Потребности'),tr('Ұсыныстар','Предложения'),tr('Болашақ әзірлемелер','Будущие разработки')]},
      feedback:{icon:'note',url:'https://tinyurl.com/y2cv7hyx',label:tr('Кері байланысты ашу','Открыть обратную связь'),lead:tr('Сіздің пікіріңіз маңызды','Ваше мнение важно'),body:tr('Не пайдалы болды? Нені тереңірек қарастырғыңыз келеді? Семинар туралы ойларыңызбен бөлісіңіз.','Что было полезно? Что хотелось бы разобрать подробнее? Поделитесь впечатлениями о семинаре.'),items:[tr('Пайдалы тұстар','Полезные моменты'),tr('Сұрақтар','Вопросы'),tr('Ұсыныстар','Предложения')]}
    }[kind];
    return `${head()}<section class="activity-card activity-${kind}"><div class="activity-copy"><span class="activity-icon">${I(config.icon)}</span><h3>${config.lead}</h3><p>${config.body}</p>${link(config.label,config.url,'action activity-open')}</div><div class="activity-topics" aria-hidden="true"><span class="activity-orbit"></span>${config.items.map((x,i)=>`<div class="activity-topic"><span>0${i+1}</span>${E(x)}</div>`).join('')}</div></section>`;
  }
  function modesTabs(){return tabs([['modes','Chat / Work / Codex'],['tasks',tr('Кесте бойынша тапсырма','Задачи по расписанию')],['power',tr('Қуатты таңдау','Выбор мощности')],['astra',tr('Astra: жоба мысалдары','Astra: примеры проектов')]],'mode');}
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
  content=function(){
    if(idx===ids.regions)return `${head()}<div class="region-grid">${regions.map((r,j)=>`<button class="region-choice" data-region="${r[0]}" aria-pressed="${selected===r[0]}"><span class="region-number">${String(j+1).padStart(2,'0')}</span><span>${E(regionName(r[0]))}</span>${selected===r[0]?I('check'):I('arrow')}</button>`).join('')}</div>`;
    if(enabled()){
      if(idx===ids.meet)return activityView('meet');
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
    if(idx===0)result+=`<button class="jeremy-button" data-seminar="video">${I('play')}<span><strong>Jeremy Utley</strong><small>Instructor @ Stanford Online &amp; Harvard Continuing Ed</small></span></button>`;
    if(enabled()&&idx===24)result=result.replace(/(<p class="champions-cta">[\s\S]*?<\/p>)/,`$1<p class="pr-campaign">${tr('PR-кампания: белсенді қолданушыларды іздейміз','PR-кампания: ищем активных пользователей')}</p>`);
    if(enabled()&&idx===7)result=result.replace(/<nav class="r-tabs"[\s\S]*?<\/nav>/,modesTabs());
    return result;
  };
  const oldRender=render;
  render=function(){
    oldRender();
    document.body.classList.toggle('seminar-enhanced',enabled());
    const slide=document.querySelector('#stage .slide');
    if(extraIds.has(idx)||idx===ids.regions)slide.classList.add('seminar-addition',`seminar-page-${idx}`);
    if(selected&&idx!==0&&idx!==ids.regions){
      const status=document.createElement('button');status.className='region-current';status.dataset.seminar='change-region';status.innerHTML=`${E(regionName())}<span>${tr('Өңірді өзгерту','Сменить регион')}</span>`;
      document.querySelector('#dock .dock-title')?.append(status);
    }
    if(idx===ids.regions&&!selected)document.querySelector('#dock [data-action="next"]').disabled=true;
  };
  document.addEventListener('click',async e=>{
    const choice=e.target.closest('[data-region]');
    if(choice){
      selected=choice.dataset.region;try{localStorage.setItem('seminar-region',selected);}catch{}
      const url=new URL(location.href);url.searchParams.set('region',selected);history.replaceState(null,'',url);
      if(['turkestan','kyzylorda'].includes(selected))dataRegion=selected;
      search='';inactiveOnly=false;R.activation=enabled()?'steps':'video';rebuild();go(enabled()?ids.meet:7);return;
    }
    const b=e.target.closest('[data-seminar]');if(!b)return;
    if(b.dataset.seminar==='change-region')go(ids.regions);
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
