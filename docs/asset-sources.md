# Phase 1 asset and fact sources

Checked 2026-11-23 against the default branches and the files already in this site. Nothing here is a new mascot.

## Mother brand

Kept as-is. Not used as a product mascot.

| File | What it is |
| --- | --- |
| `public/brand/mark.jpg` | Mother-brand mark |
| `public/brand/logo-lockup.jpg` | Wordmark plus book |
| `public/brand/mascots-row.jpg` | Older labeled row of drawn product characters (Octoshot, MijiaBar, mbread, AgentKey, Splatty, LetterBee). It is not the mother-brand book, and it is not shown. Products use their own marks. |

Same files as [Beastry/brand](https://github.com/Beastry/brand).

## Product marks and pictures

| Product | File on this site | Source |
| --- | --- | --- |
| Stow | `public/stow/favicon.svg` | [Beastry/stow `website/favicon.svg`](https://github.com/Beastry/stow/blob/main/website/favicon.svg). The product page says this is the same drawing as `Design/AppIcon.svg`. The README’s alt text still says “squirrel”; the file itself is the lidded-box icon. |
| Stow | `public/stow/assets/grid-light.webp` | [Beastry/stow `website/assets/grid-light.webp`](https://github.com/Beastry/stow/blob/main/website/assets/grid-light.webp) |
| MijiaBar | `public/mijiabar/assets/icon.png` | Icon already shown by the vendored product page. The app repo also has `Resources/AppIcon.icns`. |
| MijiaBar | `public/media/mijiabar-list-light.webp` | [files.neardws.com/mijiabar/readme/list-light.webp](https://files.neardws.com/mijiabar/readme/list-light.webp), the light-mode list image linked from the MijiaBar README |
| Octoshot | `public/octoshot/brand/logo.svg` | [Beastry/Octoshot `website/public/brand/logo.svg`](https://github.com/Beastry/Octoshot/blob/main/website/public/brand/logo.svg). The README describes this red octopus as 一酱. |
| Octoshot | `public/octoshot/screenshots/zh/hero-web.webp` | [Beastry/Octoshot `website/public/screenshots/zh/hero-web.webp`](https://github.com/Beastry/Octoshot/blob/main/website/public/screenshots/zh/hero-web.webp). `public/octoshot/screenshots/README.md` says these scenes are generated to mirror the UI, not hand-captured screenshots. |

AgentKey, Splatty, LetterBee, and 记忆面包 had no product site and no logo file in the places checked (repo root, docs, Support, Apps, public). No substitute was drawn. LetterBee’s `public/` only has framework SVGs (`next.svg`, `vercel.svg`, and similar); those are not a product mark.

## Releases used as the pinned download

The button starts at this file. If `https://api.github.com/repos/<repo>/releases/latest` returns a matching uploaded asset, the button moves to that file. If the lookup fails, this file stays.

| Product | Pinned file | Published |
| --- | --- | --- |
| Stow | [Stow-0.1.11.dmg](https://github.com/Beastry/stow/releases/download/v0.1.11/Stow-0.1.11.dmg) | 2026-11-22 |
| MijiaBar | [MijiaBar-0.1.16.dmg](https://github.com/Beastry/MijiaBar/releases/download/v0.1.16/MijiaBar-0.1.16.dmg) | 2026-11-11 |
| Octoshot | [Octoshot-v0.3.3-macOS.dmg](https://github.com/Beastry/Octoshot/releases/download/v0.3.3/Octoshot-v0.3.3-macOS.dmg) | 2026-11-14 |

Stow’s own page still pins `Stow-0.1.10.dmg` and refreshes with the script from pull request 5. That page was not retargeted.

Requirements and install lines are copied from the Stow README, the MijiaBar README, the Octoshot getting-started page, and the Octoshot README. The Homebrew line is the Stow README command; the cask at [Beastry/homebrew-tap `Casks/stow.rb`](https://github.com/Beastry/homebrew-tap/blob/main/Casks/stow.rb) was version 0.1.11 and `depends_on macos: :tahoe` on the same day.

## Not changed on purpose

Pull request 3 still owns the vendored MijiaBar links. Those pages still say `neardws/MijiaBar` and MIT. The organization repo’s current `LICENSE` and README badge say GPL-3.0-only. This branch does not relabel them.
