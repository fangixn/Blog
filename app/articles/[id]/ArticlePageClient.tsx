'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Calendar, Tag, ArrowLeft, Share2, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { type Article } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ArticlePageClientProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticlePageClient({ article, relatedArticles }: ArticlePageClientProps) {
  const router = useRouter();
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const handleBack = () => {
    // 尝试返回上一页，如果没有历史记录则返回首页
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  // 监听滚动以显示/隐藏悬浮返回按钮
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowFloatingButton(scrollTop > 300); // 滚动超过300px时显示悬浮按钮
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('分享失败:', err);
      }
    } else {
      // 降级处理：复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button - 优化版本 */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="group bg-white/90 backdrop-blur-sm border-2 border-purple-200 text-purple-700 hover:text-white hover:bg-purple-600 hover:border-purple-600 rounded-2xl px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 min-w-[140px] sm:min-w-[160px] touch-manipulation select-none"
          >
            <ArrowLeft className="h-6 w-6 mr-3 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-semibold">返回上页</span>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Badge 
              variant="secondary" 
              className="bg-purple-100 text-purple-700 rounded-2xl px-4 py-2 font-medium"
            >
              {getCategoryName(article.category)}
            </Badge>
            {article.featured && (
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl px-4 py-2 font-medium">
                精选
              </Badge>
            )}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-purple-400" />
              {formatDate(article.publishedAt)}
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-400" />
              {article.readTime} 分钟阅读
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-2xl"
            >
              <Share2 className="h-4 w-4 mr-2" />
              分享
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium bg-white/80 text-purple-700 hover:bg-purple-100 hover:text-purple-800 transition-colors border border-purple-200"
              >
                <Tag className="h-3 w-3 mr-2" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose max-w-none">
          <div 
            className="text-gray-800 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              fontSize: '1rem',
              lineHeight: '1.75'
            }}
          />
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">相关文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Card 
                  key={relatedArticle.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:shadow-purple-200/40 rounded-3xl overflow-hidden"
                  onClick={() => router.push(`/articles/${encodeURIComponent(relatedArticle.id)}`)}
                >
                  <CardContent className="p-6">
                    <Badge 
                      variant="secondary" 
                      className="bg-purple-100 text-purple-700 rounded-2xl px-3 py-1 font-medium mb-4"
                    >
                      {getCategoryName(relatedArticle.category)}
                    </Badge>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {relatedArticle.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {relatedArticle.readTime} 分钟
                      </div>
                      <span className="text-purple-600 group-hover:text-purple-700">阅读 →</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* 悬浮返回按钮 */}
      {showFloatingButton && (
        <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
                      <Button
              onClick={handleBack}
              className="group bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 sm:p-5 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 border-4 border-white/20 min-w-[56px] min-h-[56px] sm:min-w-[64px] sm:min-h-[64px] touch-manipulation select-none"
              size="lg"
            >
            <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:-translate-x-1" />
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
} 