'use client';
import { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Globe, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/data';

export default function ProjectShowcase() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 apple-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
            项目展示
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            探索技术与创意的结合，这里是我的数字作品集，每个项目都承载着对技术的热爱和对问题的独特解决方案
          </p>
        </div>

        {/* All Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="group glass-effect hover:shadow-xl transition-all duration-500 border-0 shadow-lg hover:shadow-purple-200/40 group-hover:transform group-hover:scale-[1.02] rounded-3xl overflow-hidden cursor-pointer animate-slide-up apple-hover"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => window.open(project.link, '_blank')}
            >
              <CardHeader className="pb-4">
                {/* Project Type Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-2xl px-4 py-2 font-medium"
                  >
                    数字项目
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    {project.github && (
                      <Code className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 leading-tight">
                  {project.title}
                </h3>
              </CardHeader>

              <CardContent className="py-4">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
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
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.link, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      访问项目
                    </Button>
                    {project.github && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, '_blank');
                        }}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        源码
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center text-purple-600 group-hover:text-purple-700 transition-colors">
                    <span className="text-sm font-medium">访问项目</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}