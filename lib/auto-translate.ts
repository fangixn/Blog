import { Article } from './data';
import { Language } from './i18n';

// AI翻译服务配置
interface TranslationService {
  name: string;
  translateText: (text: string, targetLang: Language) => Promise<string>;
}

// 模拟AI翻译服务（您可以集成真实的API）
const mockTranslationService: TranslationService = {
  name: 'AI Translator',
  translateText: async (text: string, targetLang: Language): Promise<string> => {
    // 这里可以集成真实的翻译API，如：
    // - OpenAI GPT API
    // - Google Translate API  
    // - DeepL API
    // - Azure Translator API
    
    // 模拟翻译延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 简单的模拟翻译（实际应该调用真实API）
    if (targetLang === 'en') {
      return `[EN] ${text}`;
    } else if (targetLang === 'de') {
      return `[DE] ${text}`;
    }
    return text;
  }
};

// 翻译文章内容
export async function translateArticle(
  article: Article, 
  targetLanguage: Language
): Promise<Article> {
  try {
    const [translatedTitle, translatedExcerpt, translatedContent] = await Promise.all([
      mockTranslationService.translateText(article.title, targetLanguage),
      mockTranslationService.translateText(article.excerpt, targetLanguage), 
      mockTranslationService.translateText(article.content, targetLanguage)
    ]);

    return {
      ...article,
      id: `${article.id}-${targetLanguage}`,
      title: translatedTitle,
      excerpt: translatedExcerpt,
      content: translatedContent,
      // 保持原始标签，但可以选择翻译
      tags: article.tags // 或者也可以翻译标签
    };
  } catch (error) {
    console.error('翻译文章时出错:', error);
    return article; // 翻译失败时返回原文
  }
}

// 批量翻译文章
export async function translateArticles(
  articles: Article[],
  targetLanguage: Language
): Promise<Article[]> {
  const translatedArticles: Article[] = [];
  
  for (const article of articles) {
    try {
      const translated = await translateArticle(article, targetLanguage);
      translatedArticles.push(translated);
    } catch (error) {
      console.error(`翻译文章 ${article.id} 失败:`, error);
      translatedArticles.push(article); // 保留原文
    }
  }
  
  return translatedArticles;
}

// 智能翻译缓存
interface TranslationCache {
  [key: string]: {
    translation: string;
    timestamp: number;
    language: Language;
  };
}

const translationCache: TranslationCache = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时

export async function translateWithCache(
  text: string,
  targetLanguage: Language
): Promise<string> {
  const cacheKey = `${text}-${targetLanguage}`;
  const cached = translationCache[cacheKey];
  
  // 检查缓存
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.translation;
  }
  
  // 执行翻译
  const translation = await mockTranslationService.translateText(text, targetLanguage);
  
  // 保存到缓存
  translationCache[cacheKey] = {
    translation,
    timestamp: Date.now(),
    language: targetLanguage
  };
  
  return translation;
}

// 真实API集成示例
export class RealTranslationService {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  // OpenAI GPT翻译
  async translateWithGPT(text: string, targetLang: Language): Promise<string> {
    const languageNames: { [key in Language]: string } = {
      zh: '中文',
      en: 'English', 
      de: 'German',
      ja: '日本語',
      ko: '한국어'
    };
    
    const prompt = `请将以下文本翻译成${languageNames[targetLang]}，保持原文的语调和专业性：\n\n${text}`;
    
    // 这里应该调用OpenAI API
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [{ role: "user", content: prompt }]
    // });
    // return response.choices[0].message.content;
    
    return `[GPT翻译] ${text}`;
  }
  
  // DeepL翻译
  async translateWithDeepL(text: string, targetLang: Language): Promise<string> {
    const deepLLangCodes = {
      zh: 'ZH',
      en: 'EN',
      de: 'DE'
    };
    
    // 这里应该调用DeepL API
    // const response = await fetch('https://api-free.deepl.com/v2/translate', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `DeepL-Auth-Key ${this.apiKey}`,
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   body: new URLSearchParams({
    //     text: text,
    //     target_lang: deepLLangCodes[targetLang]
    //   })
    // });
    
    return `[DeepL翻译] ${text}`;
  }
} 