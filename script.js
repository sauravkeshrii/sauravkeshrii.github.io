// ---------- Theme toggle (session only, no persistence) ----------
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    btn.textContent = next === 'dark' ? '☾' : '☀';
    btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
})();

// ---------- News ticker: duplicate content for seamless loop ----------
(function () {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
})();

// ---------- Shared-autonomy slider demo ----------
(function () {
  const slider = document.getElementById('authoritySlider');
  if (!slider) return;
  const modeVal = document.getElementById('modeVal');
  const autoVal = document.getElementById('autoVal');
  const lidarVal = document.getElementById('lidarVal');
  const zoneHuman = document.getElementById('zoneHuman');
  const zoneAssist = document.getElementById('zoneAssist');
  const zoneAuto = document.getElementById('zoneAuto');

  function update() {
    const v = Number(slider.value);
    autoVal.textContent = v + '% autonomous';

    [zoneHuman, zoneAssist, zoneAuto].forEach(z => z && z.classList.remove('zone-active'));

    let mode, proximity;
    if (v < 33) {
      mode = 'HUMAN AUTHORITY';
      proximity = '0.4 m · CRITICAL';
      zoneHuman && zoneHuman.classList.add('zone-active');
    } else if (v < 66) {
      mode = 'GRADUATED ASSISTANCE';
      proximity = '1.2 m · CAUTION';
      zoneAssist && zoneAssist.classList.add('zone-active');
    } else {
      mode = 'REACTIVE BACKSTOP';
      proximity = '2.8 m · SAFE';
      zoneAuto && zoneAuto.classList.add('zone-active');
    }
    modeVal.textContent = mode;
    lidarVal.textContent = proximity;
  }

  slider.addEventListener('input', update);
  update();
})();
