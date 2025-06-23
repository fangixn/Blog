import { Article } from './data';

// 预加载的文章数据 - 在构建时生成
const preloadedArticles: Article[] = [];

// 在服务器端获取所有markdown文章
export function getAllMarkdownArticles(): Article[] {
  // 只在服务器端运行
  if (typeof window === 'undefined') {
    try {
      // 尝试读取markdown文件
      const fs = eval('require')('fs');
      const path = eval('require')('path');
      const matter = eval('require')('gray-matter');
      const { remark } = eval('require')('remark');
      const html = eval('require')('remark-html');

      const articlesDirectory = path.join(process.cwd(), 'content/articles');

      // 确保目录存在
      if (!fs.existsSync(articlesDirectory)) {
        console.warn('文章目录不存在:', articlesDirectory);
        return [];
      }

      const fileNames = fs.readdirSync(articlesDirectory);
      const markdownFiles = fileNames.filter((name: string) => name.endsWith('.md'));
      
      const articles: Article[] = markdownFiles.map((fileName: string, index: number) => {
        try {
          const fullPath = path.join(articlesDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          
          // 解析front matter
          const matterResult = matter(fileContents);
          
          // 处理markdown内容为HTML
          const processedContent = remark()
            .use(html)
            .processSync(matterResult.content);
          
          const contentHtml = processedContent.toString();
          
          return {
            id: `md-${fileName.replace('.md', '')}`,
            title: matterResult.data.title || fileName.replace('.md', ''),
            excerpt: matterResult.data.excerpt || contentHtml.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
            content: contentHtml,
            category: matterResult.data.category || 'thoughts',
            tags: Array.isArray(matterResult.data.tags) ? matterResult.data.tags : [],
            publishedAt: matterResult.data.publishedAt || new Date().toISOString().split('T')[0],
            readTime: matterResult.data.readTime || Math.ceil(contentHtml.length / 1000),
            featured: Boolean(matterResult.data.featured),
          };
        } catch (fileError) {
          console.error(`处理文件 ${fileName} 时出错:`, fileError);
          return null;
        }
              }).filter((article: Article | null): article is Article => article !== null);
      
      return articles;
    } catch (error) {
      console.error('读取Markdown文章时出错:', error);
      return [];
    }
  }
  
  // 客户端返回预加载的数据
  return preloadedArticles;
}

// 获取单篇文章
export function getMarkdownArticle(id: string): Article | null {
  const articles = getAllMarkdownArticles();
  return articles.find(article => article.id === id) || null;
}

// 刷新文章数据（开发时使用）
export function refreshArticles(): Article[] {
  return getAllMarkdownArticles();
}

// 用于静态生成的文章获取函数
export async function getStaticMarkdownArticles(): Promise<Article[]> {
  return getAllMarkdownArticles();
} 