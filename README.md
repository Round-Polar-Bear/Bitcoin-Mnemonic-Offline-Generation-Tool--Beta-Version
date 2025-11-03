# 哈勃未来 · 比特币助记词生成器

完全离线的 BIP39 助记词生成工具。

## 原始出处

本工具的原始版本来自：**https://bip39.btchao.com/**

本项目基于原版进行了改进和优化，包括：
- 内置 BIP39 标准英文词表，无需外部文件即可使用
- 优化了界面和字体显示，使助记词更易识别
- 改进了加载逻辑和错误处理

## 使用说明

### 方法一：使用 Web 服务器运行（推荐）

1. 将 `hubble-mnemonic-generator2.0.html` 和 `english.txt` 放在同一目录下
2. 在该目录打开终端/命令行，运行：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # 或 Python 2
   python -m SimpleHTTPServer 8000
   
   # 或 Node.js
   npx http-server -p 8000
   ```
3. 在浏览器中访问 `http://localhost:8000/hubble-mnemonic-generator2.0.html`

### 方法二：手动上传词表文件

如果直接双击打开 HTML 文件（file:// 协议），浏览器的安全限制会阻止自动加载 `english.txt`。此时：

1. 打开页面后，点击"选择文件"按钮
2. 选择本地的 `english.txt` 文件（BIP39 标准英文词表，2048 个单词）
3. 上传后即可正常使用

### 获取 english.txt 文件

BIP39 标准英文词表可以从以下来源获取：

1. **GitHub 官方仓库**：
   - https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt
   - 直接访问并保存为 `english.txt`

2. **其他 BIP39 实现库**：
   - 大多数加密货币库都包含标准词表
   - 搜索 "BIP39 english wordlist" 可找到多个来源

3. **验证文件**：
   - 标准 BIP39 english.txt 应包含恰好 2048 行
   - 标准 SHA256 校验值（请自行验证以确保安全）

## 安全提示

⚠️ **重要**：请在离线环境中使用本工具！

1. 生成助记词前，建议断开网络连接
2. 生成助记词后，立即保存并关闭页面
3. 不要在联网环境中使用
4. 建议自行验证 `english.txt` 的 SHA256 校验值

## 技术说明

- 完全离线运行，无需网络连接
- 使用浏览器原生 Crypto API 生成真随机数
- 遵循 BIP39 标准规范
- 开源代码，可自行审查和修改
- 原始出处：https://bip39.btchao.com/

## 故障排除

**问题**：页面提示"默认 english.txt 加载失败"

**原因**：
1. `english.txt` 文件不存在于同一目录
2. 使用 `file://` 协议打开时，浏览器 CORS 限制阻止了文件加载
3. 文件路径不正确

**解决方案**：
1. 使用 Web 服务器运行（见方法一）
2. 手动上传 `english.txt` 文件（见方法二）
3. 确保 `english.txt` 文件包含恰好 2048 行单词

## 许可证

请查看项目许可证文件。

