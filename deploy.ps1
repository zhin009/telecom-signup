# 电信开户界面 - GitHub Pages 部署脚本
# 使用方法：.\deploy.ps1 -Username "your-github-username" -RepoName "telecom-signup-demo"

param(
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "telecom-signup-demo"
)

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  电信开户界面 - GitHub Pages 部署" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

$repoUrl = "https://github.com/$Username/$RepoName.git"
Write-Host "目标仓库：$repoUrl" -ForegroundColor Yellow
Write-Host ""

# 检查 Git 是否已配置
Write-Host "检查 Git 配置..." -ForegroundColor Green
$gitEmail = git config user.email
if ([string]::IsNullOrEmpty($gitEmail)) {
    Write-Host "错误：未配置 Git 用户邮箱" -ForegroundColor Red
    Write-Host "请运行：git config user.email 'your@email.com'" -ForegroundColor Yellow
    exit 1
}
Write-Host "Git 用户邮箱：$gitEmail" -ForegroundColor Green
Write-Host ""

# 添加或更新远程仓库
Write-Host "配置远程仓库..." -ForegroundColor Green
git remote remove origin 2>$null
git remote add origin $repoUrl
Write-Host "远程仓库已配置：$repoUrl" -ForegroundColor Green
Write-Host ""

# 重命名分支为 main
Write-Host "重命名分支为 main..." -ForegroundColor Green
git branch -M main 2>$null
Write-Host "分支已重命名" -ForegroundColor Green
Write-Host ""

# 推送代码
Write-Host "推送代码到 GitHub..." -ForegroundColor Green
git push -u origin main -f

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host "  ✓ 代码推送成功！" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "下一步操作：" -ForegroundColor Cyan
    Write-Host "1. 访问 https://github.com/$Username/$RepoName/settings/pages" -ForegroundColor White
    Write-Host "2. 在 Source 中选择 'main' 分支和 '/(root)' 文件夹" -ForegroundColor White
    Write-Host "3. 点击 Save 保存" -ForegroundColor White
    Write-Host "4. 等待 1-2 分钟后访问：" -ForegroundColor White
    Write-Host "   https://$Username.github.io/$RepoName/" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Red
    Write-Host "  ✗ 推送失败" -ForegroundColor Red
    Write-Host "=====================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "可能的原因：" -ForegroundColor Yellow
    Write-Host "1. 仓库不存在 - 请先在 GitHub 上创建仓库" -ForegroundColor White
    Write-Host "2. 认证失败 - 请配置 Git 凭证或使用 SSH" -ForegroundColor White
    Write-Host "3. 网络问题 - 请检查网络连接" -ForegroundColor White
    Write-Host ""
    Write-Host "手动创建仓库：https://github.com/new" -ForegroundColor Cyan
    Write-Host ""
}
