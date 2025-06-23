import { Article } from './data';
import { Language } from './i18n';

// 专业术语词典
const PROFESSIONAL_TERMS = {
  economics: {
    zh: {
      'GDP': 'GDP/国内生产总值',
      '通胀': 'inflation',
      '货币政策': 'monetary policy',
      '财政政策': 'fiscal policy',
      '宏观经济': 'macroeconomics',
      '微观经济': 'microeconomics',
      '供需关系': 'supply and demand',
      '市场机制': 'market mechanism',
      '经济增长': 'economic growth',
      '失业率': 'unemployment rate',
      '利率': 'interest rate',
      '汇率': 'exchange rate',
      '贸易逆差': 'trade deficit',
      '贸易顺差': 'trade surplus'
    },
    en: {
      'GDP': 'Gross Domestic Product',
      'inflation': 'inflation/通胀',
      'monetary policy': 'monetary policy/货币政策',
      'fiscal policy': 'fiscal policy/财政政策',
      'macroeconomics': 'macroeconomics/宏观经济学',
      'microeconomics': 'microeconomics/微观经济学',
      'supply and demand': 'supply and demand/供需关系',
      'market mechanism': 'market mechanism/市场机制',
      'economic growth': 'economic growth/经济增长',
      'unemployment rate': 'unemployment rate/失业率'
    },
    de: {
      'GDP': 'Bruttoinlandsprodukt (BIP)',
      'inflation': 'Inflation',
      'monetary policy': 'Geldpolitik',
      'fiscal policy': 'Fiskalpolitik',
      'macroeconomics': 'Makroökonomie',
      'microeconomics': 'Mikroökonomie',
      'supply and demand': 'Angebot und Nachfrage',
      'market mechanism': 'Marktmechanismus',
      'economic growth': 'Wirtschaftswachstum',
      'unemployment rate': 'Arbeitslosenquote'
    },
    ja: {
      'GDP': '国内総生産（GDP）',
      'inflation': 'インフレーション/物価上昇',
      'monetary policy': '金融政策',
      'fiscal policy': '財政政策',
      'macroeconomics': 'マクロ経済学',
      'microeconomics': 'ミクロ経済学',
      'supply and demand': '需要と供給',
      'market mechanism': '市場メカニズム',
      'economic growth': '経済成長',
      'unemployment rate': '失業率',
      'interest rate': '金利',
      'exchange rate': '為替レート',
      'trade deficit': '貿易赤字',
      'trade surplus': '貿易黒字',
      'central bank': '中央銀行',
      'stock market': '株式市場'
    },
    ko: {
      'GDP': '국내총생산(GDP)',
      'inflation': '인플레이션/물가상승',
      'monetary policy': '통화정책',
      'fiscal policy': '재정정책',
      'macroeconomics': '거시경제학',
      'microeconomics': '미시경제학',
      'supply and demand': '수요와 공급',
      'market mechanism': '시장메커니즘',
      'economic growth': '경제성장',
      'unemployment rate': '실업률',
      'interest rate': '금리',
      'exchange rate': '환율',
      'trade deficit': '무역적자',
      'trade surplus': '무역흑자',
      'central bank': '중앙은행',
      'stock market': '주식시장'
    }
  },
  technology: {
    zh: {
      '人工智能': 'Artificial Intelligence',
      '机器学习': 'Machine Learning',
      '深度学习': 'Deep Learning',
      '大数据': 'Big Data',
      '云计算': 'Cloud Computing',
      '区块链': 'Blockchain',
      '物联网': 'Internet of Things'
    },
    en: {
      'AI': 'Artificial Intelligence',
      'ML': 'Machine Learning',
      'DL': 'Deep Learning',
      'IoT': 'Internet of Things',
      'API': 'Application Programming Interface'
    },
    de: {
      'AI': 'Künstliche Intelligenz (KI)',
      'Machine Learning': 'Maschinelles Lernen',
      'Deep Learning': 'Deep Learning/Tiefes Lernen',
      'Big Data': 'Big Data/Große Datenmengen',
      'Cloud Computing': 'Cloud Computing/Wolken-Computing'
    },
    ja: {
      '人工智能': '人工知能（AI）',
      '机器学习': '機械学習',
      '深度学习': 'ディープラーニング',
      '大数据': 'ビッグデータ',
      '云计算': 'クラウドコンピューティング',
      'AI': '人工知能',
      'Machine Learning': '機械学習',
      'Deep Learning': 'ディープラーニング',
      'IoT': 'モノのインターネット',
      'API': 'アプリケーション・プログラミング・インターフェース'
    },
    ko: {
      '人工智能': '인공지능(AI)',
      '机器学习': '머신러닝',
      '深度学习': '딥러닝',
      '大数据': '빅데이터',
      '云计算': '클라우드 컴퓨팅',
      'AI': '인공지능',
      'Machine Learning': '머신러닝',
      'Deep Learning': '딥러닝',
      'IoT': '사물인터넷',
      'API': '애플리케이션 프로그래밍 인터페이스'
    }
  }
};

