import fs from 'fs';
import path from 'path';
import { Article } from './data';

// 预加载的文章数据 - 在构建时生成
const preloadedArticles: Article[] = [];

// 简单的markdown到HTML转换（增强版本）
function simpleMarkdownToHtml(markdown: string): string {
  return markdown
    // 代码块
    .replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // 标题
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // 粗体和斜体
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // 链接
    .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // 列表
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
    // 引用
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // 段落处理
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim();
      if (!paragraph) return '';
      if (paragraph.startsWith('<h') || paragraph.startsWith('<ul') || 
          paragraph.startsWith('<pre') || paragraph.startsWith('<blockquote')) {
        return paragraph;
      }
      return `<p>${paragraph}</p>`;
    })
    .join('\n');
}

// 解析Front Matter
function parseFrontMatter(content: string): { data: any; content: string } {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }
  
  const frontMatter = match[1];
  const markdownContent = match[2];
  
  // 简单的YAML解析
  const data: any = {};
  frontMatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // 移除引号
      value = value.replace(/^["']|["']$/g, '');
      
      // 处理数组
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map(item => item.trim().replace(/^["']|["']$/g, ''));
      } else if (value === 'true') {
        data[key] = true;
      } else if (value === 'false') {
        data[key] = false;
      } else if (!isNaN(Number(value))) {
        data[key] = Number(value);
      } else {
        data[key] = value;
      }
    }
  });
  
  return { data, content: markdownContent };
}

// 生成文章摘要
function generateExcerpt(content: string, maxLength: number = 200): string {
  return content
    .replace(/[#*\[\]]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .substring(0, maxLength) + '...';
}

// 估算阅读时间
function estimateReadTime(content: string): number {
  const wordsPerMinute = 200; // 中文大约200字/分钟
  const wordCount = content.length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// 获取所有markdown文章
export function getAllMarkdownArticles(): Article[] {
  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles');
    
    // 检查目录是否存在
    if (!fs.existsSync(articlesDirectory)) {
      console.warn('文章目录不存在:', articlesDirectory);
      return [];
    }
    
    const fileNames = fs.readdirSync(articlesDirectory);
    const markdownFiles = fileNames.filter(name => name.endsWith('.md'));
    
    const articles: Article[] = markdownFiles.map((fileName, index): Article | null => {
      try {
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // 解析front matter
        const { data, content } = parseFrontMatter(fileContents);
        
        // 转换markdown为HTML
        const contentHtml = simpleMarkdownToHtml(content);
        
        // 生成文章ID
        const fileId = fileName.replace('.md', '');
        
        return {
          id: `md-${fileId}`,
          title: data.title || fileId.replace(/^\d{8}_/, ''),
          excerpt: data.excerpt || generateExcerpt(content),
          content: contentHtml,
          category: data.category || 'thoughts',
          tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
          publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
          readTime: data.readTime || estimateReadTime(content),
          featured: Boolean(data.featured) || false,
        };
      } catch (fileError) {
        console.error(`处理文件 ${fileName} 时出错:`, fileError);
        return null;
      }
    }).filter((article): article is Article => article !== null);
    
    return articles;
  } catch (error) {
    console.error('读取Markdown文章时出错:', error);
    return [];
  }
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

// 创建新文章模板
export function createArticleTemplate(title: string, category: string = 'thoughts'): string {
  const date = new Date().toISOString().split('T')[0];
  const fileName = `${date.replace(/-/g, '')}_${title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '')}.md`;
  
  const template = `---
title: "${title}"
excerpt: "在这里写文章摘要..."
category: "${category}"
tags: ["标签1", "标签2"]
publishedAt: "${date}"
readTime: 5
featured: false
---

# ${title}

在这里开始写您的文章内容...

## 子标题

文章内容...

### 更小的标题

更多内容...

**加粗文本** 和 *斜体文本*

- 列表项1
- 列表项2
- 列表项3

> 这是一个引用块

[链接文本](https://example.com)

\`\`\`javascript
// 代码块示例
console.log("Hello, World!");
\`\`\`
`;

  return template;
}

// 保存文章到文件
export function saveArticleToFile(fileName: string, content: string): boolean {
  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles');
    
    // 确保目录存在
    if (!fs.existsSync(articlesDirectory)) {
      fs.mkdirSync(articlesDirectory, { recursive: true });
    }
    
    const fullPath = path.join(articlesDirectory, fileName);
    fs.writeFileSync(fullPath, content, 'utf8');
    return true;
  } catch (error) {
    console.error('保存文章时出错:', error);
    return false;
  }
} 