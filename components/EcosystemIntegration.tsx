'use client';

import { ExternalLink, ArrowRight, Globe, Bot, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function EcosystemIntegration() {
  const ecosystem = [
    {
      id: 'knowledge',
      title: '个人知识库',
      subtitle: '深度思考与学习路径',
      description: '系统化的经济学知识体系，从入门到精通的完整学习路径',
      icon: BookOpen,
      color: 'from-purple-600 to-purple-700',
      features: ['深度文章', '学习路径', '知识图谱', '思考总结'],
      current: true
    },
    {
      id: 'econweb',
      title: 'EconWeb',
      subtitle: '经济学资源导航平台',
      description: '最全面的经济学资源集合，涵盖数据分析、学术研究、政策解读',
      icon: Globe,
      color: 'from-indigo-600 to-purple-600',
      features: ['资源导航', '数据分析', '政策解读', '学术研究'],
      url: 'https://www.economicsweb.org/',
      current: false
    },
    {
      id: 'econai',
      title: 'EconAI',
      subtitle: 'AI驱动的经济学研究助手',
      description: 'AI驱动的经济学知识库，整合多个AI模型与学术资源',
      icon: Bot,
      color: 'from-violet-600 to-purple-600',
      features: ['AI助手', 'GPT集成', 'Claude支持', '智能分析'],
      url: 'https://www.economicsai.org/',
      current: false
    }
  ];

  const integrationPoints = [
    {
      from: 'knowledge',
      to: 'econweb',
      label: '扩展资源',
      description: '从深度文章跳转到相关资源和数据'
    },
    {
      from: 'knowledge',
      to: 'econai', 
      label: 'AI辅助',
      description: '使用AI工具深入分析文章内容'
    },
    {
      from: 'econweb',
      to: 'econai',
      label: '智能处理',
      description: '对收集的资源进行AI分析和整理'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 生态系统概览 */}
      <Card className="glass-effect border-0 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-8">
          <CardTitle className="text-2xl font-bold flex items-center">
            🌐 经济学知识生态系统
          </CardTitle>
          <p className="text-white/90 mt-2">
            三个平台形成完整的学习、研究、应用闭环
          </p>
        </CardHeader>
      </Card>

      {/* 三大平台展示 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {ecosystem.map((platform, index) => {
          const IconComponent = platform.icon;
          
          return (
            <Card key={platform.id} className="group relative glass-effect border-0 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500">
              {platform.current && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                    当前位置
                  </Badge>
                </div>
              )}
              
              <CardHeader className={`bg-gradient-to-r ${platform.color} text-white p-8`}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-2xl">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">{platform.title}</CardTitle>
                    <p className="text-white/90 text-sm mt-1">{platform.subtitle}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {platform.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">核心功能</h4>
                  <div className="flex flex-wrap gap-2">
                    {platform.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs rounded-full">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {platform.url ? (
                  <Button 
                    className="w-full group/btn" 
                    onClick={() => window.open(platform.url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    访问平台
                    <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button className="w-full" variant="outline" disabled>
                    <BookOpen className="h-4 w-4 mr-2" />
                    当前位置
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 集成流程图 */}
      <Card className="glass-effect border-0 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">🔄 平台协同流程</CardTitle>
          <p className="text-gray-600 text-center">三个平台如何形成完整的知识生态</p>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {integrationPoints.map((point, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                    {index + 1}
                  </div>
                  <ArrowRight className="h-4 w-4 text-purple-400" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{point.label}</h4>
                <p className="text-sm text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 使用场景 */}
      <Card className="glass-effect border-0 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">💡 典型使用场景</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
              <h4 className="font-semibold text-gray-900 mb-3">🎓 学习者路径</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Step 1:</strong> 在个人知识库学习基础理论和学派思想</p>
                <p><strong>Step 2:</strong> 跳转到EconWeb获取相关数据和研究资源</p>
                <p><strong>Step 3:</strong> 使用EconAI进行深度分析和问答互动</p>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
              <h4 className="font-semibold text-gray-900 mb-3">🔬 研究者路径</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Step 1:</strong> 从EconWeb收集最新数据和政策资料</p>
                <p><strong>Step 2:</strong> 利用EconAI进行智能分析和文献整理</p>
                <p><strong>Step 3:</strong> 在个人知识库查阅相关理论背景和学者观点</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 