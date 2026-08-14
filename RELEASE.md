# 发布流程(手动,发布动作由用户确认)

> 原则:**自动化的只有"版本号 bump"和"更新说明生成"两步;真正的 `npm publish` 永远由用户明确说"发布"后执行。**

## 每次发版步骤

### 第一步:准备(用户说"准备发版"时执行)

```bash
npm run release:prep
```

这条命令自动完成:

1. `package.json` 版本号 +1(patch:`0.1.1` → `0.1.2`)
2. 读取上一个 tag 以来的 git commit,按 新增/修复/改进/文档 分类
3. 自动在 `CHANGELOG.md` 顶部插入对应版本条目
4. 打印新版本号 + 更新说明

然后做验证(必须通过才能发):

```bash
npm run typecheck   # tsc 零错误
npm run build       # 产出 lib/client.js
# 冒烟:requireStub 加载 lib/client.js 无异常 + 伺服 bundle 与本地一致
```

把更新说明展示给用户看,等用户确认。

### 第二步:发布(用户明确说"发布"时执行)

```bash
git add -A
git commit -m "chore: release v<版本号>"
git tag v<版本号>
git push origin main --tags
npm publish
```

`npm publish` 会触发 `prepublishOnly` 自动重新 build,确保发布的产物与伺服一致。

## 版本号规则(SemVer)

| 变更类型 | bump |
|---|---|
| 新增功能(feat) | minor(`0.1` → `0.2`) |
| 修复 bug(fix) | patch(`0.1.1` → `0.1.2`) |
| 破坏性变更(BREAKING) | major(`1.0`) |

需要 minor/major 时手动改 `scripts/release.mjs` 的 bump 逻辑或直接改 `package.json` 版本号,再补 CHANGELOG。

## 铁律

- **用户没说"发布",绝不执行 `npm publish`**
- 发布前必须 typecheck + build + 冒烟通过
- 每次发布必须新版本号(npm 不允许重复发布同一版本)
- 发布后提醒用户:**DSH 应用需重启一次**,新版本才被加载
