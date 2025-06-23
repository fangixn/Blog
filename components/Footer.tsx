'use client';
import { Mail, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: '首页', href: '/' },
    { name: '文章', href: '/#articles' },
    { name: '项目', href: '/#projects' },
    { name: '关于', href: '/#about' },
  ];

  const categories = [
    { name: '经济学思考', href: '/#articles' },
    { name: '学习笔记', href: '/#articles' },
    { name: 'AI观察', href: '/#articles' },
    { name: '随笔杂谈', href: '/#articles' },
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <a href="/" className="text-2xl font-bold mb-3 inline-block hover:text-purple-400 transition-colors">
                方馨的博客
              </a>
              <p className="text-gray-400 text-lg font-medium mb-4">
                思想的记录器，代码的操作者
              </p>
              <p className="text-gray-300 leading-relaxed max-w-md">
                在这里分享经济学思考、技术学习心得、创新项目展示，
                以及对人工智能未来的观察与个人随笔的真诚表达。
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-lg font-semibold text-white">联系方式</h4>
              <div className="flex items-center space-x-3">
                <a
                  href="mailto:fangin1230@gmail.com"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200 group"
                  title="邮箱联系"
                >
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
                <div className="flex flex-col">
                  <span className="text-gray-300 text-sm">邮箱</span>
                  <a 
                    href="mailto:fangin1230@gmail.com"
                    className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
                  >
                    fangin1230@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">快速导航</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">内容分类</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>© {currentYear} 方馨</span>
            <span>·</span>
            <span>All rights reserved</span>
            <span>·</span>
            <span className="flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> in China
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>fangxin1230.com</span>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-8 w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        aria-label="回到顶部"
      >
        <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
}