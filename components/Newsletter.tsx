'use client';
import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl animate-scale-in">
          <CardContent className="p-8 lg:p-12 text-center">
            {!isSubscribed ? (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Mail className="h-8 w-8 text-purple-600" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    订阅我的博客更新
                  </h2>
                  <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    第一时间获取经济学思考、技术学习笔记、项目展示和AI观察的最新内容。
                    我承诺只发送有价值的内容，绝不垃圾邮件。
                  </p>
                </div>

                {/* Subscription Form */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="输入你的邮箱地址"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-12 px-4 text-gray-900 placeholder-gray-500 bg-white border-gray-300 focus:border-purple-600 focus:ring-purple-600 rounded-lg"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="h-12 px-8 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          订阅中...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="h-4 w-4 mr-2" />
                          立即订阅
                        </div>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Features */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-purple-600 font-bold">📈</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">经济学洞察</h3>
                    <p className="text-sm text-gray-600">深度经济分析和市场观察</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-purple-600 font-bold">💻</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">技术实践</h3>
                    <p className="text-sm text-gray-600">实用的编程技巧和项目分享</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-purple-600 font-bold">🤖</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">AI 前沿</h3>
                    <p className="text-sm text-gray-600">人工智能发展趋势解读</p>
                  </div>
                </div>

                {/* Privacy Note */}
                <p className="text-xs text-gray-500 mt-6">
                  我们尊重你的隐私。你可以随时取消订阅，我们不会向第三方分享你的邮箱地址。
                </p>
              </>
            ) : (
              /* Success State */
              <div className="animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  订阅成功！
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  感谢你的订阅！欢迎来到我的思想分享之旅。
                  你很快就会收到第一封邮件，里面有我的最新文章和独特见解。
                </p>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <p className="text-purple-800 font-medium">
                    别忘了查看你的邮箱并确认订阅哦！
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}