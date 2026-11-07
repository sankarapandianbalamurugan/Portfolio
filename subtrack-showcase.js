/* Standalone SubTrack UI showcase; no changes to other site JavaScript. */
(()=>{
  'use strict';
  const root=document.getElementById('st-ux-slider');
  if(!root)return;
  const screens=[{"title":"Upcoming Payments","label":"UPCOMING","image":"subtrack-upcoming.jpg","alt":"SubTrack Upcoming tab with one projected payment, payment amount and renewal date","challenge":"Renewal dates can be hard to track across separate services.","decision":"Put the next payment, due date and projected total ahead of secondary information.","annotations":[{"title":"Date range","why":"Users know which time window the projected charges cover.","x":39,"y":14,"problem":"Upcoming renewals can be forgotten across services.","decision":"Show the selected payment period directly above the upcoming total."},{"title":"Projected total","why":"Upcoming costs can be estimated without opening each subscription.","x":32,"y":29,"problem":"Users cannot plan if near-term subscription spending is scattered.","decision":"Make the combined projected amount the visual focal point."},{"title":"Next renewal","why":"The projected spend is tied to a specific upcoming payment.","x":70,"y":37,"problem":"A total alone does not show which charge comes next.","decision":"Pair the upcoming total with the next service and renewal date."}]},{"title":"Subscription List","label":"SUBSCRIPTIONS","image":"subtrack-original.jpg","alt":"SubTrack Subscriptions tab showing recurring spending summaries and subscription cards","challenge":"Multiple subscriptions are difficult to compare when each has a different price and renewal pattern.","decision":"Place all plans in one scannable list with plan names, amounts and organizing controls.","annotations":[{"title":"Subscription name","why":"Users can find the correct plan before reviewing its cost.","x":41,"y":47,"problem":"Similar plan prices make individual services hard to identify.","decision":"Lead each subscription row with the service name and identity."},{"title":"Billing amount","why":"Plan costs can be scanned and compared without entering details.","x":78,"y":47,"problem":"Users need to compare the recurring amounts quickly.","decision":"Place the amount at the right edge of each plan row."},{"title":"Search and sort","why":"Users can locate or reorder plans without scrolling through every entry.","x":78,"y":39,"problem":"Long subscription lists become difficult to navigate.","decision":"Provide search and sort controls next to the list heading."}]},{"title":"Add Subscription","label":"SERVICE DISCOVERY","image":"subtrack-add.jpg","alt":"Actual SubTrack Add Subscription entry screen with service search, category filters, recharge and popular service options","challenge":"Finding a service is an extra step before entering a new recurring plan.","decision":"Start addition with search, categories and recognizable services to reduce initial browsing effort.","annotations":[{"title":"Search services","why":"Direct lookup avoids unnecessary browsing.","x":50,"y":20,"problem":"Users may already know the service they want to track.","decision":"Put service search at the start of the add flow."},{"title":"Category filters","why":"People can narrow the selection to a familiar service type.","x":49,"y":27,"problem":"A large catalogue makes relevant services harder to find.","decision":"Group service choices behind visible category chips."},{"title":"Service shortcuts","why":"Users have a clear starting point for creating a subscription.","x":49,"y":57,"problem":"Selecting a plan should not require remembering every product name.","decision":"Show recharge shortcuts and recognizable popular services."}]},{"title":"Spending Analytics","label":"ANALYTICS","image":"subtrack-analytics.jpg","alt":"SubTrack Analytics screen with monthly and yearly equivalents and scheduled payment trend chart","challenge":"Different billing intervals obscure how much subscriptions cost over time.","decision":"Summarize monthly-equivalent and yearly-equivalent spending, then show scheduled payments visually.","annotations":[{"title":"Monthly equivalent","why":"Recurring commitments are easier to compare with monthly budgets.","x":27,"y":22,"problem":"Mixed billing cycles hide the monthly impact on spending.","decision":"Show a monthly-equivalent total at the top of Analytics."},{"title":"Yearly equivalent","why":"Users can see the broader cost of recurring plans.","x":75,"y":22,"problem":"The longer-term subscription commitment is difficult to estimate.","decision":"Pair the monthly view with a yearly-equivalent total."},{"title":"Payment trend","why":"Users can identify months with heavier upcoming expenses.","x":51,"y":58,"problem":"A single total cannot explain which months carry more payments.","decision":"Use a scheduled-payment bar chart below the summaries."}]}];
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
    root.dispatchEvent(new CustomEvent('ux:annotation-change',{bubbles:true}));
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
      const label=document.createElement('strong');label.textContent=a.title;const explanation=document.createElement('span');explanation.className='ux-inline-explanation';
      const fact=document.createElement('span');const pb=document.createElement('b');pb.textContent='Problem';fact.append(pb,document.createTextNode(a.problem));
      const action=document.createElement('span');const db=document.createElement('b');db.textContent='Design decision';action.append(db,document.createTextNode(a.decision));
      const impact=document.createElement('span');const ub=document.createElement('b');ub.textContent='UX benefit';impact.append(ub,document.createTextNode(a.why));
      explanation.append(fact,action,impact);choice.append(num,label,explanation);
      choice.addEventListener('click',()=>selectAnnotation(i));list.appendChild(choice);
    });
    dots.forEach((b,i)=>{b.classList.toggle('is-active',i===current);b.setAttribute('aria-current',i===current?'step':'false');});
    selectAnnotation(0);
    root.dispatchEvent(new CustomEvent('ux:annotation-change',{bubbles:true}));
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