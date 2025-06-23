'use client';
import { ChevronDown, Github, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe } from 'lucide-react';
import { Language, defaultLanguage, getTranslation } from '@/lib/i18n';

interface HeroProps {
  currentLanguage?: Language;
}

export default function Hero({ currentLanguage = defaultLanguage }: HeroProps) {
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
            {getTranslation(currentLanguage, 'site.description').split('，').map((part, index) => (
              index === 0 ? (
                <span key={index}>{part}，<br /></span>
              ) : (
                <span key={index} className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {part}
                </span>
              )
            ))}
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {getTranslation(currentLanguage, 'site.tagline')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              className="apple-hover bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-purple-300/50 border-0"
              onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {getTranslation(currentLanguage, 'nav.articles')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="apple-hover border-2 border-purple-300 hover:border-purple-400 text-purple-700 hover:text-purple-800 hover:bg-purple-50 font-medium px-8 py-4 rounded-2xl backdrop-blur-sm bg-white/60"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Globe className="mr-2 h-5 w-5" />
              {getTranslation(currentLanguage, 'nav.projects')}
            </Button>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20 max-w-4xl mx-auto">
              <p className="text-gray-700 text-base sm:text-lg italic leading-relaxed">
                "无论是对个人而言，还是对社会而言，在现代工业社会中，真正能促成生产的因素是一种概念，
                也有人更愿意称之为'全局眼光'。"
              </p>
              <p className="text-purple-600 font-semibold mt-4">
                — 彼得·德鲁克
              </p>
              
              {/* Translation Service Promotion for non-Chinese users */}
              {currentLanguage !== 'zh' && (
                <div className="mt-6 pt-6 border-t border-purple-200/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🌐</span>
                      <div>
                        <p className="text-sm text-purple-700 font-medium">需要更好的翻译？</p>
                        <p className="text-xs text-gray-600">专业翻译服务质量对比平台</p>
                      </div>
                    </div>
                    <a
                      href="https://www.translationcompare.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <span>TranslationCompare</span>
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
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