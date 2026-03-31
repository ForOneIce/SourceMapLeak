# SourceMap 安全指南

一份关于 Source Map 文件泄露漏洞的科普与防护指南。以 2026 年 Claude Code npm 包源码泄露事件为切入点，帮助新手、开发者和安全研究员理解、检测和修复 Source Map 泄露问题。

## 页面结构

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 事件概述、检测工具推荐、漏洞原理科普 |
| `/beginner` | 新手入门 | 分步图文演示、互动测验 |
| `/developer` | 开发者指南 | Webpack/Vite/CRA 等框架的修复配置、Nginx/CI 防护方案 |
| `/hunter` | 赏金猎人 | 检测工具链、漏洞挖掘流程、报告模板 |

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 7 + vite-plugin-singlefile（产出单 HTML 文件）
- **样式**: Tailwind CSS 4
- **路由**: React Router 7

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 http://localhost:5173

## 构建部署

```bash
# 生产构建（输出到 dist 目录，单 HTML 文件）
npm run build

# 本地预览构建产物
npm run preview
```

由于使用了 `vite-plugin-singlefile`，构建产物为单个 `index.html`，所有 JS/CSS 内联，可直接部署到任意静态托管服务。

## 关于在线检测

本站**不提供**在线 Source Map 泄露检测功能。由于浏览器同源策略（CORS）限制，网页端 JavaScript 无法读取其他站点的资源内容和 HTTP 响应头，因此无法实现可靠的远程检测。

推荐使用以下工具进行检测：

- **[SourceDetector](https://github.com/SunHuawei/SourceDetector)** — Chrome 浏览器扩展，自动检测当前页面的 Source Map 泄露
- **curl / wget** — 命令行直接请求 `.map` 文件验证是否可访问

## License

本项目采用 [Creative Commons BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 协议开源。

你可以自由地分享和改编本项目内容，但需要：
- **署名** — 注明原作者并提供协议链接
- **非商业性使用** — 不得将本项目用于商业目的
- **相同方式共享** — 修改后的作品须以相同协议发布
