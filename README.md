# Bitcoin 助记词离线生成工具 v5.1

用于在完全离线环境中生成 BIP39 英文助记词，并派生 Bitcoin 主网 BIP84 Native SegWit 首地址。

## 唯一推荐入口

请只使用：

```text
Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE-Passphrase.html
```

`Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html` 是不支持 Passphrase 的历史对照版本，不建议再用于创建新钱包。

当前固定参数：

- Bitcoin 主网
- Native SegWit P2WPKH，地址以 `bc1q` 开头
- 派生路径 `m/84'/0'/0'/0/0`
- 12 或 24 个 BIP39 英文单词
- 可选 BIP39 Passphrase

## 使用方法

1. 使用干净、可信的设备，禁用浏览器扩展和密码管理器。
2. 物理断开网络，包括 Wi-Fi、网线、蓝牙共享和蜂窝网络。
3. 校验 `SHA256SUMS`。
4. 双击打开推荐的 HTML 文件。
5. 选择 12 或 24 词；如启用 Passphrase，必须在两个输入框中逐字输入一致。
6. 手写备份助记词和 Passphrase，不要截图、拍照、打印或保存到云端。
7. 在另一款可信离线钱包中恢复，并核对首地址和路径。
8. 首次使用只进行小额收款与发送测试。
9. 完成后点击“清除”，关闭整个浏览器；该操作只能尽力减少残留，不能保证擦除浏览器内存或系统交换区。

### 本地文件无法运行时

只有在浏览器限制 `file://` 下的 WebCrypto 时，才使用本机回环服务器：

```bash
cd /path/to/Bitcoin-Mnemonic-Offline-Generation-Tool--Beta-Version-main
python3 -m http.server 8000 --bind 127.0.0.1
```

然后访问：

```text
http://127.0.0.1:8000/Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE-Passphrase.html
```

不要使用 `npx serve`，不要绑定 `0.0.0.0`，也不要在联网状态下启动本地服务。

## Passphrase 安全要求

BIP39 Passphrase 不是助记词的一部分，没有“找回”功能。任何大小写、空格或字符差异都会得到另一个钱包。

- 姓名、生日、名言、短密码和常见句子几乎不提供额外保护。
- 建议使用至少 6 个真正随机、可以准确手写备份的单词。
- 不要只记在脑中；助记词与 Passphrase 应分开存放。
- 恢复测试必须同时使用完全相同的助记词、Passphrase、币种与派生路径。
- 二次确认只能减少输入错误，不能判断口令强度或替你保存口令。

## 安全设计

- 助记词熵来自浏览器 `crypto.getRandomValues`，不使用 `Math.random`。
- PBKDF2、HMAC-SHA512 和 SHA-256 使用浏览器原生 WebCrypto。
- 内置标准 BIP39 英文词表，无外部词表加载。
- CSP 禁止页面主动发起网络连接或加载外部资源。
- 页面启动时运行 WebCrypto、词表及 BIP84 回归向量自检，失败时禁止生成。
- 熵、种子、私钥和可变临时缓冲区在使用后尽力清零。
- Passphrase 变化、关闭面板或点击“清除”会立即作废旧助记词和地址。
- 打印样式会隐藏钱包内容，降低误触打印导致泄露的风险。

## 明确的安全边界

- 页面内显示的 SHA-256 是“内置词表哈希”，不是整个 HTML 文件哈希。
- 页面自检与被检代码位于同一文件，不能证明发布者身份，也不能抵御整个文件被恶意替换。
- 清空 DOM 或 `Uint8Array` 不等于可靠擦除 JavaScript 字符串、浏览器进程内存、系统交换区、截图、摄像头记录或恶意扩展记录。
- 当前地址派生包含项目内实现的 RIPEMD160、Bech32 和 secp256k1 逻辑；已通过独立向量交叉验证，但仍应使用第二款离线钱包验证结果。
- 本工具不是硬件钱包，不能抵御已被控制的操作系统、浏览器或固件。

## 文件完整性验证

发布包包含 `SHA256SUMS`。在 macOS/Linux 中运行：

```bash
shasum -a 256 -c SHA256SUMS
```

也可以单独计算主文件：

```bash
shasum -a 256 Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE-Passphrase.html
```

Windows PowerShell：

```powershell
Get-FileHash Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE-Passphrase.html -Algorithm SHA256
```

重要限制：同一下载包中的未签名哈希清单只能发现意外损坏，不能证明下载来源可信。正式发布时应通过可信渠道公布该哈希，最好再使用 Minisign 或 GPG 对 `SHA256SUMS` 签名。当前目录没有发布者私钥，因此不会伪造签名。

不要把 HTML、助记词或 Passphrase 上传到在线哈希、扫描或分析网站。

## 独立恢复验证

1. 用本工具生成一套只用于测试的新助记词及首地址。
2. 保持断网，在另一款可信、支持 BIP39 Passphrase 与 BIP84 的钱包中恢复。
3. 选择 Bitcoin 主网、Native SegWit、路径 `m/84'/0'/0'/0/0`。
4. 确认首地址完全相同。
5. 进行小额收款后，再从恢复的钱包发送出去。

不要为了验证而把已经持有真实资产的助记词输入普通浏览器页面。

## 开发验证

开发依赖不会被 HTML 加载，仅用于独立测试：

```bash
npm ci
npm test
npm audit
```

测试覆盖空口令、`TREZOR`、中文/Emoji、Unicode NFKD 等价形式和保留首尾空格的 Passphrase。

## 主要文件

| 文件 | 用途 |
|---|---|
| `Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE-Passphrase.html` | v5.1 推荐主程序 |
| `SHA256SUMS` | 发布文件校验清单 |
| `scripts/verify-vectors.js` | 独立 BIP39/BIP32/BIP84 测试 |
| `package.json` / `package-lock.json` | 固定开发测试依赖 |
| `CHANGELOG-v5.0-BIP39-Passphrase.md` | v5.0–v5.1 变更记录 |

## 免责声明

本工具按现状提供，不替代硬件钱包或专业安全审计。使用者必须独立验证输出、妥善备份并承担使用风险。
