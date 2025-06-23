'use client';
import { useState } from 'react';
import { ExternalLink, Github, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/data';

export default function ProjectShowcase() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            项目展示
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            探索技术与创意的结合，这里是我的数字作品集，每个项目都承载着对技术的热爱和对问题的独特解决方案
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              <Star className="inline h-6 w-6 text-yellow-500 mr-2" />
              精选项目
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group bg-white hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden animate-slide-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                    
                    {/* Overlay Links */}
                    <div className={`absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <Button
                        size="sm"
                        className="bg-white/90 text-gray-900 hover:bg-white shadow-lg"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        访问项目
                      </Button>
                      {project.github && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/90 border-white text-gray-900 hover:bg-white shadow-lg"
                          onClick={() => window.open(project.github, '_blank')}
                        >
                          <Github className="h-4 w-4 mr-2" />
                          代码
                        </Button>
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        精选
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-6">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                          onClick={() => window.open(project.link, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          查看项目
                        </Button>
                        {project.github && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                            onClick={() => window.open(project.github, '_blank')}
                          >
                            <Github className="h-4 w-4 mr-2" />
                            源码
                          </Button>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              更多项目
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className="group bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm animate-slide-up"
                  style={{ animationDelay: `${(index + featuredProjects.length) * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex space-x-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-sm"
                          onClick={() => window.open(project.link, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          访问
                        </Button>
                        {project.github && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-700 hover:bg-gray-50 text-sm"
                            onClick={() => window.open(project.github, '_blank')}
                          >
                            <Github className="h-4 w-4 mr-1" />
                            代码
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              有想法？让我们一起探讨
            </h3>
            <p className="text-gray-600 mb-6">
              这些项目展示了经济学理论与技术实践的结合，希望能为学术研究和实际应用带来价值
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}