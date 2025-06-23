'use client';
import { useState, useMemo } from 'react';
import { Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllArticles, type Article } from '@/lib/data';

interface ArticleGridProps {
  selectedCategory: string;
  selectedTags: string[];
}

export default function ArticleGrid({ selectedCategory, selectedTags }: ArticleGridProps) {
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredArticles = useMemo(() => {
    const allArticles = getAllArticles();
    return allArticles.filter((article: Article) => {
      const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
      const tagMatch = selectedTags.length === 0 || 
        selectedTags.some(tag => article.tags.includes(tag));
      return categoryMatch && tagMatch;
    });
  }, [selectedCategory, selectedTags]);

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
      economics: '经济学思考',
      notes: '学习笔记',
      projects: '项目展示',
      ai: 'AI观察',
      thoughts: '随笔杂谈',
    };
    return categoryMap[categoryId] || categoryId;
  };

  return (
    <section id="articles" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            最新文章
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {filteredArticles.length > 0 
              ? `找到 ${filteredArticles.length} 篇相关文章` 
              : '没有找到匹配的文章，试试调整筛选条件'}
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {visibleArticles.map((article: Article, index: number) => (
                <article
                  key={article.id}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="h-full bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-purple-100/50 hover:border-purple-200 group-hover:transform group-hover:scale-[1.02]">
                    <CardHeader className="pb-4">
                      {/* Category & Featured Badge */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge 
                          variant="secondary" 
                          className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                        >
                          {getCategoryName(article.category)}
                        </Badge>
                        {article.featured && (
                          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                            精选
                          </Badge>
                        )}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2 leading-tight">
                        {article.title}
                      </h3>
                    </CardHeader>

                    <CardContent className="pb-4">
                      {/* Excerpt */}
                      <p className="text-gray-600 line-clamp-3 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-pointer"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {article.tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{article.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between w-full">
                        {/* Meta Info */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(article.publishedAt)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {article.readTime} 分钟
                          </div>
                        </div>

                        {/* Read More Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
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
              <div className="text-center">
                <Button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 border-purple-600 text-purple-600 hover:bg-purple-50 rounded-full transition-all duration-300 hover:shadow-md"
                >
                  加载更多文章
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="mb-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
                <Tag className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              暂无相关文章
            </h3>
            <p className="text-gray-600 mb-6">
              尝试选择其他分类或标签来查看更多内容
            </p>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              重置筛选条件
            </Button>
          </div>
        )}

        {/* Article Footer Note */}
        {filteredArticles.length > 0 && (
          <div className="text-center mt-16 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
            <p className="text-gray-700 font-medium">
              持续分享有价值的内容，感谢您的阅读
            </p>
          </div>
        )}
      </div>
    </section>
  );
}