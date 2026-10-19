/* Silent video illustrations inside their corresponding skill tabs. */
(() => {
  'use strict';
  const videos={
    'learning-games':['game',['Ойын арқылы үйрену','Учиться через игру'],['Дұрыс нысанды жинау → ұпай алу.','Собрать правильный объект → получить очки.']],
    'learning-trainers':['trainer',['Әрекетті жаттықтыру','Отработать действие'],['Қадамдарды реттеу → қайталау → дағды.','Расставить шаги → повторить → освоить навык.']],
    'situational-simulators':['simulator',['Шешім және салдар','Решение и последствия'],['Әрекетті таңдау → жағдайдың өзгеруін көру.','Выбрать действие → увидеть изменение ситуации.']],
    'virtual-labs':['lab',['Тәжірибе арқылы зерттеу','Исследовать через опыт'],['Кернеуді өзгерту → токты салыстыру → қорытынды.','Изменить напряжение → сравнить ток → сделать вывод.']],
    'tipo-presentations':['animation',['Видеоанимация: процесті түсіндіру','Видеоанимация: объяснить процесс'],['Механизмнің қозғалысы кадрлар арқылы түсіндіріледі.','Движение механизма объясняется последовательностью кадров.']]
  };
  const originalSkillView=collegeSkillView;
  collegeSkillView=function(plugin){
    const original=originalSkillView(plugin);
    if(plugin!=='pedagog')return original;
    const skill=COLLEGE_SKILL_DATA.pedagog[collegeSkillSelection.pedagog][0];
    const item=videos[skill];
    if(!item)return original;
    const k=lang==='kz'?0:1;
    const illustration=`<figure class="skill-inline-video"><video autoplay loop muted playsinline preload="metadata" poster="seminar-assets/skill-videos/${item[0]}.png" aria-label="${E(item[1][k]+': '+item[2][k])}"><source src="seminar-assets/skill-videos/${item[0]}.mp4" type="video/mp4"></video><figcaption><strong>${item[1][k]}</strong><span>${item[2][k]}</span></figcaption></figure>`;
    return original.replace(/(<h3>[\s\S]*?<\/h3><p class="college-skill-description">[\s\S]*?<\/p>)/,`<div class="skill-with-video"><div>$1</div>${illustration}</div>`);
  };
})();
