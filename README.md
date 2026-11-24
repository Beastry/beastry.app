# Beastry

开源软件社区 · [beastry.app](https://beastry.app)

动物意象的产品线，认真对待每个开源项目与贡献者。

本仓库是社区站点，用 [Astro](https://astro.build) 生成纯静态页面，适合部署到 Cloudflare Pages。没有服务端、没有账号系统。

## Projects

状态：公测 · 开发中 · 搁置。想法收集：[Beastry/ideas](https://github.com/Beastry/ideas)。

| Status | Project | Site | Description |
|--------|---------|------|-------------|
| 公测 | [Stow](https://github.com/Beastry/stow) | [/stow](https://beastry.app/stow/) | native macOS archive tool |
| 公测 | [MijiaBar](https://github.com/Beastry/MijiaBar) | [/mijiabar](https://beastry.app/mijiabar/) | Mi Home menu bar for macOS |
| 公测 | [Octoshot](https://github.com/Beastry/Octoshot) | [/octoshot](https://beastry.app/octoshot/) | macOS screenshot with on-device AI |
| 开发中 | [AgentKey](https://github.com/Beastry/AgentKey) | — | Agent-native secrets for Apple |
| 开发中 | [Splatty](https://github.com/Beastry/Splatty) | — | Collectibles → 3DGS |
| 开发中 | [LetterBee](https://github.com/Beastry/LetterBee) | — | Slow-mail Web app · 纸短情长 |
| 搁置 | [记忆面包](https://github.com/Beastry/jiyi-mianbao) | — | Bilibili → Anki + 小红书卡片 |

公测产品使用各自官网的标志。母品牌 JPG（书与粉兔、蓝猫、黄熊）只代表 Beastry，不充当产品吉祥物。没有核实到正式标志的项目不另画替代。MijiaBar 是非官方项目，与小米公司无关。AgentKey 尚未经过安全审计。剪贴板 / PDF 等构思只在 ideas 库，不进产品网格。

主站导航还有 `/help` 和 `/community`。帮助把 Bug 和建议分到对应 GitHub；社区只链到已有的想法模板和路线图，没有账号或论坛。

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

网站内容 © Beastry。版权声明保持这一行，此处不另立版权人。

本仓库的第一方材料，在 Beastry 持有其版权的范围内，以 **GNU GPL 第 3 版、且仅第 3 版** 提供（SPDX：`GPL-3.0-only`）。范围包括为本站编写的源码（`src/`、样式与站点配置）、为本站编写的原创文档与页面文案，以及 Beastry 持有版权的原创素材和其他原创媒体，包括 `public/favicon.svg`、站点源码中的图形，以及 `public/brand/` 下的母品牌文件。母品牌文件的另一份在 [Beastry/brand](https://github.com/Beastry/brand)；该仓库没有 `LICENSE`。这里的授权覆盖 Beastry 对本仓库中这些副本所持有的版权，并保持 brand 仓库原样。

根目录 [`LICENSE`](LICENSE) 是自由软件基金会发布的 GNU GPL 第 3 版全文，与 <https://www.gnu.org/licenses/gpl-3.0.txt> 字节相同，未作修改。该文件附录 “How to Apply These Terms” 中的示例通知含有 “or (at your option) any later version”。示例保持原文。本仓库的授权是仅第 3 版。

GNU GPL 许可的是版权。Beastry 这一名称、各产品名称和标志上的商标权仍归其权利人；GPL 不转移商标权。用这些名称指称项目是普通指称。这段说明不附加新的版权限制。

下列材料继续适用它们已经带有的许可证：

- 中文界面使用访问者系统里的无衬线字体（Apple 上是苹方，Windows 上是微软雅黑，系统已安装时用思源黑体 / Noto Sans CJK）。本仓库不再附带只覆盖部分汉字的 Noto 子集。英文界面仍使用 npm 包里的 Newsreader 与 Outfit。
- npm 包 `@fontsource-variable/newsreader` 与 `@fontsource-variable/outfit`：随包提供的 SIL Open Font License 1.1。`package-lock.json` 里这两个包以及其余第三方包的许可证字段保持原样。本包自己的 `license` 字段为 `GPL-3.0-only`。
- [`public/stow/`](public/stow/)：导入的 Stow 站点。页面写的是 GPL-3.0，并写明 7-Zip 引擎为 LGPL。这与 2026-11-14 的 [Beastry/stow](https://github.com/Beastry/stow) `main` 一致：README 给出 GNU General Public License v3.0。`any later version` 出现在 GPL 文本自己的第 14 节和附录示例里；Stow 的 README 没有另外写上 “or any later version”。Stow 没有开放中的许可证迁移 pull request。这些文件保持导入时的内容。
- [`public/mijiabar/`](public/mijiabar/)：导入的 MijiaBar 站点。页脚仍写 “Copyright © 2026 neardws and contributors.” 产品页上的仓库链接现为 [Beastry/MijiaBar](https://github.com/Beastry/MijiaBar)，许可证标签为 GPL-3.0-only，指向当前 `LICENSE`。2026-11-14 记录下来的 MIT 许可通知仍在 [`LICENSES/MIT-upstream-snapshots.txt`](LICENSES/MIT-upstream-snapshots.txt)；更早随 MIT 发布的副本没有在这里被改写成撤销。[Pull request #111](https://github.com/Beastry/MijiaBar/pull/111) 已合并。`public/mijiabar/assets/README.md` 所写的设备图与截图放在本仓库之外。
- [`public/octoshot/`](public/octoshot/)：导入的 Octoshot 站点。中英文首页的现行许可证标签是 GPL-3.0-only，链到 [Beastry/Octoshot `LICENSE`](https://github.com/Beastry/Octoshot/blob/main/LICENSE)。[Pull request #129](https://github.com/Beastry/Octoshot/pull/129) 已于 2026-11-14 合并，当前 `LICENSE` 是 GNU GPL 第 3 版。2026-11-14 记录下来的 MIT 许可通知仍在 [`LICENSES/MIT-upstream-snapshots.txt`](LICENSES/MIT-upstream-snapshots.txt)，没有被改写成撤销。

[`LICENSES/MIT-upstream-snapshots.txt`](LICENSES/MIT-upstream-snapshots.txt) 是 2026-11-14 记录下来的 MijiaBar 与 Octoshot `main` MIT 许可通知。它随这两份保留的镜像提供，记录的是这两份上游作品当时已经给出的 MIT 授权。MijiaBar 产品页现在链到当前的 GPL-3.0-only `LICENSE`；这份 MIT 通知不因此撤销。本站第一方树此前没有根目录 `LICENSE`，也没有 MIT 授权文本。

贡献者保留自己贡献上的版权。

### Same grant in English

Site content © Beastry. That copyright line stays; this change names no further copyright owner.

First-party material in this repository is offered under the GNU General Public License, version 3 only (SPDX: `GPL-3.0-only`), to the extent Beastry holds the copyright. The grant covers source written for this site (`src/`, styles, and site configuration), original documentation and page copy written for this site, and original assets and other original media whose copyright Beastry holds, including `public/favicon.svg`, drawings in the site source, and the mother-brand files under `public/brand/`. Those brand files also live in [Beastry/brand](https://github.com/Beastry/brand), which has no `LICENSE` file. The grant here covers Beastry’s copyright in the copies in this repository and leaves the brand repository unchanged.

[`LICENSE`](LICENSE) is the unmodified GNU GPL version 3 from <https://www.gnu.org/licenses/gpl-3.0.txt>. The sample notice in that file’s “How to Apply These Terms” appendix contains the words “or (at your option) any later version.” The sample is unmodified. This repository’s grant is version 3 only.

The GNU GPL licenses copyright. Trademark rights in the name Beastry, in product names, and in the logos remain with their holders; the GPL does not convey those trademark rights. Using the names to identify the projects is ordinary reference. This paragraph adds no further copyright term.

The following material keeps the license it already carries:

- Chinese UI text uses the visitor’s system sans (PingFang on Apple, Microsoft YaHei on Windows, Source Han Sans / Noto Sans CJK when the system already has one). This repository no longer ships the partial Noto subsets. English still uses Newsreader and Outfit from their npm packages.
- The npm packages `@fontsource-variable/newsreader` and `@fontsource-variable/outfit` remain under the SIL Open Font License 1.1 shipped with those packages. Third-party `license` entries in `package-lock.json` are unchanged. This package’s own `license` field is `GPL-3.0-only`.
- [`public/stow/`](public/stow/) is the imported Stow site. Its pages say GPL-3.0 and that the 7-Zip engine is LGPL. That matches [Beastry/stow](https://github.com/Beastry/stow) `main` on 2026-11-14: the README offers the GNU General Public License v3.0. The words “any later version” appear in the GPL text itself (section 14 and the appendix sample). Stow’s README does not add that option. Stow has no open license-migration pull request. The imported files were left as they were.
- [`public/mijiabar/`](public/mijiabar/) is the imported MijiaBar site. The footer still says “Copyright © 2026 neardws and contributors.” Repository links on the product pages now go to [Beastry/MijiaBar](https://github.com/Beastry/MijiaBar), and the license label is GPL-3.0-only, pointing at the current `LICENSE`. The MIT notice recorded on 2026-11-14 remains in [`LICENSES/MIT-upstream-snapshots.txt`](LICENSES/MIT-upstream-snapshots.txt). Copies already received under MIT are not rewritten here as if that grant were revoked. [Pull request #111](https://github.com/Beastry/MijiaBar/pull/111) is merged. The device art and screenshots described in `public/mijiabar/assets/README.md` live outside this repository.
- [`public/octoshot/`](public/octoshot/) is the imported Octoshot site. The English and Chinese landing pages now label the current license GPL-3.0-only and link to [Beastry/Octoshot `LICENSE`](https://github.com/Beastry/Octoshot/blob/main/LICENSE). [Pull request #129](https://github.com/Beastry/Octoshot/pull/129) merged on 2026-11-14; the current `LICENSE` is GNU GPL version 3. The MIT notice recorded on 2026-11-14 remains in [`LICENSES/MIT-upstream-snapshots.txt`](LICENSES/MIT-upstream-snapshots.txt) and is not rewritten as a revocation.

[`LICENSES/MIT-upstream-snapshots.txt`](LICENSES/MIT-upstream-snapshots.txt) is the MIT permission notice recorded from MijiaBar `main` and Octoshot `main` on 2026-11-14. It travels with those retained snapshots and records the MIT grant those upstream works had already given. The MijiaBar product pages now link to the current GPL-3.0-only `LICENSE`. That notice does not revoke the earlier MIT grant. The first-party tree of this site had no root `LICENSE` and no MIT grant text before this change.

Contributors keep the copyright in their own contributions.
