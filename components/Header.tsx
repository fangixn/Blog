'use client';
import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Language, defaultLanguage, getTranslation } from '@/lib/i18n';

interface HeaderProps {
  currentLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
}

export default function Header({ 
  currentLanguage = defaultLanguage, 
  onLanguageChange 
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: '首页', href: '#home' },
    { name: '文章', href: '#articles' },
    { name: '项目', href: '#projects' },
    { name: '关于', href: '#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
        isScrolled
          ? 'glass-effect shadow-lg border-b border-purple-200/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              className="text-xl lg:text-2xl font-bold text-gray-900 hover:text-purple-600 transition-all duration-300 apple-hover"
            >
              {getTranslation(currentLanguage, 'site.title')}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-purple-600 font-medium transition-all duration-300 relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </a>
            ))}
          </nav>

          {/* Language Switcher, Search & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher 
              currentLanguage={currentLanguage}
              onLanguageChange={onLanguageChange}
            />
            
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
              onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">搜索</span>
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-purple-50 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-purple-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 hover:text-purple-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden glass-effect border-t border-purple-200/30 animate-fade-in rounded-b-2xl mt-2 overflow-hidden">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 font-medium transition-all duration-300 rounded-xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-2 pt-2 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  搜索文章
                </Button>
                
                {/* 移动端语言切换器 */}
                <div className="px-2">
                  <LanguageSwitcher 
                    currentLanguage={currentLanguage}
                    onLanguageChange={(lang) => {
                      onLanguageChange?.(lang);
                      setIsMenuOpen(false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}