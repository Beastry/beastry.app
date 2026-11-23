export type MarkName =
  | 'octopus'
  | 'cat'
  | 'mouse'
  | 'fox'
  | 'chameleon'
  | 'bee'
  | 'squirrel';

/** Product maturity on the mother-brand site. */
export type ProductStatus = 'beta' | 'developing' | 'onhold';

export const statusMeta: Record<
  ProductStatus,
  { zh: string; en: string; order: number }
> = {
  beta: { zh: '公测', en: 'Beta', order: 0 },
  developing: { zh: '开发中', en: 'In development', order: 1 },
  onhold: { zh: '搁置', en: 'On hold', order: 2 },
};

/** Versions below were read from GitHub on this date. Buttons can refresh later. */
export const sourcesChecked = '2026-11-23';

export interface ProductLogo {
  src: string;
  altZh: string;
  altEn: string;
  /** Where the file was taken from. */
  source: string;
}

export interface ProductShot {
  src: string;
  width: number;
  height: number;
  altZh: string;
  altEn: string;
  source: string;
  noteZh?: string;
  noteEn?: string;
}

export type ReleasePattern = 'stow' | 'mijiabar' | 'octoshot';

export interface ProductDownload {
  version: string;
  published: string;
  assetName: string;
  href: string;
  repo: string;
  pattern: ReleasePattern;
  requirementsZh: string;
  requirementsEn: string;
  installZh: string;
  installEn: string;
  releaseUrl: string;
  sourceNoteZh: string;
  sourceNoteEn: string;
}

export interface SourcedLink {
  href: string;
  zh: string;
  en: string;
}

export interface Product {
  slug: string;
  name: string;
  aka?: string;
  mark: MarkName;
  /** What the old placeholder drawing depicted. Not shown when a real logo exists. */
  markLabel: string;
  status: ProductStatus;
  summaryZh: string;
  summaryEn: string;
  detailZh: string;
  detailEn: string;
  /** Primary card link: product site when migrated, else GitHub. */
  href: string;
  github: string;
  platform: string;
  /** Short factual caveat shown on the card. */
  noteZh?: string;
  noteEn?: string;
  wash: string;
  washDark: string;
  logo?: ProductLogo;
  shot?: ProductShot;
  download?: ProductDownload;
  /** Prefilled GitHub issue for a defect. Separate from suggestions. */
  bugUrl: string;
  /** Prefilled GitHub issue for a suggestion. Not a new-product idea. */
  suggestUrl: string;
  extraLinks?: SourcedLink[];
}

function issueLinks(repo: string): Pick<Product, 'bugUrl' | 'suggestUrl'> {
  const base = `https://github.com/${repo}/issues/new`;
  return {
    bugUrl: `${base}?title=Bug%3A%20`,
    suggestUrl: `${base}?title=Suggestion%3A%20`,
  };
}

export const site = {
  name: 'Beastry',
  url: 'https://beastry.app',
  github: 'https://github.com/Beastry',
  ideas: 'https://github.com/Beastry/ideas',
  ideaIssue: 'https://github.com/Beastry/ideas/issues/new?template=idea.yml',
  x: {
    handle: '@beastryapp',
    href: 'https://x.com/beastryapp',
  },
  emails: [
    {
      address: 'hello@beastry.app',
      labelZh: '一般事宜',
      labelEn: 'General',
    },
    {
      address: 'community@beastry.app',
      labelZh: '社区',
      labelEn: 'Community',
    },
    {
      address: 'security@beastry.app',
      labelZh: '安全',
      labelEn: 'Security',
    },
  ],
} as const;

export const navLinks = [
  { href: '/projects', zh: '作品', en: 'Works' },
  { href: '/#downloads', zh: '下载', en: 'Download' },
  { href: '/community', zh: '参与', en: 'Take part' },
  { href: '/about', zh: '关于', en: 'About' },
] as const;

