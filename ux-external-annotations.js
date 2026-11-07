/* Screen-relative external UX connectors — only WFH, SubTrack and Magicwall. */
(()=>{'use strict';
 const setups=[
  {selector:'#st-slide-grid',image:'#st-slide-image',screen:'.st-slide-image-wrap',pins:'.st-hotspot',cards:'#st-annotation-list .st-annotation-choice',active:'is-active'},
  {selector:'[data-magicwall-slider="customer"]',image:'[data-phone-image]',screen:'.mw-screen',pins:'.mw-hotspot',cards:'.mw-annotations .mw-annotation',active:'active'},
  {selector:'[data-magicwall-slider="technician"]',image:'[data-phone-image]',screen:'.mw-screen',pins:'.mw-hotspot',cards:'.mw-annotations .mw-annotation',active:'active'}
 ];
 document.querySelectorAll('.wz-wfh-step-content').forEach(el=>setups.push({el,image:'.ux-wfh-screen-anchor img',screen:'.ux-wfh-screen-anchor',pins:'.ux-wfh-anchor',cards:'.ux-wfh-card',active:'is-active'}));
 setups.forEach(conf=>{
  const root=conf.el||document.querySelector(conf.selector);if(!root)return;
  root.classList.add('ux-connector-root');
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','ux-link-layer');svg.setAttribute('aria-hidden','true');root.prepend(svg);
  let raf=0;
  const draw=()=>{
   if(!root.getClientRects().length||window.matchMedia('(max-width:900px)').matches){svg.replaceChildren();return}
   const br=root.getBoundingClientRect();if(br.width===0||br.height===0)return;
   svg.setAttribute('viewBox',`0 0 ${br.width} ${br.height}`);
   const pins=[...root.querySelectorAll(conf.pins)];const cards=[...root.querySelectorAll(conf.cards)];
   svg.replaceChildren();
   pins.slice(0,cards.length).forEach((pin,i)=>{
    const p=pin.getBoundingClientRect(),c=cards[i].getBoundingClientRect();
    if(!p.width||!c.width)return;
    const x=p.left+p.width/2-br.left,y=p.top+p.height/2-br.top;
    const end=c.left-br.left-8,dest=c.top+Math.min(c.height/2,32)-br.top;
    const elbow=Math.min(end-15,x+Math.max(28,(end-x)*.56));
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',`M ${x.toFixed(1)} ${y.toFixed(1)} H ${elbow.toFixed(1)} V ${dest.toFixed(1)} H ${end.toFixed(1)}`);
    path.classList.toggle('is-active',pin.classList.contains(conf.active)||cards[i].classList.contains(conf.active));
    svg.append(path);
   });
  };
  const update=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;draw()})};
  root.addEventListener('ux:annotation-change',update);root.addEventListener('click',update);root.addEventListener('transitionend',update);
  root.querySelectorAll('img').forEach(img=>img.addEventListener('load',update));
  if('ResizeObserver' in window){const ro=new ResizeObserver(update);ro.observe(root);root.querySelectorAll(conf.screen).forEach(x=>ro.observe(x));}
  if('MutationObserver' in window){const mo=new MutationObserver(update);const screen=root.querySelector(conf.screen);if(screen)mo.observe(screen,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});const cardParent=cardsParent(root,conf.cards);if(cardParent)mo.observe(cardParent,{childList:true,subtree:false});}
  update();
 });
 function cardsParent(root,selector){const card=root.querySelector(selector);return card?.parentElement||null}
 document.querySelectorAll('.wz-wfh-step').forEach(step=>{const pin=step.querySelector('.ux-wfh-anchor'),card=step.querySelector('.ux-wfh-card');if(!pin||!card)return;
  [pin,card].forEach(el=>el.addEventListener('click',()=>{pin.classList.add('is-active');card.classList.add('is-active');pin.setAttribute('aria-pressed','true');card.setAttribute('aria-pressed','true')}));
 });
})();
