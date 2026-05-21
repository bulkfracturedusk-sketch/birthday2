/* ================= CONFIGURATION & TYPING EFFECT ================= */
const birthdayGirl = "Vishuu (Fuggi)!.. ❤️";
const fullTitleText = `Happy Birthday ${birthdayGirl}`;
const titleElement = document.getElementById("title");
let charIndex = 0;

function typeWriterEffect() {
  if (charIndex < fullTitleText.length) {
    titleElement.innerHTML += fullTitleText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriterEffect, 100);
  }
}

let celebrationStarted = false;
let galleryStarted = false;

/* ================= HIGH-END THREE.JS 3D INTERACTIVE CAKE ================= */
const scene = new THREE.Scene();

// Setup perspective viewport depth
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / 420, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, 420);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // High-DPI screen sharp optimization
document.getElementById("cakeCanvas").appendChild(renderer.domElement);

/* Studio Lighting Distribution Matrix */
scene.add(new THREE.AmbientLight(0xffffff, 1.2)); // Bright crisp overall environmental ambient
const keyLight = new THREE.PointLight(0xffc0cb, 1.8, 20);
keyLight.position.set(5, 8, 5);
scene.add(keyLight);

const rimGlowLight = new THREE.PointLight(0xff69b4, 1.5, 15);
rimGlowLight.position.set(-5, 4, -5);
scene.add(rimGlowLight);

/* Build Procedural Multi-Tier Layered Cake */
const cakeGroup = new THREE.Group();
const pinkMaterial = new THREE.MeshStandardMaterial({ color: 0xff69b4, roughness: 0.25, metalness: 0.1 });
const creamMaterial = new THREE.MeshStandardMaterial({ color: 0xfff1e6, roughness: 0.15 });

const tiers = [
  { radius: 2.6, height: 1.2, posY: 0, material: pinkMaterial },
  { radius: 1.9, height: 1.0, posY: 1.2, material: creamMaterial },
  { radius: 1.3, height: 0.8, posY: 2.2, material: pinkMaterial }
];

tiers.forEach(t => {
  const geo = new THREE.CylinderGeometry(t.radius, t.radius, t.height, 64);
  const mesh = new THREE.Mesh(geo, t.material);
  mesh.position.y = t.posY + t.height / 2; // Fixed positioning calculation alignment bugs
  cakeGroup.add(mesh);
});

/* Generate Array Matrix of Candles & Emissive Lit Flames */
const flamesArray = [];
const candlePositions = [-1.2, -0.6, 0, 0.6, 1.2];

candlePositions.forEach(posX => {
  // Candle Stick
  const candleGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.6, 16);
  const candleMesh = new THREE.Mesh(candleGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 }));
  candleMesh.position.set(posX, 3.3, 0);
  cakeGroup.add(candleMesh);

  // Flame Particle mesh structure
  const flameGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const flameMesh = new THREE.Mesh(flameGeo, new THREE.MeshStandardMaterial({
    color: 0xffd700,
    emissive: 0xff4500,
    emissiveIntensity: 1.5
  }));
  flameMesh.position.set(posX, 3.7, 0);
  cakeGroup.add(flameMesh);
  flamesArray.push(flameMesh);
});

/* Luminescent Neon Background Floor Halo Ring */
const glowGeo = new THREE.RingGeometry(3.2, 3.8, 64);
const glowMat = new THREE.MeshBasicMaterial({
  color: 0xffb6c1,
  transparent: true,
  opacity: 0.35,
  side: THREE.DoubleSide
});
const glowRing = new THREE.Mesh(glowGeo, glowMat);
glowRing.rotation.x = Math.PI / 2;
glowRing.position.y = 0.01;
cakeGroup.add(glowRing);

scene.add(cakeGroup);

/* Viewport Camera Framing Settings */
camera.position.set(0, 4.5, 9.5);
camera.lookAt(0, 1.8, 0);

