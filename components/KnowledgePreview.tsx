'use client';

import { Brain, BookOpen, Users, School, Lightbulb, ArrowRight, Map, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function KnowledgePreview() {
  const knowledgeModules = [
    {
      id: 'methodology',
      title: '学习方法论',
      icon: Map,
      description: '自学经济学的方法论指南',
      color: 'from-purple-600 to-purple-700',
      bgColor: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-700',
      count: '2'
    },
    {
      id: 'foundations', 
      title: '入门基础',
      icon: BookOpen,
      description: '经济学入门指南与核心概念',
      color: 'from-indigo-600 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-100',
      textColor: 'text-indigo-700',
      count: '1'
    },
    {
      id: 'scholars',
      title: '关键学者',
      icon: Users,
      description: '重要经济学家与理论建构者',
      color: 'from-violet-600 to-purple-600',
      bgColor: 'from-violet-50 to-purple-100',
      textColor: 'text-violet-700',
      count: '1'
    },
    {
      id: 'schools',
      title: '理论学派',
      icon: School,
      description: '主要经济学流派与思想体系',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'from-purple-50 to-pink-100',
      textColor: 'text-purple-700',
      count: '1'
    },
    {
      id: 'literature',
      title: '核心文献',
      icon: Lightbulb,
      description: '经典著作与重要文献资料',
      color: 'from-fuchsia-600 to-purple-600',
      bgColor: 'from-fuchsia-50 to-purple-100',
      textColor: 'text-fuchsia-700',
      count: '1'
    }
  ];

  return (
    <section id="knowledge" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            经济学知识库
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            从学习方法论到知识体系构建，系统性的经济学自学平台。探索经济学理论的深度与广度，构建完整的知识网络。
          </p>
        </div>

        {/* 知识模块网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {knowledgeModules.map((module, index) => {
            const IconComponent = module.icon;
            return (
              <Card 
                key={module.id}
                className={`apple-hover bg-gradient-to-br ${module.bgColor} border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden animate-slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${module.color} rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className={`inline-flex items-center justify-center w-8 h-8 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-bold ${module.textColor}`}>
                      {module.count}
                    </div>
                  </div>
                  
                  <h3 className={`text-xl font-bold ${module.textColor} mb-3 group-hover:scale-105 transition-transform duration-300`}>
                    {module.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 特色功能展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 知识图谱 */}
          <Card className="glass-effect border-0 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-md mr-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">知识关联图谱</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                可视化展示文章之间的内在联系，帮助您发现知识的网络结构，构建系统性的学习路径。
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full opacity-80"></div>
                  <div className="w-6 h-6 bg-purple-500 rounded-full opacity-60"></div>
                  <div className="w-10 h-10 bg-indigo-500 rounded-full opacity-90"></div>
                  <div className="w-7 h-7 bg-violet-500 rounded-full opacity-70"></div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">互联的知识网络</p>
              </div>
            </CardContent>
          </Card>

          {/* 学习路径 */}
          <Card className="glass-effect border-0 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-md mr-4">
                  <Map className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">学习路径规划</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                科学的学习顺序和路径设计，从方法论到专业知识，循序渐进构建完整知识体系。
              </p>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center justify-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div className="w-4 h-0.5 bg-green-300"></div>
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div className="w-4 h-0.5 bg-blue-300"></div>
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">方法论 → 基础 → 深化</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-scale-in">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              开始您的经济学学习之旅
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              从零基础到深度理解，知识库为您提供完整的学习路径和丰富的资源支持
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/knowledge">
                <Button 
                  size="lg" 
                  className="apple-hover bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-indigo-300/50 border-0"
                >
                  <Brain className="mr-2 h-5 w-5" />
                  进入知识库
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="apple-hover border-2 border-indigo-300 hover:border-indigo-400 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50 font-medium px-8 py-4 rounded-2xl backdrop-blur-sm bg-white/60"
                onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
              >
                浏览文章
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 