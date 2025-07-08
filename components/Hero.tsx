'use client';
import { ChevronDown, Github, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe, Brain } from 'lucide-react';

export default function Hero() {
  const scrollToArticles = () => {
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="apple-gradient min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            深度思考<br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              跨界实践
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            用理性分析商业世界，用技术探索无限可能，用文字记录成长轨迹
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="apple-hover bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-purple-300/50 border-0"
              onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              文章
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
                         <Button 
               variant="outline" 
               size="lg"
               className="apple-hover border-2 border-indigo-300 hover:border-indigo-400 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50 font-medium px-8 py-4 rounded-2xl backdrop-blur-sm bg-white/60"
               onClick={() => window.location.href = '/knowledge'}
             >
               <Brain className="mr-2 h-5 w-5" />
               知识库
             </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="apple-hover border-2 border-purple-300 hover:border-purple-400 text-purple-700 hover:text-purple-800 hover:bg-purple-50 font-medium px-8 py-4 rounded-2xl backdrop-blur-sm bg-white/60"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Globe className="mr-2 h-5 w-5" />
              项目
            </Button>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20 max-w-4xl mx-auto">
              <p className="text-gray-700 text-base sm:text-lg italic leading-relaxed">
                "最有价值的知识是关于方法的知识，最有意义的学习是掌握学习的方法。
                跨学科的思维模式，能让我们在复杂的世界中找到简单的原理。"
              </p>
              <p className="text-purple-600 font-semibold mt-4">
                — 查理·芒格
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown 
          className="h-6 w-6 text-purple-600 cursor-pointer hover:text-purple-700 transition-colors"
          onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </div>
    </section>
  );
}