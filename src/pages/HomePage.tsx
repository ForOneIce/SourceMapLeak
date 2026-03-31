import VulnerabilityChecker from '../components/VulnerabilityChecker';
import RoleSelector from '../components/RoleSelector';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-sm mb-6">
                <span className="animate-pulse mr-2">🔴</span>
                安全警示：Claude Code 源码泄露事件
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Source Map 文件
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500"> 泄露漏洞 </span>
                全面解析
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                2026年3月31日，安全研究员 Chaofan Shou 发现 Anthropic 的 Claude Code CLI 工具（npm 包 @anthropic-ai/claude-code）
                因构建流程配置错误，将 .map 文件打包进了发布产物。
                约 1,900 个 TypeScript 文件、超过 512,000 行完整源代码因此暴露在公网上。
              </p>

              <div className="flex flex-wrap gap-4">
                <button onClick={() => document.getElementById('checker')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all cursor-pointer">
                  如何检测漏洞
                </button>
                <button onClick={() => document.getElementById('case-study')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 border border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-all cursor-pointer">
                  了解更多
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-2">cli.js.map — @anthropic-ai/claude-code</span>
                </div>
                <pre className="text-sm text-green-400 overflow-x-auto">
{`{
  "version": 3,
  "sources": [
    "../../src/core/QueryEngine.ts",
    "../../src/tools/BashTool.ts",
    "../../src/tools/FileReadTool.ts",
    "../../src/tools/AgentTool.ts",
    "../../src/commands/commands.ts",
    "../../src/features/buddy/Buddy.ts"
  ],
  "sourcesContent": [
    "// 💀 46,000 行 LLM 引擎源码",
    "// 💀 ~40 个内置 Agent 工具",
    "// 💀 ~85 个斜杠命令",
    "// 💀 未发布的 BUDDY 数字宠物",
    "// 1,900 个文件 · 512,000+ 行"
  ],
  "mappings": "AAAA,SAAS..."
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600">85%+</div>
              <p className="text-gray-600 text-sm mt-1">现代网站使用打包工具</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-600">40%+</div>
              <p className="text-gray-600 text-sm mt-1">可能存在此漏洞</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-600">100%</div>
              <p className="text-gray-600 text-sm mt-1">源码可被还原</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600">5分钟</div>
              <p className="text-gray-600 text-sm mt-1">即可修复漏洞</p>
            </div>
          </div>
        </div>
      </section>

      {/* Checker Section */}
      <section id="checker" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <VulnerabilityChecker />
        </div>
      </section>

      {/* What is Source Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">什么是 Source Map 漏洞？</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Source Map 是一种映射文件，用于将压缩/混淆后的代码映射回原始源代码。
              当这些文件被错误地部署到生产环境时，攻击者可以轻松获取完整的源代码。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">打包过程产生</h3>
              <p className="text-gray-600 text-sm">
                Webpack、Vite、Rollup 等构建工具在打包时会生成 .map 文件，
                用于调试压缩后的代码。
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">错误部署暴露</h3>
              <p className="text-gray-600 text-sm">
                许多开发者不小心将 .map 文件部署到生产环境，
                或者在 JS 文件中保留了 sourceMappingURL 注释。
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
              <div className="w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">💀</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">源码完全泄露</h3>
              <p className="text-gray-600 text-sm">
                攻击者可以完整还原原始代码，包括注释、变量名、
                API密钥、业务逻辑等敏感信息。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selector Section */}
      <section id="roles" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoleSelector />
        </div>
      </section>

      {/* Claude Code Case Study */}
      <section id="case-study" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🔥</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Claude Code 源码泄露事件</h2>
                <p className="text-gray-400">2026年3月31日 - 真实安全事件回顾</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-orange-400 mb-2">📋 事件概述</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  安全研究员 Chaofan Shou 发现 Anthropic 发布在 npm 上的 
                  <code className="bg-slate-600 px-1.5 rounded text-xs">@anthropic-ai/claude-code</code> 包（v2.1.88）
                  因构建流程配置错误，将 <code className="bg-slate-600 px-1.5 rounded text-xs">.map</code> 源映射文件打包进了发布产物。
                  该文件引用了一个 R2 存储桶 URL，其中包含完整的、未混淆的 TypeScript 原始源码。
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-orange-400 mb-2">🔍 泄露规模</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• 约 <strong className="text-white">1,900 个 TypeScript 文件</strong>，超过 <strong className="text-white">512,000 行</strong>代码</li>
                  <li>• 核心文件：QueryEngine.ts（46,000 行）、Tool.ts（29,000 行）、commands.ts（25,000 行）</li>
                  <li>• 暴露约 40 个内置工具（BashTool、FileReadTool、AgentTool、MCPTool 等）</li>
                  <li>• 暴露约 85 个斜杠命令（/commit、/review、/mcp、/memory 等）</li>
                  <li>• 暴露内部特性标志：PROACTIVE、VOICE_MODE、BRIDGE_MODE、KAIROS</li>
                  <li>• 暴露未发布功能：代号 BUDDY 的数字宠物系统、多 Agent 协调模式等</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-orange-400 mb-2">⚡ 事件影响</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>
                    Anthropic 发现后迅速推送了不含 source map 的新版本，并从 npm 删除了旧版本。
                    但缓存副本已被下载，数小时内出现多个 GitHub 镜像仓库，累计获得超过 1,100 Stars 和 1,900 Forks。
                  </p>
                  <p>
                    值得注意的是，这并非首次泄露 — 早在 2025 年 2 月 24 日的初始 npm 发布中（v0.2.8），
                    source map 就已随包一起发布，在被正式发现前已在公网上存在超过 13 个月。
                  </p>
                  <p>
                    这也是 Anthropic 五天内的第二次泄露事件：3月26日，一个 CMS 配置错误曾暴露了
                    未发布的「Claude Mythos」模型细节和 3,000 份未公开资产。
                  </p>
                </div>
              </div>

              <div className="bg-green-900/30 border border-green-700 rounded-xl p-5">
                <h3 className="font-semibold text-green-400 mb-2">💡 事件启示</h3>
                <div className="text-gray-300 text-sm space-y-2">
                  <p>
                    根本原因是构建流程（Build Pipeline）的配置疏忽 — source map 本应仅用于开发环境调试，
                    却被打包进了生产发布产物。这是一个典型的供应链安全问题。
                  </p>
                  <p>
                    <strong className="text-green-300">防护要点：</strong>在构建阶段禁用 source map 生成；
                    在 package.json 的 <code className="bg-green-800/50 px-1.5 rounded text-xs">files</code> 字段使用白名单；
                    发布前用 <code className="bg-green-800/50 px-1.5 rounded text-xs">npm pack --dry-run</code> 检查内容；
                    在 CI/CD 中加入自动化检查步骤。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
