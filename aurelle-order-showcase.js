(()=>{'use strict';
const slides=[{"src":"order-overview.png","title":"Order overview & tracking","problem":"One order can contain several products, while tracking and fulfilment details live at different levels.","decision":"Keep the order tracking timeline visible above the product and summary panels.","benefit":"Gives order operations a clear starting point before acting on a particular item.","hotspots":[[38,15,"Order tracking","The timeline communicates the overall order state before an action is taken."],[43,38,"Product details","Ordered items stay visible as separate records rather than being collapsed into one action."],[82,54,"Order summary","Totals and customer context remain close to the item list for quick verification."]]},{"src":"item-cancellation.png","title":"Cancel selected item","problem":"A whole-order cancellation can affect products a customer still wants.","decision":"Put the cancellation action and a reason field on the chosen product, with a final confirmation.","benefit":"Supports more precise cancellations without unnecessarily affecting other items.","hotspots":[[50,34,"Selected product","The dialog identifies which exact product is being cancelled."],[51,55,"Cancellation reason","A reason keeps the exception understandable when the request is reviewed."],[59,76,"Explicit confirmation","The final action is separated from the safe exit to reduce unintended cancellations."]]},{"src":"replacement-delivered.png","title":"Replacement fulfilment","problem":"The original return and the replacement shipment are different stages of an exchange.","decision":"Show the replacement product with a dedicated fulfilment timeline and related tracking data.","benefit":"Makes the replacement stage visible without confusing it with the initial purchase.","hotspots":[[53,20,"Status timeline","Shows progress across exchange and replacement delivery stages."],[38,48,"Original and replacement","Separates the original product from the replacement record."],[52,64,"Shipment information","Delivery and package details remain connected to the replacement."]]},{"src":"payment-refund.png","title":"Payment & refund history","problem":"Refund status can be hard to interpret when payment details are disconnected from order history.","decision":"Use a dedicated payment and refund view inside Order Details with relevant transaction details.","benefit":"Keeps refund actions and completed records reviewable in their order context.","hotspots":[[50,31,"Payment & refund tab","Separates financial activity from the order overview."],[41,51,"Refund details","Shows the refund record alongside the cancelled item."],[81,62,"Order context","Customer and order totals remain available when reviewing a refund."]]},{"src":"initiate-refund.png","title":"Initiate a refund","problem":"A refund must be associated with the correct cancelled product and amount.","decision":"Review item and refund details in a focused confirmation dialog before initiating the action.","benefit":"Encourages verification of the intended refund before submission.","hotspots":[[48,40,"Refund item","The dialog displays the cancelled product and its attributes."],[48,55,"Refund amount","The payment and refund amounts are visible before confirmation."],[62,74,"Confirm refund","The action explicitly records the decision to initiate a refund."]]},{"src":"manual-cod-refund.png","title":"Record manual COD refund","problem":"Cash-on-delivery refunds cannot rely on the same automated payment reversal path.","decision":"Capture UPI or bank-transfer details, a transaction reference and the refund date when recording a manual refund.","benefit":"Leaves a traceable payment record for an otherwise manual process.","hotspots":[[44,45,"Payment method","The operator selects the appropriate manual refund channel."],[45,60,"Transaction reference","A UPI or bank-transfer reference supports reconciliation."],[53,75,"Record the refund","Confirmation follows the payment details rather than just changing a status."]]},{"src":"order-delay.png","title":"Order delay exception","problem":"A delayed order needs an explicit explanation so fulfilment status is not ambiguous.","decision":"Use a focused order-delay dialog to record a reason and optional description.","benefit":"Makes order-level exceptions easier to interpret and communicate.","hotspots":[[50,40,"Delay reason","A reason is required for the exception."],[51,53,"Additional context","The description can capture details beyond the reason category."],[61,67,"Mark as delayed","The state change is an explicit, reviewable action."]]}];
const host=document.getElementById('au-order-story'); if(!host)return;
const q=s=>host.querySelector(s);const image=q('.au-order-screen-img'),points=q('.au-order-hotspots'),anns=q('.au-order-annotation-list'),pager=q('.au-order-pagination');
let slide=0,annotation=0,swipeX=null;
const pad=n=>String(n).padStart(2,'0');
const selectAnnotation=(idx)=>{annotation=idx;points.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('is-active',i===idx);b.setAttribute('aria-pressed',String(i===idx))});anns.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('is-active',i===idx);b.setAttribute('aria-pressed',String(i===idx))});drawConnectors();};
// Connector lines link the original dashboard controls to numbered annotations OUTSIDE the image.
// Coordinates are mapped to the actual contained image, not the letterboxed viewport.
const svgNS='http://www.w3.org/2000/svg';
const connectorSvg=document.createElementNS(svgNS,'svg');connectorSvg.setAttribute('class','au-order-connectors');connectorSvg.setAttribute('aria-hidden','true');host.appendChild(connectorSvg);
function drawConnectors(){
 const screen=q('.au-order-screen'), img=q('.au-order-screen-img');
 const buttons=[...points.querySelectorAll('.au-order-pin')];const cards=[...anns.querySelectorAll('.au-order-annotation-button')];
 const hostBox=host.getBoundingClientRect(),screenBox=screen.getBoundingClientRect(),imgBox=img.getBoundingClientRect();
 if(!hostBox.width||!screenBox.width||!img.naturalWidth||!img.naturalHeight)return;
 const scale=Math.min(imgBox.width/img.naturalWidth,imgBox.height/img.naturalHeight);
 const w=img.naturalWidth*scale,h=img.naturalHeight*scale;
 const offsetX=(imgBox.width-w)/2,offsetY=(imgBox.height-h)/2;
 buttons.forEach((b,i)=>{
  const px=offsetX+w*Number(b.dataset.x)/100,py=offsetY+h*Number(b.dataset.y)/100;
  b.style.left=px+'px';b.style.top=py+'px';
 });
 connectorSvg.setAttribute('viewBox',`0 0 ${hostBox.width} ${hostBox.height}`);
 connectorSvg.replaceChildren();
 if(window.matchMedia('(max-width:960px)').matches)return;
 const xGutter=(screenBox.right+cards[0].getBoundingClientRect().left)/2-hostBox.left;
 cards.forEach((card,i)=>{
  const spot=buttons[i], a=spot.getBoundingClientRect(), b=card.getBoundingClientRect();
  const x=a.left+a.width/2-hostBox.left,y=a.top+a.height/2-hostBox.top;
  const endX=b.left-hostBox.left-7,endY=b.top+b.height/2-hostBox.top;
  const screenEdge=screenBox.right-hostBox.left+5;
  const active=i===annotation;
  const path=document.createElementNS(svgNS,'path');
  path.setAttribute('d',`M ${x.toFixed(1)} ${y.toFixed(1)} L ${screenEdge.toFixed(1)} ${y.toFixed(1)} L ${xGutter.toFixed(1)} ${y.toFixed(1)} L ${xGutter.toFixed(1)} ${endY.toFixed(1)} L ${endX.toFixed(1)} ${endY.toFixed(1)}`);
  path.setAttribute('class','au-order-connector'+(active?' is-active':''));connectorSvg.appendChild(path);
  const c=document.createElementNS(svgNS,'circle');c.setAttribute('cx',endX);c.setAttribute('cy',endY);c.setAttribute('r',active?3.5:2.8);c.setAttribute('class','au-order-connector-end'+(active?' is-active':''));connectorSvg.appendChild(c);
 });
}
const observer=typeof ResizeObserver==='function'?new ResizeObserver(()=>drawConnectors()):null;
if(observer){observer.observe(host);observer.observe(q('.au-order-screen'));observer.observe(q('.au-order-annotation-list'));}
window.addEventListener('resize',drawConnectors,{passive:true});
const show=(idx)=>{
 slide=(idx+slides.length)%slides.length;annotation=0;const s=slides[slide];
 image.classList.add('is-switching');image.onload=()=>{image.classList.remove('is-switching');requestAnimationFrame(drawConnectors)};image.src='assets/aurelle/orders/'+s.src;image.alt='Original Aurelle Order Management dashboard screenshot: '+s.title;
 q('.au-order-stage-count').textContent=q('.au-order-index').textContent=q('.au-order-page').textContent=`${pad(slide+1)} / ${pad(slides.length)}`;
 q('.au-order-title').textContent=s.title;q('.au-order-problem-text').textContent=s.problem;q('.au-order-choice-text').textContent=s.decision;q('.au-order-benefit-text').textContent=s.benefit;
 points.replaceChildren();anns.replaceChildren();s.hotspots.forEach(([x,y,title,rationale],i)=>{
 const b=document.createElement('button');b.type='button';b.textContent=String(i+1);b.className='au-order-pin';b.dataset.x=String(x);b.dataset.y=String(y);b.setAttribute('aria-label',`Annotation ${i+1}: ${title}`);b.addEventListener('click',()=>selectAnnotation(i));points.appendChild(b);
 const ab=document.createElement('button');ab.type='button';ab.className='au-order-annotation-button';const num=document.createElement('span');num.className='au-order-annotation-number';num.textContent=pad(i+1);const box=document.createElement('span');const strong=document.createElement('strong');strong.textContent=title;const p=document.createElement('span');p.className='au-order-annotation-description';p.textContent=rationale;box.append(strong,p);ab.append(num,box);ab.addEventListener('click',()=>selectAnnotation(i));anns.appendChild(ab);
 });
 pager.replaceChildren();slides.forEach((it,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`View screen ${i+1}: ${it.title}`);b.setAttribute('aria-current',String(i===slide));b.addEventListener('click',()=>show(i));pager.appendChild(b)});selectAnnotation(0);requestAnimationFrame(drawConnectors);
};
q('.au-order-prev').addEventListener('click',()=>show(slide-1));q('.au-order-next').addEventListener('click',()=>show(slide+1));
host.addEventListener('keydown',e=>{if(e.target.closest('.au-order-annotation-list,.au-order-pagination,.au-order-hotspots'))return;if(e.key==='ArrowLeft'){e.preventDefault();show(slide-1)}if(e.key==='ArrowRight'){e.preventDefault();show(slide+1)}});
const stage=q('.au-order-stage');stage.addEventListener('touchstart',e=>{swipeX=e.touches[0].clientX},{passive:true});stage.addEventListener('touchend',e=>{if(swipeX===null)return;const delta=e.changedTouches[0].clientX-swipeX;if(Math.abs(delta)>60)show(slide+(delta<0?1:-1));swipeX=null},{passive:true});
const overlay=document.createElement('div');overlay.className='au-order-lightbox';overlay.hidden=true;overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Full-resolution original Order Management dashboard screenshot');const cb=document.createElement('button');cb.type='button';cb.textContent='Close ✕';cb.setAttribute('aria-label','Close screenshot');const full=document.createElement('img');full.alt='';overlay.append(cb,full);document.body.appendChild(overlay);let returnFocus=null;
const close=()=>{overlay.hidden=true;document.body.style.overflow='';if(returnFocus)returnFocus.focus()};cb.addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close()});document.addEventListener('keydown',e=>{if(!overlay.hidden&&e.key==='Escape'){e.preventDefault();close()}});
q('.au-order-zoom').addEventListener('click',e=>{returnFocus=e.currentTarget;full.src=image.src;full.alt=image.alt;overlay.hidden=false;document.body.style.overflow='hidden';cb.focus()});
show(0);
})();