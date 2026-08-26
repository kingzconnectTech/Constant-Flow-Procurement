import { copyFileSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = process.cwd();
const srcLogo = resolve(root, 'src', 'assets', 'logo.png');
const publicDir = resolve(root, 'public');

if (existsSync(srcLogo)) {
  copyFileSync(srcLogo, join(publicDir, 'logo.png'));
  copyFileSync(srcLogo, join(publicDir, 'og-image.png'));
  console.log('Successfully copied logo.png and og-image.png to /public');
} else {
  console.error('Source logo.png not found in src/assets');
}

const logoSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300" role="img" aria-label="Constantflow Procurement logo">
  <defs>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E40AF"/>
      <stop offset="100%" stop-color="#3B82F6"/>
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="50%" stop-color="#FBBF24"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#070B14" rx="24"/>
  <!-- LEFT HEXAGON -->
  <path d="M95 75 L165 35 L235 75 L235 155 L165 195 L95 155 Z" fill="url(#blueGrad)" fill-opacity="0.18" stroke="url(#blueGrad)" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"/>
  <!-- RIGHT HEXAGON -->
  <path d="M175 95 L245 55 L315 95 L315 175 L245 215 L175 175 Z" fill="url(#orangeGrad)" fill-opacity="0.18" stroke="url(#orangeGrad)" stroke-width="13" stroke-linejoin="round" stroke-linecap="round"/>
  <!-- FLOW WAVE -->
  <path d="M140 135 C165 118, 185 118, 205 135 S245 152, 270 135" fill="none" stroke="url(#flowGrad)" stroke-width="12" stroke-linecap="round"/>
</svg>`;

writeFileSync(join(publicDir, 'logo.svg'), logoSvgContent, 'utf8');
console.log('Successfully generated /public/logo.svg');
