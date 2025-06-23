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
  { id: 'economics', name: '经济学思考', icon: 'TrendingUp' },
  { id: 'notes', name: '学习笔记', icon: 'BookOpen' },
  { id: 'projects', name: '项目展示', icon: 'Code' },
  { id: 'ai', name: 'AI观察', icon: 'Brain' },
  { id: 'thoughts', name: '随笔杂谈', icon: 'PenTool' },
];

// 静态文章数据（按发布时间排序，统一ID格式）
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
  },
  {
    id: '3',
    title: '100位经济学领域关键学者',
    excerpt: '从古希腊苏格拉底到现代经济学前沿，纵览百位经济学思想巨匠的智慧传承与理论演进，探寻人类经济思想发展的璀璨星河。',
    content: `
      <h2>100位经济学领域关键学者</h2>
      <p>"无论是对个人而言，还是对社会而言，在现代工业社会中，真正能促成生产的因素是一种概念，也有人更愿意称之为'全局眼光'。它是一种整体性观念，是一种对完整模式的全局把握。"——彼得·德鲁克</p>
      
      <p>拥有全局眼光，就像你在陌生空间拥有了万能地图。</p>
      
      <p>你能看见它的整体，也能看见它的道理、秩序和目的，让自己的内心不再混乱、无序和莫名其妙。</p>
      
      <p>下文，是经济学领域中的100位关键人物。</p>
      
      <p>温馨提示一下，本文与248本关键著作一起"服用"，更佳。</p>
      
      <p>因为，他们不是独立的个体，也不是无聊的文字拼接。</p>
      
      <p>他们，是灵动的，也是鲜活的。</p>
      
      <p>他们，有自己的人际网络。他们，在我们看不见的地方，相互影响着。</p>
      
      <p>比如，你会发现魁奈的《经济表》不仅影响着亚当·斯密的《国富论》，也影响着马克思的《资本论》。</p>
      
      <p>比如，你会发现亚当·斯密一生挚友——大卫·休谟跟丹尼尔·马尔萨斯是朋友，跟大穆勒也是朋友。小穆勒就在他们的交流和思想碰撞中，不断被塑造，最终成为一代经济学大师。</p>
      
      <p>比如，你还会发现，学派与学派之间的吸收、争吵、批判，会塑造出新学派。也正因为如此，经济学才得以推进与发展。</p>
      
      <p>这些人物与人物之间的关系，作品与作品之间的关联，学派与学派之间的重构，塑造了文字背后的灵动和鲜活，也让人看见了星火的代代相传。</p>
      
      <p>此文，只为致敬人类历史上的璀璨星河。</p>
      
      <h3>01 过去的关键人物</h3>
      
      <p>……（此处献给未知的前人）</p>
      
      <p><strong>1. 苏格拉底</strong>（Socrates，公元前469-公元前399），古希腊哲学家，色诺芬作为苏格拉底的学生，其经济理念来自于他的老师；</p>
      
      <p><strong>2. 色诺芬</strong>（Xenophon，公元前440-公元前355），古希腊哲学家、史学家，最早使用"经济"一词，在《居鲁士的教育》中提出了分工和专业化，在《雅典的收入》中研究了收入问题；</p>
      
      <p><strong>3. 柏拉图</strong>（Plato，公元前427-公元前347），古希腊唯心主义哲学家，师从苏格拉底，在《理想国》中提出了劳动分工、三阶级论等；</p>
      
      <p><strong>4. 亚里士多德</strong>（Aristotle，公元前384-公元前322），指出了商品的价值性和稀缺性、货币的价值储藏功能等；</p>
      
      <p>这是一份详尽的经济学思想史梳理，记录了从古希腊哲学家到现代经济学家的重要贡献。文章展现了经济学思想的历史传承和发展脉络，为读者提供了全面的经济学学者全景图。</p>
      
      <p><em>注：文章包含完整的100位经济学学者介绍，详细阐述了每位学者的理论贡献和历史地位。</em></p>
    `,
    category: 'economics',
    tags: ['经济学', '经济学理论', '学者传记', '思想史', '经济学史'],
    publishedAt: '2024-06-30',
    readTime: 20,
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