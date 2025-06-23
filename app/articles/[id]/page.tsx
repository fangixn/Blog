import { Clock, Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getAllArticles, getRelatedArticles, type Article } from '@/lib/data';
import { getAllMarkdownArticles, getMarkdownArticle } from '@/lib/markdown';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticlePageClient from './ArticlePageClient';
import Link from 'next/link';

// 生成静态路径
export async function generateStaticParams() {
  // 只使用markdown文件的文章
  const markdownArticles = getAllMarkdownArticles();
  
  return markdownArticles.map((article) => ({
    id: article.id, // 直接使用文章ID，不需要重新编码
  }));
}

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  // 解码URL参数（处理中文字符）
  const decodedId = decodeURIComponent(params.id);
  
  // 只在markdown文件中查找文章
  const markdownArticles = getAllMarkdownArticles();
  const article = markdownArticles.find(a => a.id === decodedId);
  
  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">📝 文章未找到</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              抱歉，您查找的文章不存在或已被删除。可能是链接有误或文章已被移动。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="apple-hover bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-purple-300/50 border-0"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  返回首页
                </Button>
              </Link>
              
              <Link href="/knowledge">
                <Button
                  variant="outline"
                  size="lg"
                  className="apple-hover border-2 border-purple-300 hover:border-purple-400 text-purple-700 hover:text-purple-800 hover:bg-purple-50 font-medium px-8 py-4 rounded-2xl backdrop-blur-sm bg-white/60"
                >
                  浏览知识库
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 p-6 bg-purple-50/50 rounded-3xl border border-purple-100 max-w-lg mx-auto">
              <p className="text-sm text-gray-600 mb-4">💡 建议尝试：</p>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• 检查网址是否正确</li>
                <li>• 返回首页浏览最新文章</li>
                <li>• 访问知识库查找相关内容</li>
                <li>• 使用搜索功能定位文章</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // 获取相关文章（只使用markdown文章）
  const relatedArticles = getRelatedArticles(article, 3);

  return <ArticlePageClient article={article} relatedArticles={relatedArticles} />;
} 