// 本地化配置
const LOCALIZATION_CONFIG = {
  zh: {
    currency: 'CNY',
    currencySymbol: '¥',
    dateFormat: 'YYYY年MM月DD日',
    numberFormat: 'zh-CN',
    timezone: 'Asia/Shanghai',
    culturalContext: {
      formalAddress: '您',
      informalAddress: '你',
      businessContext: 'formal',
      academicStyle: 'structured'
    }
  },
  en: {
    currency: 'USD',
    currencySymbol: '$',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: 'en-US',
    timezone: 'America/New_York',
    culturalContext: {
      formalAddress: 'you',
      informalAddress: 'you',
      businessContext: 'direct',
      academicStyle: 'analytical'
    }
  },
  de: {
    currency: 'EUR',
    currencySymbol: '€',
    dateFormat: 'DD.MM.YYYY',
    numberFormat: 'de-DE',
    timezone: 'Europe/Berlin',
    culturalContext: {
      formalAddress: 'Sie',
      informalAddress: 'du',
      businessContext: 'formal',
      academicStyle: 'methodical'
    }
  },
  ja: {
    currency: 'JPY',
    currencySymbol: '¥',
    dateFormat: 'YYYY年MM月DD日',
    numberFormat: 'ja-JP',
    timezone: 'Asia/Tokyo',
    culturalContext: {
      formalAddress: 'です/ます調',
      informalAddress: 'だ/である調',
      businessContext: 'respectful',
      academicStyle: 'detailed'
    }
  },
  ko: {
    currency: 'KRW',
    currencySymbol: '₩',
    dateFormat: 'YYYY년 MM월 DD일',
    numberFormat: 'ko-KR',
    timezone: 'Asia/Seoul',
    culturalContext: {
      formalAddress: '합니다체',
      informalAddress: '해요체',
      businessContext: 'hierarchical',
      academicStyle: 'systematic'
    }
  }
};

