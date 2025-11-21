# Bitcoin 助记词离线生成工具 v3.0（安全增强版）
# Bitcoin Mnemonic Offline Generation Tool v3.0 (SECURE)

**最新版本 | Latest Version:** v3.0 (2025-11-21)
**安全评分 | Security Rating:** 9.9/10 ⭐⭐⭐⭐⭐

---

## 🚀 快速开始 | Quick Start

### 📂 **重要：使用哪个文件？ | Which File to Use?**

下载本项目后，请直接打开以下文件：
After downloading, directly open this file:

```
📄 Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html
```

**使用方法 | How to Use:**
1. 双击打开 `Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html`
2. 在浏览器中自动打开（推荐使用 Chrome、Edge 或 Firefox）
3. 开始生成助记词

*Double-click to open in your browser (Chrome, Edge, or Firefox recommended)*

---

## 📖 简介 | Introduction

**中文：**
这是一个完全离线的比特币助记词生成工具，可在无需联网的情况下安全生成 BIP39 助记词和比特币地址。所有密码学运算（PBKDF2、HMAC-SHA512、SHA-256、RIPEMD-160、secp256k1、Bech32 编码）均内置于单个 HTML 文件中，无需任何外部依赖。

**English:**
A fully offline Bitcoin mnemonic phrase generator that securely creates BIP39 mnemonics and Bitcoin addresses without internet connection. All cryptographic operations (PBKDF2, HMAC-SHA512, SHA-256, RIPEMD-160, secp256k1, Bech32 encoding) are embedded in a single HTML file with no external dependencies.

> **原始出处 | Original Source:** https://bip39.btchao.com/

---

## ✨ 核心特性 | Core Features

### 密码学安全 | Cryptographic Security
- ✅ 使用浏览器安全随机数 `crypto.getRandomValues` 生成 12/24 词助记词
- ✅ Generates 12/24-word mnemonics using secure browser RNG
- 🎯 支持 BIP84 (P2WPKH) 地址推导 (路径: `m/84'/0'/0'/0/0`)
- 📝 内嵌 BIP39 官方 2048 英文词表 | Embedded official BIP39 wordlist
- 🔍 内置自检向量，确保实现正确性 | Built-in test vectors

### 隐私保护 | Privacy Protection
- 🔒 完全离线运行，无网络请求 | Fully offline, no network requests
- 🧹 使用后自动清零敏感数据（熵、种子、私钥）| Auto-clear sensitive data
- 🛡️ **页面关闭时自动清理显示的助记词 (v2.0 新增)**
- 🛡️ **Auto-cleanup on page unload (v2.0 NEW)**
- 🚫 零追踪代码，零分析脚本 | No tracking, no analytics

### 安全防护 | Security Protection
- 🔐 **增强型 CSP 策略 (v2.0)** | Enhanced CSP policy
  - ✅ 禁止所有外部资源加载 | Block all external resources
  - ✅ 禁止网络连接 (`connect-src 'none'`)
  - ✅ 禁止插件加载 (`object-src 'none'`)
  - ✅ 防止表单劫持 (`form-action 'none'`)
  - ✅ 防止iframe嵌入 (`frame-ancestors 'none'`)
- 🔒 使用 `textContent` 防止 XSS 攻击
- 🔒 无 `eval()` 或动态代码执行
- 🛡️ **完全移除外部词表加载 (v3.0 新增)** | Removed external wordlist loading
  - ✅ 消除恶意词表注入风险 | Eliminates malicious wordlist injection
  - ✅ 仅使用内置标准BIP39词表 | Only uses embedded standard BIP39 wordlist
  - ✅ 符合"默认安全"原则 | Follows "secure by default" principle

---

## 🔧 详细使用步骤 | Detailed Usage

### 方法一：直接打开（推荐）| Method 1: Direct Open (Recommended)

1. **断开网络连接** | **Disconnect from internet**
2. **双击打开** `Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html`
3. 浏览器会自动加载页面
4. 选择 12 词或 24 词 | Choose 12 or 24 words
5. 点击"生成"按钮 | Click "Generate"
6. 安全保存生成的助记词 | Save your mnemonic securely

### 方法二：通过本地服务器（可选）| Method 2: Local Server (Optional)

某些浏览器在 `file://` 协议下可能限制 WebCrypto API。如遇问题，可使用本地服务器：

