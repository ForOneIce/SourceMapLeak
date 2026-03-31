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
            <h3 className="text-white font-semibold mb-3">开源协议</h3>
            <p className="text-sm">
              本项目采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">CC BY-NC-SA 4.0</a> 协议开源。
              可自由分享和改编，但须署名、非商业使用、以相同协议共享。
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
          <p>© 2026 SourceMap 安全指南 | 仅供教育用途</p>
        </div>
      </div>
    </footer>
  );
}
