// 支持的语言配置
export const languages = {
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳',
    dir: 'ltr'
  },
  en: {
    code: 'en', 
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  },
  de: {
    code: 'de',
    name: 'Deutsch', 
    flag: '🇩🇪',
    dir: 'ltr'
  },
  ja: {
    code: 'ja',
    name: '日本語',
    flag: '🇯🇵',
    dir: 'ltr'
  },
  ko: {
    code: 'ko',
    name: '한국어',
    flag: '🇰🇷',
    dir: 'ltr'
  }
} as const;

export type Language = keyof typeof languages;

// 默认语言
export const defaultLanguage: Language = 'zh';

// 网站文本翻译
export const translations = {
  zh: {
    site: {
      title: '方馨的博客',
      description: '思想的记录器，代码的操作者',
      tagline: '探索经济学理论与技术实践的交融'
    },
    nav: {
      home: '首页',
      articles: '文章',
      projects: '项目',
      about: '关于我',
      contact: '联系'
    },
    articles: {
      title: '最新文章',
      readMore: '阅读更多',
      readTime: '分钟阅读',
      featured: '精选',
      category: '分类',
      tags: '标签',
      publishedAt: '发布于'
    },
    projects: {
      title: '我的项目',
      viewProject: '查看项目',
      github: 'GitHub',
      demo: '演示'
    },
    categories: {
      economics: '经济学思考',
      notes: '学习笔记', 
      projects: '项目展示',
      ai: 'AI观察',
      thoughts: '随笔杂谈'
    }
  },
  en: {
    site: {
      title: "Fang Xin's Blog",
      description: 'Recorder of thoughts, operator of code',
      tagline: 'Exploring the fusion of economic theory and technical practice'
    },
    nav: {
      home: 'Home',
      articles: 'Articles', 
      projects: 'Projects',
      about: 'About',
      contact: 'Contact'
    },
    articles: {
      title: 'Latest Articles',
      readMore: 'Read More',
      readTime: 'min read',
      featured: 'Featured',
      category: 'Category',
      tags: 'Tags', 
      publishedAt: 'Published'
    },
    projects: {
      title: 'My Projects',
      viewProject: 'View Project',
      github: 'GitHub',
      demo: 'Demo'
    },
    categories: {
      economics: 'Economic Thoughts',
      notes: 'Study Notes',
      projects: 'Project Showcase', 
      ai: 'AI Insights',
      thoughts: 'Random Thoughts'
    }
  },
  de: {
    site: {
      title: 'Fang Xins Blog',
      description: 'Aufzeichner der Gedanken, Bediener des Codes',
      tagline: 'Erforschung der Verschmelzung von Wirtschaftstheorie und technischer Praxis'
    },
    nav: {
      home: 'Startseite',
      articles: 'Artikel',
      projects: 'Projekte', 
      about: 'Über mich',
      contact: 'Kontakt'
    },
    articles: {
      title: 'Neueste Artikel',
      readMore: 'Weiterlesen',
      readTime: 'Min. Lesezeit',
      featured: 'Empfohlen',
      category: 'Kategorie',
      tags: 'Tags',
      publishedAt: 'Veröffentlicht'
    },
    projects: {
      title: 'Meine Projekte',
      viewProject: 'Projekt ansehen',
      github: 'GitHub', 
      demo: 'Demo'
    },
    categories: {
      economics: 'Wirtschaftsgedanken',
      notes: 'Studiennotizen',
      projects: 'Projekt-Showcase',
      ai: 'KI-Einblicke', 
      thoughts: 'Zufällige Gedanken'
    }
  },
  ja: {
    site: {
      title: '方馨のブログ',
      description: '思考の記録者、コードの操作者',
      tagline: '経済学理論と技術実践の融合を探る'
    },
    nav: {
      home: 'ホーム',
      articles: '記事',
      projects: 'プロジェクト',
      about: '私について',
      contact: '連絡'
    },
    articles: {
      title: '最新記事',
      readMore: 'もっと読む',
      readTime: '分読み',
      featured: '注目',
      category: 'カテゴリー',
      tags: 'タグ',
      publishedAt: '公開日'
    },
    projects: {
      title: '私のプロジェクト',
      viewProject: 'プロジェクトを見る',
      github: 'GitHub',
      demo: 'デモ'
    },
    categories: {
      economics: '経済学思考',
      notes: '学習ノート',
      projects: 'プロジェクト紹介',
      ai: 'AI観察',
      thoughts: '随筆'
    }
  },
  ko: {
    site: {
      title: '방신의 블로그',
      description: '생각의 기록자, 코드의 조작자',
      tagline: '경제학 이론과 기술 실무의 융합 탐구'
    },
    nav: {
      home: '홈',
      articles: '글',
      projects: '프로젝트',
      about: '소개',
      contact: '연락'
    },
    articles: {
      title: '최신 글',
      readMore: '더 읽기',
      readTime: '분 읽기',
      featured: '추천',
      category: '카테고리',
      tags: '태그',
      publishedAt: '게시일'
    },
    projects: {
      title: '내 프로젝트',
      viewProject: '프로젝트 보기',
      github: 'GitHub',
      demo: '데모'
    },
    categories: {
      economics: '경제학 사고',
      notes: '학습 노트',
      projects: '프로젝트 쇼케이스',
      ai: 'AI 관찰',
      thoughts: '수필'
    }
  }
} as const;

// 获取翻译文本的工具函数
export function getTranslation(language: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
} 