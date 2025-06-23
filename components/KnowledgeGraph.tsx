'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type Article } from '@/lib/data';

interface KnowledgeGraphProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

interface Node {
  id: string;
  title: string;
  category: string;
  tags: string[];
  connections: string[];
  x: number;
  y: number;
  size: number;
}

export default function KnowledgeGraph({ articles, onArticleClick }: KnowledgeGraphProps) {
  // 计算文章之间的关联度
  const calculateConnectionStrength = (article1: Article, article2: Article): number => {
    let strength = 0;
    
    // 方法论文章与其他文章的特殊关联
    const isMethodology1 = article1.title.includes('如何从零开始自学');
    const isMethodology2 = article2.title.includes('如何从零开始自学');
    
    if (isMethodology1 || isMethodology2) {
      // 方法论文章与经济学相关文章有强关联
      if (article1.title.includes('经济学') || article2.title.includes('经济学') ||
          article1.tags.some(tag => ['经济学', '学习方法', '自学'].includes(tag)) ||
          article2.tags.some(tag => ['经济学', '学习方法', '自学'].includes(tag))) {
        strength += 0.5;
      }
    }
    
    // 相同分类加分
    if (article1.category === article2.category) {
      strength += 0.3;
    }
    
    // 共同标签加分
    const commonTags = article1.tags.filter(tag => article2.tags.includes(tag));
    strength += commonTags.length * 0.2;
    
    // 标题相似度（简单的关键词匹配）
    const keywords1 = article1.title.toLowerCase().split(/[^\w\u4e00-\u9fff]+/);
    const keywords2 = article2.title.toLowerCase().split(/[^\w\u4e00-\u9fff]+/);
    const commonKeywords = keywords1.filter(word => 
      word.length > 1 && keywords2.includes(word)
    );
    strength += commonKeywords.length * 0.1;
    
    // 经济学系列文章之间的关联
    if ((article1.title.includes('经济学') && article2.title.includes('经济学')) ||
        (article1.title.includes('学派') && article2.title.includes('学者')) ||
        (article1.title.includes('著作') && article2.title.includes('学者'))) {
      strength += 0.4;
    }
    
    return Math.min(strength, 1); // 限制在0-1之间
  };

  // 生成知识图谱节点和连接
  const { nodes, connections } = useMemo(() => {
    const nodes: Node[] = [];
    const connections: Array<{ from: string; to: string; strength: number }> = [];
    
    // 创建节点
    articles.forEach((article, index) => {
      const angle = (index / articles.length) * 2 * Math.PI;
      const radius = 150;
      
      nodes.push({
        id: article.id,
        title: article.title,
        category: article.category,
        tags: article.tags,
        connections: [],
        x: Math.cos(angle) * radius + 200,
        y: Math.sin(angle) * radius + 200,
        size: Math.max(30, Math.min(60, article.readTime * 2))
      });
    });
    
    // 计算连接关系
    for (let i = 0; i < articles.length; i++) {
      for (let j = i + 1; j < articles.length; j++) {
        const strength = calculateConnectionStrength(articles[i], articles[j]);
        if (strength > 0.3) { // 只显示强关联
          connections.push({
            from: articles[i].id,
            to: articles[j].id,
            strength
          });
          
          // 更新节点的连接信息
          const fromNode = nodes.find(n => n.id === articles[i].id);
          const toNode = nodes.find(n => n.id === articles[j].id);
          if (fromNode) fromNode.connections.push(articles[j].id);
          if (toNode) toNode.connections.push(articles[i].id);
        }
      }
    }
    
    return { nodes, connections };
  }, [articles]);

  const getCategoryColor = (category: string) => {
    const colors = {
      economics: '#3B82F6',
      notes: '#10B981', 
      projects: '#8B5CF6',
      ai: '#F59E0B',
      thoughts: '#EF4444'
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  };

  const getCategoryName = (category: string) => {
    const names = {
      economics: '经济学思考',
      notes: '学习笔记',
      projects: '项目展示', 
      ai: 'AI观察',
      thoughts: '随笔杂谈'
    };
    return names[category as keyof typeof names] || category;
  };

  return (
    <Card className="glass-effect border-0 rounded-3xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8">
        <CardTitle className="text-2xl font-bold flex items-center">
          🕸️ 知识关联图谱
        </CardTitle>
        <p className="text-white/90 mt-2">
          探索文章之间的内在联系，发现知识的网络结构
        </p>
      </CardHeader>
      
      <CardContent className="p-8">
        {/* SVG 图谱 */}
        <div className="mb-8">
          <svg width="400" height="400" className="w-full max-w-2xl mx-auto border rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
            {/* 连接线 */}
            {connections.map((connection, index) => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              
              if (!fromNode || !toNode) return null;
              
              return (
                <line
                  key={index}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={`rgba(139, 92, 246, ${connection.strength})`}
                  strokeWidth={connection.strength * 4}
                  className="transition-all duration-300"
                />
              );
            })}
            
            {/* 节点 */}
            {nodes.map((node) => {
              const article = articles.find(a => a.id === node.id);
              if (!article) return null;
              
              return (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size / 2}
                    fill={getCategoryColor(node.category)}
                    className="cursor-pointer hover:opacity-80 transition-all duration-300 drop-shadow-lg"
                    onClick={() => onArticleClick(article)}
                  />
                  <text
                    x={node.x}
                    y={node.y + node.size / 2 + 20}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-700 pointer-events-none"
                    style={{ fontSize: '10px' }}
                  >
                    {node.title.length > 12 ? `${node.title.substring(0, 12)}...` : node.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 图例和统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 分类图例 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">📊 分类分布</h4>
            <div className="space-y-3">
              {Object.entries(
                articles.reduce((acc, article) => {
                  acc[article.category] = (acc[article.category] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([category, count]) => (
                <div key={category} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: getCategoryColor(category) }}
                  ></div>
                  <span className="text-sm text-gray-700 flex-1">
                    {getCategoryName(category)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* 连接统计 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">🔗 关联统计</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">总连接数</span>
                <Badge variant="outline">{connections.length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">强关联数</span>
                <Badge variant="outline">
                  {connections.filter(c => c.strength > 0.6).length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">平均关联度</span>
                <Badge variant="outline">
                  {connections.length > 0 
                    ? (connections.reduce((sum, c) => sum + c.strength, 0) / connections.length).toFixed(2)
                    : '0'
                  }
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">最强关联</span>
                <Badge variant="outline">
                  {connections.length > 0 
                    ? Math.max(...connections.map(c => c.strength)).toFixed(2)
                    : '0'
                  }
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
          <p className="text-sm text-gray-600">
            💡 <strong>图谱说明：</strong> 
            圆圈大小表示文章长度，连接线粗细表示关联强度。
            点击圆圈可以跳转到对应文章。颜色代表不同的文章分类。
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 