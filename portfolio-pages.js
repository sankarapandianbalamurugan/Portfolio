(function(){'use strict';
  const filterButtons=[...document.querySelectorAll('[data-cert-filter]')];const cards=[...document.querySelectorAll('[data-cert-issuer]')];
  filterButtons.forEach(btn=>btn.addEventListener('click',()=>{const filter=btn.dataset.certFilter;filterButtons.forEach(b=>{const active=b===btn;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active))});cards.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.certIssuer!==filter;if(!card.hidden){card.classList.add('is-visible')}})}));
  const dialog=document.getElementById('portfolio-lightbox');const close=document.getElementById('lightbox-close');const title=document.getElementById('lightbox-title');const image=document.getElementById('lightbox-image');const pdf=document.getElementById('lightbox-pdf');const pdflink=document.getElementById('lightbox-document-link');
  function show(content){if(!dialog)return;title.textContent=content.title;image.hidden=content.kind!=='image';pdf.hidden=content.kind==='image';if(content.kind==='image'){image.src=content.url;image.alt=content.title}else{pdflink.href=content.url}dialog.showModal();close.focus()}
  document.querySelectorAll('.cert-link').forEach(btn=>btn.addEventListener('click',()=>show({title:btn.dataset.title,kind:btn.dataset.kind,url:btn.dataset.file})));
  if(dialog){close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})}
  // Recognition section: privacy-safe visual summary, preserving year-selection interactivity.
  const recognitionYears={
    '2025':{quarters:[1,2,3,4],summary:'Recognized with an A+ performance grade in all four quarterly reviews of 2025, reflecting consistent ownership, craft and collaboration.',footnote:'2025 · 4 out of 4 quarters recognized'},
    '2026':{quarters:[1,2],summary:'Q1 and Q2 2026 feedback also reflect an A+ performance grade. Only the available two quarters are shown.',footnote:'2026 · Q1 and Q2 recognized'}
  };
  const recognitionGrid=document.getElementById('recognition-quarter-grid');
  function renderRecognition(year){
    const data=recognitionYears[year];if(!data||!recognitionGrid)return;
    document.querySelectorAll('[data-recognition-year]').forEach(button=>{const active=button.dataset.recognitionYear===year;button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',String(active))});
    document.getElementById('recognition-year-heading').textContent=year+' / QUARTERLY RECOGNITION';
    document.getElementById('recognition-summary').textContent=data.summary;
    document.getElementById('recognition-footnote').textContent=data.footnote;
    recognitionGrid.innerHTML=data.quarters.map(quarter=>'<div class="recognition-quarter-card"><div class="recognition-quarter-card-top"><span>QUARTER '+String(quarter).padStart(2,'0')+'</span></div><strong>A<span>+</span></strong><p>Q'+quarter+' · '+year+'</p></div>').join('');
  }
  document.querySelectorAll('[data-recognition-year]').forEach(button=>button.addEventListener('click',()=>renderRecognition(button.dataset.recognitionYear)));

})();