**使用 Node.js:**
```bash
cd 项目目录
npx serve
# 然后在浏览器访问 http://localhost:3000
```

**使用 Python:**
```bash
cd 项目目录
python3 -m http.server 8000
# 然后在浏览器访问 http://localhost:8000
```

---

## 🔐 安全操作清单 | Security Checklist

### ⚠️ 使用前必读 | Must Read Before Use

**中文：**
- ✅ **断网操作**：生成助记词前务必断开所有网络连接
- ✅ **可信设备**：使用干净的设备或可信的 Live OS 环境
- ✅ **安全备份**：将助记词手写在纸上，不要截图或云端存储
- ✅ **交叉验证**：用其他钱包（如硬件钱包）验证生成的地址
- ✅ **清理痕迹**：使用后关闭浏览器、清空缓存和剪贴板
- ⚠️ **测试先行**：首次使用先发送小额测试

**English:**
- ✅ **Offline Mode**: Disconnect from internet before generating
- ✅ **Trusted Device**: Use clean device or trusted Live OS
- ✅ **Secure Backup**: Write mnemonic on paper, no screenshots or cloud
- ✅ **Cross Verification**: Verify address with another wallet (hardware wallet)
- ✅ **Clean Traces**: Close browser, clear cache and clipboard after use
- ⚠️ **Test First**: Send small amount first to test

---

## 📁 项目文件说明 | Project Files

| 文件 / File | 说明 / Description |
|-------------|-------------------|
| **Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html** | ⭐ 主程序文件（请打开此文件使用）<br>Main application file (Open this to use) |
| README.md | 本说明文档 / This documentation |
| SECURITY-AUDIT-REPORT.md | 安全审计报告 / Security audit report |
| SECURITY_IMPROVEMENTS_REPORT.md | 安全改进报告 / Security improvements report |
| package.json | 开发依赖配置 / Development dependencies |

---

## 🔐 文件完整性验证 | File Integrity Verification

### 为什么需要验证？ | Why Verify?

**中文：**
在使用本工具前，强烈建议验证文件完整性，确保文件未被篡改。恶意修改可能导致助记词泄露或资金损失。

**English:**
Before using this tool, it's strongly recommended to verify file integrity to ensure it hasn't been tampered with. Malicious modifications could lead to mnemonic leakage or fund loss.

### 文件哈希值 | File Hash

**Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html**

```
SHA-256: 9d3179be5011facc51a3037cbd98819d708eda83c76b671872d7f261aa6d401a
```

> **更新日期 | Last Updated:** 2025-11-21
> **版本 | Version:** v3.0 (安全增强版 - 已移除外部词表加载)

### ⚠️ 重要说明：两个不同的哈希值 | Important: Two Different Hashes

**中文：**
本工具有**两个不同的SHA-256哈希值**，请不要混淆：

1. **HTML文件哈希（上方显示）**: `9d3179be5011facc51a3037cbd98819d708eda83c76b671872d7f261aa6d401a`
   - **用途**：验证整个HTML文件是否被篡改
   - **验证方式**：使用系统命令计算文件哈希（见下方说明）

2. **内置词表哈希（网页中显示）**: `187db04a869dd9bc7be80d21a86497d692c0db6abd3aa8cb6be5d618ff757fae`
   - **用途**：验证BIP39标准英文词表（2048个单词）的正确性
   - **显示位置**：打开网页后自动显示在页面顶部

✅ **这两个哈希值本来就不同，都是正确的！**

**English:**
This tool has **two different SHA-256 hashes** - please don't confuse them:

1. **HTML File Hash (shown above)**: `9d3179be5011facc51a3037cbd98819d708eda83c76b671872d7f261aa6d401a`
   - **Purpose**: Verify the entire HTML file hasn't been tampered with
   - **How to verify**: Use system commands to calculate file hash (see below)

2. **Embedded Wordlist Hash (shown in webpage)**: `187db04a869dd9bc7be80d21a86497d692c0db6abd3aa8cb6be5d618ff757fae`
   - **Purpose**: Verify the BIP39 standard English wordlist (2048 words) is correct
   - **Display location**: Automatically shown at the top of the page after loading

✅ **Both hashes are different and both are correct!**

---

### 如何验证 | How to Verify