/* Global Animation Coordinate Variables */
let systemClock = 0;
let targetCameraY = 4.5;
let targetCameraZ = 9.5;
let mouseCoords = { x: 0, y: 0 };

// Capture mouse positions dynamically for parallax interactive tilt feedback
window.addEventListener('mousemove', (e) => {
  mouseCoords.x = (e.clientX / window.innerWidth) - 0.5;
  mouseCoords.y = (e.clientY / window.innerHeight) - 0.5;
});

/* Execution Loop Runtime Render Frame */
function renderTick() {
  requestAnimationFrame(renderTick);

  systemClock += 0.04;
  
  // Constant idle y-axis rotation mapping
  cakeGroup.rotation.y += 0.006;
  
  // Mouse responsive subtle frame tilting calculations
  cakeGroup.rotation.z += (mouseCoords.x * 0.15 - cakeGroup.rotation.z) * 0.05;
  cakeGroup.rotation.x += (mouseCoords.y * 0.15 - cakeGroup.rotation.x) * 0.05;

  // Linear Interpolation camera mapping during events (lerping)
  camera.position.y += (targetCameraY - camera.position.y) * 0.04;
  camera.position.z += (targetCameraZ - camera.position.z) * 0.04;
  camera.lookAt(0, 1.5, 0);

  // Dynamic Flame heat flicker engine calculations
  flamesArray.forEach(f => {
    if(f.visible) {
      f.scale.y = 0.95 + Math.sin(systemClock * 4) * 0.15 + Math.random() * 0.1;
      f.scale.x = 0.95 + Math.cos(systemClock * 3) * 0.08 + Math.random() * 0.05;
    }
  });

  // Pulse Glow floor halo tracking
  glowRing.material.opacity = 0.2 + Math.sin(systemClock) * 0.12;
  const currentPulseScale = 1 + Math.sin(systemClock) * 0.04;
  glowRing.scale.set(currentPulseScale, currentPulseScale, 1);

  renderer.render(scene, camera);
}

// Global initialization window listeners
window.addEventListener('DOMContentLoaded', () => {
  typeWriterEffect();
  renderTick();
  initCanvasConfettiEngine();
});

// Handle window size changes smoothly
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / 420;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, 420);
});

/* ================= PROCEDURAL TRIGGER INTERACTION SYSTEM ================= */
function cutCake() {
  if (celebrationStarted) return;
  celebrationStarted = true;

  // Blow out flames instantly
  flamesArray.forEach(f => f.visible = false);

  // Smooth cinematic overhead camera tracking trigger
  targetCameraY = 7.5;
  targetCameraZ = 6.5;

  // Reveal document cards safely with styling delays
  displayTargetCard("msg");
  displayTargetCard("bestWishes");
  displayTargetCard("giftContainer");

  const soundTrack = document.getElementById("song");
  if (soundTrack) soundTrack.play().catch(() => console.log("Audio waiting for hardware pass rule."));
  
  triggerVectorBlast();
  startEmojiFloatSequence();

  // Style update for the action button
  const btn = document.getElementById("actionBtn");
  if(btn) {
    btn.innerText = "Cake Cut Successfully! ❤️";
    btn.style.background = "linear-gradient(135deg, #4caf50, #2e7d32)";
    btn.style.boxShadow = "0 0 25px rgba(76,175,80,0.6)";
  }
}

function displayTargetCard(targetId) {
  const el = typeof targetId === "string" ? document.getElementById(targetId) : targetId;
  if (!el) return;
  el.style.display = "block";
  setTimeout(() => { el.classList.add("reveal-active"); }, 20);
}

/* ================= HIGH PERFORMANCE VELOCITY CANVAS CONFETTI ================= */
let ctx, canvasWidth, canvasHeight;
let confettiArray = [];
const colorPalette = ['#ff4081', '#ff1744', '#00e5ff', '#00e676', '#ffea00', '#d500f9', '#ffffff'];

