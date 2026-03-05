import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Trash2, 
  Play, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Network, 
  BarChart3, 
  BookOpen,
  MessageSquare, 
  Edit3 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Shared Components ---
const WizardHeader = ({ title, step, onBack }: { title: string, step: number, onBack: () => void }) => (
  <header className="h-16 bg-white border-b border-zinc-100 px-6 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h2 className="font-bold text-lg">{title}</h2>
    </div>
    <div className="flex gap-2">
      {[1, 2, 3].map(i => (
        <div key={i} className={cn("w-8 h-1.5 rounded-full transition-colors", step >= i ? "bg-indigo-600" : "bg-zinc-200")}></div>
      ))}
    </div>
  </header>
);

// --- 1. AI Create Wizard ---
export const AICreateWizard = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是你的 AI 学习助理。我已经收到了你的初步目标，并生成了初步阶段规划，为了让路径更贴合你的需求，你可以对我进行需求补充。' }
  ]);
  const [input, setInput] = useState('');

  const stages = [
    { id: 1, title: '第一阶段：核心语法', nodes: ['变量与作用域', '闭包与原型链', '异步编程基础'] },
    { id: 2, title: '第二阶段：工程化实践', nodes: ['Webpack 配置', 'Babel 转译', '模块化标准'] },
    { id: 3, title: '第三阶段：框架进阶', nodes: ['React 渲染机制', 'Hooks 深度解析', '状态管理方案'] },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: '好的，我已经根据你的反馈调整了规划。现在增加了更多关于性能优化的实战环节。' }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-zinc-50 z-[60] flex flex-col">
      <WizardHeader title="AI 智能创建学习任务" step={step} onBack={onComplete} />
      <main className="flex-1 overflow-hidden p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <h3 className="text-2xl font-bold text-zinc-900">设置你的学习目标</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">学习目标</label>
                  <input type="text" placeholder="例如：掌握 React 核心技术" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-indigo-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">目标描述</label>
                  <textarea rows={3} placeholder="详细描述你想达到的程度..." className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-indigo-600 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">学习周期</label>
                    <select className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-indigo-600">
                      <option>1 周</option><option>2 周</option><option>1 个月</option><option>3 个月</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">目标类型</label>
                    <select className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl outline-none focus:border-indigo-600">
                      <option>考试/认证</option><option>项目实战</option><option>学术研究</option><option>兴趣爱好</option>
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">下一步</button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl border border-zinc-100 flex flex-col overflow-hidden shadow-sm">
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((m, i) => (
                    <div key={i} className={cn("flex", m.role === 'user' ? "justify-end" : "justify-start")}>
                      <div className={cn("max-w-[80%] p-4 rounded-2xl text-sm", m.role === 'user' ? "bg-indigo-600 text-white rounded-tr-none" : "bg-zinc-100 text-zinc-800 rounded-tl-none")}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-zinc-100 flex gap-2">
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} type="text" placeholder="补充你的需求..." className="flex-1 bg-zinc-50 border border-zinc-100 rounded-xl px-4 outline-none" />
                  <button onClick={handleSend} className="p-3 bg-indigo-600 text-white rounded-xl"><Send className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">目标概览</h4>
                  <p className="font-bold text-zinc-900">掌握 React 核心技术</p>
                  <p className="text-sm text-zinc-500">周期：1 个月 | 类型：项目实战</p>
                </div>
                <div className="flex-1 bg-white p-6 rounded-3xl border border-zinc-100 shadow-sm overflow-y-auto">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">初步规划阶段</h4>
                  <div className="space-y-4">
                    {stages.map((s, idx) => (
                      <div key={s.id} className="relative pl-6 border-l-2 border-zinc-100 pb-4 last:pb-0">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-600"></div>
                        <h5 className="font-bold text-zinc-900 text-sm mb-2">{s.title}</h5>
                        <div className="flex flex-wrap gap-2">
                          {s.nodes.map(n => <span key={n} className="px-2 py-1 bg-zinc-50 text-zinc-500 text-[10px] font-medium rounded border border-zinc-100">{n}</span>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 border border-zinc-200 rounded-xl font-bold">修改目标</button>
                  <button onClick={() => setStep(3)} className="flex-1 py-3 bg-zinc-900 text-white rounded-xl font-bold">生成路径</button>
                </div>
              </div>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto h-full flex flex-col gap-6">
              <div className="flex-1 bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-y-auto p-8">
                <h3 className="text-2xl font-bold text-zinc-900 mb-8">最终学习路径生成</h3>
                <div className="space-y-8">
                  {stages.map((s, idx) => (
                    <div key={s.id} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                        <h4 className="text-lg font-bold text-zinc-900">{s.title}</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-2 pl-12">
                        {s.nodes.map(n => (
                          <div key={n} className="group flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                            <div className="flex items-center gap-3"><Play className="w-4 h-4 text-indigo-600" /><span className="text-sm font-medium text-zinc-700">{n}</span></div>
                            <button className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(2)} className="flex-1 py-4 border border-zinc-200 rounded-xl font-bold">重新生成</button>
                <button onClick={onComplete} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold">添加到我的任务</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- 2. Ability Create Wizard ---
export const AbilityCreateWizard = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const ABILITY_DATA = [
    { subject: '逻辑思维', A: 85, fullMark: 100 },
    { subject: '专业知识', A: 65, fullMark: 100 },
    { subject: '实践能力', A: 45, fullMark: 100 },
    { subject: '创新意识', A: 70, fullMark: 100 },
    { subject: '协作沟通', A: 90, fullMark: 100 },
  ];

  const recommendedPath = [
    { title: '阶段一：基础补强', nodes: ['数据结构精讲', '算法导论实战'] },
    { title: '阶段二：实战进阶', nodes: ['高并发系统设计', '分布式缓存应用'] },
  ];

  return (
    <div className="fixed inset-0 bg-zinc-50 z-[60] flex flex-col">
      <WizardHeader title="能力推荐创建" step={step} onBack={onComplete} />
      <main className="flex-1 overflow-hidden p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="ab1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">基于你的能力画像</h3>
                <p className="text-zinc-500">系统分析了你的各项能力维度，为你推荐了以下补强路径。你可以点击按钮重新测评以更新画像。</p>
                <button className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-bold">重新测评</button>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ABILITY_DATA}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12}} />
                    <Radar name="能力值" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="lg:col-span-2">
                <button onClick={() => setStep(2)} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">生成推荐路径</button>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="ab2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto h-full flex flex-col gap-6">
              <div className="flex-1 bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-y-auto p-8">
                <h3 className="text-2xl font-bold mb-8">推荐学习路径</h3>
                <div className="space-y-8">
                  {recommendedPath.map((s, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">{idx + 1}</div>
                        <h4 className="text-lg font-bold">{s.title}</h4>
                      </div>
                      <div className="grid grid-cols-1 gap-2 pl-12">
                        {s.nodes.map(n => (
                          <div key={n} className="group flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                            <div className="flex items-center gap-3"><Play className="w-4 h-4 text-indigo-600" /><span className="text-sm font-medium">{n}</span></div>
                            <button className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 border border-zinc-200 rounded-xl font-bold">重新生成</button>
                <button onClick={onComplete} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold">添加到我的任务</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- 3. Graph Create Wizard ---
const KNOWLEDGE_GRAPH_DATA = {
  center: "外科基础与临床整合核心课",
  branches: [
    { id: 'b1', title: '生理学', color: 'bg-emerald-500', points: ['细胞生理', '血液循环', '呼吸生理'] },
    { id: 'b2', title: '病理生理学', color: 'bg-cyan-400', points: ['休克', '酸碱平衡紊乱', '炎症反应'] },
    { id: 'b3', title: '病理学', color: 'bg-indigo-400', points: ['局部物理改变', '胆压升高'] },
    { id: 'b4', title: '诊断学', color: 'bg-lime-500', points: ['症状与体征', '体格检查'] },
    { id: 'b5', title: '外科学', color: 'bg-rose-400', points: ['胆道疾病', '胆道梗阻', '严重度分级'] },
    { id: 'b6', title: '外科学总论', color: 'bg-orange-500', points: ['外科感染', '水电解质紊乱', '初始复苏'] },
  ]
};

const SELECTION_POOL = [
  { id: 'p1', title: '急性梗阻性化脓性胆管炎', category: '外科学', path: '胆道疾病 > 胆道感染', status: '未学习' },
  { id: 'p2', title: '胆道寄生虫', category: '外科学', path: '胆道梗阻病因', status: '未学习' },
  { id: 'p3', title: '胆管结石', category: '外科学', path: '胆道梗阻病因', status: '良好' },
  { id: 'p4', title: '良性狭窄', category: '外科学', path: '胆道梗阻病因', status: '待提高' },
  { id: 'p5', title: '胆胰肿瘤', category: '外科学', path: '胆道疾病 > 胆道感染', status: '未学习' },
  { id: 'p6', title: '慢性胰腺炎', category: '编程开发', path: 'JavaScript', status: '未学习' }, // Note: Mock data mismatch in Figure 2, keeping it for variety
  { id: 'p7', title: '肝内胆管分段', category: '解剖学', path: '胆道系统解剖', status: '已掌握' },
  { id: 'p8', title: '肝外胆道走行', category: '解剖学', path: '胆道系统解剖', status: '未学习' },
  { id: 'p9', title: 'Vater壶腹', category: '解剖学', path: '胆道系统解剖', status: '未学习' },
  { id: 'p10', title: '胆道血供', category: '解剖学', path: '胆道系统解剖', status: '已掌握' },
  { id: 'p11', title: '感染途径', category: '微生物学', path: '细菌感染与定植', status: '待提高' },
  { id: 'p12', title: '常见病原菌', category: '微生物学', path: '细菌感染与定植', status: '已掌握' },
];

export const GraphCreateWizard = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1); // 1: Graph View, 2: Recommended Path
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState('全部知识点');
  const [filterStatus, setFilterStatus] = useState('全部');

  const categories = ['全部知识点', '病理学', '外科学', '诊断学', '微生物学', '病理生理学', '解剖学'];
  const statuses = ['全部', '未学习', '待提高', '良好', '已掌握'];

  const filteredPool = SELECTION_POOL.filter(p => {
    const catMatch = filterCategory === '全部知识点' || p.category === filterCategory;
    const statusMatch = filterStatus === '全部' || p.status === filterStatus;
    return catMatch && statusMatch;
  });

  const selectedPoints = SELECTION_POOL.filter(p => selectedIds.includes(p.id));

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleGenerate = () => {
    setIsModalOpen(false);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 bg-zinc-50 z-[60] flex flex-col">
      <WizardHeader title="知识图谱创建" step={step} onBack={onComplete} />
      
      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="graph-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full w-full bg-white relative overflow-hidden"
            >
              {/* Background Grid Dots */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

              {/* Floating Button */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> 生成学习任务
                </button>
              </div>

              {/* Legend */}
              <div className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-zinc-100 shadow-sm space-y-3 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-medium text-zinc-600">核心课程</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                  <span className="text-xs font-medium text-zinc-600">一级学科</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-zinc-100 border border-zinc-200"></div>
                  <span className="text-xs font-medium text-zinc-600">知识节点</span>
                </div>
              </div>

              {/* Graph Visualization (Simplified) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                  {/* Center Node */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-blue-500 shadow-[0_0_60px_rgba(59,130,246,0.5)] flex items-center justify-center p-8 text-center z-10 border-8 border-blue-400/30">
                    <span className="text-white text-2xl font-bold leading-tight">{KNOWLEDGE_GRAPH_DATA.center}</span>
                  </div>

                  {/* Branches */}
                  {KNOWLEDGE_GRAPH_DATA.branches.map((branch, idx) => {
                    const angle = (idx * (360 / KNOWLEDGE_GRAPH_DATA.branches.length)) * (Math.PI / 180);
                    const radius = 280;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <React.Fragment key={branch.id}>
                        {/* Line to center */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <line 
                            x1="50%" y1="50%" 
                            x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`} 
                            stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" 
                          />
                        </svg>
                        
                        {/* Branch Node */}
                        <div 
                          style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                          className={cn(
                            "absolute -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-2xl text-white font-bold shadow-lg transition-transform hover:scale-110 cursor-default",
                            branch.color
                          )}
                        >
                          {branch.title}
                        </div>

                        {/* Sub-points (Knowledge Nodes) */}
                        {branch.points.map((point, pIdx) => {
                          const pAngle = angle + (pIdx - 1) * 0.2;
                          const pRadius = radius + 120;
                          const px = Math.cos(pAngle) * pRadius;
                          const py = Math.sin(pAngle) * pRadius;

                          return (
                            <React.Fragment key={point}>
                              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                <line 
                                  x1={`calc(50% + ${x}px)`} y1={`calc(50% + ${y}px)`} 
                                  x2={`calc(50% + ${px}px)`} y2={`calc(50% + ${py}px)`} 
                                  stroke="#f1f5f9" strokeWidth="1" 
                                />
                              </svg>
                              <div 
                                style={{ left: `calc(50% + ${px}px)`, top: `calc(50% + ${py}px)` }}
                                className="absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 bg-white border border-zinc-100 rounded-lg text-[10px] font-medium text-zinc-500 shadow-sm whitespace-nowrap"
                              >
                                {point}
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="recommended-path"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto h-full flex flex-col gap-6 p-6"
            >
              <div className="flex-1 bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-y-auto p-8">
                <h3 className="text-2xl font-bold text-zinc-900 mb-8">生成的推荐路径</h3>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                      <h4 className="text-lg font-bold">知识巩固阶段</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-2 pl-12">
                      {selectedPoints.map(n => (
                        <div key={n.id} className="group flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                          <div className="flex items-center gap-3">
                            <Play className="w-4 h-4 text-indigo-600" />
                            <span className="text-sm font-medium text-zinc-700">{n.title}</span>
                          </div>
                          <button 
                            onClick={() => toggleSelect(n.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 text-zinc-400 hover:text-red-600 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-1 py-4 border border-zinc-200 rounded-xl font-bold hover:bg-white transition-colors">重新选择</button>
                <button onClick={onComplete} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">添加到我的任务</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selection Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-6xl h-[85vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
              >
                <header className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-zinc-900">生成学习任务</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                    <Plus className="w-5 h-5 rotate-45 text-zinc-400" />
                  </button>
                </header>

                <div className="flex-1 flex overflow-hidden">
                  {/* Left: Selection Area */}
                  <div className="flex-1 flex flex-col overflow-hidden border-r border-zinc-100">
                    <div className="p-8 space-y-6 overflow-y-auto">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <h4 className="font-bold text-zinc-900">知识点选择</h4>
                      </div>

                      {/* Filters */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-zinc-400 w-16">一级分类</span>
                          <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                              <button 
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={cn(
                                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                                  filterCategory === cat ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                )}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-bold text-zinc-400 w-16">掌握情况</span>
                          <div className="flex flex-wrap gap-2">
                            {statuses.map(status => (
                              <button 
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={cn(
                                  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
                                  filterStatus === status ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                )}
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredPool.map(point => (
                          <div 
                            key={point.id}
                            onClick={() => toggleSelect(point.id)}
                            className={cn(
                              "p-4 rounded-2xl border transition-all cursor-pointer group relative",
                              selectedIds.includes(point.id) ? "border-blue-600 bg-blue-50/50" : "border-zinc-100 bg-white hover:border-zinc-300"
                            )}
                          >
                            <div className="flex gap-3">
                              <div className={cn(
                                "w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-colors",
                                selectedIds.includes(point.id) ? "bg-blue-600 border-blue-600" : "border-zinc-300 bg-white"
                              )}>
                                {selectedIds.includes(point.id) && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-bold text-zinc-900 text-sm mb-1 truncate">{point.title}</h5>
                                <p className="text-[10px] text-zinc-400 truncate">{point.category} &gt; {point.path}</p>
                              </div>
                              <span className={cn(
                                "text-[10px] font-bold px-2 py-0.5 rounded h-fit",
                                point.status === '未学习' ? "bg-blue-100 text-blue-600" :
                                point.status === '待提高' ? "bg-rose-100 text-rose-600" :
                                point.status === '良好' ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                              )}>
                                {point.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Selected List */}
                  <div className="w-80 bg-zinc-50/50 flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-zinc-100 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-zinc-900">已选知识点</h4>
                      <span className="ml-auto text-xs font-bold text-zinc-400">{selectedIds.length}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {selectedPoints.map((point, idx) => (
                        <div key={point.id} className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm flex items-center gap-3 group">
                          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-bold text-zinc-900 truncate">{point.title}</h5>
                            <p className="text-[10px] text-zinc-400 truncate">{point.category} &gt; {point.path}</p>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleSelect(point.id); }}
                            className="p-1 text-zinc-300 hover:text-zinc-900 transition-colors"
                          >
                            <Plus className="w-4 h-4 rotate-45" />
                          </button>
                        </div>
                      ))}
                      {selectedIds.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2 opacity-40">
                          <div className="w-12 h-12 rounded-full bg-zinc-200 flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-zinc-400" />
                          </div>
                          <p className="text-sm font-medium text-zinc-500">暂未选择知识点</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <footer className="p-6 border-t border-zinc-100 flex justify-center gap-4 bg-white">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="px-12 py-3 border border-zinc-200 rounded-xl font-bold text-zinc-600 hover:bg-zinc-50 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    disabled={selectedIds.length === 0}
                    onClick={handleGenerate}
                    className="px-12 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-100"
                  >
                    加入我的任务
                  </button>
                </footer>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// --- 4. Manual Create Wizard ---
export const ManualCreateWizard = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [stages, setStages] = useState([{ id: 1, title: '第一阶段', nodes: [] as string[] }]);
  
  const resourcePool = ['Java 基础', 'Spring Boot 进阶', 'MySQL 优化', 'Redis 缓存', 'Docker 部署'];

  const addStage = () => setStages([...stages, { id: Date.now(), title: `新阶段 ${stages.length + 1}`, nodes: [] }]);
  const addNodeToStage = (stageId: number, node: string) => {
    setStages(stages.map(s => s.id === stageId ? { ...s, nodes: [...s.nodes, node] } : s));
  };

  return (
    <div className="fixed inset-0 bg-zinc-50 z-[60] flex flex-col">
      <WizardHeader title="手动自主创建" step={step} onBack={onComplete} />
      <main className="flex-1 overflow-hidden p-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="m1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm space-y-6">
              <h3 className="text-2xl font-bold">基础信息</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">任务名称</label>
                  <input type="text" placeholder="输入任务名称" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">任务描述</label>
                  <textarea rows={3} placeholder="输入任务描述" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl outline-none resize-none" />
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">下一步</button>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="m2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-3xl border border-zinc-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                  <h3 className="font-bold">阶段规划</h3>
                  <button onClick={addStage} className="text-indigo-600 text-sm font-bold flex items-center gap-1"><Plus className="w-4 h-4" /> 添加阶段</button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {stages.map((s, idx) => (
                    <div key={s.id} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-4">
                      <div className="flex justify-between items-center">
                        <input value={s.title} onChange={(e) => setStages(stages.map(st => st.id === s.id ? { ...st, title: e.target.value } : st))} className="bg-transparent font-bold text-zinc-900 outline-none" />
                        <button onClick={() => setStages(stages.filter(st => st.id !== s.id))} className="text-zinc-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="space-y-2">
                        {s.nodes.map((n, nIdx) => (
                          <div key={nIdx} className="p-3 bg-white rounded-xl border border-zinc-100 text-sm flex justify-between items-center">
                            <span>{n}</span>
                            <button onClick={() => setStages(stages.map(st => st.id === s.id ? { ...st, nodes: st.nodes.filter((_, i) => i !== nIdx) } : st))} className="text-zinc-400 hover:text-red-600"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        ))}
                        {s.nodes.length === 0 && <p className="text-xs text-zinc-400 text-center py-4 border-2 border-dashed border-zinc-200 rounded-xl">暂无任务点，请从右侧添加</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-3xl border border-zinc-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-6 border-b border-zinc-100">
                  <h3 className="font-bold">资源池</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {resourcePool.map(res => (
                    <div key={res} className="p-4 bg-zinc-50 rounded-xl border border-zinc-100 flex justify-between items-center group">
                      <span className="text-sm font-medium">{res}</span>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {stages.map((_, i) => (
                          <button key={i} onClick={() => addNodeToStage(stages[i].id, res)} className="w-6 h-6 rounded bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">{i + 1}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-zinc-100">
                  <button onClick={onComplete} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold">完成创建</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
