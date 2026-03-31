import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function BeginnerPage() {
  const [demoStep, setDemoStep] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const demoSteps = [
    {
      title: '1. 开发者编写源代码',
      code: `// 原始代码 - 清晰易读
function calculateDiscount(price, userType) {
  // VIP用户享受8折优惠
  if (userType === 'VIP') {
    return price * 0.8;
  }
  // 普通用户9折
  return price * 0.9;
}`,
      description: '开发者写的代码包含清晰的变量名、注释和业务逻辑'
    },
    {
      title: '2. 构建工具打包压缩',
      code: `function a(b,c){return"VIP"===c?b*.8:b*.9}`,
      description: '打包工具将代码压缩、混淆，变量名变成无意义的字母'
    },
    {
      title: '3. 同时生成 Source Map',
      code: `{
  "version": 3,
  "sources": ["src/discount.js"],
  "sourcesContent": ["function calculateDiscount..."],
  "names": ["calculateDiscount", "price", "userType"],
  "mappings": "AAAA,SAASA,gBAAgBC..."
}`,
      description: 'Source Map 记录了压缩前后代码的映射关系'
    },
    {
      title: '4. 攻击者获取 Source Map',
      code: `# 在浏览器开发者工具中发现
//# sourceMappingURL=app.js.map

# 直接访问
GET https://example.com/app.js.map
→ 200 OK ✓ 泄露!`,
      description: '攻击者通过多种方式发现并下载 Source Map 文件'
    },
    {
      title: '5. 完整还原源代码',
      code: `// 还原后的原始代码 - 完全泄露!
function calculateDiscount(price, userType) {
  // VIP用户享受8折优惠 ← 业务逻辑暴露
  if (userType === 'VIP') {
    return price * 0.8;
  }
  // 普通用户9折
  return price * 0.9;
}`,
      description: '使用工具一键还原，获得包含注释的完整源代码'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center text-green-100 hover:text-white mb-4">
            ← 返回首页
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="text-4xl">🌱</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">新手入门指南</h1>
              <p className="text-green-100">用最通俗的方式理解 Source Map 漏洞</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 什么是 Source Map */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">📚</span>
            什么是 Source Map？
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">用一个比喻来解释</h3>
                <div className="space-y-4 text-gray-600">
                  <p>
                    想象你写了一本<strong>详细的菜谱</strong>，里面包含了所有步骤、小窍门和秘方。
                  </p>
                  <p>
                    为了保护商业机密，你把它<strong>翻译成了一种密码语言</strong>出版。
                    别人看到的只是一堆无意义的符号。
                  </p>
                  <p>
                    但是，你不小心把<strong>密码对照表</strong>（Source Map）
                    也放进了书里！
                  </p>
                  <p className="font-semibold text-red-600">
                    任何人只要拿到这个对照表，就能把密码还原成原始菜谱！
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">📝</div>
                    <div className="flex-1 bg-white rounded-lg p-3">
                      <p className="text-sm font-medium">原始源代码</p>
                      <p className="text-xs text-gray-500">清晰易读，包含注释</p>
                    </div>
                  </div>
                  <div className="text-center text-2xl">⬇️ 打包压缩</div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl">🔐</div>
                    <div className="flex-1 bg-white rounded-lg p-3">
                      <p className="text-sm font-medium">压缩后的代码</p>
                      <p className="text-xs text-gray-500">难以阅读，变量混淆</p>
                    </div>
                  </div>
                  <div className="text-center text-2xl">➕</div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white text-xl">🗺️</div>
                    <div className="flex-1 bg-white rounded-lg p-3 border-2 border-red-300">
                      <p className="text-sm font-medium text-red-600">Source Map 文件</p>
                      <p className="text-xs text-gray-500">危险！可以还原源码</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 交互式演示 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">🎮</span>
            交互式演示：漏洞产生全过程
          </h2>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gray-100 p-4">
              <div className="flex justify-between mb-2">
                {demoSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setDemoStep(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      index === demoStep 
                        ? 'bg-green-500 text-white scale-110' 
                        : index < demoStep 
                        ? 'bg-green-200 text-green-700'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((demoStep + 1) / demoSteps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {demoSteps[demoStep].title}
              </h3>
              <p className="text-gray-600 mb-4">{demoSteps[demoStep].description}</p>
              
              <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                  {demoSteps[demoStep].code}
                </pre>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setDemoStep(Math.max(0, demoStep - 1))}
                  disabled={demoStep === 0}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  ← 上一步
                </button>
                <button
                  onClick={() => setDemoStep(Math.min(demoSteps.length - 1, demoStep + 1))}
                  disabled={demoStep === demoSteps.length - 1}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                >
                  下一步 →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 为什么会有这个漏洞 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">🤔</span>
            为什么会产生这个漏洞？
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">🔧</span>
                Source Map 的本意是好的
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  帮助开发者调试压缩后的代码
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  在浏览器中显示原始代码位置
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  错误堆栈能指向源代码行号
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">❌</span>
                问题出在哪？
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  默认配置生成 Source Map
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  开发者忘记在生产环境关闭
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  .map 文件被一起部署上线
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  npm 包发布时包含了 map 文件
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 流程图 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">📊</span>
            漏洞产生流程图
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="flex items-center justify-between">
                {/* Step 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mb-2">
                    👨‍💻
                  </div>
                  <p className="text-sm font-medium text-center">开发者<br/>编写代码</p>
                </div>

                <div className="text-3xl text-gray-300">→</div>

                {/* Step 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl mb-2">
                    ⚙️
                  </div>
                  <p className="text-sm font-medium text-center">构建工具<br/>打包压缩</p>
                </div>

                <div className="text-3xl text-gray-300">→</div>

                {/* Step 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center text-3xl mb-2">
                    📄
                  </div>
                  <p className="text-sm font-medium text-center">生成<br/>Source Map</p>
                </div>

                <div className="text-3xl text-gray-300">→</div>

                {/* Step 4 - Branch */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-20 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl mb-2 border-2 border-orange-300">
                    ⚠️
                  </div>
                  <p className="text-sm font-medium text-center text-orange-600">忘记删除<br/>一起部署</p>
                </div>

                <div className="text-3xl text-gray-300">→</div>

                {/* Step 5 */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center text-3xl mb-2 border-2 border-red-300">
                    💀
                  </div>
                  <p className="text-sm font-medium text-center text-red-600">源码<br/>完全泄露</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 小测验 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-3">🎯</span>
            小测验：检验你的理解
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              问题：Source Map 文件泄露最主要的危害是什么？
            </h3>

            <div className="space-y-3">
              {[
                { id: 0, text: '网站加载速度变慢', correct: false },
                { id: 1, text: '完整源代码被攻击者获取', correct: true },
                { id: 2, text: '用户数据被窃取', correct: false },
                { id: 3, text: '服务器被入侵', correct: false },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setQuizAnswer(option.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    quizAnswer === null
                      ? 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                      : quizAnswer === option.id
                      ? option.correct
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : option.correct && quizAnswer !== null
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 opacity-50'
                  }`}
                >
                  <span className="font-medium">{String.fromCharCode(65 + option.id)}. {option.text}</span>
                </button>
              ))}
            </div>

            {quizAnswer !== null && (
              <div className={`mt-6 p-4 rounded-xl ${quizAnswer === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {quizAnswer === 1 ? (
                  <p>✅ 正确！Source Map 文件包含完整的源代码映射信息，攻击者可以轻松还原原始代码，获取业务逻辑、API密钥、注释等敏感信息。</p>
                ) : (
                  <p>❌ 不太对。正确答案是 B。Source Map 主要风险是源代码泄露，虽然这可能间接导致其他安全问题，但最直接的危害是代码暴露。</p>
                )}
              </div>
            )}

            {quizAnswer !== null && (
              <button
                onClick={() => setQuizAnswer(null)}
                className="mt-4 text-green-600 hover:text-green-800 font-medium"
              >
                重新答题
              </button>
            )}
          </div>
        </section>

        {/* 总结 */}
        <section>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">📝 总结</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-xl p-4">
                <h3 className="font-semibold mb-2">Source Map 是什么</h3>
                <p className="text-sm text-green-100">
                  一种映射文件，用于将压缩代码映射回原始源代码
                </p>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <h3 className="font-semibold mb-2">漏洞如何产生</h3>
                <p className="text-sm text-green-100">
                  开发者在生产环境部署时没有移除 .map 文件
                </p>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <h3 className="font-semibold mb-2">造成什么危害</h3>
                <p className="text-sm text-green-100">
                  攻击者可以完整还原源代码，获取敏感信息
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/developer"
                className="px-6 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors"
              >
                我是开发者，如何防护？ →
              </Link>
              <Link
                to="/hunter"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                深入学习漏洞挖掘 →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
