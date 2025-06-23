'use client';
import { useState } from 'react';
import { TrendingUp, BookOpen, Code, Brain, PenTool, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data';

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
}

export default function CategoryNav({ 
  selectedCategory, 
  onCategoryChange, 
  selectedTags, 
  onTagsChange 
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            探索内容分类
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            按分类浏览不同主题的文章，或使用标签筛选感兴趣的内容
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className={`px-6 py-3 rounded-full transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                : 'hover:border-purple-600 hover:text-purple-600'
            }`}
            onClick={() => onCategoryChange('all')}
          >
            全部文章
          </Button>
          
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
                    : 'hover:border-purple-600 hover:text-purple-600'
                }`}
                onClick={() => onCategoryChange(category.id)}
              >
                <IconComponent className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Tag Filter Toggle */}
        <div className="text-center mb-6">
          <Button
            variant="ghost"
            onClick={() => setShowTagFilter(!showTagFilter)}
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showTagFilter ? '隐藏' : '显示'}标签筛选
          </Button>
        </div>

        {/* Tag Filter Panel */}
        {showTagFilter && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">热门标签</h3>
            <div className="flex flex-wrap gap-3">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedTags.includes(tag)
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            {selectedTags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    已选择 {selectedTags.length} 个标签
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTagsChange([])}
                    className="text-gray-500 hover:text-gray-700"
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