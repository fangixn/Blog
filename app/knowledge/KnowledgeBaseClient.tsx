'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, Users, School, Lightbulb, ArrowRight, Grid, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import EcosystemIntegration from '@/components/EcosystemIntegration';
import { type Article } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface KnowledgeBaseClientProps {
  articles: Article[];
}

export default function KnowledgeBaseClient({ articles }: KnowledgeBaseClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // 知识模块定义 - 新增方法论模块作为起点
  const knowledgeModules = [
    {
      id: 'methodology',
      title: '学习方法论',
      icon: Map,
      description: '自学经济学的方法论指南与实践路径',
      color: 'from-red-500 to-pink-600',
      keywords: ['如何从零开始自学', '方法论', '学习方法', '自学'],
      priority: 1
    },
    {
      id: 'foundations',
      title: '入门基础',
      icon: BookOpen,
      description: '经济学入门指南与核心概念',
      color: 'from-blue-500 to-blue-600',
      keywords: ['四本书', '入门', '基础', '门槛'],
      priority: 2
    },
    {
      id: 'scholars',
      title: '关键学者',
      icon: Users,
      description: '重要经济学家与理论建构者',
      color: 'from-green-500 to-green-600',
      keywords: ['学者', '经济学家', '人物'],
      priority: 3
    },
    {
      id: 'schools',
      title: '理论学派',
      icon: School,
      description: '主要经济学流派与思想体系',
      color: 'from-purple-500 to-purple-600',
      keywords: ['学派', '流派', '理论', '思想'],
      priority: 4
    },
    {
      id: 'literature',
      title: '核心文献',
      icon: Lightbulb,
      description: '经典著作与重要文献资料',
      color: 'from-orange-500 to-orange-600',
      keywords: ['著作', '文献', '书籍', '经典'],
      priority: 5
    }
  ];

  // 搜索和筛选文章
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return articles;
    
    const query = searchQuery.toLowerCase();
    return articles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [articles, searchQuery]);

  // 按模块分类文章
  const categorizedArticles = useMemo(() => {
    const categorized: { [key: string]: Article[] } = {};
    
    knowledgeModules.forEach(module => {
      categorized[module.id] = articles.filter(article => 
        module.keywords.some(keyword => 
          article.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    });
    
    return categorized;
  }, [articles]);

  const handleArticleClick = (article: Article) => {
    router.push(`/articles/${article.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 头部介绍 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            📚 经济学知识库
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            从学习方法论到知识体系构建，系统性的经济学自学平台，探索人类经济思想的发展脉络
          </p>
          
          {/* 统计信息 */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{articles.length}</div>
              <div className="text-gray-600">知识文档</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{knowledgeModules.length}</div>
              <div className="text-gray-600">知识模块</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">∞</div>
              <div className="text-gray-600">探索可能</div>
            </div>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="glass-effect rounded-2xl p-6 mb-12 shadow-lg">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="🔍 搜索知识库：理论、学者、著作、概念..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-xl border-gray-200 focus:border-purple-400 text-center"
            />
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 rounded-2xl p-1 h-14 max-w-4xl mx-auto">
            <TabsTrigger value="overview" className="rounded-xl">🗺️ 知识地图</TabsTrigger>
            <TabsTrigger value="ecosystem" className="rounded-xl">🌐 生态协同</TabsTrigger>
            <TabsTrigger value="graph" className="rounded-xl">🕸️ 关联图谱</TabsTrigger>
            <TabsTrigger value="search" className="rounded-xl">🔍 搜索浏览</TabsTrigger>
            <TabsTrigger value="path" className="rounded-xl">📖 学习路径</TabsTrigger>
          </TabsList>

          {/* 知识地图视图 */}
          <TabsContent value="overview" className="space-y-8">
            {/* 方法论模块 - 特殊展示 */}
            <div className="mb-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">🎯 学习起点</h3>
                <p className="text-gray-600">在开始探索经济学之前，先掌握科学的学习方法</p>
              </div>
              {(() => {
                const methodologyModule = knowledgeModules.find(m => m.id === 'methodology');
                if (!methodologyModule) return null;
                
                const IconComponent = methodologyModule.icon;
                const moduleArticles = categorizedArticles[methodologyModule.id] || [];
                
                return (
                  <Card className="group hover:shadow-2xl transition-all duration-500 border-0 glass-effect rounded-3xl overflow-hidden max-w-4xl mx-auto">
                    <CardHeader className={`bg-gradient-to-r ${methodologyModule.color} text-white p-8`}>
                      <div className="flex items-center justify-center space-x-6">
                        <div className="p-4 bg-white/20 rounded-2xl">
                          <IconComponent className="h-12 w-12" />
                        </div>
                        <div className="text-center">
                          <CardTitle className="text-3xl font-bold">{methodologyModule.title}</CardTitle>
                          <p className="text-white/90 mt-3 text-lg">{methodologyModule.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      {moduleArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {moduleArticles.map((article) => (
                            <div
                              key={article.id}
                              onClick={() => handleArticleClick(article)}
                              className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl hover:from-red-100 hover:to-pink-100 cursor-pointer transition-all duration-300 border border-red-100 hover:border-red-200 group/item"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 text-lg group-hover/item:text-red-600 transition-colors mb-2">
                                    {article.title}
                                  </h4>
                                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {article.excerpt}
                                  </p>
                                  <div className="flex items-center space-x-4">
                                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">
                                      ⏱️ {article.readTime} 分钟阅读
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      📅 {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className="h-6 w-6 text-red-400 group-hover/item:text-red-600 group-hover/item:translate-x-1 transition-all ml-4" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Map className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>方法论内容正在完善中...</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })()}
            </div>
            
            {/* 其他知识模块 */}
            <div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">📖 知识体系</h3>
                <p className="text-gray-600">按照科学的学习路径，逐步构建完整的经济学知识框架</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {knowledgeModules.filter(module => module.id !== 'methodology').map((module) => {
                const IconComponent = module.icon;
                const moduleArticles = categorizedArticles[module.id] || [];
                
                return (
                  <Card key={module.id} className="group hover:shadow-xl transition-all duration-500 border-0 glass-effect rounded-3xl overflow-hidden">
                    <CardHeader className={`bg-gradient-to-r ${module.color} text-white p-8`}>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white/20 rounded-2xl">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold">{module.title}</CardTitle>
                          <p className="text-white/90 mt-2">{module.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        {moduleArticles.length > 0 ? (
                          moduleArticles.map((article) => (
                            <div
                              key={article.id}
                              onClick={() => handleArticleClick(article)}
                              className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 cursor-pointer transition-colors group/item"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 group-hover/item:text-purple-600 transition-colors">
                                    {article.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {article.excerpt}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-3">
                                    <Badge variant="secondary" className="text-xs">
                                      ⏱️ {article.readTime} 分钟阅读
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      📅 {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className="h-5 w-5 text-gray-400 group-hover/item:text-purple-600 group-hover/item:translate-x-1 transition-all" />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>此模块内容正在完善中...</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
              </div>
            </div>
          </TabsContent>

          {/* 生态系统协同视图 */}
          <TabsContent value="ecosystem" className="space-y-8">
            <EcosystemIntegration />
          </TabsContent>

          {/* 知识关联图谱视图 */}
          <TabsContent value="graph" className="space-y-8">
            <KnowledgeGraph 
              articles={articles} 
              onArticleClick={handleArticleClick} 
            />
          </TabsContent>

          {/* 搜索浏览视图 */}
          <TabsContent value="search" className="space-y-6">
            {searchQuery && (
              <div className="text-center mb-8">
                <p className="text-gray-600">
                  找到 <span className="font-semibold text-purple-600">{filteredArticles.length}</span> 篇相关文章
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer glass-effect rounded-2xl border-0"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg group-hover:text-purple-600 transition-colors line-clamp-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>⏱️ {article.readTime} 分钟阅读</span>
                      <span>📅 {new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 学习路径视图 */}
          <TabsContent value="path" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">📖 推荐学习路径</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                基于方法论指导的科学学习路径：先掌握学习方法，再深入专业内容，逐步构建完整的经济学知识体系
              </p>
            </div>
            
            {/* 学习路径说明 */}
            <div className="glass-effect rounded-2xl p-6 mb-8 border border-purple-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                  <Map className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 为什么从方法论开始？</h3>
                  <div className="text-gray-600 space-y-2">
                    <p>• <strong>1.0 → 2.0 的方法演进</strong>：从传统教科书学习转向前沿论文研究</p>
                    <p>• <strong>"目的-阶段性结果-行动"模型</strong>：建立高效的自学框架</p>
                    <p>• <strong>主题阅读 + 抽样阅读 + 文本细读</strong>：构建系统性知识体系</p>
                    <p>• <strong>过去、现在、未来</strong>：从经典理论到学术前沿的完整视角</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              {knowledgeModules.map((module, index) => {
                const moduleArticles = categorizedArticles[module.id] || [];
                
                return (
                  <div key={module.id} className="relative">
                    {index < knowledgeModules.length - 1 && (
                      <div className="absolute left-8 top-24 w-0.5 h-32 bg-gradient-to-b from-purple-300 to-purple-100"></div>
                    )}
                    
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {index + 1}
                      </div>
                      
                      <Card className="flex-1 glass-effect border-0 rounded-2xl shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-xl">{module.title}</CardTitle>
                          <p className="text-gray-600">{module.description}</p>
                        </CardHeader>
                        <CardContent>
                          {moduleArticles.length > 0 ? (
                            <div className="space-y-4">
                              {moduleArticles.map((article) => (
                                <div
                                  key={article.id}
                                  onClick={() => handleArticleClick(article)}
                                  className="p-4 bg-white/60 rounded-xl hover:bg-white/80 cursor-pointer transition-colors border border-gray-100 hover:border-purple-200"
                                >
                                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {article.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                    {article.excerpt}
                                  </p>
                                  <div className="flex justify-between items-center">
                                    <Badge variant="outline" className="text-xs">
                                      ⏱️ {article.readTime} 分钟
                                    </Badge>
                                    <ArrowRight className="h-4 w-4 text-purple-500" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500">
                              <p>此阶段内容正在完善中...</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
} 