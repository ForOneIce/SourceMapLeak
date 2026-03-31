import { Link } from 'react-router-dom';

const roles = [
  {
    id: 'beginner',
    title: '安全小白',
    icon: '🌱',
    description: '我对安全一无所知，想了解什么是 Source Map 漏洞',
    features: ['通俗易懂的解释', '交互式演示', '背景知识科普', '形象化流程图'],
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    path: '/beginner'
  },
  {
    id: 'developer',
    title: '开发人员',
    icon: '👨‍💻',
    description: '我是开发者，想知道如何防止自己的项目出现这个漏洞',
    features: ['各框架配置指南', '检测工具推荐', 'CI/CD 集成方案', '最佳实践清单'],
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    path: '/developer'
  },
  {
    id: 'hunter',
    title: '赏金猎人',
    icon: '🎯',
    description: '我是安全研究员，想学习如何发现和利用这类漏洞',
    features: ['漏洞挖掘流程', '工具使用指南', '真实案例分析', '报告撰写模板'],
    color: 'from-red-500 to-orange-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    path: '/hunter'
  }
];

export default function RoleSelector() {
  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">选择你的角色</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          根据你的背景和需求，我们为不同用户群体准备了定制化的学习内容
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Link
            key={role.id}
            to={role.path}
            className={`group ${role.bgColor} ${role.borderColor} border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
          >
            <div className={`w-16 h-16 bg-gradient-to-br ${role.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <span className="text-3xl">{role.icon}</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{role.description}</p>
            
            <ul className="space-y-2">
              {role.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <div className={`mt-6 py-3 px-4 bg-gradient-to-r ${role.color} text-white text-center rounded-xl font-medium group-hover:shadow-lg transition-all`}>
              进入学习 →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
