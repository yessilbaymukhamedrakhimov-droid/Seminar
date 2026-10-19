/* Silent looping illustrations, not runnable learning activities. */
(() => {
  'use strict';
  const tr=(kk,ru)=>lang==='kz'?kk:ru;
  window.PEDAGOG_VIDEO_OVERVIEW=true;
  const examples=[
    ['game',['Геймификация','Геймификация'],['Ойын арқылы үйрену','Учиться через игру'],['Дұрыс нысанды жинау → ұпай алу.','Собрать правильный объект → получить очки.']],
    ['trainer',['Тренажёр','Тренажёр'],['Әрекетті жаттықтыру','Отработать действие'],['Қадамдарды реттеу → қайталау → дағды.','Расставить шаги → повторить → освоить навык.']],
    ['simulator',['Жағдайлық симулятор','Ситуационный симулятор'],['Шешім және салдар','Решение и последствия'],['Әрекетті таңдау → жағдайдың өзгеруін көру.','Выбрать действие → увидеть изменение ситуации.']],
    ['lab',['Виртуалды зертхана','Виртуальная лаборатория'],['Тәжірибе арқылы зерттеу','Исследовать через опыт'],['Кернеуді өзгерту → токты салыстыру → қорытынды.','Изменить напряжение → сравнить ток → сделать вывод.']],
    ['animation',['Видеоанимация','Видеоанимация'],['Процесті көріп түсіну','Увидеть и понять процесс'],['Механизмнің қозғалысы кадрлар арқылы түсіндіріледі.','Движение механизма объясняется последовательностью кадров.']]
  ];
  function gallery(){
    const k=lang==='kz'?0:1;
    return `<section class="skill-video-gallery" id="college-panel-pedagog" role="tabpanel" aria-labelledby="college-tab-videos"><header><h3>${tr('Бес формат — бес түрлі оқу әрекеті','Пять форматов — пять способов учиться')}</h3><p>${tr('Қысқа бейнелер әр форматтың мәнін көрсетеді.','Короткие видеосцены показывают суть каждого формата.')}</p></header><div class="skill-video-grid">${examples.map((item,i)=>`<figure class="skill-video-card"><div class="skill-video-heading"><span>0${i+1}</span><h4>${item[1][k]}</h4></div><video autoplay loop muted playsinline preload="metadata" poster="seminar-assets/skill-videos/${item[0]}.png" aria-label="${E(item[1][k]+': '+item[3][k])}"><source src="seminar-assets/skill-videos/${item[0]}.mp4" type="video/mp4"></video><figcaption><strong>${item[2][k]}</strong><p>${item[3][k]}</p></figcaption></figure>`).join('')}</div></section>`;
  }
  const originalSkillView=collegeSkillView;
  collegeSkillView=function(plugin){
    const original=originalSkillView(plugin);
    if(plugin!=='pedagog')return original;
    const active=window.PEDAGOG_VIDEO_OVERVIEW;
    let nav=original.match(/<nav class="college-skill-tabs"[\s\S]*?<\/nav>/)[0];
    if(active)nav=nav.replaceAll('aria-selected="true"','aria-selected="false"').replaceAll('tabindex="0"','tabindex="-1"');
    nav=nav.replace(/(<nav[^>]*>)/,`$1<button type="button" role="tab" id="college-tab-videos" aria-controls="college-panel-pedagog" aria-selected="${active}" tabindex="${active?0:-1}" data-skill-videos>${tr('Видео-мысалдар','Видео-примеры')}</button>`);
    return active?head()+nav+gallery():original.replace(/<nav class="college-skill-tabs"[\s\S]*?<\/nav>/,nav);
  };
  document.addEventListener('click',event=>{
    if(event.target.closest('[data-college-skill][data-college-plugin="pedagog"]'))window.PEDAGOG_VIDEO_OVERVIEW=false;
    if(event.target.closest('[data-skill-videos]')){
      window.PEDAGOG_VIDEO_OVERVIEW=true;render();
      document.getElementById('college-tab-videos')?.focus();
    }
  },true);
  document.addEventListener('keydown',event=>{
    if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)&&event.target.closest('[data-college-skill][data-college-plugin="pedagog"]'))window.PEDAGOG_VIDEO_OVERVIEW=false;
    if(event.target.closest('[data-skill-videos]')&&event.key==='ArrowRight'){
      event.preventDefault();window.PEDAGOG_VIDEO_OVERVIEW=false;collegeSkillSelection.pedagog=0;render();document.getElementById('college-tab-pedagog-0')?.focus();
    }
  },true);
})();
