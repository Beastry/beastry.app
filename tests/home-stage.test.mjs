import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage is the approved welcome and a manual product stage', () => {
  const page = read('src/pages/index.astro');
  const stage = read('src/components/ProductStage.astro');
  const css = read('src/styles/global.css');
  assert.match(page, /先用起来/);
  assert.match(page, /也欢迎留下来/);
  assert.match(page, /Use them now/);
  assert.match(page, /\/brand\/mark\.jpg/);
  assert.match(page, /href="#downloads"/);
  assert.match(page, /href="\/community"/);
  assert.match(page, /ideaIssue/);
  assert.match(page, /不用在本站注册账号/);
  assert.doesNotMatch(page, /待确认|proposal pending/i);
  assert.doesNotMatch(stage, /待确认|proposal pending|setInterval|autoplay/i);
  assert.match(stage, /data-stage/);
  assert.match(stage, /aria-live="polite"/);
  assert.match(stage, /setAttribute\('inert'/);
  assert.match(stage, /prefers-reduced-motion/);
  assert.match(stage, /touch-action: pan-y|pointerdown/);
  assert.match(stage, /stopPropagation/);
  assert.match(css, /touch-action:\s*pan-y/);
  assert.match(css, /prefers-reduced-motion[\s\S]*\.stage-track/);
  for (const file of ['/media/stow-squirrel.png', '/media/mijiabar-swallow.png', '/media/octoshot-yijiang.png']) {
    assert.match(stage, new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  const data = read('src/data/site.ts');
  for (const file of [
    '/stow/assets/grid-light.webp',
    '/media/mijiabar-list-light.webp',
    '/octoshot/screenshots/zh/hero-web.webp',
    'Stow-0.1.11.dmg',
    'MijiaBar-0.1.16.dmg',
    'Octoshot-v0.3.3-macOS.dmg',
  ]) {
    assert.match(data, new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(stage, /product\.shot/);
  assert.match(stage, /file\.href/);
  assert.match(stage, /data-pinned=/);
  assert.match(stage, /data-release/);
  assert.match(read('docs/asset-sources.md'), /this website only/);
  assert.match(read('docs/asset-sources.md'), /stow-squirrel\.png/);
  for (const file of ['stow-squirrel.png', 'mijiabar-swallow.png', 'octoshot-yijiang.png']) {
    const bytes = readFileSync(new URL(`../public/media/${file}`, import.meta.url));
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
  }
});

test('old routes stay available when the nav labels change', () => {
  for (const path of [
    'src/pages/projects.astro',
    'src/pages/help.astro',
    'src/pages/community.astro',
    'src/pages/about.astro',
    'src/pages/agents.astro',
    'public/llms.txt',
  ]) {
    assert.equal(typeof read(path), 'string');
  }
  const projects = read('src/pages/projects.astro');
  assert.match(projects, /products\.map/);
  assert.match(projects, /statusMeta/);
  assert.match(projects, /DownloadList/);
  assert.match(read('src/pages/community.astro'), /loadCommunity|idea-board/);
  assert.doesNotMatch(read('src/components/Header.astro'), /href="\/agents"/);
});
