/* Load the large anatomy dataset only when the anatomy example is opened. */
(() => {
  'use strict';
  const files = ['atlas-code-1.js', 'atlas-data-2.js', 'atlas-data-3.js',
    'atlas-data-4.js', 'atlas-data-5.js', 'atlas-data-6.js',
    'atlas-data-7.js', 'atlas-data-8.js', 'atlas-code-9.js'];
  let next = 0;
  let pending = null;
  let failed = false;
  const tr = (kk, ru) => lang === 'kz' ? kk : ru;

  function loadAtlas() {
    if (pending) return pending;
    failed = false;
    pending = (async () => {
      while (next < files.length) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = files[next];
          script.onload = resolve;
          script.onerror = () => {
            script.remove();
            reject(new Error('Atlas download failed'));
          };
          document.head.append(script);
        });
        next += 1;
        render();
      }
    })().catch(() => {
      failed = true;
      pending = null;
      render();
    });
    return pending;
  }

  anatomy = function () {
    if (!failed) loadAtlas();
    return `<section class="real-atlas"><header><div><span>BODY PARTS 3D · HUMAN ATLAS</span><h3>${tr('Адам анатомиясының 3D атласы', '3D-атлас анатомии человека')}</h3><p role="status">${failed
      ? tr('Атлас жүктелмеді. Интернет байланысын тексеріп, қайталап көріңіз.', 'Не удалось загрузить атлас. Проверьте соединение и повторите попытку.')
      : tr('3D-атлас жүктелуде. Қалған слайдтарды қарауды жалғастыра аласыз.', 'Загружается 3D-атлас. Можно продолжать просмотр остальных слайдов.')}</p><p>${next} / ${files.length}</p>${failed ? `<button type="button" class="quiet-btn" data-atlas-retry>${tr('Қайталау', 'Повторить')}</button>` : ''}</div></header></section>`;
  };

  document.addEventListener('click', event => {
    if (!event.target.closest('[data-atlas-retry]')) return;
    loadAtlas();
    render();
  });
  render();
})();
