export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">关于本站</h3>
            <p className="text-sm">
              致力于 Source Map 漏洞的安全科普与防护指导，帮助开发者和安全研究员理解并防范此类安全风险。
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">相关事件</h3>
            <p className="text-sm">
              2026年3月31日，安全研究员 Chaofan Shou 发现 @anthropic-ai/claude-code npm 包因构建流程配置错误打包了 .map 文件，
              导致约 1,900 个文件、512,000+ 行完整源码泄露。
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">免责声明</h3>
            <p className="text-sm">
              本站仅供安全研究与学习目的。请遵守相关法律法规，勿将技术用于非法用途。
            </p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm">
          <p>© 2026 SourceMap 安全科普中心 | 仅供教育用途</p>
        </div>
      </div>
    </footer>
  );
}
