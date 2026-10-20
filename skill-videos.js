/* Silent video illustrations inside their corresponding skill tabs. */
(() => {
  'use strict';
  const videos={
    'learning-games':['game',['Ойын арқылы үйрену','Учиться через игру'],['Дұрыс нысанды жинау → ұпай алу.','Собрать правильный объект → получить очки.']],
    'learning-trainers':['trainer',['Әрекетті жаттықтыру','Отработать действие'],['Қадамдарды реттеу → қайталау → дағды.','Расставить шаги → повторить → освоить навык.']],
    'situational-simulators':['simulator',['Шешім және салдар','Решение и последствия'],['Әрекетті таңдау → жағдайдың өзгеруін көру.','Выбрать действие → увидеть изменение ситуации.']],
    'virtual-labs':['lab',['Тәжірибе арқылы зерттеу','Исследовать через опыт'],['Кернеуді өзгерту → токты салыстыру → қорытынды.','Изменить напряжение → сравнить ток → сделать вывод.']],
  };
  const originalSkillView=collegeSkillView;
  collegeSkillView=function(plugin){
    const original=originalSkillView(plugin);
    if(plugin!=='pedagog')return original;
    const skill=COLLEGE_SKILL_DATA.pedagog[collegeSkillSelection.pedagog][0];
    if(skill==='tipo-presentations'){
      const tr=(kk,ru)=>lang==='kz'?kk:ru;
      const deck=`<section class="skill-water-demo"><header><span>${tr('Презентациялар','Презентации')}</span><h3>${tr('Сабаққа арналған слайдтар','Слайды к занятию')}</h3></header><iframe src="seminar-assets/presentation-sample.html?lang=${lang}" title="${tr('Презентация үлгісі','Образец презентации')}"></iframe><p>${tr('Тақырып, негізгі ұғымдар және тапсырма — кәдімгі презентация үлгісі.','Тема, основные понятия и задание — образец обычной презентации.')}</p></section>`;
      return original.replace(/<section class="college-skill-panel"[\s\S]*?<\/section>/,deck);
    }
    if(skill==='ai-object-lab'){
      const tr=(kk,ru)=>lang==='kz'?kk:ru;
      const model=`<section class="skill-water-demo"><header><span>${tr('3D-модель','3D-модель')}</span><h3>${tr('Су молекуласын барлық жағынан қарау','Рассмотреть молекулу воды со всех сторон')}</h3></header><iframe src="seminar-assets/water-model-3d.html?lang=${lang}" title="${tr('Су молекуласының 3D-моделі','3D-модель молекулы воды')}"></iframe><p>${tr('Бір оттек, екі сутек: көлемді модель айналып, атомдар мен байланыстардың орналасуын көрсетеді.','Один атом кислорода и два атома водорода: модель вращается, показывая расположение атомов и связей.')}</p></section>`;
      return original.replace(/<section class="college-skill-panel"[\s\S]*?<\/section>/,model);
    }
    const item=videos[skill];
    if(!item)return original;
    const k=lang==='kz'?0:1;
    const illustration=`<figure class="skill-inline-video"><video autoplay loop muted playsinline preload="metadata" poster="seminar-assets/skill-videos/${item[0]}.png" aria-label="${E(item[1][k]+': '+item[2][k])}"><source src="seminar-assets/skill-videos/${item[0]}.mp4" type="video/mp4"></video><figcaption><strong>${item[1][k]}</strong><span>${item[2][k]}</span></figcaption></figure>`;
    return original.replace(/(<h3>[\s\S]*?<\/h3><p class="college-skill-description">[\s\S]*?<\/p>)/,`<div class="skill-with-video"><div>$1</div>${illustration}</div>`);
  };
})();
