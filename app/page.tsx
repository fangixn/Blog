'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryNav from '@/components/CategoryNav';
import ArticleGrid from '@/components/ArticleGrid';
import ProjectShowcase from '@/components/ProjectShowcase';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <CategoryNav
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />
        <ArticleGrid
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
        />
        <ProjectShowcase />
        <About />
      </main>
      <Footer />
    </div>
  );
}