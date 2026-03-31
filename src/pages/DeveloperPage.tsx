import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState('webpack');
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecklist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const frameworks = {
    webpack: {
      name: 'Webpack',
      icon: '📦',
      config: `// webpack.config.js
module.exports = {
  mode: 'production',
  
  // ❌ 危险配置 - 会生成完整 source map
  // devtool: 'source-map',
  
  // ✅ 安全配置 - 生产环境禁用
  devtool: false,
  
  // 或者使用以下安全选项:
  // devtool: 'hidden-source-map', // 生成但不引用
  // devtool: 'nosources-source-map', // 不包含源码
};`,
      tips: [
        '生产构建时将 devtool 设为 false',
        '如需调试可用 hidden-source-map',
        '检查 CI/CD 环境变量配置'
      ]
    },
    vite: {
      name: 'Vite',
      icon: '⚡',
      config: `// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // ✅ 生产环境禁用 source map
    sourcemap: false,
    
    // 或者使用 hidden (生成但不引用)
    // sourcemap: 'hidden',
  },
});

// 也可以通过环境变量控制
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
  },
});`,
      tips: [
        '默认生产构建不生成 source map',
        '检查是否手动开启了 sourcemap: true',
        '使用环境变量动态控制'
      ]
    },
    react: {
      name: 'Create React App',
      icon: '⚛️',
      config: `# .env.production 文件
# ✅ 禁用 source map
GENERATE_SOURCEMAP=false

# 或者在构建命令中
# package.json
{
  "scripts": {
    "build": "GENERATE_SOURCEMAP=false react-scripts build"
  }
}

# Windows 用户使用 cross-env
{
  "scripts": {
    "build": "cross-env GENERATE_SOURCEMAP=false react-scripts build"
  }
}`,
      tips: [
        '设置 GENERATE_SOURCEMAP=false',
        '在 .env.production 中配置',
        'Windows 使用 cross-env 包'
      ]
    },
    nextjs: {
      name: 'Next.js',
      icon: '▲',
      config: `// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ 禁用生产环境 source map
  productionBrowserSourceMaps: false,
  
  // 服务端 source map 配置
  webpack: (config, { dev }) => {
    if (!dev) {
      config.devtool = false;
    }
    return config;
  },
};

module.exports = nextConfig;`,
      tips: [
        '设置 productionBrowserSourceMaps: false',
        '默认已禁用浏览器端 source map',
        '检查自定义 webpack 配置'
      ]
    },
    vue: {
      name: 'Vue CLI',
      icon: '💚',
      config: `// vue.config.js
module.exports = {
  // ✅ 生产环境禁用 source map
  productionSourceMap: false,
  
  // 开发环境可以保留
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false;
    }
  },
};`,
      tips: [
        '设置 productionSourceMap: false',
        'Vue CLI 4+ 默认已禁用',
        '检查旧项目配置'
      ]
    },
    npm: {
      name: 'NPM 发包',
      icon: '📦',
      config: `// package.json - 使用 files 白名单
{
  "name": "your-package",
  "files": [
    "dist/*.js",        // ✅ 只包含 JS
    "dist/*.d.ts",      // ✅ 类型声明
    "!dist/*.map"       // ❌ 排除 map 文件
  ]
}

// 或者使用 .npmignore
// .npmignore 文件内容:
*.map
*.js.map
*.css.map
src/
__tests__/`,
      tips: [
        '使用 files 字段明确包含的文件',
        '创建 .npmignore 排除 map 文件',
        '发布前用 npm pack 检查内容'
      ]
    }
  };

  const checklistItems = [
    { id: 'config', text: '已检查构建工具配置，生产环境禁用 source map', category: '配置检查' },
    { id: 'env', text: '已配置正确的环境变量 (如 GENERATE_SOURCEMAP=false)', category: '配置检查' },
    { id: 'cicd', text: '已检查 CI/CD 流程不会生成 source map', category: '配置检查' },
    { id: 'server', text: '已配置服务器禁止访问 .map 文件', category: '服务器配置' },
    { id: 'cdn', text: '已检查 CDN 配置不会缓存/分发 .map 文件', category: '服务器配置' },
    { id: 'npm', text: '如发布 npm 包，已排除 .map 文件', category: '发布检查' },
    { id: 'verify', text: '已在生产环境验证没有 .map 文件泄露', category: '发布检查' },
    { id: 'monitor', text: '已设置监控告警检测 .map 文件访问', category: '持续监控' },
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-blue-100 hover:text-white mb-4">
            ← 返回首页
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">开发者防护指南</h1>
              <p className="text-blue-100">配置指南、自动化工具、最佳实践</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 警告横幅 */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-12 text-white">
          <div className="flex items-start space-x-4">
            <span className="text-4xl">⚠️</span>
            <div>
              <h2 className="text-xl font-bold mb-2">开发者须知</h2>
              <p className="text-orange-100">
                Source Map 泄露可能导致：源代码被竞争对手获取、安全漏洞被发现、API密钥泄露、业务逻辑暴露等严重后果。
                请务必在生产环境部署前进行检查！
              </p>
            </div>
          </div>
        </div>

        {/* 框架配置指南 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">⚙️</span>
            各框架配置指南
          </h2>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex flex-wrap border-b">
              {Object.entries(frameworks).map(([key, framework]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-3 font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === key
                      ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{framework.icon}</span>
                  <span>{framework.name}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-3">配置示例</h3>
                  <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm font-mono whitespace-pre">
                      {frameworks[activeTab as keyof typeof frameworks].config}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">💡 注意事项</h3>
                  <ul className="space-y-3">
                    {frameworks[activeTab as keyof typeof frameworks].tips.map((tip, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <span className="text-blue-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 服务器配置 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">🖥️</span>
            服务器防护配置
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">🟢</span>
                Nginx 配置
              </h3>
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre">{`# nginx.conf 或 server block
location ~* \\.map$ {
    # 方案1: 完全禁止访问
    deny all;
    return 404;
}

# 或者限制只有内网可访问
location ~* \\.map$ {
    allow 10.0.0.0/8;
    allow 192.168.0.0/16;
    deny all;
}`}</pre>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">🔶</span>
                Apache 配置
              </h3>
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre">{`# .htaccess 文件
<FilesMatch "\\.map$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# 或使用 Apache 2.4+ 语法
<FilesMatch "\\.map$">
    Require all denied
</FilesMatch>`}</pre>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">☁️</span>
                Vercel/Netlify
              </h3>
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre">{`// vercel.json
{
  "headers": [
    {
      "source": "/(.*)\\.map",
      "headers": [
        { "key": "X-Robots-Tag", "value": "noindex" }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)\\.map",
      "destination": "/404"
    }
  ]
}`}</pre>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">🔷</span>
                Cloudflare Rules
              </h3>
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre">{`# Page Rules 或 Transform Rules
# 匹配: *example.com/*.map

# 设置:
# - Block (阻止访问)
# - 或 Rewrite to 404

# Workers 代码:
addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (url.pathname.endsWith('.map')) {
    return new Response('Not Found', { 
      status: 404 
    });
  }
});`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* NPM 包发布安全 - Claude Code 事件教训 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">📦</span>
            NPM 包发布安全
            <span className="ml-3 px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">重要</span>
          </h2>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <span className="text-4xl">🔥</span>
              <div>
                <h3 className="font-bold text-red-800 text-lg mb-2">Claude Code 事件警示</h3>
                <p className="text-red-700 text-sm">
                  2026年3月31日，Anthropic 的 <code className="bg-red-100 px-1 rounded">@anthropic-ai/claude-code</code> npm 包因构建流程配置错误，
                  将 .map 文件打包进了发布产物，导致约 1,900 个文件、512,000+ 行 TypeScript 完整源码泄露。
                  这提醒我们：<strong>npm 包发布同样需要严格的安全检查</strong>。
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">📋</span>
                方法1: 使用 files 白名单
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                在 package.json 中明确指定要发布的文件，这是最安全的方式。
              </p>
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre">{`// package.json
{
  "name": "your-package",
  "files": [
    "dist/**/*.js",
    "dist/**/*.d.ts",
    "dist/**/*.cjs",
    "dist/**/*.mjs",
    "!dist/**/*.map",
    "!dist/**/*.map.js"
  ]
}`}</pre>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">🚫</span>
                方法2: 使用 .npmignore
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                创建 .npmignore 文件排除不需要的文件。注意：一旦存在此文件，.gitignore 将被忽略。
              </p>
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre">{`# .npmignore
# Source maps
*.map
*.js.map
*.css.map

