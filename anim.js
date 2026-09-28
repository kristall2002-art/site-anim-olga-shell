var OS_IMG={"https://static.tildacdn.com/tild6533-6333-4633-b162-336437306138/IMG_1566.png": "w/rec846174960-1.webp", "https://static.tildacdn.com/tild3031-6466-4264-a165-663963623863/IMG_5629.JPG": "w/rec846174960-2.webp", "https://static.tildacdn.com/tild6563-6361-4363-b830-616365373830/noroot.png": "w/rec846174960-3.webp", "https://static.tildacdn.com/tild6632-3132-4437-a436-646363303330/noroot.png": "w/rec846174960-4.webp", "https://static.tildacdn.com/tild3163-3238-4364-b632-386465643165/photo_2026-04-30_121.jpeg": "w/rec846174960-5.webp", "https://static.tildacdn.com/tild3665-6462-4237-b131-653932366130/IMG_5751.JPG": "w/rec846174960-6.webp", "https://static.tildacdn.com/tild6135-3335-4263-a665-663063663037/photo_2026-04-30_122.jpeg": "w/rec846135184-7.webp", "https://static.tildacdn.com/tild3938-3662-4833-b638-656436373530/photo_2026-04-30_121.jpeg": "w/rec846135184-8.webp", "https://static.tildacdn.com/tild3861-6139-4031-b161-323036366135/photo_2026-04-30_121.jpeg": "w/rec846135184-9.webp", "https://static.tildacdn.com/tild3765-6435-4437-a432-626163396230/photo_2026-04-30_121.jpeg": "w/rec846135184-10.webp", "https://static.tildacdn.com/tild6162-6533-4630-b638-643238363839/IMG_5731.JPG": "w/rec846135184-11.webp", "https://static.tildacdn.com/tild6438-3337-4662-a134-383961333537/photo_2026-04-30_121.jpeg": "w/rec846135184-12.webp"};

(function(){
"use strict";
var RM=false;try{RM=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
var NAVY='#00003a',CREAM='#fff8f5';
function onView(el,fn,th){
  if(!('IntersectionObserver' in window)){fn();return;}
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){fn();io.disconnect();}});},{threshold:th||.25});
  io.observe(el);
}
function visible(el){return el&&getComputedStyle(el).display!=='none'&&el.getBoundingClientRect().width>0;}

/* 1.1 — заголовок Olga SHELL по буквам */
function splitTitle(){
  var ids=['1734979249404','1734977449316'],k=0;
  ids.forEach(function(id){
    document.querySelectorAll('#rec844379413 .tn-elem[data-elem-id="'+id+'"] .tn-atom').forEach(function(a){
      if(a.dataset.split)return;a.dataset.split=1;
      var t=a.textContent.trim();a.setAttribute('aria-label',t);a.textContent='';
      for(var i=0;i<t.length;i++){var c=document.createElement('span');c.className='os-ch';c.setAttribute('aria-hidden','true');
        c.textContent=t[i];c.style.setProperty('--i',k++);a.appendChild(c);}
    });
  });
  requestAnimationFrame(function(){setTimeout(function(){document.documentElement.classList.add('os-title-go');},200);});
}

/* 5.1 — цифры со счётом, отдельной полосой после первого экрана */
function stats(){
  var hero=document.getElementById('rec844379413');if(!hero||document.getElementById('os-stats'))return;
  var box=document.createElement('div');box.id='os-stats';
  box.innerHTML='<div class="os-st"><b class="os-cnt" data-v="600" data-s="+">600+</b><span>счастливых образов</span></div>'+
    '<div class="os-st"><b class="os-cnt" data-v="10" data-s="">10</b><span>лет опыта</span></div>'+
    '<div class="os-st"><b class="os-cnt" data-v="4.9" data-s="">4.9</b><span>отзывы</span></div>';
  hero.parentNode.insertBefore(box,hero.nextSibling);
  onView(box,function(){
    box.querySelectorAll('.os-cnt').forEach(function(el){
      var raw=el.dataset.v,suf=el.dataset.s,t=parseFloat(raw),dec=raw.indexOf('.')>-1;
      if(RM)return;var st=null;
      function step(ts){if(st===null)st=ts;var p=Math.min(1,(ts-st)/1300),v=t*(1-Math.pow(1-p,3));
        el.textContent=(dec?v.toFixed(1):Math.round(v))+suf;if(p<1)requestAnimationFrame(step);else el.textContent=raw+suf;}
      el.textContent=(dec?'0.0':'0')+suf;requestAnimationFrame(step);
    });
  },.5);
}

