'use client';
import { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projects } from '@/lib/data';
import { getBestWebsiteImage } from '@/lib/screenshot';

export default function ProjectShowcase() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<{ [key: string]: string }>({});
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  // 动态加载项目图片
  useEffect(() => {
    const loadProjectImages = async () => {
      for (const project of projects) {
        if (project.image === 'auto') {
          setLoadingImages(prev => ({ ...prev, [project.id]: true }));
          
          try {
            const imageUrl = await getBestWebsiteImage(project.link);
            setProjectImages(prev => ({ ...prev, [project.id]: imageUrl }));
          } catch (error) {
            console.error(`加载项目图片失败 (${project.title}):`, error);
            // 使用占位符图片
            setProjectImages(prev => ({ 
              ...prev, 
              [project.id]: `https://via.placeholder.com/800x400/1e293b/ffffff?text=${encodeURIComponent(project.title.split(' - ')[0])}` 
            }));
          } finally {
            setLoadingImages(prev => ({ ...prev, [project.id]: false }));
          }
        } else {
          // 如果不是 'auto'，直接使用指定的图片URL
          setProjectImages(prev => ({ ...prev, [project.id]: project.image }));
        }
      }
    };

    loadProjectImages();
  }, []);

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
              className="group glass-effect hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden animate-slide-up apple-hover rounded-3xl"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                {loadingImages[project.id] ? (
                  // 加载中的占位符
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      <span className="text-purple-600 text-sm font-medium">加载中...</span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={projectImages[project.id] || project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // 图片加载失败时的备用处理
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/800x400/1e293b/ffffff?text=${encodeURIComponent(project.title.split(' - ')[0])}`;
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                
                {/* Overlay Links */}
                <div className={`absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg border-0 rounded-2xl"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    访问项目
                  </Button>
                  {project.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/90 border-2 border-white text-gray-900 hover:bg-white shadow-lg rounded-2xl"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github className="h-4 w-4 mr-2" />
                      代码
                    </Button>
                  )}
                </div>
              </div>

              <CardHeader className="pb-4">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {project.title}
                </h3>
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
                      className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors rounded-2xl px-3 py-1 font-medium"
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
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      查看项目
                    </Button>
                    {project.github && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-all duration-300"
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
    </section>
  );
}