// 智能翻译引擎
export class SmartTranslator {
  private apiKey: string;
  private cache: Map<string, TranslationResult> = new Map();
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7天

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // 主要翻译方法
  async translateContent(
    content: string,
    sourceLanguage: Language,
    targetLanguage: Language,
    contentType: 'article' | 'technical' | 'casual' = 'article'
  ): Promise<TranslationResult> {
    const cacheKey = this.generateCacheKey(content, sourceLanguage, targetLanguage, contentType);
    
    // 检查缓存
    const cached = this.getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // 预处理：识别专业术语
      const processedContent = this.preprocessContent(content, sourceLanguage, targetLanguage);
      
      // 执行翻译
      const translation = await this.executeTranslation(
        processedContent,
        sourceLanguage,
        targetLanguage,
        contentType
      );
      
      // 后处理：本地化和质量检查
      const localizedTranslation = this.postprocessTranslation(
        translation,
        targetLanguage,
        contentType
      );
      
      // 质量评估
      const qualityScore = this.assessQuality(content, localizedTranslation, targetLanguage);
      
      const result: TranslationResult = {
        original: content,
        translated: localizedTranslation,
        sourceLanguage,
        targetLanguage,
        qualityScore,
        timestamp: Date.now(),
        metadata: {
          contentType,
          termCount: this.countProfessionalTerms(content),
          processingTime: Date.now()
        }
      };

      // 保存到缓存
      this.saveToCache(cacheKey, result);
      
      return result;

    } catch (error) {
      console.error('智能翻译失败:', error);
      throw new TranslationError('翻译过程中出现错误', error);
    }
  }

  // 预处理：识别和保护专业术语
  private preprocessContent(
    content: string,
    sourceLanguage: Language,
    targetLanguage: Language
  ): string {
    let processedContent = content;
    
    // 识别专业术语并标记
    const terms = PROFESSIONAL_TERMS.economics[sourceLanguage] || {};
    
    Object.entries(terms).forEach(([term, translation]) => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      processedContent = processedContent.replace(regex, `<TERM:${term}>`);
    });

    return processedContent;
  }

  // 执行翻译（集成多个翻译服务）
  private async executeTranslation(
    content: string,
    sourceLanguage: Language,
    targetLanguage: Language,
    contentType: string
  ): Promise<string> {
    const prompt = this.buildTranslationPrompt(content, sourceLanguage, targetLanguage, contentType);
    
    // 这里可以集成多个翻译API
    return await this.callGPTTranslation(prompt);
  }

  // 构建专业翻译提示词
  private buildTranslationPrompt(
    content: string,
    sourceLanguage: Language,
    targetLanguage: Language,
    contentType: string
  ): string {
    const langNames: { [key in Language]: string } = {
      zh: '中文',
      en: 'English',
      de: 'German',
      ja: '日本語',
      ko: '한국어'
    };

    const styleGuides: { [key: string]: string } = {
      article: '学术文章风格，保持严谨和专业',
      technical: '技术文档风格，准确且简洁',
      casual: '日常交流风格，自然流畅'
    };

    const localizationHints = LOCALIZATION_CONFIG[targetLanguage];

    return `
您是一位专业的${langNames[sourceLanguage]}到${langNames[targetLanguage]}翻译专家，专精于经济学和技术领域。

翻译要求：
1. **专业性**：准确翻译经济学术语，保持学术严谨性
2. **本地化**：
   - 使用${localizationHints.culturalContext.businessContext}语体
   - 货币单位转换为${localizationHints.currency}
   - 日期格式：${localizationHints.dateFormat}
   - 数字格式：${localizationHints.numberFormat}
3. **风格**：${styleGuides[contentType]}
4. **术语处理**：遇到<TERM:xxx>标记时，使用专业词典中的对应翻译

请翻译以下内容：

${content}

要求：
- 保持原文的逻辑结构和论证方式
- 专业术语必须准确
- 语言自然流畅，符合目标语言习惯
- 不要添加解释性内容
- 保持原文的语气和风格
`;
  }

  // GPT翻译调用
  private async callGPTTranslation(prompt: string): Promise<string> {
    // 模拟GPT API调用
    // 实际实现中应该调用真实的OpenAI API
    
    if (!this.apiKey) {
      throw new Error('缺少API密钥');
    }

    // 模拟API延迟
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 这里应该是真实的API调用
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: '你是专业的经济学翻译专家' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 4000
      })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
    */
    
    // 模拟翻译结果
    return `[智能翻译] ${prompt.split('\n').pop()}`;
  }

  // 后处理：本地化和术语替换
  private postprocessTranslation(
    translation: string,
    targetLanguage: Language,
    contentType: string
  ): string {
    let processed = translation;
    
    // 替换专业术语标记
    const terms = PROFESSIONAL_TERMS.economics[targetLanguage] || {};
    
    Object.entries(terms).forEach(([originalTerm, localTerm]) => {
      const regex = new RegExp(`<TERM:${originalTerm}>`, 'gi');
      processed = processed.replace(regex, localTerm);
    });

    // 本地化数字和货币格式
    processed = this.localizeNumbers(processed, targetLanguage);
    processed = this.localizeCurrency(processed, targetLanguage);
    
    return processed;
  }

  // 本地化数字格式
  private localizeNumbers(text: string, language: Language): string {
    const config = LOCALIZATION_CONFIG[language];
    
    // 数字格式本地化
    const numberRegex = /\d{1,3}(,\d{3})*/g;
    
    return text.replace(numberRegex, (match) => {
      const number = parseFloat(match.replace(/,/g, ''));
      return new Intl.NumberFormat(config.numberFormat).format(number);
    });
  }

  // 本地化货币格式
  private localizeCurrency(text: string, language: Language): string {
    const config = LOCALIZATION_CONFIG[language];
    
    // 简单的货币符号替换
    const currencyMap = {
      '$': config.currencySymbol,
      '¥': config.currencySymbol,
      '€': config.currencySymbol
    };

    let processed = text;
    Object.entries(currencyMap).forEach(([original, local]) => {
      if (original !== local) {
        processed = processed.replace(new RegExp(`\\${original}`, 'g'), local);
      }
    });

    return processed;
  }

  // 质量评估
  private assessQuality(
    original: string,
    translated: string,
    targetLanguage: Language
  ): number {
    let score = 100;

    // 长度合理性检查
    const lengthRatio = translated.length / original.length;
    if (lengthRatio < 0.5 || lengthRatio > 2.5) {
      score -= 20;
    }

    // 专业术语保留检查
    const termCount = this.countProfessionalTerms(original);
    const translatedTermCount = this.countProfessionalTerms(translated);
    
    if (Math.abs(termCount - translatedTermCount) > 2) {
      score -= 15;
    }

    // 结构完整性检查
    if (!this.checkStructureIntegrity(original, translated)) {
      score -= 10;
    }

    return Math.max(score, 0);
  }

  // 计算专业术语数量
  private countProfessionalTerms(text: string): number {
    let count = 0;
    const allTerms = Object.values(PROFESSIONAL_TERMS).flatMap(category => 
      Object.values(category).flatMap(terms => Object.keys(terms))
    );
    
    allTerms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const matches = text.match(regex);
      if (matches) {
        count += matches.length;
      }
    });
    
    return count;
  }

  // 检查结构完整性
  private checkStructureIntegrity(original: string, translated: string): boolean {
    // 检查段落数量
    const originalParagraphs = original.split('\n\n').length;
    const translatedParagraphs = translated.split('\n\n').length;
    
    return Math.abs(originalParagraphs - translatedParagraphs) <= 1;
  }

  // 缓存管理
  private generateCacheKey(
    content: string,
    sourceLanguage: Language,
    targetLanguage: Language,
    contentType: string
  ): string {
    const hash = this.simpleHash(content);
    return `${sourceLanguage}-${targetLanguage}-${contentType}-${hash}`;
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private getFromCache(key: string): TranslationResult | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached;
    }
    return null;
  }

  private saveToCache(key: string, result: TranslationResult): void {
    this.cache.set(key, result);
  }
}

