// MarithRadio Kerst - script.js (Nederlands)
document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');
  const playIcon = document.getElementById('playIcon');
  const audio = document.getElementById('radioStream');
  const volumeRange = document.getElementById('volumeRange');
  const trackTitle = document.getElementById('trackTitle');
  const trackStatus = document.getElementById('trackStatus');
  const playlistEl = document.getElementById('playlist');
  const snowContainer = document.getElementById('snowContainer');

  // Playlist — voeg mp3-bestanden toe in assets/music/ of gebruik de voorbeeld-URL
  const playlist = [
    { title: 'Kerstmix 1', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Kerstmix 2', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { title: 'Kerstliedjes (loop)', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
  ];

  let current = 0;
  let isPlaying = false;

  function loadTrack(index) {
    current = index;
    audio.src = playlist[index].src;
    trackTitle.textContent = playlist[index].title;
    updatePlaylistUI();
  }

  function updatePlaylistUI() {
    Array.from(playlistEl.children).forEach((btn, idx) => {
      btn.classList.toggle('active', idx === current);
      btn.setAttribute('aria-pressed', idx === current ? 'true' : 'false');
    });
  }

  // Maak playlist-knoppen
  playlist.forEach((t, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = t.title;
    b.addEventListener('click', () => {
      loadTrack(i);
      play();
    });
    playlistEl.appendChild(b);
  });

  // Eerste track laden
  loadTrack(0);
  audio.volume = Number(volumeRange.value);

  function play() {
    audio.play().then(() => {
      isPlaying = true;
      playIcon.src = 'assets/images/pause.svg';
      playButton.setAttribute('aria-pressed', 'true');
      trackStatus.textContent = 'Spelen';
    }).catch((err) => {
      // Autoplay kan geblokkeerd worden door de browser
      isPlaying = false;
      playIcon.src = 'assets/images/play.svg';
      playButton.setAttribute('aria-pressed', 'false');
      trackStatus.textContent = 'Autoplay geblokkeerd — klik play';
      console.warn('Play geblokkeerd:', err);
    });
  }

  function pause() {
    audio.pause();
    isPlaying = false;
    playIcon.src = 'assets/images/play.svg';
    playButton.setAttribute('aria-pressed', 'false');
    trackStatus.textContent = 'Gepauzeerd';
  }

  playButton.addEventListener('click', () => {
    if (!isPlaying) play(); else pause();
  });

  // Als audio klaar is, ga naar volgende (playlist loop)
  audio.addEventListener('ended', () => {
    const next = (current + 1) % playlist.length;
    loadTrack(next);
    play();
  });

  // Volume control
  volumeRange.addEventListener('input', (e) => {
    audio.volume = Number(e.target.value);
  });

  // Keyboard toegankelijkheid: Space/K toggles play, pijltjes volume
  document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      if (isPlaying) pause(); else play();
    } else if (e.key === 'ArrowUp') {
      volumeRange.value = Math.min(1, Number(volumeRange.value) + 0.05);
      audio.volume = Number(volumeRange.value);
    } else if (e.key === 'ArrowDown') {
      volumeRange.value = Math.max(0, Number(volumeRange.value) - 0.05);
      audio.volume = Number(volumeRange.value);
    }
  });

  // Sneeuwanimatie (lichtgewicht)
  function createSnowflake() {
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    const size = Math.random() * 18 + 10;
    flake.style.fontSize = `${size}px`;
    flake.style.left = Math.random() * window.innerWidth + 'px';
    flake.textContent = '❄';
    snowContainer.appendChild(flake);

    const fallDuration = Math.random() * 8 + 6; // seconden
    flake.animate([
      { transform: `translateY(-10vh) rotate(0deg)`, opacity: 1 },
      { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0.8 }
    ], {
      duration: fallDuration * 1000,
      iterations: 1,
      easing: 'linear'
    });

    setTimeout(() => flake.remove(), fallDuration * 1000 + 200);
  }

  setInterval(createSnowflake, 220);

  // Voor debugging
  window.marith = { play, pause, loadTrack, playlist };
});