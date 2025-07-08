// 客户端不使用markdown模块，避免fs依赖问题

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  featured?: boolean;
}

export const categories = [
  { id: 'business', name: '商业分析', icon: 'TrendingUp' },
  { id: 'ai', name: 'AI观察', icon: 'Brain' },
  { id: 'tech', name: '技术实践', icon: 'Code' },
  { id: 'methodology', name: '学习方法论', icon: 'BookOpen' },
  { id: 'insights', name: '随笔洞察', icon: 'PenTool' },
];

// 移除静态文章数据 - 现在只使用markdown文件
export const articles: Article[] = [];

// 项目数据 - 现在支持自动图片更新
export const projects: Project[] = [
  {
    id: '1',
    title: 'EconWeb - 经济学资源导航',
    description: '最全面的经济学资源集合，涵盖数据分析、学术研究、政策解读等，支持智能搜索、分类浏览，是经济学专业人士的必备工具平台。',
    image: 'auto', // 设置为 'auto' 将自动获取网站截图或 OG 图片
    tags: ['经济学', '资源导航', 'Next.js', 'SEO', '学术资源', '数据源'],
    link: 'https://www.economicsweb.org/',
    featured: true,
  },
  {
    id: '2',
    title: 'EconAI - 经济学AI研究助手',
    description: 'AI驱动的经济学知识库，整合多个AI模型与学术资源，提供智能化的经济分析和研究工具，助力经济学研究和学习。',
    image: 'auto', // 设置为 'auto' 将自动获取网站截图或 OG 图片
    tags: ['AI助手', '经济学研究', 'GPT', 'Claude', '学术工具', 'ChatBot'],
    link: 'https://www.economicsai.org/',
    featured: true,
  },
  {
    id: '3',
    title: 'TranslationCompare - 翻译质量对比',
    description: '专业的翻译服务质量对比平台，帮助用户选择最适合的翻译工具和服务，提供客观的翻译质量评估和建议。',
    image: 'auto', // 设置为 'auto' 将自动获取网站截图或 OG 图片
    tags: ['翻译对比', '语言服务', 'Web应用', '质量评估', '多语言'],
    link: 'https://www.translationcompare.com/',
    featured: true,
  },
  {
    id: '4',
    title: 'AIMCP Web - AI项目管理',
    description: '基于AI的项目管理和协作平台，提供智能化的项目规划、进度跟踪和团队协作功能，提升项目管理效率。',
    image: 'auto', // 设置为 'auto' 将自动获取网站截图或 OG 图片
    tags: ['项目管理', 'AI工具', '团队协作', 'SaaS', '效率工具'],
    link: 'https://www.aimcpweb.com/zh',
    featured: true,
  },
];

export const tags = [
  '经济学', '技术', 'AI', 'React', 'TypeScript', 'Python', 
  '数据分析', '前端开发', '机器学习', '写作',
  '哲学思考', '项目管理', '用户体验', 'RAG', 
  'LLM', '文档处理', 'AI问答', 'Markdown', '博客写作', '技术分享',
  '资源导航', 'SEO', '学术资源', '数据源', 'AI助手', 
  '经济学研究', 'GPT', 'Claude', '学术工具', 'ChatBot',
  '翻译对比', '语言服务', 'Web应用', '质量评估', '多语言',
  'AI工具', '团队协作', 'SaaS', '效率工具', 'Next.js',
  '书籍推荐', '经济学入门', '萨缪尔森', '曼昆', '经济学原理',
  '书单', '学术著作', '经济学理论', '必读书籍', '人工智能',
  '劳动力市场', '数字经济', '技术变革', '学习心得', '经济学学习',
  '研究方法', '学术技能', '实践应用', '网站开发', '用户体验', '学术平台'
];

// 客户端安全的文章获取函数（返回静态数据）
export function getAllArticles(): Article[] {
  return articles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// 服务器端文章获取函数（仅用于API路由）
export function getAllArticlesServer(): Article[] {
  // 这个函数只能在API路由中使用，不能在客户端组件中调用
  return articles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// 根据分类获取文章
export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(article => article.category === category);
}

// 根据标签获取文章
export function getArticlesByTags(tags: string[]): Article[] {
  return getAllArticles().filter(article => 
    tags.some(tag => article.tags.includes(tag))
  );
}

// 获取精选文章
export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter(article => article.featured);
}

// 搜索文章
export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return getAllArticles().filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// 获取相关文章
export function getRelatedArticles(currentArticle: Article, limit: number = 3): Article[] {
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(article => article.id !== currentArticle.id)
    .map(article => {
      let score = 0;
      
      // 同分类加分
      if (article.category === currentArticle.category) {
        score += 3;
      }
      
      // 相同标签加分
      const commonTags = article.tags.filter(tag => currentArticle.tags.includes(tag));
      score += commonTags.length * 2;
      
      return { article, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);
    
  return relatedArticles;
}