# Source code
src/
__tests__/
test/
*.test.js
*.spec.js

# Config files
tsconfig.json
.eslintrc
.prettierrc`}</pre>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">🔍</span>
                发布前检查
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                使用 npm pack 命令预览将要发布的内容。
              </p>
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre">{`# 预览发布内容
npm pack --dry-run

# 生成 tarball 并检查
npm pack
tar -tzf your-package-1.0.0.tgz

# 检查是否包含 .map 文件
tar -tzf your-package-*.tgz | grep -E '\\.map$'

# 如果有输出，说明存在泄露风险！`}</pre>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-xl mr-2">🤖</span>
                CI/CD 自动检查
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                在 CI/CD 流程中添加自动检查步骤。
              </p>
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre">{`# GitHub Actions
- name: Check for source maps
  run: |
    npm pack
    MAPS=$(tar -tzf *.tgz | grep -E '\\.map$' || true)
    if [ -n "$MAPS" ]; then
      echo "❌ Source maps found in package!"
      echo "$MAPS"
      exit 1
    fi
    echo "✅ No source maps in package"`}</pre>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <span className="text-xl">💡</span>
              <div className="text-sm text-blue-800">
                <strong>最佳实践：</strong>在构建阶段就不生成 source map，而不是仅仅在发布时排除。
                这样可以从根源上避免泄露风险。使用 <code className="bg-blue-100 px-1 rounded">sourcemap: false</code> 配置。
              </div>
            </div>
          </div>
        </section>

        {/* 安全检查清单 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">✅</span>
            安全检查清单
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">完成以下检查项确保你的项目安全</p>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{completedCount}/{checklistItems.length}</span>
              </div>
            </div>

            <div className="space-y-4">
              {['配置检查', '服务器配置', '发布检查', '持续监控'].map(category => (
                <div key={category}>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{category}</h3>
                  <div className="space-y-2">
                    {checklistItems
                      .filter(item => item.category === category)
                      .map(item => (
                        <label
                          key={item.id}
                          className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            checklist[item.id]
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checklist[item.id] || false}
                            onChange={() => toggleCheck(item.id)}
                            className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                          />
                          <span className={`ml-3 ${checklist[item.id] ? 'text-green-700' : 'text-gray-700'}`}>
                            {item.text}
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {completedCount === checklistItems.length && (
              <div className="mt-6 p-4 bg-green-100 rounded-xl text-green-800">
                🎉 太棒了！你已完成所有安全检查项！
              </div>
            )}
          </div>
        </section>

        {/* CI/CD 集成 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">🔄</span>
            CI/CD 自动化检测
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-600 mb-6">
              在 CI/CD 流程中添加自动化检测，防止 source map 文件被错误部署
            </p>

            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre">{`# GitHub Actions 示例
name: Security Check

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  check-sourcemaps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build
        run: npm run build
      
      - name: Check for source maps
        run: |
          echo "🔍 Checking for source map files..."
          MAPS=$(find dist -name "*.map" 2>/dev/null)
          if [ -n "$MAPS" ]; then
            echo "❌ ERROR: Source map files found!"
            echo "$MAPS"
            exit 1
          fi
          echo "✅ No source map files found!"
      
      - name: Check for sourceMappingURL
        run: |
          echo "🔍 Checking for sourceMappingURL comments..."
          if grep -r "sourceMappingURL" dist/*.js 2>/dev/null; then
            echo "❌ ERROR: sourceMappingURL found in JS files!"
            exit 1
          fi
          echo "✅ No sourceMappingURL comments found!"`}</pre>
            </div>
          </div>
        </section>

        {/* 底部导航 */}
        <section>
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">🛡️ 现在就行动起来！</h2>
            <p className="text-blue-100 mb-6">
              按照上述指南配置你的项目，确保源代码安全。如需进一步了解漏洞挖掘技术，可以查看赏金猎人指南。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
              >
                ← 返回首页
              </Link>
              <Link
                to="/hunter"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                了解攻击者视角 →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
