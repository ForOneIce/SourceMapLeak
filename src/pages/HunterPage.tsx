import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HunterPage() {
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'devtools',
      name: '浏览器开发者工具',
      icon: '🔧',
      difficulty: '简单',
      description: '最基础的检测方法，无需安装任何工具',
      steps: [
        '打开目标网站',
        '按 F12 打开开发者工具',
        '切换到 Sources（源代码）面板',
        '查看左侧文件树是否有完整的源码目录结构',
        '检查 Network 面板是否有 .map 文件请求'
      ],
      code: `// 在控制台执行，检查所有脚本的 sourceMappingURL
document.querySelectorAll('script[src]').forEach(script => {
  fetch(script.src)
    .then(res => res.text())
    .then(text => {
      const match = text.match(/\\/\\/[#@] sourceMappingURL=(.+)/);
      if (match) {
        console.log('Found:', script.src, '->', match[1]);
      }
    });
});`
    },
    {
      id: 'sourcemapper',
      name: 'sourcemapper',
      icon: '🗺️',
      difficulty: '中等',
      description: '专业的 source map 提取和还原工具',
      steps: [
        '安装: npm install -g sourcemapper',
        '下载目标 JS 文件和对应的 .map 文件',
        '运行: sourcemapper extract -m bundle.js.map -o output/',
        '在 output 目录查看还原的源代码'
      ],
      code: `# 安装 sourcemapper
npm install -g sourcemapper

# 方法1: 从 URL 直接提取
sourcemapper extract --url https://example.com/bundle.js.map -o ./output

# 方法2: 从本地文件提取
sourcemapper extract -m ./bundle.js.map -o ./output

# 查看还原的源码
ls -la ./output`
    },
    {
      id: 'sourceMapReverse',
      name: 'smap / reverse-sourcemap',
      icon: '⚡',
      difficulty: '中等',
      description: '快速还原 source map 的命令行工具',
      steps: [
        '安装: npm install -g reverse-sourcemap',
        '下载 .map 文件到本地',
        '运行: reverse-sourcemap -v bundle.js.map -o output',
        '检查输出目录的源码结构'
      ],
      code: `# 安装
npm install -g reverse-sourcemap

# 还原 source map
reverse-sourcemap -v bundle.js.map -o output

# 或使用 smap (另一个工具)
npm install -g smap
smap -u https://example.com/bundle.js.map`
    },
    {
      id: 'unwebpack',
      name: 'unwebpack-sourcemap',
      icon: '📦',
      difficulty: '中等',
      description: '专门针对 Webpack 打包的 source map 还原',
      steps: [
        '安装 Python 依赖',
        '克隆工具仓库',
        '运行脚本指定 .map 文件路径',
        '查看还原的 webpack 模块源码'
      ],
      code: `# 克隆工具
git clone https://github.com/AustinBrrtt/unwebpack-sourcemap

# 安装依赖
pip install -r requirements.txt

# 运行
python3 unwebpack_sourcemap.py https://example.com/bundle.js.map`
    },
    {
      id: 'burp',
      name: 'Burp Suite + JS Miner',
      icon: '🔴',
      difficulty: '高级',
      description: '使用 Burp Suite 自动化检测和分析',
      steps: [
        '安装 Burp Suite 和 JS Miner 扩展',
        '配置浏览器代理',
        '访问目标网站',
        '在 Target 面板查看发现的敏感信息',
        '分析还原后的源码中的安全问题'
      ],
      code: `# JS Miner 扩展功能:
# - 自动检测 JS 文件中的敏感信息
# - 识别 API 端点和密钥
# - 分析 DOM-based 漏洞

# 在 Burp Suite 中:
# 1. Extender -> BApp Store -> JS Miner
# 2. 安装后浏览目标网站
# 3. 查看 Issues 面板的发现`
    },
    {
      id: 'nuclei',
      name: 'Nuclei 扫描模板',
      icon: '☢️',
      difficulty: '高级',
      description: '使用 Nuclei 进行大规模自动化扫描',
      steps: [
        '安装 Nuclei: go install github.com/projectdiscovery/nuclei/v2/cmd/nuclei@latest',
        '下载或编写 source map 检测模板',
        '运行扫描: nuclei -u target.com -t sourcemap-detect.yaml',
        '分析扫描结果'
      ],
      code: `# sourcemap-detect.yaml
id: sourcemap-disclosure

info:
  name: Source Map File Disclosure
  severity: medium
  tags: sourcemap,exposure

requests:
  - method: GET
    path:
      - "{{BaseURL}}/main.js.map"
      - "{{BaseURL}}/app.js.map"
      - "{{BaseURL}}/bundle.js.map"
      - "{{BaseURL}}/assets/index.js.map"
    matchers:
      - type: word
        words:
          - '"sources"'
          - '"mappings"'
        condition: and
      - type: status
        status:
          - 200`
    }
  ];

  const huntingProcess = [
    {
      phase: '信息收集',
      icon: '🔍',
      tasks: [
        '识别目标使用的前端技术栈',
        '收集所有 JavaScript 文件 URL',
        '检查 robots.txt 和 sitemap',
        '使用 Wayback Machine 查找历史版本'
      ]
    },
    {
      phase: '自动化扫描',
      icon: '🤖',
      tasks: [
        '运行 Nuclei source map 模板',
        '批量检测常见 map 文件路径',
        '分析 JS 文件末尾的 sourceMappingURL',
        '检查 X-SourceMap 响应头'
      ]
    },
    {
      phase: '手动验证',
      icon: '👁️',
      tasks: [
        '使用浏览器开发者工具确认',
        '下载并还原 source map',
        '检查还原代码的完整性',
        '记录漏洞证据截图'
      ]
    },
    {
      phase: '深度分析',
      icon: '🔬',
      tasks: [
        '在源码中搜索 API 密钥',
        '分析业务逻辑漏洞',
        '查找硬编码凭据',
        '识别其他安全问题'
      ]
    },
    {
      phase: '报告撰写',
      icon: '📝',
      tasks: [
        '清晰描述漏洞',
        '提供复现步骤',
        '说明影响范围',
        '给出修复建议'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-red-100 hover:text-white mb-4">
            ← 返回首页
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">🎯</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">赏金猎人指南</h1>
              <p className="text-red-100">漏洞挖掘工具、技术方法与报告模板</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 免责声明 */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-12">
          <div className="flex items-start space-x-4">
            <span className="text-4xl">⚖️</span>
            <div>
              <h2 className="text-lg font-bold text-yellow-800 mb-2">免责声明与道德准则</h2>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• 只对授权测试的目标进行安全研究</li>
                <li>• 遵守各平台的漏洞披露政策</li>
                <li>• 不要下载、存储或滥用发现的敏感信息</li>
                <li>• 发现漏洞后及时报告给厂商</li>
                <li>• 本指南仅供安全研究和学习目的</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 推荐工具 - SourceDetector */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-5">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-5xl">🔎</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold">SourceDetector</h2>
                    <span className="px-2 py-0.5 bg-green-400 text-green-900 text-xs font-bold rounded">推荐</span>
                  </div>
                  <p className="text-purple-100 mb-2">
                    开源 Chrome 扩展，自动检测 Source Map 泄露
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-white/20 rounded">🔍 自动检测</span>
                    <span className="px-2 py-1 bg-white/20 rounded">📦 CRX 分析</span>
                    <span className="px-2 py-1 bg-white/20 rounded">💾 本地存储</span>
                    <span className="px-2 py-1 bg-white/20 rounded">📤 导出功能</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="https://chromewebstore.google.com/detail/source-detector/aioimldmpakibclgckpdfpfkadbflfkn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-all text-center"
                >
                  🌐 Chrome Web Store 安装
                </a>
                <a
                  href="https://github.com/SunHuawei/SourceDetector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 border border-white/30 font-semibold rounded-xl hover:bg-white/20 transition-all text-center"
                >
                  📂 GitHub 源码
                </a>
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-semibold mb-2">🎯 功能特点</h4>
                <ul className="text-sm text-purple-100 space-y-1">
                  <li>• 自动检测 .map 文件</li>
                  <li>• 内置敏感信息扫描规则</li>
                  <li>• 支持自定义检测规则</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-semibold mb-2">📊 数据管理</h4>
                <ul className="text-sm text-purple-100 space-y-1">
                  <li>• 按站点/版本管理资产</li>
                  <li>• 支持 ZIP 批量导出</li>
                  <li>• 本地存储无需账号</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-semibold mb-2">🔐 隐私优先</h4>
                <ul className="text-sm text-purple-100 space-y-1">
                  <li>• 数据仅存储本地</li>
                  <li>• 无远程服务器依赖</li>
                  <li>• 完全开源可审计</li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-semibold mb-2">💡 使用方法</h4>
                <ul className="text-sm text-purple-100 space-y-1">
                  <li>• 安装后访问目标站点</li>
                  <li>• 扩展自动收集资产</li>
                  <li>• 点击图标查看结果</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 漏洞挖掘流程 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">📋</span>
            漏洞挖掘流程
          </h2>

          <div className="grid md:grid-cols-5 gap-4">
            {huntingProcess.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl shadow-lg p-5 h-full">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      Phase {index + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3">{step.phase}</h3>
                  <ul className="space-y-2">
                    {step.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="text-red-400 mr-2">→</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < huntingProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-2xl text-gray-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 检测方法 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">🔍</span>
            Source Map 检测方法
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">方法 1: 检查 JS 文件注释</h3>
                <div className="bg-slate-900 rounded-xl p-4">
                  <pre className="text-green-400 text-sm font-mono">{`// JS 文件末尾的注释
//# sourceMappingURL=app.js.map
//@ sourceMappingURL=bundle.map

// 检测命令
curl -s https://example.com/app.js | tail -5`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">方法 2: 检查响应头</h3>
                <div className="bg-slate-900 rounded-xl p-4">
                  <pre className="text-green-400 text-sm font-mono">{`# 检查 X-SourceMap 或 SourceMap 响应头
curl -I https://example.com/app.js

# 可能的响应头:
# X-SourceMap: /app.js.map
# SourceMap: /static/app.js.map`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">方法 3: 常见路径探测</h3>
                <div className="bg-slate-900 rounded-xl p-4">
                  <pre className="text-green-400 text-sm font-mono">{`# 常见 source map 路径
/app.js.map
/main.js.map
/bundle.js.map
/static/js/main.*.js.map
/assets/index.*.js.map
/_next/static/chunks/*.map`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">方法 4: npm 包检查</h3>
                <div className="bg-slate-900 rounded-xl p-4">
                  <pre className="text-green-400 text-sm font-mono">{`# 下载 npm 包检查
npm pack package-name
tar -xzf package-name-*.tgz
find package -name "*.map"

# 或在线查看
https://unpkg.com/package-name/`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 工具详解 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">🧰</span>
            漏洞挖掘工具详解
          </h2>

          <div className="space-y-4">
            {tools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{tool.icon}</span>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900">{tool.name}</h3>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tool.difficulty === '简单' ? 'bg-green-100 text-green-700' :
                      tool.difficulty === '中等' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {tool.difficulty}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${expandedTool === tool.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {expandedTool === tool.id && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">📋 使用步骤</h4>
                        <ol className="space-y-2">
                          {tool.steps.map((step, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                              <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">💻 代码示例</h4>
                        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm font-mono whitespace-pre">
                            {tool.code}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 一键脚本 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">⚡</span>
            一键检测脚本
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-600 mb-4">
              复制以下脚本，在终端中运行即可快速检测目标网站
            </p>

            <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm font-mono whitespace-pre">{`#!/bin/bash
# Source Map 漏洞检测脚本
# 使用方法: ./check_sourcemap.sh https://example.com

TARGET=$1

if [ -z "$TARGET" ]; then
  echo "Usage: $0 <target_url>"
  exit 1
fi

echo "🎯 目标: $TARGET"
echo "================================"

# 1. 获取所有 JS 文件
echo "[*] 正在获取 JS 文件列表..."
JS_FILES=$(curl -s "$TARGET" | grep -oP 'src="[^"]*\\.js"' | sed 's/src="//g;s/"//g')

# 2. 检查每个 JS 文件
for JS in $JS_FILES; do
  # 处理相对路径
  if [[ $JS != http* ]]; then
    JS="$TARGET/$JS"
  fi
  
  echo "[*] 检查: $JS"
  
  # 检查 sourceMappingURL 注释
  MAP_URL=$(curl -s "$JS" | grep -oP '//[#@] sourceMappingURL=\\K.+')
  
  if [ -n "$MAP_URL" ]; then
    echo "  [!] 发现 sourceMappingURL: $MAP_URL"
    
    # 尝试访问 map 文件
    if [[ $MAP_URL != http* ]]; then
      MAP_FULL=$(dirname "$JS")/"$MAP_URL"
    else
      MAP_FULL=$MAP_URL
    fi
    
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$MAP_FULL")
    
    if [ "$STATUS" = "200" ]; then
      echo "  [!!!] 漏洞确认! Map 文件可访问: $MAP_FULL"
    else
      echo "  [+] Map 文件不可访问 (HTTP $STATUS)"
    fi
  fi
done

echo "================================"
echo "✅ 扫描完成"`}</pre>
            </div>
          </div>
        </section>

        {/* 报告模板 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">📝</span>
            漏洞报告模板
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="bg-gray-50 rounded-xl p-6 font-mono text-sm">
              <h3 className="font-bold text-lg mb-4 text-gray-900">漏洞报告：Source Map 文件泄露</h3>
              
              <div className="space-y-4 text-gray-700">
                <div>
                  <span className="font-bold text-red-600">【严重程度】</span>
                  <p>中危 (Medium) - 可能导致源代码和敏感信息泄露</p>
                </div>

                <div>
                  <span className="font-bold text-red-600">【漏洞描述】</span>
                  <p>
                    在目标网站 [TARGET_URL] 上发现 Source Map 文件可被公开访问。
                    攻击者可以利用这些文件完整还原网站的前端源代码，包括注释、
                    变量名、业务逻辑等敏感信息。
                  </p>
                </div>

                <div>
                  <span className="font-bold text-red-600">【影响范围】</span>
                  <ul className="list-disc list-inside ml-4">
                    <li>完整前端源代码泄露</li>
                    <li>可能包含硬编码的 API 密钥</li>
                    <li>业务逻辑和算法暴露</li>
                    <li>可能发现其他安全漏洞</li>
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-red-600">【复现步骤】</span>
                  <ol className="list-decimal list-inside ml-4">
                    <li>访问 [TARGET_URL]</li>
                    <li>打开浏览器开发者工具 (F12)</li>
                    <li>在 Network 面板中查看 JS 文件</li>
                    <li>检查 JS 文件末尾的 sourceMappingURL</li>
                    <li>直接访问 [MAP_FILE_URL]</li>
                    <li>使用 sourcemapper 工具还原源码</li>
                  </ol>
                </div>

                <div>
                  <span className="font-bold text-red-600">【证据截图】</span>
                  <p>[在此插入截图]</p>
                </div>

                <div>
                  <span className="font-bold text-red-600">【修复建议】</span>
                  <ol className="list-decimal list-inside ml-4">
                    <li>在生产环境构建时禁用 source map 生成</li>
                    <li>配置 Web 服务器禁止访问 .map 文件</li>
                    <li>从 JS 文件中移除 sourceMappingURL 注释</li>
                    <li>在 CI/CD 流程中添加自动化检查</li>
                  </ol>
                </div>

                <div>
                  <span className="font-bold text-red-600">【参考资料】</span>
                  <ul className="list-disc list-inside ml-4">
                    <li>https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map</li>
                    <li>CWE-540: Inclusion of Sensitive Information in Source Code</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 真实案例 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3">📰</span>
            真实案例分析
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">🤖</span>
                <div>
                  <h3 className="font-bold text-gray-900">Claude Code 源码泄露</h3>
                  <p className="text-sm text-gray-500">2026年3月31日</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                安全研究员 Chaofan Shou 在分析 Anthropic 的 Claude Code npm 包时，
                发现包内包含了完整的 source map 文件，导致整个应用的源代码可被还原。
              </p>
              <div className="bg-red-50 rounded-lg p-3 text-sm text-red-700">
                <strong>影响：</strong>完整商业源代码暴露
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">💼</span>
                <div>
                  <h3 className="font-bold text-gray-900">多家知名网站</h3>
                  <p className="text-sm text-gray-500">持续发现中</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                在 HackerOne、Bugcrowd 等平台上，source map 泄露是常见的中危漏洞类型，
                许多知名网站都曾被报告过此类问题。
              </p>
              <div className="bg-orange-50 rounded-lg p-3 text-sm text-orange-700">
                <strong>赏金：</strong>通常 $100 - $1000 不等
              </div>
            </div>
          </div>
        </section>

        {/* 底部导航 */}
        <section>
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">🎯 开始你的漏洞猎人之旅！</h2>
            <p className="text-red-100 mb-6">
              掌握了这些技能，你就可以开始在授权范围内进行安全研究了。记住遵守道德准则，负责任地披露漏洞！
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="px-6 py-3 bg-white text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors"
              >
                ← 使用在线检测工具
              </Link>
              <Link
                to="/developer"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                了解防护措施 →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
