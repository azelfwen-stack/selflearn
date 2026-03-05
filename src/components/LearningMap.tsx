import React from 'react';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Lock, 
  BookOpen, 
  BarChart3, 
  Award,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const LearningMapPage = ({ taskId, onBack }: { taskId: number, onBack: () => void }) => {
  const stages = [
    { 
      id: 1, 
      title: '第一阶段：核心语法', 
      status: 'completed', 
      nodes: [
        { id: 1, title: '变量与作用域', status: 'completed', type: 'course', progress: 100 },
        { id: 2, title: '闭包深度理解', status: 'active', type: 'course', progress: 46 },
      ]
    },
    { 
      id: 2, 
      title: '第二阶段：异步编程', 
      status: 'active', 
      nodes: [
        { id: 3, title: '事件循环机制', status: 'active', type: 'course', progress: 80 },
      ]
    },
  ];

  return (
    <div className="fixed inset-0 bg-[#F8FAFC] z-[50] flex flex-col overflow-hidden">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      {/* Header */}
      <header className="relative h-20 bg-white border-b border-zinc-100 px-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2 hover:bg-zinc-50 rounded-full transition-colors border border-zinc-100">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900">学习 JAVA</h1>
              <p className="text-xs text-zinc-500 max-w-xl line-clamp-1">本课程从0带领大家构建一套功能强大的企业级即时通讯 (IM) 系统。通过深入学习，能够掌握大型 IM 系统...</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
            <Play className="w-4 h-4 fill-current" /> 学习情况 <ChevronRight className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-bold flex items-center gap-2 hover:bg-emerald-600 transition-colors">
            <Award className="w-4 h-4" /> 证书 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Horizontal Flow Content */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden relative flex items-center px-12 gap-12">
        {/* Start Marker */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-blue-600 flex items-center justify-center p-1">
            <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">开始</span>
        </div>

        {/* Stages */}
        {stages.map((stage, sIdx) => (
          <div key={stage.id} className="flex items-center gap-12 shrink-0">
            {/* Stage Container */}
            <div className="bg-white rounded-[32px] p-8 border border-zinc-100 shadow-sm min-w-[400px] space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-zinc-100 italic">0{sIdx + 1}</span>
                <h3 className="text-lg font-bold text-zinc-900">{stage.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {stage.nodes.map(node => (
                  <div key={node.id} className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100 space-y-4 group hover:border-blue-200 transition-colors">
                    <div className="relative w-full aspect-[4/3] bg-indigo-900 rounded-xl flex items-center justify-center overflow-hidden">
                      <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-white/10 text-white/40 text-[8px] font-bold rounded uppercase">NLP</div>
                      <BookOpen className="w-8 h-8 text-white/20" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-800">{node.title}</h4>
                      <div className="flex items-center gap-1.5">
                        {node.status === 'completed' ? (
                          <div className="flex items-center gap-1 text-emerald-500">
                            <CheckCircle2 className="w-3 h-3" />
                            <span className="text-[10px] font-bold">已完成</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-blue-500">
                            <Play className="w-3 h-3" />
                            <span className="text-[10px] font-bold">{node.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connector */}
            {sIdx < stages.length - 1 && (
              <div className="w-12 h-0.5 border-t-2 border-dashed border-zinc-200"></div>
            )}
          </div>
        ))}

        {/* End Marker */}
        <div className="flex flex-col items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-300 border border-zinc-200">
            <Award className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">结束</span>
        </div>
      </main>
    </div>
  );
};
