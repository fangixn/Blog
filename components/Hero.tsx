'use client';
import { ChevronDown, Github, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe } from 'lucide-react';

export default function Hero() {
  const scrollToArticles = () => {
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          思想的记录器，代码的操作者
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          欢迎来到我的个人博客。我是方馨，热衷于探索经济学理论与人工智能技术的交融，
          致力于创建有价值的学术工具和资源平台。在这里，我分享我的思考、项目和发现。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
            onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
          >
            阅读文章
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-8 py-3 rounded-lg transition-colors duration-200"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Globe className="mr-2 h-5 w-5" />
            查看项目
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            "无论是对个人而言，还是对社会而言，在现代工业社会中，真正能促成生产的因素是一种概念，
            也有人更愿意称之为'全局眼光'。" — 彼得·德鲁克
          </p>
        </div>
      </div>
    </section>
  );
}