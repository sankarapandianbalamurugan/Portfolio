/* Optional lightweight enhancements; no existing handlers or navigation are overridden. */
(()=>{
  'use strict';
  const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(mq.matches || !('IntersectionObserver' in window)) return;
  // Existing .reveal items are managed by script.js; do not register them again.
  const candidates=[...document.querySelectorAll('main .section-head, main .portfolio-page-intro .wrap, main .case-hero .eyebrow')]
    .filter(el=>!el.classList.contains('reveal') && !el.closest('.reveal'));
  if(!candidates.length)return;
  document.documentElement.classList.add('portfolio-motion-ready');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('portfolio-motion-visible');observer.unobserve(entry.target);}
    });
  },{threshold:0.06,rootMargin:'0px 0px -25px 0px'});
  candidates.forEach(el=>{
    el.classList.add('portfolio-motion-enter');
    // Don't hide content already in viewport on initial paint.
    if(el.getBoundingClientRect().top < window.innerHeight * .95) el.classList.add('portfolio-motion-visible');
    else observer.observe(el);
  });
})();
