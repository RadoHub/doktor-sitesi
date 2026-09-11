const announcements = [
  { icon: 'fa-calendar-check', title: 'Yeni Online Randevu Sistemi',     desc: 'Artık online portalomuzu kullanarak 7/24 randevu alabilirsiniz.',                date: '15 Aralık 2024' },
  { icon: 'fa-syringe',        title: 'Grip Aşısı Kampanyası',          desc: 'Kış sezonu için grip aşılarımız stokta mevcuttur.',                              date: '1 Kasım 2024'   },
  { icon: 'fa-file-medical',   title: 'Yeni Makale Yayımlandı',         desc: '"Diyabette Ramazan Orucu" makalemiz Lancet dergisinde yayımlandı.',             date: '3 Eylül 2024'    },
  { icon: 'fa-building',       title: 'Kardiyoloji Birimimiz Açıldı',    desc: 'Yeni kardiyoloji birimimizde ekokardiyografi randevuları alınabilir.',          date: '1 Ağustos 2024' },
  { icon: 'fa-award',          title: 'Yılın Doktoru Ödülü',            desc: 'Dr. Yılmaz, Kuzey Ren-Vestfalya Tıp Odası tarafından ödüle layık görüldü.',     date: '15 Haziran 2024' }
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
