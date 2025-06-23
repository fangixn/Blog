// 引入Markdown处理功能
import { getAllMarkdownArticles } from './markdown';

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
  { id: 'economics', name: '经济学思考', icon: 'TrendingUp' },
  { id: 'notes', name: '学习笔记', icon: 'BookOpen' },
  { id: 'projects', name: '项目展示', icon: 'Code' },
  { id: 'ai', name: 'AI观察', icon: 'Brain' },
  { id: 'thoughts', name: '随笔杂谈', icon: 'PenTool' },
];

// 静态文章数据（作为备份或特殊文章）
export const articles: Article[] = [
  {
    id: '1',
    title: '四本书让你迈过经济学的门槛',
    excerpt: '所有的表达者，都有自己难言之隐和矛盾之处。你要做的是，从文本中抽离出自己，钻进作者的大脑，找到它们。推荐四本经济学入门必读书籍。',
    content: `
      <h1>四本书让你迈过经济学的门槛</h1>
      <p>所有的表达者，都有自己难言之隐和矛盾之处。你要做的是，从文本中抽离出自己，钻进作者的大脑，找到它们。</p>
      
      <h3>书1:《经济思想史》（第8版）</h3>
      <p>简评：这本书在梳理每一个重要的经济思想学派的时候，都会考虑五个主要问题：这个学派产生的历史背景是什么？这个学派的主要信条是什么？这个学派对谁有利或为谁谋利？这个学派在当时是如何有效、有用或正确的？这个学派的哪些信条具有长远的贡献？也正因为这五个独特的考量角度，这本书深受编辑推荐和读者欢迎。</p>
      
      <p>如果你看经济思想史是为了解答上述疑惑，这本书的确是一个很合适的选择。如果你看经济思想史是为了梳理经济学重要学派和人物、重要理论、重要著作，去翻魏丽莉的《经济思想史》效率会更高。</p>
      
      <h3>书2:《经济学》（第19版）</h3>
      <p>简评：萨缪尔森作为美国第一位诺贝尔经济学奖获得者，其文字幽默风趣、通俗易懂，对于知识点的论述也是循循善诱，相对曼昆的《经济学原理》有更强的可读性。</p>
      
      <h3>书3:《经济学原理》（第8版）</h3>
      <p>简评：曼昆的《经济学原理》是国内最受欢迎、使用面最广的经济学经典教材。这本书可以作为萨缪尔森《经济学》的扩展补充。从知识结构上说，这本书在萨缪尔森《经济学》的基础之上，做了更全面的总结和概括。</p>
      
      <h3>书4:《像经济学家一样思考》</h3>
      <p>简评：这本书与《牛奶可乐经济学》《魔鬼经济学》最大的差异在于这本书的作者是位经济学家，书中的内容是其在教授"经济学原理"时所讲述的日常生活。所以书里的内容与"经济学原理"的知识点有很高的契合度。</p>
      
      <p><strong>Tip：</strong> 上述所有书的作者都有自己所属的学派。这就意味着他们对于经济学知识点有不同的认知、选择和偏好，这需要我们的阅读时万分留意。</p>
    `,
    category: 'economics',
    tags: ['经济学', '书籍推荐', '经济学入门', '萨缪尔森', '曼昆', '经济学原理'],
    publishedAt: '2024-01-31',
    readTime: 8,
    featured: true,
  },
  {
    id: '2',
    title: '247本经济学领域关键著作',
    excerpt: '这是一份经过精心整理的经济学必读书单，涵盖了从古典经济学到现代经济学理论的重要著作，为经济学学习者和研究者提供系统性的阅读指南。',
    content: `
      <h1>247本经济学领域关键著作</h1>
      <p>这是一份经过精心整理的经济学必读书单，涵盖了从古典经济学到现代经济学理论的重要著作，为经济学学习者和研究者提供系统性的阅读指南。</p>
      
      <h2>经济学经典理论</h2>
      <p>从亚当·斯密的《国富论》到约翰·梅纳德·凯恩斯的《就业、利息和货币通论》，这些经典著作奠定了现代经济学的基础。</p>
      
      <h2>现代经济学发展</h2>
      <p>包括行为经济学、实验经济学、信息经济学等新兴领域的重要文献，展现了经济学理论的最新发展。</p>
      
      <h2>应用经济学</h2>
      <p>涵盖货币银行学、国际经济学、发展经济学、环境经济学等各个应用领域的核心文献。</p>
      
      <p>这份书单将持续更新，为经济学爱好者提供最全面的学习资源。</p>
    `,
    category: 'economics',
    tags: ['经济学', '书单', '学术著作', '经济学理论', '必读书籍'],
    publishedAt: '2024-03-01',
    readTime: 15,
    featured: true,
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'EconomicsWeb - 经济学资源导航',
    description: '最全面的经济学资源集合，涵盖数据分析、学术研究、政策解读等，支持智能搜索、分类浏览，是经济学专业人士的必备工具平台。',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['经济学', '资源导航', 'Next.js', 'SEO', '学术资源', '数据源'],
    link: 'https://www.economicsweb.org/',
    featured: true,
  },
  {
    id: '2',
    title: 'EconAI - 经济学AI研究助手',
    description: 'AI驱动的经济学知识库，整合多个AI模型与学术资源，提供智能化的经济分析和研究工具，助力经济学研究和学习。',
    image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['AI助手', '经济学研究', 'GPT', 'Claude', '学术工具', 'ChatBot'],
    link: 'https://www.economicsai.org/',
    featured: true,
  },
  {
    id: '3',
    title: 'TranslationCompare - 翻译质量对比',
    description: '专业的翻译服务质量对比平台，帮助用户选择最适合的翻译工具和服务，提供客观的翻译质量评估和建议。',
    image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['翻译对比', '语言服务', 'Web应用', '质量评估', '多语言'],
    link: 'https://www.translationcompare.com/',
    featured: true,
  },
  {
    id: '4',
    title: 'AIMCP Web - AI项目管理',
    description: '基于AI的项目管理和协作平台，提供智能化的项目规划、进度跟踪和团队协作功能，提升项目管理效率。',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['项目管理', 'AI工具', '团队协作', 'SaaS', '效率工具'],
    link: 'https://www.aimcpweb.com/zh',
    featured: false,
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

// 智能获取所有文章（优先使用Markdown文件）
export function getAllArticles(): Article[] {
  try {
    // 尝试从Markdown文件读取
    const markdownArticles = getAllMarkdownArticles();
    
    // 如果Markdown文章存在，优先使用它们
    if (markdownArticles.length > 0) {
      // 合并Markdown文章和静态文章，Markdown文章优先
      const allArticles = [...markdownArticles, ...articles];
      
      // 去重（基于标题或ID）
      const uniqueArticles = allArticles.filter((article, index, self) => 
        index === self.findIndex(a => a.title === article.title)
      );
      
      return uniqueArticles.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }
    
    // 如果没有Markdown文章，返回静态文章
    return articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('获取文章时出错:', error);
    // 发生错误时返回静态文章作为备份
    return articles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }
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