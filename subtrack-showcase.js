/* Standalone SubTrack UI showcase; no changes to other site JavaScript. */
(()=>{
  'use strict';
  const root=document.getElementById('st-ux-slider');
  if(!root)return;
  const screens=[{"title":"Upcoming Payments","label":"UPCOMING","image":"subtrack-upcoming.jpg","alt":"SubTrack Upcoming tab with one projected payment, payment amount and renewal date","challenge":"Renewal dates can be hard to track across separate services.","decision":"Put the next payment, due date and projected total ahead of secondary information.","annotations":[{"title":"Renewal date visibility","why":"The upcoming period and the next payment date are visible before opening an individual subscription, reducing recall effort.","x":50,"y":34},{"title":"Payment amount hierarchy","why":"The projected amount receives the strongest visual weight, helping users assess the near-term expense at a glance.","x":38,"y":45},{"title":"Next payment context","why":"The summary names the next service and date, linking the total to a concrete upcoming charge.","x":57,"y":54}]},{"title":"Subscription List","label":"SUBSCRIPTIONS","image":"subtrack-original.jpg","alt":"SubTrack Subscriptions tab showing recurring spending summaries and subscription cards","challenge":"Multiple subscriptions are difficult to compare when each has a different price and renewal pattern.","decision":"Place all plans in one scannable list with plan names, amounts and organizing controls.","annotations":[{"title":"Subscription identity","why":"The plan name leads each row, so users can identify a subscription before considering its price or status.","x":46,"y":57},{"title":"Billing context","why":"Each row pairs the recurring amount with its billing interval and relevant plan details, reducing the need to open every card.","x":77,"y":58},{"title":"Search and sorting","why":"Search and sort actions sit directly beside the list heading, so users can locate or reorder plans as the list grows.","x":82,"y":44}]},{"title":"Add Subscription","label":"SERVICE DISCOVERY","image":"subtrack-add.jpg","alt":"Actual SubTrack Add Subscription entry screen with service search, category filters, recharge and popular service options","challenge":"Finding a service is an extra step before entering a new recurring plan.","decision":"Start addition with search, categories and recognizable services to reduce initial browsing effort.","annotations":[{"title":"Search before browsing","why":"Search is positioned at the top to support people who already know which service they want to add.","x":48,"y":24},{"title":"Category shortcuts","why":"Category chips narrow the available options before users need to scan the full service list.","x":46,"y":31},{"title":"Recognizable service options","why":"Recharge and popular-service rows provide clear starting points without requiring users to remember exact product names.","x":55,"y":67}]},{"title":"Spending Analytics","label":"ANALYTICS","image":"subtrack-analytics.jpg","alt":"SubTrack Analytics screen with monthly and yearly equivalents and scheduled payment trend chart","challenge":"Different billing intervals obscure how much subscriptions cost over time.","decision":"Summarize monthly-equivalent and yearly-equivalent spending, then show scheduled payments visually.","annotations":[{"title":"Monthly spending","why":"A monthly-equivalent number makes subscriptions with different billing cycles easier to evaluate against a monthly budget.","x":29,"y":29},{"title":"Yearly spending","why":"The yearly-equivalent summary surfaces the longer-term commitment alongside the monthly view.","x":72,"y":29},{"title":"Scheduled payment trend","why":"A month-by-month bar chart helps users see when costs are concentrated rather than relying only on a single total.","x":54,"y":69}]}];
  const image=root.querySelector('#st-slide-image');
  const markers=root.querySelector('#st-slide-markers');
  const list=root.querySelector('#st-annotation-list');
  const progress=root.querySelector('#st-slide-progress');
  const count=root.querySelector('#st-slide-count');
  const title=root.querySelector('#st-slide-title');
  const screenLabel=root.querySelector('#st-slide-screen-label');
  const challenge=root.querySelector('#st-slide-challenge');
  const decision=root.querySelector('#st-slide-decision');
  const detailKicker=root.querySelector('#st-annotation-detail-kicker');
  const detailText=root.querySelector('#st-annotation-detail-text');
  let current=0,active=0,startX=null;
  const dots=screens.map((slide,i)=>{
    const b=document.createElement('button');b.type='button';b.className='st-progress-dot';
    b.setAttribute('aria-label','Go to slide '+(i+1)+': '+slide.title);
    b.addEventListener('click',()=>go(i));progress.appendChild(b);return b;
  });
  function selectAnnotation(index,focus=false){
    active=index;const a=screens[current].annotations[index];
    detailKicker.textContent='DESIGN RATIONALE '+String(index+1).padStart(2,'0');
    detailText.textContent=a.why;
    [...list.children].forEach((b,i)=>{const yes=i===index;b.classList.toggle('is-active',yes);b.setAttribute('aria-pressed',String(yes));});
    [...markers.children].forEach((b,i)=>{const yes=i===index;b.classList.toggle('is-active',yes);b.setAttribute('aria-pressed',String(yes));});
    if(focus)list.children[index].focus();
  }
  function render(){
    const slide=screens[current];
    image.classList.add('is-switching');image.src='assets/'+slide.image;image.alt=slide.alt;
    if(image.complete)image.classList.remove('is-switching');
    count.textContent=String(current+1).padStart(2,'0')+' / '+String(screens.length).padStart(2,'0');
    screenLabel.textContent=String(current+1).padStart(2,'0')+' / '+slide.label;
    title.textContent=slide.title;challenge.textContent=slide.challenge;decision.textContent=slide.decision;
    markers.replaceChildren();list.replaceChildren();
    slide.annotations.forEach((a,i)=>{
      const mark=document.createElement('button');mark.type='button';mark.className='st-hotspot';mark.textContent=String(i+1);
      mark.style.left=a.x+'%';mark.style.top=a.y+'%';mark.setAttribute('aria-label','Annotation '+(i+1)+': '+a.title);
      mark.addEventListener('click',()=>selectAnnotation(i));markers.appendChild(mark);
      const choice=document.createElement('button');choice.type='button';choice.className='st-annotation-choice';
      const num=document.createElement('span');num.className='st-annotation-index';num.textContent=String(i+1).padStart(2,'0');
      const label=document.createElement('strong');label.textContent=a.title;choice.append(num,label);
      choice.addEventListener('click',()=>selectAnnotation(i));list.appendChild(choice);
    });
    dots.forEach((b,i)=>{b.classList.toggle('is-active',i===current);b.setAttribute('aria-current',i===current?'step':'false');});
    selectAnnotation(0);
  }
  image.addEventListener('load',()=>image.classList.remove('is-switching'));
  image.addEventListener('error',()=>image.classList.remove('is-switching'));
  function go(index){current=(index+screens.length)%screens.length;render();}
  root.querySelector('#st-slide-prev').addEventListener('click',()=>go(current-1));
  root.querySelector('#st-slide-next').addEventListener('click',()=>go(current+1));
  root.addEventListener('keydown',e=>{
    const tag=e.target.tagName;
    if(['INPUT','TEXTAREA','SELECT'].includes(tag))return;
    if(e.key==='ArrowRight'){e.preventDefault();go(current+1);}
    if(e.key==='ArrowLeft'){e.preventDefault();go(current-1);}
  });
  const device=root.querySelector('.st-slide-mobile-surface');
  device.addEventListener('touchstart',e=>{startX=e.touches[0]?.clientX??null;},{passive:true});
  device.addEventListener('touchend',e=>{
    if(startX===null)return;const x=e.changedTouches[0]?.clientX??startX;const dx=x-startX;startX=null;
    if(Math.abs(dx)>55)go(current+(dx<0?1:-1));
  },{passive:true});
  render();
})();