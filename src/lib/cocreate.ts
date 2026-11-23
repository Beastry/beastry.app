/** Read-only shaping of public GitHub responses. Nothing here is stored on the site. */

export type Lang = 'zh' | 'en';

export interface GhUser {
  login?: string;
  html_url?: string;
}

export interface GhIssue {
  number?: number;
  title?: string;
  html_url?: string;
  comments?: number;
  user?: GhUser | null;
  labels?: Array<{ name?: string } | string>;
  assignees?: GhUser[];
  reactions?: { '+1'?: number };
  pull_request?: unknown;
  repository_url?: string;
}

export type ListResult =
  | { status: 'ready'; items: GhIssue[]; truncated: boolean }
  | { status: 'empty' }
  | { status: 'unavailable' };

export type SearchResult =
  | { status: 'ready'; total: number; items: GhIssue[] }
  | { status: 'empty' }
  | { status: 'unavailable' };

export interface BoardState {
  ideas: ListResult;
  tasks: SearchResult;
  pulls: SearchResult;
}

export const ideasUrl =
  'https://api.github.com/repos/Beastry/ideas/issues?state=open&per_page=30';
export const helpWantedUrl =
  'https://api.github.com/search/issues?q=org%3ABeastry%20is%3Aissue%20is%3Aopen%20label%3A%22help%20wanted%22&per_page=20';
export const goodFirstUrl =
  'https://api.github.com/search/issues?q=org%3ABeastry%20is%3Aissue%20is%3Aopen%20label%3A%22good%20first%20issue%22&per_page=20';
export const mergedPullsUrl =
  'https://api.github.com/search/issues?q=org%3ABeastry%20is%3Apr%20is%3Amerged&sort=updated&order=desc&per_page=8';

const headers = { Accept: 'application/vnd.github+json' };

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function isPull(item: GhIssue): boolean {
  return Boolean(item.pull_request);
}

export function labelNames(issue: GhIssue): string[] {
  return (issue.labels ?? [])
    .map((label) => (typeof label === 'string' ? label : label.name || ''))
    .filter((name) => name.length > 0);
}

export function plusOne(issue: GhIssue): number {
  const count = issue.reactions?.['+1'];
  return typeof count === 'number' && Number.isFinite(count) && count >= 0 ? count : 0;
}

function githubHref(value: string | undefined, fallback: string): string {
  if (value && value.startsWith('https://github.com/Beastry/')) return value;
  return fallback;
}

function userHtml(user: GhUser | null | undefined, lang: Lang): string {
  const login = user?.login?.trim();
  if (!login) return lang === 'en' ? '(no login in the response)' : '（接口没有给出登录名）';
  const href =
    user?.html_url && user.html_url.startsWith('https://github.com/')
      ? user.html_url
      : `https://github.com/${encodeURIComponent(login)}`;
  return `<a href="${escapeHtml(href)}" rel="noreferrer">${escapeHtml(login)}</a>`;
}

function repoName(issue: GhIssue): string {
  const url = issue.repository_url || '';
  const parts = url.split('/');
  const name = parts.at(-1) || '';
  return name || 'Beastry';
}

function text(lang: Lang, zh: string, en: string): string {
  return lang === 'en' ? en : zh;
}

export function renderIssueCard(issue: GhIssue, lang: Lang, kind: 'idea' | 'task' | 'pull'): string {
  const fallback =
    kind === 'pull' ? 'https://github.com/Beastry' : 'https://github.com/Beastry/ideas/issues';
  const href = githubHref(issue.html_url, fallback);
  const title = issue.title?.trim() || text(lang, '未命名条目', 'Untitled item');
  const labels = labelNames(issue)
    .map((name) => `<li>${escapeHtml(name)}</li>`)
    .join('');
  const assignees = (issue.assignees ?? []).map((person) => person.login?.trim() || '').filter(Boolean);
  const assignee =
    assignees.length > 0
      ? assignees.map((login) => escapeHtml(login)).join(', ')
      : text(lang, '没有指派', 'No assignee');
  const interest =
    kind === 'pull'
      ? ''
      : `<p class="board-meta">${text(lang, 'GitHub 上的 +1', 'GitHub +1')}: ${plusOne(issue)}. ${text(
          lang,
          '这只表示兴趣，不改变优先级。',
          'This signals interest. It does not set priority.',
        )}</p>`;
  const actions =
    kind === 'pull'
      ? `<a href="${escapeHtml(href)}" rel="noreferrer">${text(lang, '在 GitHub 上打开', 'Open on GitHub')}</a>`
      : `<a href="${escapeHtml(href)}" rel="noreferrer">${text(lang, '在 GitHub 上打开', 'Open on GitHub')}</a>
         · <a href="${escapeHtml(href)}" rel="noreferrer">${text(lang, '在 GitHub 上 +1', '+1 on GitHub')}</a>
         · <a href="${escapeHtml(href)}" rel="noreferrer">${text(lang, '在 GitHub 上留言', 'Comment on GitHub')}</a>`;
  const repo = kind === 'idea' ? '' : `<p class="board-meta">${escapeHtml(repoName(issue))}</p>`;
  return `<article class="board-card">
    <h3><a href="${escapeHtml(href)}" rel="noreferrer">${escapeHtml(title)}</a></h3>
    ${repo}
    <p class="board-meta">${text(lang, 'GitHub 账号', 'GitHub account')} ${userHtml(issue.user, lang)}</p>
    ${interest}
    <p class="board-meta">${text(lang, '评论', 'Comments')}: ${Number(issue.comments) || 0}. ${text(lang, '指派', 'Assignee')}: ${assignee}</p>
    ${labels ? `<ul class="board-labels">${labels}</ul>` : ''}
    <p class="board-actions">${actions}</p>
    ${
      kind === 'pull'
        ? ''
        : `<p class="board-note">${text(
            lang,
            '表态和留言发生在 GitHub，使用你自己的账号。本站不保存，也没有认领名单。',
            'The reaction and the comment happen on GitHub, with your own account. This site does not store them and has no claim list.',
          )}</p>`
    }
  </article>`;
}

