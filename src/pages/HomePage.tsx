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
                2026年3月31日，安全研究员 Chaofan Shou 发现 Anthropic 的 Claude Code 
                全部源码通过 npm 包里的一个 source map 文件暴露在了公网上。
                这类漏洞正在影响数以万计的网站和应用。
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#checker" className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all">
                  如何检测漏洞
                </a>
                <a href="#roles" className="px-6 py-3 border border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-all">
                  了解更多
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-2">main.js.map</span>
                </div>
                <pre className="text-sm text-green-400 overflow-x-auto">
{`{
  "version": 3,
  "sources": [
    "../../src/api/secrets.ts",
    "../../src/core/engine.ts",
    "../../src/utils/crypto.ts"
  ],
  "sourcesContent": [
    "// 💀 完整源代码暴露!",
    "const API_KEY = 'sk-xxx...';",
    "function processUserData() {",
    "  // 敏感业务逻辑...",
    "}"
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
      <section className="py-16 bg-white">
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
                  安全研究员 Chaofan Shou 在分析 Anthropic 发布的 Claude Code npm 包时，
                  发现包内包含了完整的 source map 文件。通过这个文件，任何人都可以
                  完整还原 Claude Code 的所有源代码，包括核心算法和内部实现细节。
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-orange-400 mb-2">🔍 发现过程</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• 下载并解压 npm 包</li>
                  <li>• 发现打包后的 JS 文件末尾包含 sourceMappingURL 注释</li>
                  <li>• 找到对应的 .map 文件</li>
                  <li>• 使用 source-map 工具还原完整源码</li>
                </ul>
              </div>

              <div className="bg-slate-700/50 rounded-xl p-5">
                <h3 className="font-semibold text-orange-400 mb-2">⚡ 影响范围</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  所有使用该 npm 包的开发者都可以获取完整源码。
                  这可能导致商业机密泄露、安全漏洞被发现、竞争对手抄袭等严重后果。
                </p>
              </div>

              <div className="bg-green-900/30 border border-green-700 rounded-xl p-5">
                <h3 className="font-semibold text-green-400 mb-2">✅ 修复措施</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Anthropic 在收到报告后迅速响应，发布了新版本移除了 source map 文件，
                  并更新了构建流程以防止类似问题再次发生。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