function initCanvasConfettiEngine() {
  const cvs = document.getElementById("confettiCanvas");
  ctx = cvs.getContext("2d");
  canvasWidth = cvs.width = window.innerWidth;
  canvasHeight = cvs.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    canvasWidth = cvs.width = window.innerWidth;
    canvasHeight = cvs.height = window.innerHeight;
  });
}

function triggerVectorBlast() {
  const totalParticles = 120;
  for (let i = 0; i < totalParticles; i++) {
    confettiArray.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 + 100,
      radius: Math.random() * 4 + 4,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.8) * 22,
      gravity: 0.45,
      friction: 0.98,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      opacity: 1
    });
  }
  if(confettiArray.length === totalParticles) runConfettiPhysicsLoop();
}

function runConfettiPhysicsLoop() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  for (let i = confettiArray.length - 1; i >= 0; i--) {
    const p = confettiArray[i];
    p.vy += p.gravity;
    p.vx *= p.friction;
    p.vy *= p.friction;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotationSpeed;
    p.opacity -= 0.008;

    if (p.opacity <= 0 || p.y > canvasHeight) {
      confettiArray.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
    ctx.restore();
  }

  if (confettiArray.length > 0) {
    requestAnimationFrame(runConfettiPhysicsLoop);
  }
}

/* ================= BACKGROUND CELEBRATION FLOATING EMISSION ================= */
function startEmojiFloatSequence() {
  const emojis = ["🎉", "🎊", "🥳", "🎂", "✨", "💖"];
  let spawnedCount = 0;

  const timer = setInterval(() => {
    const em = document.createElement("div");
    em.className = "heart";
    em.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    em.style.left = Math.random() * 100 + "vw";
    em.style.fontSize = Math.random() * 1.5 + 1.5 + "rem";
    document.body.appendChild(em);

    setTimeout(() => em.remove(), 4000);
    spawnedCount++;
    if (spawnedCount > 35) clearInterval(timer);
  }, 150);
}

/* ================= GIFT OPEN SYSTEM ================= */
function openGift() {
  const giftBox = document.querySelector(".gift-box");
  if(giftBox.classList.contains("open")) return; // Guard duplicate actions

  giftBox.classList.add("open");
  displayTargetCard("surprise");

  const gallery = document.getElementById("gallerySection");
  displayTargetCard(gallery);
  
  triggerVectorBlast();

  if (!galleryStarted) {
    galleryStarted = true;
    startHeartsAmbientStream();
    initGalleryMatrix();
  }

  setTimeout(() => {
    gallery.scrollIntoView({ behavior: "smooth" });
  }, 400);
}

function startHeartsAmbientStream() {
  const heartElements = ["✨", "💓", "💖", "💕", "✨"];
  const loopTimer = setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.innerText = heartElements[Math.floor(Math.random() * heartElements.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = Math.random() * 1 + 1 + "rem";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4500);
  }, 250);

  setTimeout(() => clearInterval(loopTimer), 10000); // Caps production cycle stream after 10s
}

/* ================= LIGHTBOX MASTER SLIDESHOW SLIDER ================= */
let galleryImages = [];
let currentIndex = 0;
let slideLoopTimer;

function initGalleryMatrix() {
  galleryImages = Array.from(document.querySelectorAll(".gallery img"));
  galleryImages.forEach((img, index) => {
    img.onclick = () => launchLightboxSequence(index);
  });
}

function launchLightboxSequence(targetIdx) {
  currentIndex = targetIdx;
  const lbWindow = document.getElementById("lightbox");
  lbWindow.style.display = "flex";
  
  clearInterval(slideLoopTimer);
  updateSlideSource();
  slideLoopTimer = setInterval(nextSlide, 3200); // 3.2s reading pace speed window
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  clearInterval(slideLoopTimer);
}

function updateSlideSource() {
  const activeImage = document.getElementById("lightboxImg");
  activeImage.style.opacity = "0"; // Smooth change step drop
  setTimeout(() => {
    activeImage.src = galleryImages[currentIndex].src;
    activeImage.style.opacity = "1";
  }, 150);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateSlideSource();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateSlideSource();
}
