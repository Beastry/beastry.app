import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Stow page keeps the direct DMG and the latest-release refresh', () => {
  const html = read('public/stow/index.html');
  const pinned = 'https://github.com/Beastry/stow/releases/download/v0.1.10/Stow-0.1.10.dmg';
  assert.equal(html.split(pinned).length - 1, 2);
  assert.match(html, /fetch\('https:\/\/api\.github\.com\/repos\/Beastry\/stow\/releases\/latest'\)/);
  assert.match(html, /const filename = `Stow-\$\{tag\.slice\(1\)\}\.dmg`;/);
  assert.match(html, /asset\.state === 'uploaded'/);
  assert.match(html, /The existing links remain usable/);
  assert.doesNotMatch(html, /docs\/roadmap\.html/);
  assert.doesNotMatch(html, /docs\/readme\.html/);
  assert.match(html, /class="nav-fold"/);
});

test('MijiaBar pages keep the merged org repo, GPL label, and phone menu', () => {
  for (const path of ['public/mijiabar/index.html', 'public/mijiabar/zh-CN.html']) {
    const html = read(path);
    assert.match(html, /https:\/\/github\.com\/Beastry\/MijiaBar/);
    assert.match(html, /GPL-3\.0-only/);
    assert.doesNotMatch(html, /github\.com\/neardws\/MijiaBar/);
    assert.match(html, /class="nav-fold"/);
    assert.doesNotMatch(html, /href=""/);
    assert.doesNotMatch(html, /href="#"/);
  }
});

test('Octoshot download fallback and phone menu stay in place', () => {
  const html = read('public/octoshot/zh/index.html');
  assert.match(html, /data-fallback="https:\/\/github\.com\/Beastry\/Octoshot\/releases\/latest"/);
  assert.match(html, /\.catch\(\(\)=>\{e\.href=t\}\)/);
  assert.match(html, /class="beastry-nav-mobile"/);
  assert.match(html, /href="\/octoshot\/zh\/#features"/);
  assert.match(html, /href="\/octoshot\/nav-mobile\.css"/);
  const docs = read('public/octoshot/zh/docs/getting-started/index.html');
  assert.match(docs, /href="\/octoshot\/zh\/#faq"/);
  assert.doesNotMatch(docs, /href="#faq"/);
});

test('mother-site navigation has real destinations in both languages', () => {
  const header = read('src/components/Header.astro');
  const data = read('src/data/site.ts');
  for (const href of ['/', '/projects', '/help', '/community', '/about', '/#contact']) {
    assert.match(data, new RegExp(`href: '${href.replace('/', '\\/')}'`));
  }
  assert.match(header, /data-lang-set="zh"/);
  assert.match(header, /data-lang-set="en"/);
  assert.match(header, /data-lang-set="both"/);
  assert.doesNotMatch(header, /href=""/);
  assert.doesNotMatch(header, /href="#"/);
  assert.match(read('src/pages/help.astro'), /bugUrl/);
  assert.match(read('src/pages/help.astro'), /suggestUrl/);
  assert.match(read('src/pages/community.astro'), /ideaIssue/);
});

test('pinned downloads and logo files are the sourced ones', () => {
  const data = read('src/data/site.ts');
  assert.match(data, /Stow-0\.1\.11\.dmg/);
  assert.match(data, /MijiaBar-0\.1\.16\.dmg/);
  assert.match(data, /Octoshot-v0\.3\.3-macOS\.dmg/);
  assert.match(data, /\/stow\/favicon\.svg/);
  assert.match(data, /\/mijiabar\/assets\/icon\.png/);
  assert.match(data, /\/octoshot\/brand\/logo\.svg/);
  assert.match(read('src/pages/index.astro'), /\/brand\/logo-lockup\.jpg/);
  assert.doesNotMatch(read('src/pages/index.astro'), /mascots-row\.jpg/);
  assert.match(read('docs/asset-sources.md'), /list-light\.webp/);
  assert.equal(read('public/media/mijiabar-list-light.webp').slice(0, 4), 'RIFF');
});

test('pages do not invent download counts or a forum', () => {
  const blob = [
    'src/pages/index.astro',
    'src/pages/projects.astro',
    'src/pages/help.astro',
    'src/pages/community.astro',
    'src/data/site.ts',
  ]
    .map(read)
    .join('\n');
  assert.doesNotMatch(blob, /下载量|download count|★★|5 星|安全承诺/i);
  assert.match(blob, /没有账号/);
  assert.match(blob, /没有论坛|no forum/i);
});