function unavailable(lang: Lang): string {
  return `<p>${text(
    lang,
    '现在读不到 GitHub。可能是访问次数到了上限。下面的链接仍然打开 GitHub 上的记录。',
    'GitHub could not be read just now. The request limit may be used up. The links below still open the record on GitHub.',
  )}</p>`;
}

export function renderIdeas(result: ListResult, lang: Lang): string {
  if (result.status === 'unavailable') return unavailable(lang);
  if (result.status === 'empty') {
    return `<p>${text(
      lang,
      'Beastry/ideas 目前没有打开的 Issue。',
      'Beastry/ideas has no open issues right now.',
    )}</p>`;
  }
  const cards = result.items.map((issue) => renderIssueCard(issue, lang, 'idea')).join('');
  const more = result.truncated
    ? `<p>${text(
        lang,
        '这里最多显示接口返回的 30 条。其余在 GitHub 上。',
        'This shows at most the 30 items returned by the API. The rest are on GitHub.',
      )}</p>`
    : '';
  return `<div class="board">${cards}</div>${more}`;
}

export function renderTasks(result: SearchResult, lang: Lang): string {
  if (result.status === 'unavailable') return unavailable(lang);
  if (result.status === 'empty') {
    return `<p>${text(
      lang,
      '现在没有打开的 Issue 带有 help wanted 或 good first issue。本站不另编一份任务清单。',
      'No open issue currently carries help wanted or good first issue. This site does not keep a separate task list.',
    )}</p>`;
  }
  const cards = result.items.map((issue) => renderIssueCard(issue, lang, 'task')).join('');
  return `<p>${text(
    lang,
    `GitHub 搜索到 ${result.total} 条。这里显示本次返回的条目。`,
    `GitHub search reported ${result.total}. The items returned this time are below.`,
  )}</p><div class="board">${cards}</div>`;
}

export function renderPulls(result: SearchResult, lang: Lang): string {
  if (result.status === 'unavailable') return unavailable(lang);
  if (result.status === 'empty') {
    return `<p>${text(
      lang,
      'GitHub 搜索没有返回已合并的 Pull Request。',
      'GitHub search returned no merged pull requests.',
    )}</p>`;
  }
  const cards = result.items.map((issue) => renderIssueCard(issue, lang, 'pull')).join('');
  return `<p>${text(
    lang,
    `搜索报告有 ${result.total} 个已合并的 Pull Request。下面是最近更新的 ${result.items.length} 个。合并不表示它已成为正式品牌资产。`,
    `Search reported ${result.total} merged pull requests. The ${result.items.length} most recently updated are below. A merge is not adoption as an official brand asset.`,
  )}</p><div class="board">${cards}</div>`;
}

function ideasFromPayload(payload: unknown): ListResult {
  if (!Array.isArray(payload)) return { status: 'unavailable' };
  const items = payload.filter((item): item is GhIssue => Boolean(item) && typeof item === 'object' && !isPull(item));
  if (items.length === 0) return { status: 'empty' };
  return { status: 'ready', items, truncated: payload.length >= 30 };
}

function searchFromPayload(payload: unknown): SearchResult {
  if (!payload || typeof payload !== 'object') return { status: 'unavailable' };
  const record = payload as { items?: unknown; total_count?: unknown; message?: unknown };
  if (!Array.isArray(record.items) || typeof record.total_count !== 'number') return { status: 'unavailable' };
  const items = record.items.filter((item): item is GhIssue => Boolean(item) && typeof item === 'object');
  if (record.total_count === 0 || items.length === 0) return { status: 'empty' };
  return { status: 'ready', total: record.total_count, items };
}

async function readJson(response: Response): Promise<unknown> {
  if (!response.ok) return null;
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function loadCommunity(fetchImpl: typeof fetch): Promise<BoardState> {
  const [ideasResponse, helpResponse, goodResponse, pullsResponse] = await Promise.all([
    fetchImpl(ideasUrl, { headers }),
    fetchImpl(helpWantedUrl, { headers }),
    fetchImpl(goodFirstUrl, { headers }),
    fetchImpl(mergedPullsUrl, { headers }),
  ]);
  const [ideasPayload, helpPayload, goodPayload, pullsPayload] = await Promise.all([
    readJson(ideasResponse),
    readJson(helpResponse),
    readJson(goodResponse),
    readJson(pullsResponse),
  ]);
  const help = searchFromPayload(helpPayload);
  const good = searchFromPayload(goodPayload);
  let tasks: SearchResult;
  if (help.status === 'unavailable' || good.status === 'unavailable') tasks = { status: 'unavailable' };
  else if (help.status === 'empty' && good.status === 'empty') tasks = { status: 'empty' };
  else {
    const items = [
      ...(help.status === 'ready' ? help.items : []),
      ...(good.status === 'ready' ? good.items : []),
    ];
    const seen = new Set<string>();
    const unique = items.filter((issue) => {
      const key = issue.html_url || `${issue.number}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    const total = (help.status === 'ready' ? help.total : 0) + (good.status === 'ready' ? good.total : 0);
    tasks = unique.length === 0 ? { status: 'empty' } : { status: 'ready', total, items: unique };
  }
  return {
    ideas: ideasFromPayload(ideasPayload),
    tasks,
    pulls: searchFromPayload(pullsPayload),
  };
}