// 翻译结果接口
export interface TranslationResult {
  original: string;
  translated: string;
  sourceLanguage: Language;
  targetLanguage: Language;
  qualityScore: number;
  timestamp: number;
  metadata: {
    contentType: string;
    termCount: number;
    processingTime: number;
  };
}

// 翻译错误类
export class TranslationError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'TranslationError';
  }
}

// 扩展的翻译文章类型
export interface TranslatedArticle extends Article {
  translationMetadata?: {
    targetLanguage: Language;
    qualityScores: {
      title: number;
      excerpt: number;
      content: number;
    };
    translatedAt: string;
    originalId: string;
  };
}

// 便捷函数：翻译文章
export async function translateArticleWithAI(
  article: Article,
  targetLanguage: Language,
  apiKey: string
): Promise<TranslatedArticle> {
  const translator = new SmartTranslator(apiKey);
  
  try {
    const [titleResult, excerptResult, contentResult] = await Promise.all([
      translator.translateContent(article.title, 'zh', targetLanguage, 'article'),
      translator.translateContent(article.excerpt, 'zh', targetLanguage, 'article'),
      translator.translateContent(article.content, 'zh', targetLanguage, 'article')
    ]);

    return {
      ...article,
      id: `${article.id}-${targetLanguage}`,
      title: titleResult.translated,
      excerpt: excerptResult.translated,
      content: contentResult.translated,
      translationMetadata: {
        targetLanguage,
        qualityScores: {
          title: titleResult.qualityScore,
          excerpt: excerptResult.qualityScore,
          content: contentResult.qualityScore
        },
        translatedAt: new Date().toISOString(),
        originalId: article.id
      }
    };
  } catch (error) {
    console.error('文章翻译失败:', error);
    throw error;
  }
}

// 批量翻译服务
export class BatchTranslationService {
  private translator: SmartTranslator;

  constructor(apiKey: string) {
    this.translator = new SmartTranslator(apiKey);
  }

  async translateArticles(
    articles: Article[],
    targetLanguage: Language,
    onProgress?: (completed: number, total: number) => void
  ): Promise<TranslatedArticle[]> {
    const results: TranslatedArticle[] = [];
    
    for (let i = 0; i < articles.length; i++) {
      try {
        const translated = await translateArticleWithAI(
          articles[i],
          targetLanguage,
          this.translator['apiKey']
        );
        results.push(translated);
        
        onProgress?.(i + 1, articles.length);
        
        // 避免API限制，添加延迟
        if (i < articles.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`翻译文章 ${articles[i].id} 失败:`, error);
        // 保留原文但转换为TranslatedArticle类型
        results.push({ ...articles[i] } as TranslatedArticle);
      }
    }
    
    return results;
  }
} 