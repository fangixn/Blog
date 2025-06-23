'use client';
import { ChevronDown, Github, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToArticles = () => {
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block">思想的记录器</span>
            <span className="block text-purple-600">代码的操作者</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            探索经济学理论与技术实践的交融，分享知识、经验与思考的个人空间
          </p>
          
          {/* Description */}
          <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            在这里，你会发现经济学的深度思考、技术学习的详细笔记、创新项目的精彩展示，
            以及对人工智能未来的独特观察和个人随笔的真诚表达
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Button
              onClick={scrollToArticles}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              开始阅读
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              了解更多
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-6 mb-16">
            <a
              href="mailto:fangin1230@gmail.com"
              className="text-gray-400 hover:text-purple-600 transition-colors duration-200 transform hover:scale-110"
              title="邮箱联系"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-600 transition-colors duration-200 transform hover:scale-110"
              title="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-purple-600 transition-colors duration-200 transform hover:scale-110"
              title="领英"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToArticles}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200 animate-bounce"
        aria-label="向下滚动"
      >
        <ChevronDown className="h-8 w-8" />
      </button>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>
    </section>
  );
}