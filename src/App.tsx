/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Home, 
  BookOpen, 
  User, 
  Plus, 
  MessageSquare, 
  BarChart3, 
  Network, 
  Edit3, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Lock, 
  Clock, 
  TrendingUp,
  ArrowLeft,
  MoreHorizontal,
  Star,
  Trash2,
  Send
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Import modular components
import { AICreateWizard, AbilityCreateWizard, GraphCreateWizard, ManualCreateWizard } from './components/CreationWizards';
import { AssessmentPage } from './components/Assessment';
import { LearningMapPage } from './components/LearningMap';
import { TaskDetailModal } from './components/TaskDetail';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Mock Data ---
const ABILITY_DATA = [
  { subject: '逻辑思维', A: 85, fullMark: 100 },
  { subject: '专业知识', A: 65, fullMark: 100 },
  { subject: '实践能力', A: 45, fullMark: 100 },
  { subject: '创新意识', A: 70, fullMark: 100 },
  { subject: '协作沟通', A: 90, fullMark: 100 },
];

const GROWTH_DATA = [
  { name: 'Mon', hours: 2 },
  { name: 'Tue', hours: 4.5 },
  { name: 'Wed', hours: 3 },
  { name: 'Thu', hours: 5 },
  { name: 'Fri', hours: 4 },
  { name: 'Sat', hours: 7 },
  { name: 'Sun', hours: 6 },
];

const RECOMMENDED_TASKS = [
  { id: 1, title: '深度学习入门', author: '张教授', stars: 1200, tags: ['AI', '入门'], difficulty: '中等', duration: '20h' },
  { id: 2, title: 'React 高级模式', author: '李老师', stars: 850, tags: ['前端', '进阶'], difficulty: '困难', duration: '15h' },
  { id: 3, title: '产品经理实战', author: '王总', stars: 2100, tags: ['产品', '实战'], difficulty: '简单', duration: '10h' },
];

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, onGoHome }: { activeTab: string, setActiveTab: (t: string) => void, onGoHome: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-zinc-100 z-50 px-6 flex items-center justify-between">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onGoHome}>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
        <span className="text-xl font-bold tracking-tight text-zinc-900">SelfLearn</span>
      </div>
      <div className="hidden md:flex items-center bg-zinc-100 rounded-full px-4 py-1.5 gap-2 w-64">
        <Search className="w-4 h-4 text-zinc-400" />
        <input type="text" placeholder="搜索课程、任务..." className="bg-transparent border-none outline-none text-sm w-full" />
      </div>
    </div>
    <div className="flex items-center gap-6">
      <button 
        onClick={onGoHome}
        className={cn("flex items-center gap-2 text-sm font-medium transition-colors", activeTab === 'home' ? "text-indigo-600" : "text-zinc-500 hover:text-zinc-900")}
      >
        <Home className="w-4 h-4" /> 首页
      </button>
      <button 
        onClick={() => setActiveTab('tasks')}
        className={cn("flex items-center gap-2 text-sm font-medium transition-colors", activeTab === 'tasks' ? "text-indigo-600" : "text-zinc-500 hover:text-zinc-900")}
      >
        <BookOpen className="w-4 h-4" /> 我的学习任务
      </button>
      <div className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden cursor-pointer border border-zinc-100">
        <img src="https://picsum.photos/seed/user/100/100" alt="avatar" referrerPolicy="no-referrer" />
      </div>
    </div>
  </nav>
);

// --- Pages ---