/* 4.1 — работы лентой, листается пальцем */
function strip(){
  if(document.getElementById('os-strip'))return;
  var recs=['rec846174960','rec846135184'].map(function(id){return document.getElementById(id);});
  if(!recs[0])return;
  var list=[];
  recs.forEach(function(r){
    if(!r)return;
    var seen={},row=[];
    r.querySelectorAll('.tn-atom[data-original]').forEach(function(a){
      var u=a.getAttribute('data-original');if(seen[u])return;seen[u]=1;
      var el=a.closest('.tn-elem');row.push({u:u,x:el?parseFloat(el.getAttribute('data-field-left-value')||0):0});
    });
    row.sort(function(a,b){return a.x-b.x;});list=list.concat(row);
  });
  var box=document.createElement('div');box.id='os-strip';
  var track=document.createElement('div');track.className='os-track';
  list.forEach(function(it,i){
    var f=document.createElement('div');f.className='os-tile';
    var img=document.createElement('img');img.src=OS_IMG[it.u]||it.u;img.loading='lazy';img.alt='Работа Ольги Шевелевой '+(i+1);
    f.appendChild(img);track.appendChild(f);
  });
  box.appendChild(track);
  var hint=document.createElement('div');hint.className='os-hint';hint.textContent='листайте →';box.appendChild(hint);
  recs[0].parentNode.insertBefore(box,recs[0]);
  var dx=null,sl=0;
  track.addEventListener('mousedown',function(e){dx=e.clientX;sl=track.scrollLeft;track.style.scrollSnapType='none';e.preventDefault();});
  window.addEventListener('mousemove',function(e){if(dx!==null)track.scrollLeft=sl-(e.clientX-dx);});
  window.addEventListener('mouseup',function(){if(dx!==null){dx=null;track.style.scrollSnapType='';}});
  recs.forEach(function(r){if(r)r.style.display='none';});
  onView(box,function(){
    if(RM)return;
    setTimeout(function(){track.scrollTo({left:90,behavior:'smooth'});},300);
    setTimeout(function(){track.scrollTo({left:0,behavior:'smooth'});},1000);
  },.4);
}

/* 3.1 — карточки услуг всплывают по очереди */
function cards(){
  var rec=document.getElementById('rec844383095');if(!rec||rec.dataset.osCards)return;
  var els=[].slice.call(rec.querySelectorAll('.tn-elem')).filter(visible);
  var shapes=els.filter(function(e){var b=e.getBoundingClientRect();return e.dataset.elemType==='shape'&&b.height>200&&b.width>200;});
  if(!shapes.length)return;rec.dataset.osCards=1;
  shapes.forEach(function(sh){
    var r=sh.getBoundingClientRect(),grp=[sh];
    els.forEach(function(e){if(e===sh)return;var b=e.getBoundingClientRect(),cx=b.left+b.width/2,cy=b.top+b.height/2;
      if(cx>r.left&&cx<r.right&&cy>r.top&&cy<r.bottom)grp.push(e);});
    grp.forEach(function(e){e.classList.add('os-card');});
    onView(sh,function(){grp.forEach(function(e){e.classList.add('os-in');});},.2);
  });
}

/* 6.1 — заливка кнопки слева направо */
function buttons(){
  document.querySelectorAll('.tn-elem[data-elem-type="button"] .tn-atom').forEach(function(a){
    if(a.dataset.osFill)return;a.dataset.osFill=1;
    var cs=getComputedStyle(a),bg=cs.backgroundColor,txt=cs.color;
    var clear=(bg==='rgba(0, 0, 0, 0)'||bg==='transparent');
    var fill=document.createElement('span');fill.className='os-fill';fill.style.background=txt;a.insertBefore(fill,a.firstChild);
    a.classList.add('os-btn');a.style.setProperty('--os-to',clear?NAVY:bg);
    function go(){a.classList.remove('os-on');void a.offsetWidth;a.classList.add('os-on');clearTimeout(a._t);a._t=setTimeout(function(){a.classList.remove('os-on');},1100);}
    a.addEventListener('touchstart',go,{passive:true});
    a.addEventListener('mouseenter',function(){a.classList.add('os-on');});
    a.addEventListener('mouseleave',function(){a.classList.remove('os-on');});
  });
}

function run(){try{splitTitle();}catch(e){}try{stats();}catch(e){}try{strip();}catch(e){}try{cards();}catch(e){}try{buttons();}catch(e){}}
if(document.readyState==='complete')setTimeout(run,300);else window.addEventListener('load',function(){setTimeout(run,300);});
})();