export const products: Product[] = [
  {
    slug: 'stow',
    name: 'Stow',
    mark: 'squirrel',
    markLabel: '松鼠',
    status: 'beta',
    summaryZh: '原生 macOS 压缩包工具。',
    summaryEn: 'A native macOS archive tool.',
    detailZh:
      '浏览、预览、解压并打包多种压缩格式。免费开源，安装与 Finder 集成接在真实引擎上。',
    detailEn:
      'Browse, preview, extract, and pack many archive formats. Free and open source, on a real archive engine.',
    href: '/stow/',
    github: 'https://github.com/Beastry/stow',
    platform: 'macOS',
    wash: '#FFD6C7',
    washDark: '#2C261C',
    logo: {
      src: '/stow/favicon.svg',
      altZh: 'Stow 应用图标',
      altEn: 'Stow app icon',
      source: 'https://github.com/Beastry/stow/blob/main/website/favicon.svg',
    },
    shot: {
      src: '/stow/assets/grid-light.webp',
      width: 2224,
      height: 1438,
      altZh: 'Stow 浏览压缩包中的照片文件夹',
      altEn: 'Stow browsing a photos folder inside an archive',
      source: 'https://github.com/Beastry/stow/blob/main/website/assets/grid-light.webp',
    },
    download: {
      version: 'v0.1.11',
      published: '2026-11-22',
      assetName: 'Stow-0.1.11.dmg',
      href: 'https://github.com/Beastry/stow/releases/download/v0.1.11/Stow-0.1.11.dmg',
      repo: 'Beastry/stow',
      pattern: 'stow',
      requirementsZh: 'macOS 26 或更高。Apple 芯片和 Intel 都可以。',
      requirementsEn: 'macOS 26 or later. Apple silicon and Intel.',
      installZh:
        '下载 DMG，把 Stow 拖进“应用程序”。也可以用 Homebrew：brew install --cask beastry/tap/stow。',
      installEn:
        'Download the DMG and drag Stow to Applications. Or: brew install --cask beastry/tap/stow.',
      releaseUrl: 'https://github.com/Beastry/stow/releases/tag/v0.1.11',
      sourceNoteZh:
        '版本与日期来自 GitHub Release v0.1.11（2026-11-22 发布）。系统要求与安装步骤来自仓库 README；Homebrew cask 在同日为 0.1.11，且 depends_on macos: tahoe。',
      sourceNoteEn:
        'Version and date are GitHub release v0.1.11 (published 2026-11-22). Requirements and install steps are from the repo README. The Homebrew cask was 0.1.11 that day and depends on macOS Tahoe.',
    },
    ...issueLinks('Beastry/stow'),
    extraLinks: [
      {
        href: 'https://github.com/Beastry/stow/blob/main/ROADMAP.md',
        zh: '路线图',
        en: 'Roadmap',
      },
      {
        href: 'https://github.com/Beastry/stow/blob/main/DEVELOPING.md',
        zh: '从源码构建',
        en: 'Build from source',
      },
    ],
  },
  {
    slug: 'mijiabar',
    name: 'MijiaBar',
    mark: 'cat',
    markLabel: '猫',
    status: 'beta',
    summaryZh: '米家设备的 macOS 菜单栏。',
    summaryEn: 'Mi Home menu bar for macOS.',
    detailZh:
      '在菜单栏查看和控制米家设备，也可以通过命令行和 MCP 交给 Agent。扫码登录，凭据留在系统钥匙串。',
    detailEn:
      'See and control Mi Home devices from the menu bar, or hand them to an agent through the CLI and MCP. Sign-in is a QR code; credentials stay in the Keychain.',
    href: '/mijiabar/',
    github: 'https://github.com/Beastry/MijiaBar',
    platform: 'macOS',
    noteZh: '非官方，与小米公司无关。',
    noteEn: 'Unofficial. Not affiliated with Xiaomi.',
    wash: '#FFD6C7',
    washDark: '#3A261C',
    logo: {
      src: '/mijiabar/assets/icon.png',
      altZh: 'MijiaBar 应用图标',
      altEn: 'MijiaBar app icon',
      source: 'https://github.com/Beastry/beastry.app/blob/main/public/mijiabar/assets/icon.png',
    },
    shot: {
      src: '/media/mijiabar-list-light.webp',
      width: 720,
      height: 1120,
      altZh: 'MijiaBar 浅色设备列表',
      altEn: 'MijiaBar device list in light mode',
      source: 'https://files.neardws.com/mijiabar/readme/list-light.webp',
    },
    download: {
      version: 'v0.1.16',
      published: '2026-11-11',
      assetName: 'MijiaBar-0.1.16.dmg',
      href: 'https://github.com/Beastry/MijiaBar/releases/download/v0.1.16/MijiaBar-0.1.16.dmg',
      repo: 'Beastry/MijiaBar',
      pattern: 'mijiabar',
      requirementsZh: 'macOS 14 或更高。Apple 芯片和 Intel 都可以。',
      requirementsEn: 'macOS 14 or later. Apple silicon and Intel.',
      installZh:
        '下载 DMG，把 MijiaBar 拖进“应用程序”再打开。第一次控制设备时允许“本地网络”。',
      installEn:
        'Download the DMG, drag MijiaBar to Applications, and open it. Allow Local Network the first time you control a device.',
      releaseUrl: 'https://github.com/Beastry/MijiaBar/releases/tag/v0.1.16',
      sourceNoteZh:
        '版本与日期来自 GitHub Release v0.1.16（2026-11-11 发布）。系统要求与安装步骤来自 Beastry/MijiaBar README。',
      sourceNoteEn:
        'Version and date are GitHub release v0.1.16 (published 2026-11-11). Requirements and install steps are from the Beastry/MijiaBar README.',
    },
    ...issueLinks('Beastry/MijiaBar'),
    extraLinks: [
      {
        href: 'https://github.com/Beastry/MijiaBar/blob/main/docs/AGENT_SETUP.zh-CN.md',
        zh: 'Agent 安装说明',
        en: 'Agent setup',
      },
    ],
  },
  {
    slug: 'octoshot',
    name: 'Octoshot',
    aka: '一酱',
    mark: 'octopus',
    markLabel: '章鱼',
    status: 'beta',
    summaryZh: '八只手，一次截完。',
    summaryEn: 'macOS screenshot with on-device AI.',
    detailZh:
      'macOS 原生截图：区域、窗口、全屏、滚动拼接和录屏，智能处理留在本机。菜单栏常驻。正式发布版面向 Apple Silicon。',
    detailEn:
      'A native macOS capture tool. Region, window, fullscreen, scrolling capture, and recording, with on-device AI. The release build targets Apple Silicon.',
    href: '/octoshot/',
    github: 'https://github.com/Beastry/Octoshot',
    platform: 'macOS',
    wash: '#D6ECE7',
    washDark: '#1A3530',
    logo: {
      src: '/octoshot/brand/logo.svg',
      altZh: '一酱，Octoshot 的红章鱼标志',
      altEn: '一酱, the Octoshot red-octopus mark',
      source: 'https://github.com/Beastry/Octoshot/blob/main/website/public/brand/logo.svg',
    },
    shot: {
      src: '/octoshot/screenshots/zh/hero-web.webp',
      width: 1440,
      height: 900,
      altZh: 'Octoshot 官网的捕获界面画面',
      altEn: 'Capture scene from the Octoshot site',
      source: 'https://github.com/Beastry/Octoshot/blob/main/website/public/screenshots/zh/hero-web.webp',
      noteZh: '官网写明这些画面是按界面生成的，不是手截的屏幕照片。',
      noteEn: 'The product site says these scenes are generated from the UI, not hand-captured screenshots.',
    },
    download: {
      version: 'v0.3.3',
      published: '2026-11-14',
      assetName: 'Octoshot-v0.3.3-macOS.dmg',
      href: 'https://github.com/Beastry/Octoshot/releases/download/v0.3.3/Octoshot-v0.3.3-macOS.dmg',
      repo: 'Beastry/Octoshot',
      pattern: 'octoshot',
      requirementsZh:
        '官网写需要 macOS 14 或更高，捕获要允许屏幕录制。README 写正式发布版只支持 Apple 芯片；Intel Mac 请留在旧版。旧版的版本号仓库没有写出。',
      requirementsEn:
        'The product site says macOS 14 or later, and capture needs Screen Recording permission. The README says release builds support Apple silicon only; Intel Macs should stay on an older build. That older version number is not named in the repo.',
      installZh: '从 GitHub 下载发行版，打开 Octoshot.app，按提示允许屏幕录制。',
      installEn: 'Download the GitHub release, open Octoshot.app, and allow Screen Recording when prompted.',
      releaseUrl: 'https://github.com/Beastry/Octoshot/releases/tag/v0.3.3',
      sourceNoteZh:
        '版本与日期来自 GitHub Release v0.3.3（2026-11-14 发布）。macOS 14 与安装步骤来自官网“快速开始”；芯片范围来自仓库 README。',
      sourceNoteEn:
        'Version and date are GitHub release v0.3.3 (published 2026-11-14). macOS 14 and the install steps are from the site’s Getting started page. The chip note is from the repo README.',
    },
    ...issueLinks('Beastry/Octoshot'),
    extraLinks: [
      {
        href: 'https://github.com/Beastry/Octoshot/blob/main/README.md#%E8%B7%AF%E7%BA%BF%E5%9B%BE',
        zh: '路线图',
        en: 'Roadmap',
      },
      {
        href: '/octoshot/zh/docs/getting-started/',
        zh: '快速开始',
        en: 'Getting started',
      },
    ],
  },
  {
    slug: 'agentkey',
    name: 'AgentKey',
    mark: 'fox',
    markLabel: '狐',
    status: 'developing',
    summaryZh: '给人与 Agent 的密钥库。',
    summaryEn: 'Agent-native secrets for Apple.',
    detailZh:
      '个人密码库，面向人和 AI Agent。自己的设备之间端到端加密同步，不经过云。Agent 取用密钥需要你用 Touch ID 或 Apple Watch 批准。',
    detailEn:
      'A personal vault for people and AI agents. Devices sync end to end, with no cloud account. An agent only receives a secret after you approve it with Touch ID or Apple Watch.',
    href: 'https://github.com/Beastry/AgentKey',
    github: 'https://github.com/Beastry/AgentKey',
    platform: 'Apple',
    noteZh: 'README 写明尚未安全审计。没有 GitHub Release，这里不提供下载。',
    noteEn: 'The README says it is not audited. There is no GitHub release, so this site has no download.',
    wash: '#E7E2F6',
    washDark: '#2A2438',
    ...issueLinks('Beastry/AgentKey'),
    extraLinks: [
      {
        href: 'https://github.com/Beastry/AgentKey/blob/main/README.md',
        zh: 'README 里的状态',
        en: 'Status in the README',
      },
      {
        href: 'https://github.com/Beastry/AgentKey/blob/main/SECURITY.md',
        zh: '安全说明',
        en: 'Security notes',
      },
    ],
  },
  {
    slug: 'splatty',
    name: 'Splatty',
    mark: 'chameleon',
    markLabel: '变色龙',
    status: 'developing',
    summaryZh: '收藏品，做成 3D 高斯泼溅。',
    summaryEn: 'Collectibles → 3DGS.',
    detailZh:
      '用手办、徽章、积木等收藏的多视角照片，在家里的 Apple Silicon Mac 上训练 3D Gaussian Splatting，再在手机里转着看。',
    detailEn:
      'Photograph figures, badges, and bricks, train a 3D Gaussian splat on a Mac at home, then turn it over on your phone.',
    href: 'https://github.com/Beastry/Splatty',
    github: 'https://github.com/Beastry/Splatty',
    platform: 'iPhone · Mac',
    noteZh: 'README 写的是早期脚手架，接口还会变。没有 Release，不提供下载。',
    noteEn: 'The README calls it early scaffolding. Interfaces may change. No release, so no download.',
    wash: '#D6E9F6',
    washDark: '#1C2A33',
    ...issueLinks('Beastry/Splatty'),
    extraLinks: [
      {
        href: 'https://github.com/Beastry/Splatty/blob/main/docs/architecture.md',
        zh: '架构说明',
        en: 'Architecture',
      },
      {
        href: 'https://github.com/Beastry/Splatty/blob/main/CONTRIBUTING.md',
        zh: '贡献说明',
        en: 'Contributing',
      },
    ],
  },
  {
    slug: 'letterbee',
    name: 'LetterBee',
    aka: '纸短情长',
    mark: 'bee',
    markLabel: '蜜蜂',
    status: 'developing',
    summaryZh: '慢一点的信。写信、寄信、等信、收信。',
    summaryEn: 'A slow-mail web app.',
    detailZh:
      'Web 端慢通讯：把写信、寄出、按距离等待、再拆信做成一件完整的事。它故意不快。',
    detailEn:
      'A web app for writing, sending, waiting, and opening letters. The wait is part of the message.',
    href: 'https://github.com/Beastry/LetterBee',
    github: 'https://github.com/Beastry/LetterBee',
    platform: 'Web',
    noteZh: '开发规划写的是先做能内测的 Web App。没有 Release，不提供下载。',
    noteEn: 'The development plan aims at an internal-test web app first. No release, so no download.',
    wash: '#FFE8B8',
    washDark: '#332C14',
    ...issueLinks('Beastry/LetterBee'),
    extraLinks: [
      {
        href: 'https://github.com/Beastry/LetterBee/blob/main/docs/development-plan.md',
        zh: '开发规划',
        en: 'Development plan',
      },
    ],
  },
  {
    slug: 'jiyi-mianbao',
    name: '记忆面包',
    aka: 'jiyi-mianbao',
    mark: 'mouse',
    markLabel: '小鼠',
    status: 'onhold',
    summaryZh: '一条 B 站链接，做成 Anki 和小红书卡片。',
    summaryEn: 'Bilibili → Anki + cards.',
    detailZh:
      '从哔哩哔哩字幕生成带时间戳的 Anki 卡组，并同时整理小红书卡片。也可以从本地字幕文件开始。',
    detailEn:
      'Turn a Bilibili video into a timestamped Anki deck and Xiaohongshu cards. Local subtitle files work too.',
    href: 'https://github.com/Beastry/jiyi-mianbao',
    github: 'https://github.com/Beastry/jiyi-mianbao',
    platform: 'Python',
    noteZh: '本站标为搁置。仓库 README 仍有使用说明，没有写“已搁置”，也没有 Release。',
    noteEn:
      'Listed here as on hold. The README still documents how to run it, does not say “on hold,” and there is no release.',
    wash: '#FFE8B8',
    washDark: '#332A16',
    ...issueLinks('Beastry/jiyi-mianbao'),
  },
];

export function productsByStatus(status: ProductStatus): Product[] {
  return products.filter((p) => p.status === status);
}

export function indexLabel(index: number): string {
  return String(index + 1).padStart(2, '0');
}
