'use client';
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { languages, Language, defaultLanguage } from '@/lib/i18n';

interface LanguageSwitcherProps {
  currentLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
}

export default function LanguageSwitcher({ 
  currentLanguage = defaultLanguage, 
  onLanguageChange 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: Language) => {
    onLanguageChange?.(language);
    setIsOpen(false);
    
    // 更新URL或执行其他操作
    if (typeof window !== 'undefined') {
      // 方案1: 使用URL参数
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      window.history.pushState({}, '', url.toString());
      
      // 方案2: 使用子域名 (需要额外配置)
      // window.location.href = `https://${language}.yourdomain.com${window.location.pathname}`;
      
      // 方案3: 使用路径前缀 (需要Next.js i18n配置)
      // window.location.href = `/${language}${window.location.pathname}`;
    }
  };

  const currentLang = languages[currentLanguage];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span className="hidden md:inline">{currentLang.name}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 下拉菜单 */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20 animate-fade-in">
            <div className="py-1">
              {Object.entries(languages).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as Language)}
                  className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-purple-50 transition-colors ${
                    currentLanguage === code 
                      ? 'bg-purple-50 text-purple-600' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {currentLanguage === code && (
                    <span className="ml-auto text-purple-600">✓</span>
                  )}
                </button>
              ))}
            </div>
            
            {/* 翻译说明 */}
            <div className="border-t border-gray-100 px-4 py-2">
              <p className="text-xs text-gray-500">
                🤖 非中文内容使用AI翻译
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}