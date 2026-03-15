<template>
  <div class="group" ref="galleryRef">
    <!-- Main image -->
    <div
      class="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4 bg-surface-100 dark:bg-surface-800"
      ref="mainAreaRef"
      @mouseenter="onMainMouseEnter"
      @mouseleave="onMainMouseLeave"
      @mousemove="onMainMouseMove"
      @click="openLightbox(activeThumbIndex)"
    >
      <div class="w-full h-full transition-all duration-300">
        <img
          v-if="currentIsImage && image"
          :src="image"
          :alt="title"
          width="600"
          height="800"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full" v-html="svgs[activeThumbIndex]" />
      </div>

      <!-- Hover zoom lens (desktop) -->
      <div
        ref="zoomLensRef"
        class="hidden lg:block absolute pointer-events-none opacity-0 transition-opacity duration-150 w-36 h-36 rounded-full border-2 border-white/60 shadow-lg overflow-hidden z-10"
      />

      <!-- Zoom result panel (desktop) -->
      <div
        ref="zoomResultRef"
        class="hidden lg:block absolute top-0 left-full ms-4 w-80 h-80 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-2xl overflow-hidden opacity-0 transition-opacity duration-200 z-20 bg-surface-100 dark:bg-surface-800"
      />

      <!-- Click-to-zoom hint -->
      <div class="absolute bottom-3 end-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-white/80 text-xs pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607zM10.5 7.5v6m3-3h-6" />
        </svg>
        Click to zoom
      </div>
    </div>

    <!-- Thumbnails -->
    <div class="grid grid-cols-4 gap-3">
      <!-- Thumbnail 0: Front (real image or SVG) -->
      <button
        type="button"
        class="group/thumb relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer"
        :class="activeThumbIndex === 0 ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-transparent hover:border-surface-300 dark:hover:border-surface-600'"
        :aria-label="`View front of ${title}`"
        @click="selectThumb(0)"
      >
        <img v-if="image" :src="image" :alt="`${title} — Front view`" width="150" height="200" loading="lazy" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full" v-html="svgs[0]" />
        <span class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent py-1 text-center text-[10px] text-white/90 font-medium opacity-0 group-hover/thumb:opacity-100 transition-opacity">Front</span>
      </button>

      <!-- Thumbnails 1-3: Side / Detail / Back -->
      <button
        v-for="i in [1, 2, 3]"
        :key="i"
        type="button"
        class="group/thumb relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer"
        :class="activeThumbIndex === i ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-transparent hover:border-surface-300 dark:hover:border-surface-600'"
        :aria-label="`View ${viewLabels[i].toLowerCase()} of ${title}`"
        @click="selectThumb(i)"
      >
        <div class="w-full h-full" v-html="svgs[i]" />
      </button>
    </div>

    <!-- Video thumbnail -->
    <div v-if="video" class="mt-3">
      <button
        type="button"
        class="relative w-full rounded-lg overflow-hidden bg-surface-900 aspect-video flex items-center justify-center group/video cursor-pointer"
        :aria-label="'Play product video'"
        @click="playVideo"
      >
        <div class="absolute inset-0 flex items-center justify-center" :style="{ backgroundColor: placeholderColor }">
          <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform">
            <svg class="h-6 w-6 text-surface-900 ms-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <span class="absolute bottom-2 start-2 text-xs text-white/80 bg-black/50 rounded px-2 py-0.5">Watch Video</span>
      </button>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxOpen" class="fixed inset-0 z-[70] flex items-center justify-center" style="animation: backdrop-fade-in 0.2s ease-out forwards">
        <div class="absolute inset-0 bg-black/90 backdrop-blur-sm" @click="closeLightbox" />
        <div class="relative z-10 flex flex-col items-center gap-4 max-w-4xl w-full mx-4" style="animation: modal-enter 0.25s ease-out forwards">
          <!-- Close button -->
          <button
            class="absolute -top-2 -end-2 md:top-0 md:end-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer z-20"
            aria-label="Close lightbox"
            @click="closeLightbox"
          >
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <!-- Counter -->
          <div class="absolute top-2 start-2 md:top-0 md:start-0 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-white/80 text-sm font-medium z-20">
            {{ lightboxIndex + 1 }} / 4
          </div>

          <!-- Image wrap -->
          <div
            class="relative w-full aspect-[3/4] max-h-[75vh] rounded-2xl overflow-hidden select-none"
            :style="{ cursor: lightboxZoomed ? 'grab' : 'zoom-in' }"
            @click="toggleLightboxZoom"
            @mousemove="onLightboxMouseMove"
          >
            <div
              ref="lightboxContentRef"
              class="w-full h-full transition-transform duration-300 ease-out"
              :style="lightboxZoomed ? { transform: 'scale(2.5)', transformOrigin: lightboxOrigin } : {}"
            >
              <img
                v-if="lightboxIndex === 0 && image"
                :src="image"
                :alt="`${viewLabels[0]} view`"
                class="w-full h-full object-cover"
                draggable="false"
              />
              <div v-else class="w-full h-full" v-html="svgs[lightboxIndex]" />
            </div>

            <!-- Prev/Next -->
            <button
              class="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer z-10"
              @click.stop="lightboxPrev"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button
              class="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer z-10"
              @click.stop="lightboxNext"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>

          <!-- Thumb strip -->
          <div class="flex items-center justify-center gap-2">
            <button
              v-for="i in 4"
              :key="i - 1"
              class="w-14 h-14 rounded-lg overflow-hidden transition-all cursor-pointer"
              :class="lightboxIndex === i - 1 ? 'ring-2 ring-white ring-offset-2 ring-offset-black/90 opacity-100' : 'opacity-60'"
              @click="lightboxIndex = i - 1; lightboxZoomed = false"
            >
              <img v-if="i === 1 && image" :src="image" :alt="viewLabels[0]" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full" v-html="svgs[i - 1]" />
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  image?: string;
  placeholderColor: string;
  colors: { name: string; value: string }[];
  video?: string;
}>();

