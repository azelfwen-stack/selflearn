import React from 'react';
import { 
  X, 
  Star, 
  Clock, 
  BarChart3, 
  User, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';

export const TaskDetailModal = ({ task, onClose }: { task: any, onClose: () => void }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="relative h-48 bg-indigo-900 flex items-center px-12">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="space-y-2">
            <div className="flex gap-2">
              {task.tags.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider rounded-md">{tag}</span>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-white">{task.title}</h2>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-zinc-50 rounded-2xl space-y-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">作者</p>
              <p className="font-bold text-zinc-900 flex items-center gap-2"><User className="w-4 h-4" /> {task.author}</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-2xl space-y-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">难度</p>
              <p className="font-bold text-zinc-900 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> {task.difficulty}</p>
            </div>
            <div className="p-4 bg-zinc-50 rounded-2xl space-y-1">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">时长</p>
              <p className="font-bold text-zinc-900 flex items-center gap-2"><Clock className="w-4 h-4" /> {task.duration}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-zinc-900">课程大纲</h3>
            <div className="space-y-3">
              {[
                '第一阶段：核心概念与环境搭建',
                '第二阶段：深入理解核心原理',
                '第三阶段：实战项目开发',
                '第四阶段：性能优化与部署'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 border border-zinc-100 rounded-2xl hover:bg-zinc-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-500">{idx + 1}</div>
                  <span className="font-medium text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-zinc-100 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 border border-zinc-200 rounded-xl font-bold hover:bg-zinc-50 transition-colors">取消</button>
          <button onClick={onClose} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">添加到我的任务</button>
        </div>
      </motion.div>
    </div>
  );
};
