# Beastry

开源软件社区 · [beastry.app](https://beastry.app)

动物意象的产品线，认真对待每个开源项目与贡献者。

本仓库是社区站点，用 [Astro](https://astro.build) 生成纯静态页面，适合部署到 Cloudflare Pages。没有服务端、没有账号系统。

## Projects

| Project | Animal | Description |
|---------|--------|-------------|
| [Octoshot](https://github.com/Beastry/Octoshot) | — | macOS screenshot with on-device AI |
| [MijiaBar](https://github.com/Beastry/MijiaBar) | — | Mi Home menu bar for macOS |
| [记忆面包](https://github.com/Beastry/jiyi-mianbao) | — | Bilibili → Anki + 小红书卡片 |
| [AgentKey](https://github.com/Beastry/AgentKey) | — | Agent-native secrets for Apple |
| [Splatty](https://github.com/Beastry/Splatty) | — | Collectibles → 3DGS |
| [LetterBee](https://github.com/Beastry/LetterBee) | — | Slow-mail Web app · 纸短情长 |
| [Stow](https://github.com/skyswordw/stow) | — | native macOS archive tool (pending transfer) |

网站上的动物简笔画是占位，不是各产品的正式 logo。正式形象以仓库为准，例如 Octoshot 使用原创章鱼图标。MijiaBar 是非官方项目，与小米公司无关。AgentKey 尚未经过安全审计。

## Contact

- hello@beastry.app
- community@beastry.app
- security@beastry.app
- X: [@beastryapp](https://x.com/beastryapp)

## 本地开发

需要 Node.js 20 或更新版本。

```bash
npm install
npm run dev
```

开发服务器默认在 <http://localhost:4321>。

```bash
npm run build    # 输出到 dist/
npm run preview  # 本地预览构建结果
```

## 部署到 Cloudflare Pages

1. Cloudflare 控制台打开 **Workers & Pages → Create → Pages → Connect to Git**。
2. 选择 `Beastry/beastry.app`，生产分支用 `main`。
3. 构建设置：
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. 如需指定 Node 版本，设置环境变量 `NODE_VERSION` = `22`（仓库里的 `.node-version` 也是 22）。
5. 自定义域名绑定 `beastry.app`。

构建结果是普通静态文件，不需要 Pages Functions，也不要安装 Astro 的 Cloudflare 服务端适配器。

已登录 Wrangler 时，也可以在本地构建后直接上传：

```bash
npm run build
npx wrangler pages deploy dist --project-name beastry
```

### GitHub Pages

同一份 `dist/` 可以交给 GitHub Pages。用 Actions 时，把 `npm run build` 的 `dist` 目录作为 Pages artifact 上传即可。Cloudflare Pages 是这个站点的首选。

## License

Site content © Beastry. Individual projects keep their own licenses.
