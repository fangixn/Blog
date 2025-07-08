'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Settings, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { type Article } from '@/lib/data';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantHomeProps {
  articles: Article[];
}

export default function AIAssistantHome({ articles }: AIAssistantHomeProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKeys, setHasApiKeys] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 快捷问题
  const quickQuestions = [
    "如何开始学习经济学？",
    "推荐几本经济学入门书籍",
    "经济学有哪些主要流派？",
    "什么是边际效用？"
  ];

  // 初始欢迎消息
  const welcomeMessage: Message = {
    id: 'welcome',
    role: 'assistant',
    content: '你好！我是经济学学习助手 🤖\n\n我可以帮助你：\n• 解答经济学概念和理论\n• 介绍经济学家和他们的贡献\n• 推荐相关学习资料\n• 解释文章中的经济学内容\n\n请随时向我提问！',
    timestamp: new Date()
  };

  // 检查API配置
  useEffect(() => {
    const checkApiKeys = () => {
      const openaiKey = localStorage.getItem('openai-api-key');
      const claudeKey = localStorage.getItem('claude-api-key');
      const qwenKey = localStorage.getItem('qwen-api-key');
      
      setHasApiKeys(!!(openaiKey || claudeKey || qwenKey));
    };

    checkApiKeys();
    
    // 监听存储变化
    const handleStorageUpdate = () => {
      checkApiKeys();
    };

    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('ai-keys-updated', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('ai-keys-updated', handleStorageUpdate);
    };
  }, []);

  // 初始化消息
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, []);

  // 滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !hasApiKeys) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          articles: articles.slice(0, 5) // 限制传递的文章数量
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || '未知错误');
      }
    } catch (error) {
      console.error('AI 回复出错:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，我现在无法回答您的问题。请稍后再试，或检查网络连接。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理快捷问题点击
  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // 键盘事件处理
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isExpanded) {
    // 折叠状态 - 显示预览卡片
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-lg">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI学习助手
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              智能问答系统，基于知识库内容为您提供个性化的学习建议和答疑解惑
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="glass-effect border-0 rounded-3xl shadow-xl overflow-hidden">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 mb-6">
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-4 text-left">
                        <div className="flex items-start space-x-3">
                          <User className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">如何开始学习经济学？</span>
                        </div>
                      </div>
                      <div className="bg-purple-100/80 rounded-lg p-4 text-left">
                        <div className="flex items-start space-x-3">
                          <Bot className="h-5 w-5 text-purple-700 mt-0.5 flex-shrink-0" />
                          <div className="text-gray-700">
                            <p>建议从学习方法论开始！根据知识库的2.0版本方法论...</p>
                            <div className="flex items-center mt-2 text-sm text-purple-600">
                              <Sparkles className="h-4 w-4 mr-1" />
                              <span>AI正在思考更完整的回答</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {hasApiKeys ? (
                    <div className="space-y-4">
                      <Button 
                        size="lg" 
                        className="apple-hover bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-purple-300/50 border-0"
                        onClick={() => setIsExpanded(true)}
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        开始对话
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                      
                      <p className="text-sm text-gray-500">
                        💡 已配置API密钥，可以开始使用AI助手
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Link href="/knowledge">
                        <Button 
                          size="lg" 
                          className="apple-hover bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-8 py-4 rounded-2xl shadow-lg hover:shadow-purple-300/50 border-0"
                        >
                          <Settings className="mr-2 h-5 w-5" />
                          配置AI助手
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      
                      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                        <p className="text-sm text-amber-800 mb-2">
                          🔧 需要配置API密钥才能使用AI助手
                        </p>
                        <p className="text-xs text-amber-600">
                          支持 OpenAI、Claude、通义千问 等AI服务
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 快捷问题 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">💡 试试这些问题</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="apple-hover h-auto p-4 text-left justify-start rounded-xl border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
                        onClick={() => {
                          if (hasApiKeys) {
                            setInputMessage(question);
                            setIsExpanded(true);
                          }
                        }}
                        disabled={!hasApiKeys}
                      >
                        <MessageCircle className="h-4 w-4 mr-3 text-purple-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{question}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // 展开状态 - 显示完整聊天界面
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-effect border-0 rounded-3xl shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bot className="h-8 w-8" />
                <div>
                  <CardTitle className="text-xl font-bold">AI学习助手</CardTitle>
                  <p className="text-purple-100 text-sm">基于知识库的智能问答</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-xl"
                onClick={() => setIsExpanded(false)}
              >
                收起
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* 聊天记录 */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-purple-600" />
                      )}
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                        <div
                          className={`text-xs mt-2 opacity-70 ${
                            message.role === 'user' ? 'text-purple-100' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('zh-CN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-purple-600" />
                      <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                      <span className="text-sm text-gray-600">AI正在思考...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="border-t border-gray-100 p-6">
              <div className="flex space-x-4">
                <Textarea
                  ref={textareaRef}
                  placeholder="请输入您的问题..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-h-[50px] max-h-32 resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-300 rounded-xl"
                  disabled={!hasApiKeys || isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || !hasApiKeys || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {!hasApiKeys && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-amber-600 mb-2">
                    需要配置API密钥才能使用AI助手
                  </p>
                  <Link href="/knowledge">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      去配置
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 