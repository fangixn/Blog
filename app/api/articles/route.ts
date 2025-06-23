import { NextResponse } from 'next/server';
import { getAllArticlesServer, articles as staticArticles } from '../../../lib/data';

export async function GET() {
  try {
    // 在API路由中安全地处理markdown文件
    let allArticles = staticArticles;
    
    try {
      // 只在服务器端动态导入markdown模块
      const { getAllMarkdownArticles } = await import('../../../lib/markdown');
      const markdownArticles = getAllMarkdownArticles();
      
      if (markdownArticles.length > 0) {
        // 合并markdown文章和静态文章
        const combined = [...markdownArticles, ...staticArticles];
        
        // 去重（基于标题）
        allArticles = combined.filter((article, index, self) => 
          index === self.findIndex(a => a.title === article.title)
        );
      }
    } catch (markdownError) {
      console.warn('无法加载markdown文件:', markdownError);
      // 使用静态文章作为备份
    }
    
    // 按发布日期排序
    const sortedArticles = allArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    return NextResponse.json(sortedArticles);
  } catch (error) {
    console.error('API获取文章时出错:', error);
    return NextResponse.json(staticArticles, { status: 500 });
  }
} 