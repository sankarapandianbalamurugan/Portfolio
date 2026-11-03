
(function(){
  const toggle=document.querySelector('.menu-toggle');
  const menu=document.getElementById('primary-menu');
  if(toggle && menu){
    toggle.addEventListener('click', ()=>{
      const open=menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true':'false');
    });
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    }));
  }

  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12});
    reveals.forEach(el=>observer.observe(el));
  }else{
    reveals.forEach(el=>el.classList.add('is-visible'));
  }
})();
