'use client';
import { useState, useMemo } from 'react';
import { Clock, Calendar, Tag, ArrowRight, Search, SortDesc, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getAllArticles, searchArticles, type Article } from '@/lib/data';

interface ArticleGridProps {
  selectedCategory: string;
  selectedTags: string[];
}

export default function ArticleGrid({ selectedCategory, selectedTags }: ArticleGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'readTime' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedArticles = useMemo(() => {
    let articles = getAllArticles();
    
    // 应用分类过滤
    if (selectedCategory !== 'all') {
      articles = articles.filter(article => article.category === selectedCategory);
    }
    
    // 应用标签过滤
    if (selectedTags.length > 0) {
      articles = articles.filter(article => 
        selectedTags.some(tag => article.tags.includes(tag))
      );
    }
    
    // 应用搜索过滤
    if (searchQuery.trim()) {
      const searchLower = searchQuery.toLowerCase();
      articles = articles.filter(article => 
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        article.content.toLowerCase().includes(searchLower)
      );
    }
    
    // 应用排序
    articles.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
          break;
        case 'readTime':
          comparison = a.readTime - b.readTime;
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title, 'zh-CN');
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return articles;
  }, [selectedCategory, selectedTags, searchQuery, sortBy, sortOrder]);

  const visibleArticles = filteredAndSortedArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedArticles.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryName = (categoryId: string) => {
    const categoryMap: { [key: string]: string } = {
      economics: '经济学思考',
      notes: '学习笔记',
      projects: '项目展示',
      ai: 'AI观察',
      thoughts: '随笔杂谈',
    };
    return categoryMap[categoryId] || categoryId;
  };

  const handleSortChange = (newSortBy: 'date' | 'readTime' | 'title') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  return (
    <section id="articles" className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
            最新文章
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {filteredAndSortedArticles.length > 0 
              ? `找到 ${filteredAndSortedArticles.length} 篇相关文章` 
              : '没有找到匹配的文章，试试调整筛选条件'}
          </p>
        </div>

        {/* 搜索和排序控件 */}
        <div className="mb-8 glass-effect rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* 搜索框 */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
              <Input
                type="text"
                placeholder="搜索文章标题、内容或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-2xl border-purple-200 focus:border-purple-400 focus:ring-purple-300"
              />
            </div>
            
            {/* 排序控件 */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={sortBy === 'date' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSortChange('date')}
                className={`rounded-2xl transition-all duration-300 ${
                  sortBy === 'date' 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'border-purple-300 text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Calendar className="h-4 w-4 mr-1" />
                日期
                {sortBy === 'date' && (
                  <SortDesc className={`h-3 w-3 ml-1 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                )}
              </Button>
              <Button
                variant={sortBy === 'readTime' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSortChange('readTime')}
                className={`rounded-2xl transition-all duration-300 ${
                  sortBy === 'readTime' 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'border-purple-300 text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Clock className="h-4 w-4 mr-1" />
                时长
                {sortBy === 'readTime' && (
                  <SortDesc className={`h-3 w-3 ml-1 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                )}
              </Button>
              <Button
                variant={sortBy === 'title' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleSortChange('title')}
                className={`rounded-2xl transition-all duration-300 ${
                  sortBy === 'title' 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'border-purple-300 text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Filter className="h-4 w-4 mr-1" />
                标题
                {sortBy === 'title' && (
                  <SortDesc className={`h-3 w-3 ml-1 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                )}
              </Button>
            </div>
          </div>
          
          {/* 搜索结果统计 */}
          {(searchQuery || selectedCategory !== 'all' || selectedTags.length > 0) && (
            <div className="mt-4 pt-4 border-t border-purple-100/50">
              <div className="flex flex-wrap items-center gap-2 text-sm text-purple-600">
                <span>当前筛选:</span>
                {selectedCategory !== 'all' && (
                  <Badge className="bg-purple-100 text-purple-700 rounded-2xl">
                    分类: {getCategoryName(selectedCategory)}
                  </Badge>
                )}
                {selectedTags.map(tag => (
                  <Badge key={tag} className="bg-purple-100 text-purple-700 rounded-2xl">
                    标签: {tag}
                  </Badge>
                ))}
                {searchQuery && (
                  <Badge className="bg-purple-100 text-purple-700 rounded-2xl">
                    搜索: "{searchQuery}"
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    // 注意：这里不能直接重置分类和标签，因为它们由父组件控制
                  }}
                  className="text-xs text-purple-500 hover:text-purple-700"
                >
                  清除搜索
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Articles Grid */}
        {filteredAndSortedArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {visibleArticles.map((article: Article, index: number) => (
                <article
                  key={article.id}
                  className="group animate-slide-up apple-hover"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <Card className="h-full glass-effect hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:shadow-purple-200/40 group-hover:transform group-hover:scale-[1.02] rounded-3xl overflow-hidden">
                    <CardHeader className="pb-4">
                      {/* Category & Featured Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge 
                          variant="secondary" 
                          className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-2xl px-4 py-2 font-medium"
                        >
                          {getCategoryName(article.category)}
                        </Badge>
                        {article.featured && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl px-4 py-2 font-medium">
                            精选
                          </Badge>
                        )}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 leading-tight">
                        {article.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="pb-6">
                      {/* Excerpt */}
                      <p className="text-gray-600 line-clamp-3 leading-relaxed mb-6">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1.5 rounded-2xl text-xs font-medium bg-white/80 text-purple-700 hover:bg-purple-100 hover:text-purple-800 transition-colors cursor-pointer border border-purple-200"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-purple-500 font-medium">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-6 border-t border-purple-100/50">
                      <div className="flex items-center justify-between w-full">
                        {/* Meta Info */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-purple-400" />
                            {formatDate(article.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-purple-400" />
                            {article.readTime} 分钟
                          </div>
                        </div>

                        {/* Read More Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center animate-fade-in">
                <Button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  variant="outline"
                  size="lg"
                  className="apple-hover px-8 py-4 border-2 border-purple-400 text-purple-600 hover:bg-purple-50 hover:border-purple-500 rounded-2xl font-medium bg-white/60 backdrop-blur-sm shadow-lg hover:shadow-purple-200/50"
                >
                  加载更多文章 ({filteredAndSortedArticles.length - visibleCount} 篇)
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-8">
              <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto flex items-center justify-center">
                <Tag className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              暂无相关文章
            </h3>
            <p className="text-gray-600 mb-8">
              尝试调整搜索关键词、选择其他分类或标签来查看更多内容
            </p>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSortBy('date');
                  setSortOrder('desc');
                }}
                className="apple-hover border-2 border-purple-400 text-purple-600 hover:bg-purple-50 hover:border-purple-500 rounded-2xl px-6 py-3 font-medium bg-white/60 backdrop-blur-sm"
              >
                重置搜索
              </Button>
            </div>
          </div>
        )}

        {/* Article Footer Note */}
        {filteredAndSortedArticles.length > 0 && (
          <div className="text-center mt-20 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="glass-effect rounded-3xl p-8 shadow-lg border border-white/20 max-w-2xl mx-auto">
              <p className="text-purple-700 font-medium text-lg">
                持续分享有价值的内容，感谢您的阅读
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}