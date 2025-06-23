'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryNav from '@/components/CategoryNav';
import ArticleGrid from '@/components/ArticleGrid';
import ProjectShowcase from '@/components/ProjectShowcase';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { Language, defaultLanguage } from '@/lib/i18n';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);

  // 从URL参数中获取语言设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as Language;
      if (langParam && ['zh', 'en', 'de', 'ja', 'ko'].includes(langParam)) {
        setCurrentLanguage(langParam);
      }
    }
  }, []);

  // 监听语言变化，更新URL
  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', language);
      window.history.pushState({}, '', url.toString());
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
      />
      <main>
        <Hero currentLanguage={currentLanguage} />
        <CategoryNav
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          currentLanguage={currentLanguage}
        />
        <ArticleGrid
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
          currentLanguage={currentLanguage}
        />
        <ProjectShowcase currentLanguage={currentLanguage} />
        <About currentLanguage={currentLanguage} />
      </main>
      <Footer currentLanguage={currentLanguage} />
    </div>
  );
}