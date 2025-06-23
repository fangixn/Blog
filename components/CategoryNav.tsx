'use client';
import { useState } from 'react';
import { TrendingUp, BookOpen, Code, Brain, PenTool, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data';
import { Language, defaultLanguage } from '@/lib/i18n';

const iconMap = {
  TrendingUp,
  BookOpen,
  Code,
  Brain,
  PenTool,
};

interface CategoryNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  currentLanguage?: Language;
}

export default function CategoryNav({ 
  selectedCategory, 
  onCategoryChange, 
  selectedTags, 
  onTagsChange,
  currentLanguage = defaultLanguage
}: CategoryNavProps) {
  const [showTagFilter, setShowTagFilter] = useState(false);
  
  const popularTags = [
    '经济学', '技术', 'AI', 'React', 'TypeScript', 
    '数据分析', '前端开发', '哲学思考'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <section className="py-20 apple-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
            探索内容分类
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            按分类浏览不同主题的文章，或使用标签筛选感兴趣的内容
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={`apple-hover px-6 py-3 rounded-2xl font-medium transition-all duration-500 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-purple-300/50 border-0'
                : 'border-2 border-purple-300 hover:border-purple-400 text-purple-700 hover:text-purple-800 hover:bg-purple-50 bg-white/60 backdrop-blur-sm'
            }`}
            onClick={() => onCategoryChange('all')}
          >
            全部文章
          </Button>
          
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`apple-hover px-6 py-3 rounded-2xl font-medium transition-all duration-500 flex items-center space-x-2 animate-slide-up ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-purple-300/50 border-0'
                    : 'border-2 border-purple-300 hover:border-purple-400 text-purple-700 hover:text-purple-800 hover:bg-purple-50 bg-white/60 backdrop-blur-sm'
                }`}
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                onClick={() => onCategoryChange(category.id)}
              >
                <IconComponent className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Tag Filter Toggle */}
        <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Button
            variant="ghost"
            onClick={() => setShowTagFilter(!showTagFilter)}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-300 px-6 py-3"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showTagFilter ? '隐藏' : '显示'}标签筛选
          </Button>
        </div>

        {/* Tag Filter Panel */}
        {showTagFilter && (
          <div className="glass-effect rounded-3xl p-8 shadow-lg border border-white/20 animate-fade-in max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">热门标签</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {popularTags.map((tag, index) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`apple-hover px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-300 animate-scale-in ${
                    selectedTags.includes(tag)
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-purple-300/50'
                      : 'bg-white/80 text-purple-700 hover:bg-purple-50 border border-purple-200 hover:border-purple-300'
                  }`}
                  style={{ animationDelay: `${1 + index * 0.05}s` }}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {selectedTags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-purple-200/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600 font-medium">
                    已选择 {selectedTags.length} 个标签
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTagsChange([])}
                    className="text-purple-500 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-300"
                  >
                    清除全部
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}