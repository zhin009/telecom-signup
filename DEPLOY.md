# 部署到 GitHub Pages 指南

## 方法一：使用 Git 命令（推荐）

### 1. 在 GitHub 上创建新仓库

访问 https://github.com/new 创建一个新仓库，例如：`telecom-signup-demo`

**不要**初始化 README、.gitignore 或 license（因为本地已有代码）

### 2. 关联远程仓库并推送

在项目根目录执行以下命令（替换 `your-username` 为你的 GitHub 用户名）：

```bash
# 添加远程仓库
git remote add origin https://github.com/your-username/telecom-signup-demo.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - Source: 选择 **Deploy from a branch**
   - Branch: 选择 **main**，文件夹选择 **/(root)**
5. 点击 **Save**

### 4. 访问你的网站

等待 1-2 分钟，GitHub Pages 会生成访问链接，格式为：
```
https://your-username.github.io/telecom-signup-demo/
```

## 方法二：使用 GitHub Desktop

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 将项目文件夹拖入 GitHub Desktop
3. 点击 "Publish repository" 发布到 GitHub
4. 在 GitHub 网站上启用 Pages（参考方法一的步骤 3）

## 方法三：手动上传文件

1. 在 GitHub 创建新仓库
2. 点击 "uploading an existing file"
3. 将 `index.html`、`styles.css`、`script.js` 拖入上传
4. 提交更改
5. 启用 GitHub Pages（参考方法一的步骤 3）

## 验证部署

部署成功后，访问生成的 GitHub Pages 链接，你应该能看到完整的电信开户界面。

## 常见问题

### Q: 页面显示 404？
A: 等待 1-2 分钟，GitHub 需要时间构建。检查 Pages 设置是否正确。

### Q: 样式不显示？
A: 检查文件路径是否正确，确保所有文件都在同一目录。

### Q: 如何更新代码？
A: 本地修改后执行：
```bash
git add .
git commit -m "更新说明"
git push
```

## 自定义域名（可选）

如需使用自定义域名：

1. 在仓库 Settings > Pages > Custom domain 中添加域名
2. 在你的 DNS 提供商处添加 CNAME 记录
3. 在根目录创建 `CNAME` 文件，内容为你的域名

---

**提示**: 部署完成后，记得将 README.md 中的 "[链接待生成]" 替换为实际的 GitHub Pages 链接。
