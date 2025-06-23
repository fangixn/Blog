'use client';
import { Heart, BookOpen, Code, TrendingUp, Coffee, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function About() {
  const skills = [
    { category: '经济学', items: ['宏观经济学', '计量经济学', '行为经济学', '数字经济'] },
    { category: '技术栈', items: ['React/Next.js', 'TypeScript', 'Python', 'Node.js'] },
    { category: '数据分析', items: ['机器学习', '统计分析', '数据可视化', 'SQL'] },
    { category: '工具平台', items: ['Git', 'Docker', 'AWS', 'Supabase'] },
  ];

  const interests = [
    { icon: TrendingUp, title: '经济学研究', description: '关注数字经济、平台经济和新兴技术对传统经济理论的冲击与重构' },
    { icon: Code, title: '技术开发', description: '热衷于用代码解决实际问题，特别是将经济学理论与技术实践相结合' },
    { icon: BookOpen, title: '知识分享', description: '通过写作和项目分享学习心得，帮助他人在经济学和技术领域获得成长' },
    { icon: Coffee, title: '思维碰撞', description: '享受与不同背景的人交流想法，在思维的碰撞中发现新的视角和可能性' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            关于我
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            在经济学理论与技术实践的交汇点上，探索知识的边界
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Personal Introduction */}
          <div className="animate-slide-up">
            {/* Profile Image Placeholder */}
            <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto lg:mx-0 mb-8 flex items-center justify-center">
              <Heart className="h-16 w-16 text-white" />
            </div>

            {/* Bio */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  你好，我是方馨
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>中国 · 追求知识的路上</span>
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  我是一名对<strong>经济学理论</strong>和<strong>技术实践</strong>都充满热情的探索者。
                  在经济学的世界里，我被市场机制的精妙、数据背后的故事以及理论与现实的碰撞所深深吸引。
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  同时，我也是一名热爱<strong>编程</strong>的技术实践者。从前端开发到数据分析，
                  从机器学习到人工智能应用，我享受用代码解决问题、创造价值的过程。
                  我相信技术不仅是工具，更是理解和改造世界的方式。
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  在这个博客里，我希望能够<strong>分享知识、记录思考、展示项目</strong>，
                  更重要的是，我希望通过写作来整理自己的想法，同时也能为读者带来一些启发和帮助。
                </p>

                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-purple-800 italic text-center">
                    "在知识的海洋中航行，在代码的世界里创造，在思考的空间中成长。"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills and Interests */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Skills Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-purple-600" />
                  技能领域
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {skills.map((skillGroup) => (
                    <div key={skillGroup.category}>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="bg-white/80 text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors cursor-default"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interests Section */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  兴趣爱好
                </h3>
                <div className="space-y-4">
                  {interests.map((interest) => (
                    <div key={interest.title} className="flex items-start space-x-4">
                      <div className="bg-purple-100 rounded-lg p-2 flex-shrink-0">
                        <interest.icon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {interest.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {interest.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold mb-2">保持联系</h3>
                <p className="mb-4 opacity-90">
                  如果你对我的文章或项目感兴趣，或者想要讨论经济学和技术话题
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <a
                    href="mailto:fangin1230@gmail.com"
                    className="text-white hover:text-purple-200 transition-colors font-medium"
                  >
                    📧 fangin1230@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}