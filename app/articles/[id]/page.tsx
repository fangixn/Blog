import { Clock, Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getAllArticles, getRelatedArticles, type Article } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticlePageClient from './ArticlePageClient';

// 生成静态路径
export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    id: article.id,
  }));
}

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const allArticles = getAllArticles();
  const article = allArticles.find(a => a.id === params.id);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">文章未找到</h1>
          <p className="text-gray-600 mb-8">抱歉，您查找的文章不存在或已被删除。</p>
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回首页
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article, 3);

  return <ArticlePageClient article={article} relatedArticles={relatedArticles} />;
} 