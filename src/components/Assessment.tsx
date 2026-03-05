import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  BarChart3, 
  Clock, 
  Play 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

const QUESTIONS = [
  { id: 1, text: '在 JavaScript 中，以下哪个关键字用于声明块级作用域变量？', options: ['var', 'let', 'function', 'static'], correct: 1 },
  { id: 2, text: '什么是闭包？', options: ['一个函数访问其外部作用域变量的能力', '一个立即执行的函数', '一个递归函数', '一个匿名函数'], correct: 0 },
  { id: 3, text: 'Promise.all() 的作用是？', options: ['等待所有 Promise 完成', '只等待第一个完成', '按顺序执行', '捕获所有错误'], correct: 0 },
];

export const AssessmentPage = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState('intro'); // intro, testing, result
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('result');
    }
  };

  const ABILITY_DATA = [
    { subject: '逻辑思维', A: 85, fullMark: 100 },
    { subject: '专业知识', A: 75, fullMark: 100 },
    { subject: '实践能力', A: 55, fullMark: 100 },
    { subject: '创新意识', A: 70, fullMark: 100 },
    { subject: '协作沟通', A: 90, fullMark: 100 },
  ];

  return (
    <div className="fixed inset-0 bg-white z-[70] flex flex-col">
      <header className="h-16 border-b border-zinc-100 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onComplete} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold text-lg">能力测评</h2>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-md text-center space-y-8"
            >
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto">
                <BarChart3 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">开始你的能力测评</h3>
                <p className="text-zinc-500">通过 10-15 分钟的测试，我们将为你生成精准的能力画像，并推荐最适合的学习路径。</p>
              </div>
              <div className="bg-zinc-50 p-4 rounded-2xl text-left space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <Clock className="w-4 h-4" /> 预计耗时：15 分钟
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <CheckCircle2 className="w-4 h-4" /> 包含 10 道选择题与 2 道实战题
                </div>
              </div>
              <button 
                onClick={() => setStep('testing')}
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
              >
                立即开始
              </button>
            </motion.div>
          )}

          {step === 'testing' && (
            <motion.div 
              key="testing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl w-full space-y-8"
            >
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  <span>问题 {currentIdx + 1} / {QUESTIONS.length}</span>
                  <span>进度 {Math.round(((currentIdx + 1) / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 transition-all" style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}></div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 leading-relaxed">
                {QUESTIONS[currentIdx].text}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {QUESTIONS[currentIdx].options.map((opt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full p-5 text-left bg-white border border-zinc-200 rounded-2xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="font-medium text-zinc-700">{opt}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  测评完成
                </div>
                <h3 className="text-3xl font-bold text-zinc-900">你的能力画像已更新</h3>
                <p className="text-zinc-500 leading-relaxed">
                  根据本次测评，你在逻辑思维和专业知识方面表现优异，但在实践能力上还有提升空间。我们已为你准备了针对性的进阶路径。
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <h4 className="font-bold text-indigo-900 text-sm mb-1">推荐路径</h4>
                    <p className="text-indigo-700 text-sm">React 高级模式与性能优化实战</p>
                  </div>
                </div>
                <button 
                  onClick={onComplete}
                  className="w-full py-4 bg-zinc-900 text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors"
                >
                  查看推荐任务
                </button>
              </div>

              <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ABILITY_DATA}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12}} />
                    <Radar name="能力值" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