const HomePage = ({ onStartCreate, onStartAssessment, onViewTaskDetail }: { onStartCreate: (type: string) => void, onStartAssessment: () => void, onViewTaskDetail: (task: any) => void }) => {
  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-12">
      {/* Banner */}
      <section className="relative h-64 rounded-3xl overflow-hidden bg-indigo-900 flex items-center px-12">
        <div className="absolute inset-0 opacity-30">
          <img src="https://picsum.photos/seed/learning/1200/400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            从“被安排”到“自我规划”
          </h1>
          <p className="text-indigo-100 text-lg max-w-md">
            开启你的自主学习之旅，AI 助你精准规划每一阶段。
          </p>
        </div>
      </section>

      {/* Create Task Entry */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { id: 'ai', title: 'AI 对话创建', icon: MessageSquare, desc: '根据目标智能生成路径', color: 'bg-blue-50 text-blue-600' },
          { id: 'ability', title: '能力推荐创建', icon: BarChart3, desc: '基于测评结果精准匹配', color: 'bg-emerald-50 text-emerald-600' },
          { id: 'graph', title: '知识图谱创建', icon: Network, desc: '勾选知识点生成路径', color: 'bg-purple-50 text-purple-600' },
          { id: 'manual', title: '手动自主创建', icon: Edit3, desc: '完全自定义学习计划', color: 'bg-orange-50 text-orange-600' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => onStartCreate(item.id)}
            className="group p-6 bg-white border border-zinc-100 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all text-left"
          >
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", item.color)}>
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 mb-1">{item.title}</h3>
            <p className="text-sm text-zinc-500">{item.desc}</p>
          </button>
        ))}
      </section>

      {/* Overview & Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-zinc-100 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-900">学习概况</h2>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">已完成任务</p>
                <p className="text-2xl font-bold text-indigo-600">12</p>
              </div>
              <div className="text-center border-l border-zinc-100 pl-4">
                <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">本周时长</p>
                <p className="text-2xl font-bold text-indigo-600">31.5h</p>
              </div>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis hide />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-100 flex flex-col items-center justify-between">
          <div className="w-full text-center">
            <h2 className="text-xl font-bold text-zinc-900 mb-1">能力画像</h2>
            <p className="text-sm text-zinc-500">基于最近 3 次测评生成</p>
          </div>
          
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ABILITY_DATA}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 10}} />
                <Radar name="能力值" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <button 
            onClick={onStartAssessment}
            className="w-full py-3 bg-zinc-900 text-white rounded-xl font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
          >
            <TrendingUp className="w-4 h-4" /> 开始能力测评
          </button>
        </div>
      </section>

      {/* Teacher Recommended */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900">教师推荐任务</h2>
          <button className="text-indigo-600 font-medium text-sm hover:underline">查看全部</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RECOMMENDED_TASKS.map(task => (
            <div key={task.id} className="bg-white border border-zinc-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  {task.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-wider rounded-md">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold">{task.stars}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-2">{task.title}</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
                <span>{task.author}</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                <span>{task.difficulty}</span>
                <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                <span>{task.duration}</span>
              </div>
              <button 
                onClick={() => onViewTaskDetail(task)}
                className="w-full py-2 border border-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-colors"
              >
                查看详情
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const MyTasksPage = ({ onEnterTask }: { onEnterTask: (id: number) => void }) => {
  const tasks = [
    { id: 101, title: '学习 JAVA', desc: '从零开始掌握 Java 核心语法与异步编程', progress: 45, stages: 3, nodes: 12 },
    { id: 102, title: 'Python 自动化实战', desc: '利用 Python 提升日常办公效率', progress: 80, stages: 2, nodes: 8 },
    { id: 103, title: 'UI/UX 设计进阶', desc: '掌握现代设计工具与交互原则', progress: 10, stages: 5, nodes: 25 },
  ];

  return (
    <div className="pt-24 pb-12 px-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-zinc-900">我的学习任务</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" /> 新建任务
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-200 transition-colors group">
            <div className="space-y-2 flex-1">
              <h3 className="text-xl font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
              <p className="text-zinc-500 text-sm">{task.desc}</p>
              <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium">
                <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> {task.stages} 阶段</span>
                <span className="flex items-center gap-1"><Network className="w-3 h-3" /> {task.nodes} 任务点</span>
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="w-32 space-y-2">
                <div className="flex justify-between text-xs font-bold text-zinc-500">
                  <span>进度</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${task.progress}%` }}></div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onEnterTask(task.id)}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  进入学习
                </button>
                <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 text-zinc-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [creationType, setCreationType] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleGoHome = () => {
    setActiveTab('home');
    setCreationType(null);
    setActiveTaskId(null);
    setIsAssessing(false);
    setSelectedTask(null);
  };

  const renderContent = () => {
    if (isAssessing) {
      return <AssessmentPage onComplete={() => setIsAssessing(false)} />;
    }

    if (activeTaskId) {
      return <LearningMapPage taskId={activeTaskId} onBack={() => setActiveTaskId(null)} />;
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            onStartCreate={(type) => setCreationType(type)} 
            onStartAssessment={() => setIsAssessing(true)}
            onViewTaskDetail={(task) => setSelectedTask(task)}
          />
        );
      case 'tasks':
        return <MyTasksPage onEnterTask={(id) => setActiveTaskId(id)} />;
      default:
        return <HomePage onStartCreate={(type) => setCreationType(type)} onStartAssessment={() => setIsAssessing(true)} onViewTaskDetail={(task) => setSelectedTask(task)} />;
    }
  };

  const renderCreationWizard = () => {
    if (!creationType) return null;
    
    switch (creationType) {
      case 'ai':
        return <AICreateWizard onComplete={() => setCreationType(null)} />;
      case 'ability':
        return <AbilityCreateWizard onComplete={() => setCreationType(null)} />;
      case 'graph':
        return <GraphCreateWizard onComplete={() => setCreationType(null)} />;
      case 'manual':
        return <ManualCreateWizard onComplete={() => setCreationType(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onGoHome={handleGoHome} />
      
      <main>
        {renderContent()}
      </main>

      <AnimatePresence>
        {renderCreationWizard()}
      </AnimatePresence>

      <AnimatePresence>
        {selectedTask && (
          <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />
        )}
      </AnimatePresence>

      {/* Footer */}
      {!activeTaskId && !isAssessing && !creationType && (
        <footer className="py-12 px-6 border-t border-zinc-100 bg-white mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold">S</div>
              <span className="text-xl font-bold tracking-tight text-zinc-900">SelfLearn</span>
            </div>
            <p className="text-zinc-400 text-sm">© 2026 SelfLearn Platform. All rights reserved.</p>
            <div className="flex gap-6 text-sm font-medium text-zinc-500">
              <a href="#" className="hover:text-zinc-900">关于我们</a>
              <a href="#" className="hover:text-zinc-900">使用指南</a>
              <a href="#" className="hover:text-zinc-900">隐私政策</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