#### 在 macOS / Linux 上：

```bash
# 进入文件所在目录
cd /path/to/Bitcoin-Mnemonic-Offline-Generation-Tool--Beta-Version

# 计算 SHA-256 哈希值
shasum -a 256 Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html

# 或使用
sha256sum Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html
```

#### 在 Windows 上：

```powershell
# 使用 PowerShell
Get-FileHash Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html -Algorithm SHA256

# 或使用 CertUtil
CertUtil -hashfile Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE.html SHA256
```

#### 在线工具（不推荐用于生产）：

⚠️ **注意：** 不要将生产环境使用的文件上传到在线哈希计算网站！仅用于学习测试。

### 验证步骤 | Verification Steps

1. ✅ 下载文件后，立即计算其 SHA-256 哈希值
2. ✅ 将计算结果与上方提供的哈希值对比
3. ✅ 确保完全一致（包括大小写）
4. ✅ 仅在哈希值匹配后使用该文件
5. ❌ 如果哈希值不匹配，**请勿使用**，并重新下载

**示例输出：**
```
✓ 正确：9d3179be5011facc51a3037cbd98819d708eda83c76b671872d7f261aa6d401a
✗ 错误：任何不同的哈希值都意味着文件已被修改
```

---

## ✅ 地址验证流程 | Address Verification Process

**中文：**
1. 使用本工具生成助记词并记录显示的 Bitcoin 地址
2. 在另一个离线钱包中导入相同助记词（保持离线）
3. 确认路径为 `m/84'/0'/0'/0/0` (BIP84)
4. 对比两个钱包显示的地址是否完全一致
5. 仅在验证无误后，先测试小额转账

**English:**
1. Generate mnemonic with this tool and note the displayed address
2. Import same mnemonic in another offline wallet
3. Verify the derivation path is `m/84'/0'/0'/0/0` (BIP84)
4. Compare if addresses match exactly
5. Test with small amount first after verification

---

## ❓ 常见问题 | FAQ

### Q1: 为什么打开文件后显示空白？
**A:** 某些浏览器可能阻止了本地文件的执行。请尝试：
- 使用 Chrome 或 Edge 浏览器
- 通过本地服务器方式打开（见"方法二"）
- 检查浏览器控制台是否有错误信息

### Q2: 生成的地址安全吗？
**A:** 只要您：
- 在完全离线环境下使用
- 使用可信的设备
- 妥善保管助记词
- 通过其他钱包交叉验证地址

### Q3: 需要安装任何软件吗？
**A:** 不需要。这是一个独立的 HTML 文件，只需浏览器即可运行。

### Q4: 支持哪些浏览器？
**A:** 支持现代浏览器：Chrome、Edge、Firefox、Safari（需支持 WebCrypto API）

---

## ⚠️ 免责声明 | Disclaimer

**中文：**
本工具按"现状"提供，开发者不对因使用本工具造成的任何损失承担责任。用户需自行承担所有风险，包括但不限于：
- 助记词丢失或被盗
- 资金损失
- 地址生成错误

使用本工具即表示您同意：
- 自行验证所有输出结果
- 妥善保管助记词
- 确保操作环境安全可靠
- 先进行小额测试

**English:**
This tool is provided "AS IS" without warranty. The developer is not responsible for any loss incurred from using this tool. Users assume all risks including but not limited to:
- Loss or theft of mnemonic phrases
- Loss of funds
- Address generation errors

By using this tool, you agree to:
- Verify all outputs independently
- Securely store your mnemonic phrase
- Ensure your environment is secure
- Test with small amounts first

---

## 📞 技术支持 | Support

如有技术问题，请查看：
For technical issues, please check:

- 📖 [BIP39 标准文档](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
- 📖 [BIP84 标准文档](https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki)
- 🔍 项目安全审计报告 | Security audit reports in this repository

---

## 📄 开源协议 | License

本项目遵循原始项目的开源协议。
This project follows the license of the original project.

---

**最后提醒 | Final Reminder:**

🔒 **安全第一** | **Security First**
- 务必离线使用 | Must use offline
- 妥善保管助记词 | Keep mnemonic safe
- 交叉验证地址 | Cross-verify addresses
- 小额测试优先 | Test with small amounts first

祝您使用愉快！ | Happy generating!