const viewLabels = ['Front', 'Side', 'Detail', 'Back'];
const activeThumbIndex = ref(0);
const currentIsImage = ref(!!props.image);

const galleryRef = ref<HTMLElement>();
const mainAreaRef = ref<HTMLElement>();
const zoomLensRef = ref<HTMLElement>();
const zoomResultRef = ref<HTMLElement>();
const lightboxContentRef = ref<HTMLElement>();

// Lightbox state
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const lightboxZoomed = ref(false);
const lightboxOrigin = ref('50% 50%');

// Color helpers
function hexBrightness(hex: string): number {
  const h = hex.replace('#', '');
  if (h.length < 6) return 128;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function adjustForBg(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length < 6) return '#888888';
  let r = parseInt(h.slice(0, 2), 16);
  let g = parseInt(h.slice(2, 4), 16);
  let b = parseInt(h.slice(4, 6), 16);
  const br = (r * 299 + g * 587 + b * 114) / 1000;
  if (br > 210) { r = Math.round(r * 0.58); g = Math.round(g * 0.58); b = Math.round(b * 0.58); }
  else if (br < 40) { r = Math.min(255, r + 100); g = Math.min(255, g + 100); b = Math.min(255, b + 100); }
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const viewColors = computed(() => [
  props.placeholderColor,
  adjustForBg(props.colors[0]?.value || '#c4b5fd'),
  adjustForBg(props.colors[1]?.value || '#fde68a'),
  adjustForBg(props.colors[2]?.value || '#7dd3fc'),
]);

function tc(bg: string) { return hexBrightness(bg) > 155 ? '#1a1a2e' : '#ffffff'; }
function tcm(bg: string) { return hexBrightness(bg) > 155 ? 'rgba(26,26,46,0.35)' : 'rgba(255,255,255,0.35)'; }
function tcs(bg: string) { return hexBrightness(bg) > 155 ? 'rgba(26,26,46,0.6)' : 'rgba(255,255,255,0.6)'; }
function esc(s: string) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

function viewSvg(i: number): string {
  const bg = viewColors.value[i]; const t = tc(bg); const m = tcm(bg); const s = tcs(bg);
  const safeTitle = esc(props.title);

  if (i === 0) {
    return `<svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect width="600" height="800" fill="${bg}"/><line x1="150" y1="280" x2="450" y2="280" stroke="${m}" stroke-width="1"/><line x1="180" y1="520" x2="420" y2="520" stroke="${m}" stroke-width="1"/><path d="M280 140 Q300 115 320 140 L390 220 L210 220 Z" fill="none" stroke="${m}" stroke-width="1.5"/><circle cx="300" cy="122" r="7" fill="none" stroke="${m}" stroke-width="1.5"/><text x="300" y="390" text-anchor="middle" fill="${s}" font-family="system-ui" font-size="22" font-weight="600">${safeTitle}</text><text x="300" y="418" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="12" letter-spacing="3">FRONT VIEW</text><text x="300" y="750" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="10" letter-spacing="2">01 / 04</text></svg>`;
  }
  if (i === 1) {
    return `<svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect width="600" height="800" fill="${bg}"/><line x1="600" y1="0" x2="0" y2="800" stroke="${m}" stroke-width="1"/><circle cx="490" cy="150" r="90" fill="none" stroke="${m}" stroke-width="1"/><circle cx="490" cy="150" r="60" fill="none" stroke="${m}" stroke-width="1"/><circle cx="490" cy="150" r="30" fill="none" stroke="${m}" stroke-width="1"/><rect x="60" y="370" width="240" height="1.5" fill="${m}"/><text x="60" y="355" fill="${s}" font-family="system-ui" font-size="22" font-weight="600">${safeTitle}</text><text x="60" y="400" fill="${m}" font-family="system-ui" font-size="12" letter-spacing="3">SIDE VIEW</text><text x="300" y="750" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="10" letter-spacing="2">02 / 04</text></svg>`;
  }
  if (i === 2) {
    let dots = '';
    for (let r = 0; r < 20; r++) {
      for (let c = 0; c < 15; c++) {
        dots += `<circle cx="${c * 42 + 18}" cy="${r * 42 + 18}" r="1.8" fill="${m}"/>`;
      }
    }
    return `<svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect width="600" height="800" fill="${bg}"/>${dots}<rect x="110" y="330" width="380" height="140" rx="16" fill="${bg}" fill-opacity="0.88"/><text x="300" y="388" text-anchor="middle" fill="${s}" font-family="system-ui" font-size="28" font-weight="700" letter-spacing="5">CLOSE-UP</text><text x="300" y="420" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="13">${safeTitle}</text><text x="300" y="750" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="10" letter-spacing="2">03 / 04</text></svg>`;
  }
  return `<svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect width="600" height="800" fill="${bg}"/><rect x="210" y="170" width="180" height="240" rx="10" fill="none" stroke="${m}" stroke-width="1.5"/><circle cx="300" cy="212" r="14" fill="none" stroke="${m}" stroke-width="1.5"/><line x1="210" y1="250" x2="390" y2="250" stroke="${m}" stroke-width="1"/><text x="300" y="302" text-anchor="middle" fill="${s}" font-family="system-ui" font-size="15" font-weight="600">${safeTitle}</text><text x="300" y="330" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="11">Premium Quality</text><text x="300" y="355" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="11">Ethically Made</text><text x="300" y="380" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="11">Designed with Care</text><text x="300" y="520" text-anchor="middle" fill="${s}" font-family="system-ui" font-size="12" letter-spacing="2">CARE INSTRUCTIONS</text><circle cx="230" cy="570" r="20" fill="none" stroke="${m}" stroke-width="1"/><circle cx="300" cy="570" r="20" fill="none" stroke="${m}" stroke-width="1"/><circle cx="370" cy="570" r="20" fill="none" stroke="${m}" stroke-width="1"/><text x="230" y="575" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="16">&#x2668;</text><text x="300" y="575" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="16">&#x25C7;</text><text x="370" y="576" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="16">&#x25B3;</text><text x="300" y="690" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="12" letter-spacing="3">BACK VIEW</text><text x="300" y="750" text-anchor="middle" fill="${m}" font-family="system-ui" font-size="10" letter-spacing="2">04 / 04</text></svg>`;
}

const svgs = computed(() => [0, 1, 2, 3].map(viewSvg));

function selectThumb(index: number) {
  activeThumbIndex.value = index;
  if (index === 0 && props.image) {
    currentIsImage.value = true;
  } else {
    currentIsImage.value = false;
  }
}

// Zoom
let isHovering = false;
const ZOOM_FACTOR = 2.5;

function onMainMouseEnter() {
  isHovering = true;
  if (mainAreaRef.value) mainAreaRef.value.style.cursor = 'crosshair';
  if (!zoomLensRef.value || !zoomResultRef.value || !mainAreaRef.value) return;

  if (currentIsImage.value && props.image) {
    zoomResultRef.value.style.backgroundImage = `url(${props.image})`;
    zoomResultRef.value.style.backgroundSize = `${mainAreaRef.value.offsetWidth * ZOOM_FACTOR}px ${mainAreaRef.value.offsetHeight * ZOOM_FACTOR}px`;
    zoomResultRef.value.style.backgroundColor = '';
    zoomLensRef.value.style.backgroundImage = `url(${props.image})`;
    zoomLensRef.value.style.backgroundSize = `${mainAreaRef.value.offsetWidth * 1.5}px ${mainAreaRef.value.offsetHeight * 1.5}px`;
    zoomLensRef.value.style.backgroundColor = '';
  } else {
    const color = viewColors.value[activeThumbIndex.value] || '';
    zoomResultRef.value.style.backgroundImage = '';
    zoomResultRef.value.style.backgroundColor = color;
    zoomLensRef.value.style.backgroundImage = '';
    zoomLensRef.value.style.backgroundColor = color;
  }
  zoomLensRef.value.style.opacity = '1';
  zoomResultRef.value.style.opacity = '1';
}

function onMainMouseLeave() {
  isHovering = false;
  if (mainAreaRef.value) mainAreaRef.value.style.cursor = '';
  if (zoomLensRef.value) zoomLensRef.value.style.opacity = '0';
  if (zoomResultRef.value) zoomResultRef.value.style.opacity = '0';
}

function onMainMouseMove(e: MouseEvent) {
  if (!isHovering || !mainAreaRef.value || !zoomLensRef.value || !zoomResultRef.value) return;
  const rect = mainAreaRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const lensW = zoomLensRef.value.offsetWidth;
  const lensH = zoomLensRef.value.offsetHeight;
  zoomLensRef.value.style.left = `${x - lensW / 2}px`;
  zoomLensRef.value.style.top = `${y - lensH / 2}px`;

  if (currentIsImage.value && props.image) {
    const pctX = x / rect.width;
    const pctY = y / rect.height;
    const lensZoom = 1.5;
    zoomLensRef.value.style.backgroundPosition = `${-x * lensZoom + lensW / 2}px ${-y * lensZoom + lensH / 2}px`;
    const rW = zoomResultRef.value.offsetWidth;
    const rH = zoomResultRef.value.offsetHeight;
    zoomResultRef.value.style.backgroundPosition = `${-pctX * mainAreaRef.value.offsetWidth * ZOOM_FACTOR + rW / 2}px ${-pctY * mainAreaRef.value.offsetHeight * ZOOM_FACTOR + rH / 2}px`;
  }
}

// Video
function playVideo() {
  if (!props.video) return;
  const match = props.video.match(/(?:v=|\/embed\/|\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (!match) return;
  currentIsImage.value = false;
  activeThumbIndex.value = -1;
}

// Lightbox
function openLightbox(startIndex: number) {
  lightboxIndex.value = startIndex >= 0 ? startIndex : 0;
  lightboxZoomed.value = false;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxOpen.value = false;
  lightboxZoomed.value = false;
  document.body.style.overflow = '';
}

function lightboxPrev() {
  lightboxIndex.value = (lightboxIndex.value - 1 + 4) % 4;
  lightboxZoomed.value = false;
}

function lightboxNext() {
  lightboxIndex.value = (lightboxIndex.value + 1) % 4;
  lightboxZoomed.value = false;
}

function toggleLightboxZoom(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.closest('button')) return;
  if (!lightboxZoomed.value) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const pctX = (e.clientX - rect.left) / rect.width;
    const pctY = (e.clientY - rect.top) / rect.height;
    lightboxOrigin.value = `${pctX * 100}% ${pctY * 100}%`;
    lightboxZoomed.value = true;
  } else {
    lightboxZoomed.value = false;
  }
}

function onLightboxMouseMove(e: MouseEvent) {
  if (!lightboxZoomed.value) return;
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const pctX = (e.clientX - rect.left) / rect.width;
  const pctY = (e.clientY - rect.top) / rect.height;
  lightboxOrigin.value = `${pctX * 100}% ${pctY * 100}%`;
}

// Keyboard
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (!lightboxOpen.value) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') lightboxPrev();
    else if (e.key === 'ArrowRight') lightboxNext();
  };
  document.addEventListener('keydown', handler);
  onUnmounted(() => document.removeEventListener('keydown', handler));
});
</script>
