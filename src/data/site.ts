export type MarkName =
  | 'octopus'
  | 'cat'
  | 'mouse'
  | 'fox'
  | 'chameleon'
  | 'bee'
  | 'squirrel';

export interface Product {
  slug: string;
  name: string;
  aka?: string;
  mark: MarkName;
  /** What the placeholder drawing depicts. Not an official logo. */
  markLabel: string;
  summaryZh: string;
  summaryEn: string;
  detailZh: string;
  detailEn: string;
  href: string;
  platform: string;
  /** Short factual caveat shown on the card. */
  noteZh?: string;
  noteEn?: string;
  wash: string;
  washDark: string;
}

export const site = {
  name: 'Beastry',
  url: 'https://beastry.app',
  github: 'https://github.com/Beastry',
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

export const products: Product[] = [
  {
    slug: 'octoshot',
    name: 'Octoshot',
    aka: '一酱',
    mark: 'octopus',
    markLabel: '章鱼',
    summaryZh: '八只手，一次截完。',
    summaryEn: 'macOS screenshot with on-device AI.',
    detailZh:
      'macOS 原生截图：区域、窗口、全屏、滚动拼接和录屏，智能处理留在本机。菜单栏常驻。正式发布版面向 Apple Silicon。',
    detailEn:
      'A native macOS capture tool. Region, window, fullscreen, scrolling capture, and recording, with on-device AI. The release build targets Apple Silicon.',
    href: 'https://github.com/Beastry/Octoshot',
    platform: 'macOS',
    wash: '#d5ebe6',
    washDark: '#17302c',
  },
  {
    slug: 'mijiabar',
    name: 'MijiaBar',
    mark: 'cat',
    markLabel: '猫',
    summaryZh: '米家设备的 macOS 菜单栏。',
    summaryEn: 'Mi Home menu bar for macOS.',
    detailZh:
      '在菜单栏查看和控制米家设备，也可以通过命令行和 MCP 交给 Agent。扫码登录，凭据留在系统钥匙串。',
    detailEn:
      'See and control Mi Home devices from the menu bar, or hand them to an agent through the CLI and MCP. Sign-in is a QR code; credentials stay in the Keychain.',
    href: 'https://github.com/Beastry/MijiaBar',
    platform: 'macOS',
    noteZh: '非官方，与小米公司无关。',
    noteEn: 'Unofficial. Not affiliated with Xiaomi.',
    wash: '#f3ddd0',
    washDark: '#3a261c',
  },
  {
    slug: 'jiyi-mianbao',
    name: '记忆面包',
    aka: 'jiyi-mianbao',
    mark: 'mouse',
    markLabel: '小鼠',
    summaryZh: '一条 B 站链接，做成 Anki 和小红书卡片。',
    summaryEn: 'Bilibili → Anki + cards.',
    detailZh:
      '从哔哩哔哩字幕生成带时间戳的 Anki 卡组，并同时整理小红书卡片。也可以从本地字幕文件开始。',
    detailEn:
      'Turn a Bilibili video into a timestamped Anki deck and Xiaohongshu cards. Local subtitle files work too.',
    href: 'https://github.com/Beastry/jiyi-mianbao',
    platform: 'Python',
    wash: '#f3e6c8',
    washDark: '#332a16',
  },
  {
    slug: 'agentkey',
    name: 'AgentKey',
    mark: 'fox',
    markLabel: '狐',
    summaryZh: '给人与 Agent 的密钥库。',
    summaryEn: 'Agent-native secrets for Apple.',
    detailZh:
      '个人密码库，面向人和 AI Agent。自己的设备之间端到端加密同步，不经过云。Agent 取用密钥需要你用 Touch ID 或 Apple Watch 批准。',
    detailEn:
      'A personal vault for people and AI agents. Devices sync end to end, with no cloud account. An agent only receives a secret after you approve it with Touch ID or Apple Watch.',
    href: 'https://github.com/Beastry/AgentKey',
    platform: 'Apple',
    noteZh: '尚未安全审计。',
    noteEn: 'Not yet security-audited.',
    wash: '#f6d9c6',
    washDark: '#3a2418',
  },
  {
    slug: 'splatty',
    name: 'Splatty',
    mark: 'chameleon',
    markLabel: '变色龙',
    summaryZh: '收藏品，做成 3D 高斯泼溅。',
    summaryEn: 'Collectibles → 3DGS.',
    detailZh:
      '用手办、徽章、积木等收藏的多视角照片，在家里的 Apple Silicon Mac 上训练 3D Gaussian Splatting，再在手机里转着看。',
    detailEn:
      'Photograph figures, badges, and bricks, train a 3D Gaussian splat on a Mac at home, then turn it over on your phone.',
    href: 'https://github.com/Beastry/Splatty',
    platform: 'iPhone · Mac',
    noteZh: '早期版本，接口还会变。',
    noteEn: 'Early build. Interfaces may change.',
    wash: '#dce8cf',
    washDark: '#24301c',
  },
  {
    slug: 'letterbee',
    name: 'LetterBee',
    aka: '纸短情长',
    mark: 'bee',
    markLabel: '蜜蜂',
    summaryZh: '慢一点的信。写信、寄信、等信、收信。',
    summaryEn: 'A slow-mail web app.',
    detailZh:
      'Web 端慢通讯：把写信、寄出、按距离等待、再拆信做成一件完整的事。它故意不快。',
    detailEn:
      'A web app for writing, sending, waiting, and opening letters. The wait is part of the message.',
    href: 'https://github.com/Beastry/LetterBee',
    platform: 'Web',
    wash: '#f6e7b8',
    washDark: '#332c14',
  },
  {
    slug: 'stow',
    name: 'Stow',
    mark: 'squirrel',
    markLabel: '松鼠',
    summaryZh: '原生 macOS 压缩包工具。',
    summaryEn: 'A native macOS archive tool.',
    detailZh:
      '浏览、预览、解压并打包多种压缩格式。原型阶段，安装动作和 Finder 集成已经接在真实引擎上。',
    detailEn:
      'Browse, preview, extract, and pack many archive formats. Still a prototype, on a real archive engine.',
    href: 'https://github.com/skyswordw/stow',
    platform: 'macOS',
    noteZh: '转入组织前，仓库仍在 skyswordw/stow。',
    noteEn: 'Still at skyswordw/stow until the org transfer.',
    wash: '#eadfce',
    washDark: '#2c261c',
  },
];

export function indexLabel(index: number): string {
  return String(index + 1).padStart(2, '0');
}
