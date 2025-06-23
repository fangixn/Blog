'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { type Article } from '@/lib/data';
import { Language, defaultLanguage } from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ArticlePageClientProps {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticlePageClient({ article, relatedArticles }: ArticlePageClientProps) {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(defaultLanguage);

  useEffect(() => {
    // 从URL参数获取语言设置
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get('lang') as Language;
      if (langParam && ['zh', 'en', 'de', 'ja', 'ko'].includes(langParam)) {
        setCurrentLanguage(langParam);
      }
    }
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
      <Header 
        currentLanguage={currentLanguage}
        onLanguageChange={(lang) => {
          setCurrentLanguage(lang);
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            window.history.pushState({}, '', url.toString());
          }
        }}
      />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-2xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回
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

        {/* Translation Quality Notice */}
        {currentLanguage !== 'zh' && (
          <div className="mb-8 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <span className="text-lg">🌐</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-purple-700 mb-2">
                  <strong>翻译说明：</strong>本文内容为AI翻译，可能存在不准确之处。
                </p>
                <a
                  href="https://www.translationcompare.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 transition-colors font-medium"
                >
                  <span>访问 TranslationCompare 获取更优质的翻译服务</span>
                  <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-800 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
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
                  onClick={() => router.push(`/articles/${relatedArticle.id}`)}
                >
                  <CardContent className="p-6">
                    <Badge 
                      variant="secondary" 
                      className="bg-purple-100 text-purple-700 rounded-2xl px-3 py-1 text-xs font-medium mb-3"
                    >
                      {getCategoryName(relatedArticle.category)}
                    </Badge>
                    <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-purple-600 transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {relatedArticle.readTime} 分钟
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer currentLanguage={currentLanguage} />
    </div>
  );
} 