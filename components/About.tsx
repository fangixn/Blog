'use client';
import { Heart, BookOpen, Code, TrendingUp, Coffee, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function About() {
  const skills = [
    '商业分析', '经济学理论', 'AI技术', 'Python', 'JavaScript', 'React', 'Next.js',
    '机器学习', '数据分析', 'Web开发', '产品思维', '学习方法论', '跨界思考'
  ];

  const experiences = [
    {
      title: '商业观察',
      description: '关注商业模式创新，分析AI创业公司的发展路径和商业策略',
      period: '持续进行中',
      highlights: ['深度分析商业案例', '分享商业洞察', '探索AI商业化']
    },
    {
      title: '技术实践', 
      description: '开发多个专业工具和平台，将技术与实际应用相结合',
      period: '2025年至今',
      highlights: ['EconWeb 经济学导航平台', 'EconAI 研究助手', 'TranslationCompare 翻译工具']
    },
    {
      title: '知识分享',
      description: '通过博客分享跨领域思考，传播有价值的见解和方法论',
      period: '2024年至今',
      highlights: ['撰写深度分析文章', '整理学习方法论', '构建知识体系']
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">关于我</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            跨领域思考者，探索商业、技术与思维方法的交融，致力于创建有价值的工具和内容
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Personal Introduction */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">个人简介</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                我是方馨，一位热衷于跨领域思考和实践的探索者。我相信深度思考与技术实践的结合能够创造更大的价值，
                因此专注于商业分析、AI技术应用以及学习方法论的研究与分享。
              </p>
              <p>
                在商业观察方面，我关注创新商业模式，特别是AI创业公司的发展路径和商业策略。
                我认为理解商业本质和技术趋势的结合对于把握未来机会具有重要意义。
              </p>
              <p>
                在技术实践方面，我擅长使用Python、JavaScript等编程语言开发Web应用和AI工具。
                我创建了多个专业平台，包括经济学资源导航、AI研究助手和翻译对比工具等。
              </p>
              <p>
                我始终相信，最有价值的知识是跨学科的知识，最有意义的实践是解决真实问题的实践。
              </p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">专业技能</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">技术栈</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">主要经历</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {experiences.map((exp, index) => (
                              <Card key={index} className="border-2 border-gray-100 hover:border-purple-200 transition-colors duration-200">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{exp.title}</h4>
                    <p className="text-sm text-purple-600 font-medium">{exp.period}</p>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                  <div className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">我的理念</h3>
          <blockquote className="text-lg text-gray-700 italic leading-relaxed max-w-4xl mx-auto">
            "知识的价值在于跨界融合和实际应用。我致力于将不同领域的洞察相结合，
            运用现代技术工具提升思考效率和知识传播的效果。通过不断学习和实践，
            我希望能够为这个快速变化的世界贡献有价值的思考和工具。"
          </blockquote>
        </div>
      </div>
    </section>
  );
}