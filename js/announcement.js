const announcements = [
  { icon: 'fa-calendar-check', title: 'Randevu Talepleri',              desc: 'Muayene, kontrol ve belge talepleriniz için iletişim formunu kullanabilirsiniz.',     date: 'Güncel' },
  { icon: 'fa-syringe',        title: 'Aşı Danışmanlığı',               desc: 'Grip, seyahat ve rutin aşılar için muayenehanemizden bilgi alabilirsiniz.',          date: 'Güncel' },
  { icon: 'fa-file-medical',   title: 'Rapor ve Belgeler',              desc: 'AU, reçete ve sağlık raporu talepleri için gerekli bilgileri bize iletebilirsiniz.',  date: 'Güncel' },
  { icon: 'fa-heart-pulse',    title: 'Koruyucu Sağlık Kontrolleri',    desc: 'Düzenli check-up ve kronik hastalık takibi için randevu oluşturabilirsiniz.',        date: 'Güncel' },
  { icon: 'fa-language',       title: 'Türkçe ve Almanca Hizmet',       desc: 'Hastalarımıza Türkçe ve Almanca iletişim desteğiyle hizmet veriyoruz.',             date: 'Güncel' }
];

const ticker = document.getElementById('annTicker');
if (ticker) {
  const TRANSITION_MS = 700;
  let annIndex = 0;

  const cardTemplate = (a) => `
    <div class="ann-card" style="transform:translateY(100%);opacity:0;transition:transform .7s cubic-bezier(0.4,0,0.2,1),opacity .7s">
      <div class="ann-card-icon"><i class="fa ${a.icon}"></i></div>
      <div class="ann-card-body">
        <div class="ann-card-title">${a.title}</div>
        <div class="ann-card-desc">${a.desc}</div>
        <div class="ann-card-date"><i class="fa fa-calendar-days"></i> ${a.date}</div>
      </div>
    </div>`;

  function renderAnnouncement(idx) {
    ticker.innerHTML = cardTemplate(announcements[idx]);
    // İki frame bekleyerek transition'ın başlamasını garantiliyoruz
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const card = ticker.querySelector('.ann-card');
      if (!card) return;
      card.style.transform = 'translateY(0)';
      card.style.opacity = '1';
    }));
  }

  function cycleAnnouncement() {
    const card = ticker.querySelector('.ann-card');
    if (!card) return;
    card.style.transform = 'translateY(-110%)';
    card.style.opacity = '0';
    setTimeout(() => {
      annIndex = (annIndex + 1) % announcements.length;
      renderAnnouncement(annIndex);
    }, TRANSITION_MS);
  }

  renderAnnouncement(0);
  setInterval(cycleAnnouncement, 5000);
}
