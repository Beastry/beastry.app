import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import {
  loadCommunity,
  plusOne,
  renderIdeas,
  renderIssueCard,
  renderPulls,
  renderTasks,
} from '../src/lib/cocreate.ts';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('idea cards use the GitHub payload and escape text', () => {
  const html = renderIssueCard(
    {
      title: '<script>alert(1)</script>',
      html_url: 'https://github.com/Beastry/ideas/issues/1',
      comments: 0,
      user: { login: 'neardws', html_url: 'https://github.com/neardws' },
      labels: [{ name: '构思' }],
      reactions: { '+1': 0 },
      assignees: [],
    },
    'zh',
    'idea',
  );
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /https:\/\/github.com\/Beastry\/ideas\/issues\/1/);
  assert.match(html, /neardws/);
  assert.match(html, /GitHub 上的 \+1: 0/);
  assert.match(html, /不改变优先级/);
  assert.match(html, /没有指派/);
  assert.equal(plusOne({}), 0);
});

test('empty and failed GitHub reads are not example cards', () => {
  assert.match(renderIdeas({ status: 'empty' }, 'en'), /no open issues/i);
  assert.match(renderIdeas({ status: 'unavailable' }, 'zh'), /读不到 GitHub/);
  assert.match(renderTasks({ status: 'empty' }, 'zh'), /不另编一份任务清单/);
  assert.match(renderPulls({ status: 'empty' }, 'en'), /no merged pull requests/i);
  assert.doesNotMatch(renderIdeas({ status: 'empty' }, 'zh'), /剪贴板|PDF/);
});

test('loader keeps issues, labeled tasks, and merged pull requests apart', async () => {
  const routes = new Map([
    [
      'ideas',
      [
        { title: 'Real idea', html_url: 'https://github.com/Beastry/ideas/issues/9', pull_request: undefined },
        { title: 'Not an idea', html_url: 'https://github.com/Beastry/ideas/pull/3', pull_request: { url: 'x' } },
      ],
    ],
    ['help', { total_count: 0, items: [] }],
    ['good', { total_count: 1, items: [{ title: 'Labeled task', html_url: 'https://github.com/Beastry/stow/issues/4' }] }],
    ['pulls', { total_count: 2, items: [{ title: 'Merged work', html_url: 'https://github.com/Beastry/stow/pull/8', repository_url: 'https://api.github.com/repos/Beastry/stow' }] }],
  ]);
  const fetchImpl = async (url) => ({
    ok: true,
    json: async () => {
      const href = String(url);
      if (href.includes('/repos/Beastry/ideas/issues')) return routes.get('ideas');
      if (href.includes('help%20wanted')) return routes.get('help');
      if (href.includes('good%20first%20issue')) return routes.get('good');
      return routes.get('pulls');
    },
  });
  const state = await loadCommunity(fetchImpl);
  assert.equal(state.ideas.status, 'ready');
  assert.equal(state.ideas.items.length, 1);
  assert.equal(state.ideas.items[0].title, 'Real idea');
  assert.equal(state.tasks.status, 'ready');
  assert.equal(state.tasks.items[0].title, 'Labeled task');
  assert.equal(state.pulls.status, 'ready');
  assert.match(renderPulls(state.pulls, 'zh'), /不是正式品牌资产|不表示它已成为正式品牌资产/);
  assert.match(renderIssueCard(state.pulls.items[0], 'en', 'pull'), /stow/);
});

test('a failed labeled-task search is unavailable, not an empty task list', async () => {
  const fetchImpl = async (url) => {
    const href = String(url);
    if (href.includes('help%20wanted')) return { ok: false, json: async () => ({}) };
    if (href.includes('/repos/')) return { ok: true, json: async () => [] };
    return { ok: true, json: async () => ({ total_count: 0, items: [] }) };
  };
  const state = await loadCommunity(fetchImpl);
  assert.equal(state.ideas.status, 'empty');
  assert.equal(state.tasks.status, 'unavailable');
  assert.match(renderTasks(state.tasks, 'en'), /could not be read/i);
  assert.doesNotMatch(renderTasks(state.tasks, 'en'), /No open issue currently/);
});

test('the community page does not store votes or ship sample issues', () => {
  const page = read('src/pages/community.astro');
  const lib = read('src/lib/cocreate.ts');
  assert.match(page, /ideaIssue/);
  assert.match(page, /title=%5BStory%5D%20/);
  assert.match(page, /04-fable-beasts\.md/);
  assert.match(page, /href="\/agents"/);
  assert.doesNotMatch(page, /剪贴板|PDF 管理/);
  assert.doesNotMatch(`${page}\n${lib}`, /localStorage/);
  assert.doesNotMatch(page, /data-lang-set="both"|中英/);
});
