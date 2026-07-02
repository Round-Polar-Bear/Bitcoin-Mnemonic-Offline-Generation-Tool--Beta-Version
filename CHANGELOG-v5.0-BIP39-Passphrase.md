# 变更日志 v5.0 | Changelog v5.0

## 🆕 新增功能 - BIP39 Passphrase（第 25 个词）支持

**发布日期：** 2026-07-02
**版本号：** 5.0
**更新类型：** 🟢 功能新增（非安全漏洞修复）
**基于版本：** v4.0（`Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html`，见 `CHANGELOG-v4.0.md`）

---

## ⭐ 下次打开应该用哪个文件？

| 文件名 | 是否支持 Passphrase | 说明 |
|---|---|---|
| **`Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE-Passphrase.html`** | ✅ 支持 | **推荐使用**，本次新增的版本，其余功能与 v3.0 完全一致 |
| `Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html` | ❌ 不支持 | v3.0 原版，保留作为对照/回退用，不建议再用它生成新钱包 |

> 两个文件的助记词生成算法、BIP84 派生路径、内置词表、离线安全策略完全一样，唯一区别就是新文件多了 Passphrase 输入功能。

---

## 📋 本次改动内容

在"24 词"按钮后新增 **"BIP39 Passphrase"** 按钮：

- 点击后展开一个输入框，用于输入自定义口令（俗称"第 13/25 个词"）
- 输入框默认隐藏字符（`password` 类型），旁边有"显示/隐藏"切换按钮
- 生成地址时会将该口令代入 BIP39 种子派生（`PBKDF2` 的 salt 部分），与助记词是否为 12 词/24 词无关，两者可自由组合
- 收款地址下方会显示 "BIP39 Passphrase 已启用 / 为空" 状态（**不显示口令原文**）
- 关闭面板会自动清空已输入的口令，避免"面板已关闭但口令仍在生效"的误导
- 口令输入框和其余生成过程中的敏感数据一样，会在页面卸载（`beforeunload` / `pagehide`）时自动清空

---

## ✅ 验证记录

- **代码审查**：无 `innerHTML`/`eval`、无 `fetch`/`XHR`/`WebSocket`/`<form>`，CSP 策略与 v3.0 一致（禁止一切外部网络请求）
- **密码学正确性**：用 Node.js WebCrypto 独立跑通核心派生逻辑——空口令地址与已知测试向量完全匹配；加入口令后地址正确变化且可重复复现
- **交叉验证通过**（同一助记词 + Passphrase，三个独立实现算出的首个收款地址完全一致）：
  1. 本工具（`*-SECURE-Passphrase.html`）
  2. Electrum（Android，标准钱包 + p2wpkh + BIP39 Passphrase）
  3. iancoleman/bip39 离线版（`/Users/whero/Downloads/btc离线钱包交叉验证工具/iancoleman-bip39/bip39-standalone.html`，BIP84 标签页）

---

## 🔒 使用建议（沿用 v2.0/v3.0 的离线安全要求）

- 完全离线环境下使用，使用前断开所有网络连接
- 使用前禁用所有浏览器扩展 / 密码管理器（避免 passphrase 输入框被自动填充或提示保存）
- 建议使用隐身/无痕窗口打开，减少浏览器历史记录、localStorage 主题设置等非敏感但非必要的痕迹
- 生成并验证完毕后，点击「清除」按钮，再正常关闭标签页（避免强制杀进程导致自动清理逻辑未执行）
- Passphrase 一旦遗忘，对应资产将永久无法找回，务必牢记且不要以电子形式保存

---

## 📂 相关文档

- `CHANGELOG-v2.0.md` — v2.0 安全加固记录
- `CHANGELOG-v3.0.md` — v3.0 移除外部词表加载功能记录
- `CHANGELOG-v4.0.md` — v4.0 WebCrypto 强化与生成竞态修复记录
- `SECURITY-AUDIT-REPORT-FINAL.md` / `SECURITY_IMPROVEMENTS_REPORT.md` — 历史安全审计报告
