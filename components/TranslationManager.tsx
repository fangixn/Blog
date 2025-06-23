'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  Settings,
  Star
} from 'lucide-react';
import { Language, languages } from '@/lib/i18n';
import { 
  SmartTranslator, 
  TranslationResult, 
  translateArticleWithAI,
  TranslatedArticle 
} from '@/lib/smart-translator';
import { Article } from '@/lib/data';

interface TranslationManagerProps {
  articles: Article[];
  apiKey?: string;
  onTranslationComplete?: (translatedArticles: TranslatedArticle[], language: Language) => void;
}

export default function TranslationManager({ 
  articles, 
  apiKey, 
  onTranslationComplete 
}: TranslationManagerProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [translationResults, setTranslationResults] = useState<TranslatedArticle[]>([]);
  const [qualityScores, setQualityScores] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);

  // 模拟翻译（因为没有真实API密钥）
  const simulateTranslation = async (article: Article, targetLanguage: Language): Promise<TranslatedArticle> => {
    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockTranslations: { [key in Language]?: { title: string; excerpt: string; content: string } } = {
      en: {
        title: `[EN] ${article.title}`,
        excerpt: `[EN] ${article.excerpt}`,
        content: `[EN] ${article.content}`
      },
      de: {
        title: `[DE] ${article.title}`,
        excerpt: `[DE] ${article.excerpt}`,
        content: `[DE] ${article.content}`
      },
      zh: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content
      },
      ja: {
        title: `[JA] ${article.title}`,
        excerpt: `[JA] ${article.excerpt}`,
        content: `[JA] ${article.content}`
      },
      ko: {
        title: `[KO] ${article.title}`,
        excerpt: `[KO] ${article.excerpt}`,
        content: `[KO] ${article.content}`
      }
    };

    const translation = mockTranslations[targetLanguage];
    if (!translation) {
      throw new Error(`不支持的语言: ${targetLanguage}`);
    }

    return {
      ...article,
      id: `${article.id}-${targetLanguage}`,
      title: translation.title,
      excerpt: translation.excerpt,
      content: translation.content,
      translationMetadata: {
        targetLanguage,
        qualityScores: {
          title: Math.floor(Math.random() * 20) + 80, // 80-100分
          excerpt: Math.floor(Math.random() * 20) + 80,
          content: Math.floor(Math.random() * 20) + 80
        },
        translatedAt: new Date().toISOString(),
        originalId: article.id
      }
    };
  };

  const handleTranslation = async () => {
    if (!articles.length) {
      setError('没有文章需要翻译');
      return;
    }

    setIsTranslating(true);
    setError(null);
    setProgress(0);
    setTranslationResults([]);
    setQualityScores({});

    try {
      const results: TranslatedArticle[] = [];
      const scores: { [key: string]: number } = {};

      for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        
        let translatedArticle: TranslatedArticle;
        
        if (apiKey) {
          // 使用真实的AI翻译
          translatedArticle = await translateArticleWithAI(article, selectedLanguage, apiKey);
        } else {
          // 使用模拟翻译
          translatedArticle = await simulateTranslation(article, selectedLanguage);
        }
        
        results.push(translatedArticle);
        
        // 计算平均质量分数
        if (translatedArticle.translationMetadata) {
          const avgScore = Math.round(
            (translatedArticle.translationMetadata.qualityScores.title +
             translatedArticle.translationMetadata.qualityScores.excerpt +
             translatedArticle.translationMetadata.qualityScores.content) / 3
          );
          scores[translatedArticle.id] = avgScore;
        }
        
        setProgress(((i + 1) / articles.length) * 100);
      }

      setTranslationResults(results);
      setQualityScores(scores);
      onTranslationComplete?.(results, selectedLanguage);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '翻译过程中出现未知错误');
    } finally {
      setIsTranslating(false);
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQualityBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800">优秀</Badge>;
    if (score >= 80) return <Badge className="bg-yellow-100 text-yellow-800">良好</Badge>;
    return <Badge className="bg-red-100 text-red-800">需优化</Badge>;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-purple-600" />
          <span>智能翻译管理器</span>
        </CardTitle>
        <p className="text-gray-600">
          使用AI技术进行专业、准确的多语言翻译，确保经济学术语的专业性和本地化
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 翻译配置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">目标语言</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as Language)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              disabled={isTranslating}
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleTranslation}
              disabled={isTranslating || !articles.length}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isTranslating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  翻译中...
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4 mr-2" />
                  开始智能翻译
                </>
              )}
            </Button>
          </div>
        </div>

        {/* API密钥状态 */}
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertDescription>
            {apiKey ? (
              <span className="text-green-600">✓ 已配置AI翻译API，将使用真实的智能翻译服务</span>
            ) : (
              <span className="text-yellow-600">⚠️ 未配置API密钥，当前为演示模式</span>
            )}
          </AlertDescription>
        </Alert>

        {/* 翻译进度 */}
        {isTranslating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>翻译进度</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-600">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* 翻译结果 */}
        {translationResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>翻译完成</span>
              <Badge className="bg-blue-100 text-blue-800">
                {translationResults.length} 篇文章
              </Badge>
            </h3>

            <div className="grid gap-4">
              {translationResults.map((article) => {
                const score = qualityScores[article.id] || 0;
                return (
                  <Card key={article.id} className="border-l-4 border-l-purple-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-lg">{article.title}</h4>
                        <div className="flex items-center space-x-2">
                          {getQualityBadge(score)}
                          <span className={`text-sm font-medium ${getQualityColor(score)}`}>
                            {score}分
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          原文ID: {article.translationMetadata?.originalId}
                        </span>
                        <span>
                          翻译时间: {article.translationMetadata?.translatedAt ? 
                            new Date(article.translationMetadata.translatedAt).toLocaleString() : 
                            '未知'
                          }
                        </span>
                      </div>
                      
                      {/* 详细质量分数 */}
                      {article.translationMetadata && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex space-x-4 text-xs">
                            <span>标题: {article.translationMetadata.qualityScores.title}分</span>
                            <span>摘要: {article.translationMetadata.qualityScores.excerpt}分</span>
                            <span>内容: {article.translationMetadata.qualityScores.content}分</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* 整体统计 */}
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-medium mb-2 flex items-center space-x-2">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span>翻译质量统计</span>
                </h4>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {Object.values(qualityScores).filter(score => score >= 90).length}
                    </div>
                    <div className="text-sm text-gray-600">优秀翻译</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {Object.values(qualityScores).filter(score => score >= 80 && score < 90).length}
                    </div>
                    <div className="text-sm text-gray-600">良好翻译</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round(Object.values(qualityScores).reduce((a, b) => a + b, 0) / Object.values(qualityScores).length) || 0}
                    </div>
                    <div className="text-sm text-gray-600">平均分数</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 使用说明 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2 text-blue-800">智能翻译特性</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>专业术语保护</strong>：自动识别并准确翻译经济学专业术语</li>
              <li>• <strong>本地化适配</strong>：自动调整数字、货币、日期格式</li>
              <li>• <strong>语体适配</strong>：根据目标语言文化调整正式程度</li>
              <li>• <strong>质量评估</strong>：自动评估翻译质量并提供改进建议</li>
              <li>• <strong>缓存优化</strong>：智能缓存避免重复翻译</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
} 