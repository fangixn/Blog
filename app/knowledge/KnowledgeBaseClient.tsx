'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, Users, School, Lightbulb, ArrowRight, Grid, Map, ChevronDown, Brain, Target, Compass, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import EcosystemIntegration from '@/components/EcosystemIntegration';
import AIAssistant from '@/components/AIAssistant';
import { type Article } from '@/lib/data';
import { useRouter } from 'next/navigation';

interface KnowledgeBaseClientProps {
  articles: Article[];
}

export default function KnowledgeBaseClient({ articles }: KnowledgeBaseClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // 知识模块定义 - 统一使用紫色系渐变
  const knowledgeModules = [
    {
      id: 'methodology',
      title: '学习方法论',
      icon: Map,
      description: '自学经济学的方法论指南与实践路径',
      color: 'from-purple-600 to-purple-700',
      bgColor: 'from-purple-50 to-purple-100',
      hoverColor: 'hover:from-purple-100 hover:to-purple-200',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      keywords: ['如何从零开始自学', '方法论', '学习方法', '自学'],
      priority: 1
    },
    {
      id: 'foundations',
      title: '入门基础',
      icon: BookOpen,
      description: '经济学入门指南与核心概念',
      color: 'from-indigo-600 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-100',
      hoverColor: 'hover:from-indigo-100 hover:to-purple-200',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-200',
      keywords: ['四本书', '入门', '基础', '门槛'],
      priority: 2
    },
    {
      id: 'scholars',
      title: '关键学者',
      icon: Users,
      description: '重要经济学家与理论建构者',
      color: 'from-violet-600 to-purple-600',
      bgColor: 'from-violet-50 to-purple-100',
      hoverColor: 'hover:from-violet-100 hover:to-purple-200',
      textColor: 'text-violet-700',
      borderColor: 'border-violet-200',
      keywords: ['学者', '经济学家', '人物'],
      priority: 3
    },
    {
      id: 'schools',
      title: '理论学派',
      icon: School,
      description: '主要经济学流派与思想体系',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'from-purple-50 to-pink-100',
      hoverColor: 'hover:from-purple-100 hover:to-pink-200',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      keywords: ['学派', '流派', '理论', '思想'],
      priority: 4
    },
    {
      id: 'literature',
      title: '核心文献',
      icon: Lightbulb,
      description: '经典著作与重要文献资料',
      color: 'from-fuchsia-600 to-purple-600',
      bgColor: 'from-fuchsia-50 to-purple-100',
      hoverColor: 'hover:from-fuchsia-100 hover:to-purple-200',
      textColor: 'text-fuchsia-700',
      borderColor: 'border-fuchsia-200',
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

  // 当有搜索查询时，自动切换到搜索标签页
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim() && activeTab !== 'search') {
      setActiveTab('search');
    }
  };

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
    // 使用encodeURIComponent确保URL编码正确
    router.push(`/articles/${encodeURIComponent(article.id)}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section - 与首页风格一致 */}
      <section className="apple-gradient min-h-[70vh] flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              经济学<br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                知识库
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              从学习方法论到知识体系构建，系统性的经济学自学平台
            </p>
            
            {/* 统计信息卡片 */}
            <div className="animate-scale-in mb-10" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20 max-w-4xl mx-auto">
                <div className="grid grid-cols-3 divide-x divide-purple-200/50">
                  <div className="text-center px-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">{articles.length}</div>
                    <div className="text-gray-600 text-sm font-medium">知识文档</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">{knowledgeModules.length}</div>
                    <div className="text-gray-600 text-sm font-medium">知识模块</div>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">∞</div>
                    <div className="text-gray-600 text-sm font-medium">探索可能</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <Button 
                size="lg" 
                className="apple-hover bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-purple-300/50 border-0"
                onClick={() => document.getElementById('knowledge-content')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Brain className="mr-2 h-5 w-5" />
                开始探索
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="apple-hover border-2 border-purple-300 hover:border-purple-400 text-purple-700 hover:text-purple-800 hover:bg-purple-50 font-medium px-8 py-4 rounded-2xl backdrop-blur-sm bg-white/60"
                onClick={() => {
                  setActiveTab('path');
                  setTimeout(() => {
                    document.getElementById('knowledge-content')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                <Compass className="mr-2 h-5 w-5" />
                学习路径
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown 
            className="h-6 w-6 text-purple-600 cursor-pointer hover:text-purple-700 transition-colors"
            onClick={() => document.getElementById('knowledge-content')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </section>
      
      <main id="knowledge-content" className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
            知识探索
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            选择你感兴趣的知识模块，或使用搜索功能快速定位内容
          </p>
        </div>

        {/* 搜索栏 - 与首页风格一致 */}
        <div className="mb-12 glass-effect rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
              <Input
                type="text"
                placeholder="🔍 搜索知识库：理论、学者、著作、概念..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-12 py-3 rounded-2xl border-purple-200 focus:border-purple-400 focus:ring-purple-300 w-full text-center"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('overview');
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="清空搜索"
                >
                  ✕
                </button>
              )}
            </div>
            
            {!searchQuery && (
              <p className="text-sm text-gray-500 mt-3 text-center">
                💡 支持搜索：文章标题、内容、标签（如"卡尼曼"、"学者"、"经济学"等）
              </p>
            )}
            
            {searchQuery && (
              <p className="text-sm text-purple-600 mt-3 text-center">
                正在搜索 "{searchQuery}"，找到 {filteredArticles.length} 篇相关文章
                {filteredArticles.length > 0 && "，已自动切换到搜索结果页面"}
              </p>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 rounded-3xl p-2 h-16 max-w-6xl mx-auto glass-effect border border-white/20 shadow-lg">
            <TabsTrigger value="overview" className="rounded-2xl font-medium">🗺️ 知识地图</TabsTrigger>
            <TabsTrigger value="ai-assistant" className="rounded-2xl font-medium">🤖 AI助手</TabsTrigger>
            <TabsTrigger value="ecosystem" className="rounded-2xl font-medium">🌐 生态协同</TabsTrigger>
            <TabsTrigger value="graph" className="rounded-2xl font-medium">🕸️ 关联图谱</TabsTrigger>
            <TabsTrigger value="search" className="rounded-2xl font-medium">🔍 搜索浏览</TabsTrigger>
            <TabsTrigger value="path" className="rounded-2xl font-medium">📖 学习路径</TabsTrigger>
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
                              className={`p-6 bg-gradient-to-br ${methodologyModule.bgColor} rounded-2xl ${methodologyModule.hoverColor} cursor-pointer transition-all duration-300 border ${methodologyModule.borderColor} hover:border-purple-300 group/item`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className={`font-bold text-gray-900 text-lg group-hover/item:${methodologyModule.textColor} transition-colors mb-2`}>
                                    {article.title}
                                  </h4>
                                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {article.excerpt}
                                  </p>
                                  <div className="flex items-center space-x-4">
                                    <Badge className={`bg-purple-100 ${methodologyModule.textColor} hover:bg-purple-200 border-purple-200`}>
                                      ⏱️ {article.readTime} 分钟阅读
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      📅 {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className={`h-6 w-6 text-purple-400 group-hover/item:${methodologyModule.textColor} group-hover/item:translate-x-1 transition-all ml-4`} />
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
                              className={`p-4 bg-gradient-to-br ${module.bgColor} rounded-2xl ${module.hoverColor} cursor-pointer transition-colors group/item border ${module.borderColor} hover:border-purple-300`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className={`font-semibold text-gray-900 group-hover/item:${module.textColor} transition-colors`}>
                                    {article.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {article.excerpt}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-3">
                                    <Badge variant="secondary" className={`text-xs bg-white/80 ${module.textColor} border-white/50`}>
                                      ⏱️ {article.readTime} 分钟阅读
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      📅 {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                                    </span>
                                  </div>
                                </div>
                                <ArrowRight className={`h-5 w-5 text-gray-400 group-hover/item:${module.textColor} group-hover/item:translate-x-1 transition-all`} />
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

          {/* AI助手视图 */}
          <TabsContent value="ai-assistant" className="space-y-8">
            <AIAssistant articles={articles} />
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
                <p className="text-lg text-gray-600">
                  找到 <span className="font-semibold text-purple-600">{filteredArticles.length}</span> 篇相关文章
                </p>
              </div>
            )}
            
            {searchQuery && filteredArticles.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">没有找到相关内容</h3>
                <p className="text-gray-600 mb-6">
                  抱歉，没有找到与 "{searchQuery}" 相关的文章。
                </p>
                <div className="bg-purple-50 rounded-2xl p-6 max-w-md mx-auto">
                  <p className="text-sm text-gray-600 mb-4">💡 搜索建议：</p>
                  <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li>• 尝试使用不同的关键词</li>
                    <li>• 检查拼写是否正确</li>
                    <li>• 使用更通用的搜索词</li>
                    <li>• 尝试搜索"学者"、"经济学"、"理论"等</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <article
                  key={article.id}
                  className="group animate-slide-up apple-hover"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <Card 
                    className="h-full glass-effect hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:shadow-purple-200/40 group-hover:transform group-hover:scale-[1.02] rounded-3xl overflow-hidden cursor-pointer"
                    onClick={() => handleArticleClick(article)}
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 leading-tight">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-2xl px-3 py-1 text-xs font-medium">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-100">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {article.readTime} 分钟阅读
                        </span>
                        <span>📅 {new Date(article.publishedAt).toLocaleDateString('zh-CN')}</span>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>
          </TabsContent>

          {/* 学习路径视图 */}
          <TabsContent id="learning-path" value="path" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">📖 推荐学习路径</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                基于方法论指导的科学学习路径：先掌握学习方法，再深入专业内容，逐步构建完整的经济学知识体系
              </p>
            </div>
            
            {/* 学习路径说明 */}
            <div className="glass-effect rounded-3xl p-8 mb-8 border border-white/20 shadow-lg">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">🚀 为什么从方法论开始？</h3>
                  <div className="text-gray-600 space-y-3 leading-relaxed">
                    <p>• <strong>1.0 → 2.0 的方法演进</strong>：从传统教科书学习转向前沿论文研究</p>
                    <p>• <strong>"目的-阶段性结果-行动"模型</strong>：建立高效的自学框架</p>
                    <p>• <strong>主题阅读 + 抽样阅读 + 文本细读 + 结构阅读</strong>：构建系统性知识体系</p>
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
        </div>
      </main>

      <Footer />
    </div>
  );
} 