const anns=[
  {icon:'fa-calendar-check',title:'Yeni Online Randevu Sistemi',desc:'Artık online portalomuzu kullanarak 7/24 randevu alabilirsiniz.',date:'15 Aralık 2024'},
  {icon:'fa-syringe',title:'Grip Aşısı Kampanyası',desc:'Kış sezonu için grip aşılarımız stokta mevcuttur.',date:'1 Kasım 2024'},
  {icon:'fa-file-medical',title:'Yeni Makale Yayımlandı',desc:'"Diyabette Ramazan Orucu" makalemiz Lancet dergisinde yayımlandı.',date:'3 Eylül 2024'},
  {icon:'fa-building',title:'Kardiyoloji Birimimiz Açıldı',desc:'Yeni kardiyoloji birimimizde ekokardiyografi randevuları alınabilir.',date:'1 Ağustos 2024'},
  {icon:'fa-award',title:'Yılın Doktoru Ödülü',desc:'Dr. Yılmaz, Kuzey Ren-Vestfalya Tıp Odası tarafından ödüle layık görüldü.',date:'15 Haziran 2024'},
];
let annIdx=0;
const ticker=document.getElementById('annTicker');
function renderAnn(idx){
  const a=anns[idx];
  ticker.innerHTML=`<div class="ann-card" style="transform:translateY(100%);opacity:0;transition:transform .7s cubic-bezier(0.4,0,0.2,1),opacity .7s"><div class="ann-card-icon"><i class="fa ${a.icon}"></i></div><div class="ann-card-body"><div class="ann-card-title">${a.title}</div><div class="ann-card-desc">${a.desc}</div><div class="ann-card-date"><i class="fa fa-calendar-days"></i> ${a.date}</div></div></div>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{const c=ticker.querySelector('.ann-card');c.style.transform='translateY(0)';c.style.opacity='1';}));
}
function cycleAnn(){
  const c=ticker.querySelector('.ann-card');
  if(c){c.style.transform='translateY(-110%)';c.style.opacity='0';setTimeout(()=>{annIdx=(annIdx+1)%anns.length;renderAnn(annIdx);},700);}
}
renderAnn(0);
setInterval(cycleAnn,5000);

/* SCROLL REVEAL */
const revealAll=document.querySelectorAll('.reveal,.reveal-left,.reveal-right');
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.12});
revealAll.forEach(el=>obs.observe(el));

/* TEAM STAGGER */
const teamCards=document.querySelectorAll('.team-card');
const teamObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){teamCards.forEach((c,i)=>setTimeout(()=>c.classList.add('visible'),i*150));teamObs.disconnect();}
},{threshold:.15});
if(teamCards.length)teamObs.observe(teamCards[0]);

/* ARTICLES STAGGER */
const artCards=document.querySelectorAll('.article-card');
const artObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){artCards.forEach((c,i)=>setTimeout(()=>c.classList.add('visible'),i*120));artObs.disconnect();}
},{threshold:.1});
if(artCards.length)artObs.observe(artCards[0]);