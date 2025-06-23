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

// 手动创建的文章数据（现在主要使用Markdown文件）
export const articles: Article[] = [
  // 这里可以添加不想用Markdown格式的文章
  // 大部分文章建议使用Markdown格式，存放在 content/articles/ 目录中
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
  'AI工具', '团队协作', 'SaaS', '效率工具', 'Next.js'
];

// 获取所有文章（包括手动创建的和Markdown文件）
export function getAllArticles(): Article[] {
  try {
    const markdownArticles = getAllMarkdownArticles();
    // 合并手动创建的文章和Markdown文章，Markdown文章优先显示
    return [...markdownArticles, ...articles].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('获取文章时出错:', error);
    return articles;
  }
}