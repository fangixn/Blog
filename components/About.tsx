'use client';
import { Heart, BookOpen, Code, TrendingUp, Coffee, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Language, defaultLanguage } from '@/lib/i18n';

interface AboutProps {
  currentLanguage?: Language;
}

export default function About({ currentLanguage = defaultLanguage }: AboutProps) {
  const skills = [
    '经济学理论', '计量经济学', 'Python', 'JavaScript', 'React', 'Next.js',
    '机器学习', '数据分析', 'AI应用开发', 'Web开发', '学术研究', '项目管理'
  ];

  const experiences = [
    {
      title: '学术研究',
      description: '专注于经济学理论研究，特别是经济学与人工智能技术的交叉领域',
      period: '持续进行中',
      highlights: ['发表多篇经济学研究文章', '建立经济学资源平台']
    },
    {
      title: '技术开发',
      description: '开发多个专业工具和平台，服务学术研究和实际应用',
      period: '2025年至今',
      highlights: ['EconomicsWeb 经济学导航平台', 'EconAI 经济学AI助手', 'TranslationCompare 翻译对比工具']
    },
    {
      title: '知识分享',
      description: '通过博客和平台分享经济学知识和技术经验',
      period: '2024年至今',
      highlights: ['撰写深度文章', '整理学术资源', '构建知识体系']
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">关于我</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            探索经济学理论与人工智能技术的交融，致力于创建有价值的学术工具和资源平台
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Personal Introduction */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">个人简介</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                我是方馨，一位热衷于经济学研究和人工智能应用的探索者。我相信技术与理论的结合能够创造更大的价值，
                因此专注于将经济学理论与现代技术相融合，开发实用的学术工具和平台。
              </p>
              <p>
                在学术研究方面，我专注于经济学理论的深入探讨，特别关注经济学史和经济思想的演进。
                我认为理解经济学的发展脉络对于把握当前经济现象具有重要意义。
              </p>
              <p>
                在技术实践方面，我擅长使用Python、JavaScript等编程语言开发Web应用和数据分析工具。
                我创建了多个专业平台，包括经济学资源导航、AI研究助手和翻译对比工具等。
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
            "知识的价值在于分享和应用。我致力于将复杂的经济学理论转化为易于理解的内容，
            同时运用现代技术工具提升研究效率和知识传播的效果。通过不断学习和实践，
            我希望能够为经济学研究和教育贡献自己的力量。"
          </blockquote>
        </div>
      </div>
    </section>
  );
}