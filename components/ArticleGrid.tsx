'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Calendar, Tag, ArrowRight, Search, SortDesc, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getAllArticles, searchArticles, type Article } from '@/lib/data';

interface ArticleGridProps {
  selectedCategory: string;
  selectedTags: string[];
  initialArticles?: Article[]; // 允许传入初始文章数据
}

export default function ArticleGrid({ selectedCategory, selectedTags, initialArticles }: ArticleGridProps) {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    // 使用传入的文章数据，如果没有则使用默认的静态数据
    let articles = initialArticles || getAllArticles();
    
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
      const searchNumber = parseInt(searchQuery.trim());
      
      articles = articles.filter(article => {
        // 常规文本搜索
        const textMatch = 
          article.title.toLowerCase().includes(searchLower) ||
          article.excerpt.toLowerCase().includes(searchLower) ||
          article.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          article.content.toLowerCase().includes(searchLower);
        
        // 数字搜索：如果搜索的是纯数字，也检查是否匹配阅读时长
        const timeMatch = !isNaN(searchNumber) && article.readTime === searchNumber;
        
        return textMatch || timeMatch;
      });
    }
    
    // 默认按发布日期排序（最新在前）
    return articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [selectedCategory, selectedTags, searchQuery, initialArticles]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryName = (categoryId: string) => {
    const categoryMap: { [key: string]: string } = {
      business: '商业分析',
      ai: 'AI观察', 
      tech: '技术实践',
      methodology: '学习方法论',
      insights: '随笔洞察',
      // 兼容旧分类名称
      economics: '商业分析',
      notes: '学习方法论',
      projects: '技术实践',
      thoughts: '随笔洞察',
    };
    return categoryMap[categoryId] || categoryId;
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
            {filteredArticles.length > 0 
              ? `找到 ${filteredArticles.length} 篇相关文章` 
              : '没有找到匹配的文章，试试调整筛选条件'}
          </p>
          
          {/* 搜索提示 */}
          {searchQuery && !isNaN(parseInt(searchQuery.trim())) && (
            <p className="text-sm text-purple-600 max-w-2xl mx-auto mt-2 animate-fade-in">
              💡 提示：搜索数字时会同时匹配阅读时长和文章内容
            </p>
          )}
        </div>

        {/* 搜索控件 */}
        <div className="mb-8 glass-effect rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col items-center">
            {/* 搜索框 */}
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
              <Input
                type="text"
                placeholder="搜索文章标题、内容、标签或阅读时长（如：8, 15, 20）..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-2xl border-purple-200 focus:border-purple-400 focus:ring-purple-300 w-full text-center"
              />
            </div>
            
            {/* 搜索提示 */}
            {!searchQuery && (
              <p className="text-sm text-gray-500 mt-3 text-center">
                💡 支持搜索：文章标题、内容、标签、阅读时长
              </p>
            )}
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
                    {!isNaN(parseInt(searchQuery.trim())) 
                      ? `搜索时长/内容: "${searchQuery}"` 
                      : `搜索: "${searchQuery}"`}
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
        {filteredArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {visibleArticles.map((article: Article, index: number) => (
                <article
                  key={article.id}
                  className="group animate-slide-up apple-hover"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <Card 
                    className="h-full glass-effect hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:shadow-purple-200/40 group-hover:transform group-hover:scale-[1.02] rounded-3xl overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/articles/${encodeURIComponent(article.id)}`)}
                  >
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

                    <CardContent className="py-4">
                      <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex} 
                            variant="outline" 
                            className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {article.tags.length > 3 && (
                          <Badge 
                            variant="outline" 
                            className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
                          >
                            +{article.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between w-full text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(article.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {article.readTime} 分钟阅读
                          </div>
                        </div>
                        <div className="flex items-center text-purple-600 group-hover:text-purple-700 transition-colors">
                          <span className="text-sm font-medium">阅读更多</span>
                          <ArrowRight className="h-4 w-4 ml-1 group-hover:transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center animate-fade-in" style={{ animationDelay: `${0.4 + visibleArticles.length * 0.1}s` }}>
                <Button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="apple-hover bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-purple-300/50 border-0 transition-all duration-300"
                >
                  加载更多文章
                  <SortDesc className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">没有找到相关文章</h3>
            <p className="text-gray-600 mb-8">试试调整筛选条件或搜索关键词</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                // 这里可以触发父组件重置筛选条件
              }}
              className="apple-hover border-2 border-purple-300 hover:border-purple-400 text-purple-700 hover:text-purple-800 hover:bg-purple-50 font-medium px-6 py-3 rounded-2xl"
            >
              清除所有筛选
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}