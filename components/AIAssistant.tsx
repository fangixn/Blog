'use client';

import { useState, useEffect } from 'react';
import { Send, Bot, User, Loader2, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { type Article } from '@/lib/data';
import AISettings from './AISettings';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  articles: Article[];
}

export default function AIAssistant({ articles }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是经济学学习助手 🤖\n\n我可以帮助你：\n• 解答经济学概念和理论\n• 介绍经济学家和他们的贡献\n• 推荐相关学习资料\n• 解释文章中的经济学内容\n\n请随时向我提问！',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKeys, setHasApiKeys] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // 检查本地存储的API密钥
  useEffect(() => {
    const checkApiKeys = () => {
      const savedKeys = localStorage.getItem('ai-api-keys');
      if (savedKeys) {
        try {
          const parsed = JSON.parse(savedKeys);
          const hasValidConfig = Object.values(parsed).some(key => key && typeof key === 'string' && key.trim().length > 0);
          setHasApiKeys(hasValidConfig);
        } catch (error) {
          console.error('Failed to parse saved API keys:', error);
          setHasApiKeys(false);
        }
      } else {
        setHasApiKeys(false);
      }
    };

    checkApiKeys();
  }, []);

  // 预设问题
  const suggestedQuestions = [
    '马克思的主要经济学贡献是什么？',
    '凯恩斯理论的核心观点有哪些？',
    '如何从零开始自学经济学？',
    '行为经济学和传统经济学有什么区别？',
    '推荐几本经济学入门书籍',
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // 获取本地存储的API密钥
      const savedKeys = localStorage.getItem('ai-api-keys');
      let apiKeys = {};
      if (savedKeys) {
        try {
          apiKeys = JSON.parse(savedKeys);
        } catch (error) {
          console.error('Failed to parse API keys:', error);
        }
      }

      // 调用AI API
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          apiKeys: apiKeys, // 传递API密钥
          articles: articles.map(article => ({
            title: article.title,
            excerpt: article.excerpt,
            content: article.content.slice(0, 1000), // 限制长度
            tags: article.tags
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('AI助手暂时无法回答，请稍后再试');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '抱歉，我现在无法回答您的问题。您可以尝试：\n• 检查网络连接\n• 稍后再试\n• 或者直接浏览知识库中的相关文章',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 处理配置变化
  const handleConfigChange = (hasValidConfig: boolean) => {
    setHasApiKeys(hasValidConfig);
    if (hasValidConfig) {
      setShowSettings(false);
    }
  };

  // 如果显示设置页面
  if (showSettings) {
    return <AISettings onConfigChange={handleConfigChange} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* AI助手介绍卡片 */}
      <Card className="mb-8 glass-effect border-0 rounded-3xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-3xl">
          <CardTitle className="flex items-center justify-between text-2xl">
            <div className="flex items-center">
              <Bot className="h-8 w-8 mr-3" />
              经济学AI助手
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="text-white hover:bg-white/20 rounded-xl"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </CardTitle>
          <p className="text-purple-100">基于方馨博客知识库的智能助手</p>
        </CardHeader>
      </Card>

      {/* 配置提示 */}
      {!hasApiKeys && (
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <Settings className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                <strong>需要配置：</strong>请先配置AI服务密钥才能使用智能问答功能。
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="ml-4 border-amber-300 text-amber-700 hover:bg-amber-100 rounded-xl"
              >
                立即配置
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* 预设问题 */}
      {hasApiKeys && messages.length === 1 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">💡 试试这些问题：</p>
          <div className="flex flex-wrap gap-3">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuestionClick(question)}
                className="text-purple-700 border-purple-200 hover:bg-purple-50 rounded-2xl"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* 聊天记录 */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.role === 'assistant' && (
                  <Bot className="h-4 w-4 mt-1 flex-shrink-0 text-purple-600" />
                )}
                {message.role === 'user' && (
                  <User className="h-4 w-4 mt-1 flex-shrink-0 text-white" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-purple-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('zh-CN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* 加载状态 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-purple-600" />
                <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                <span className="text-sm text-gray-600">正在思考...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 输入框 */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-lg">
        <div className="flex space-x-3">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={hasApiKeys ? "问我任何经济学问题..." : "请先配置AI服务密钥..."}
            className="flex-1 rounded-2xl border-purple-200 focus:border-purple-400 focus:ring-purple-300"
            disabled={isLoading || !hasApiKeys}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || !hasApiKeys}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-6"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>💡 提示：按Enter发送，Shift+Enter换行</span>
          <Badge variant="outline" className="text-purple-600 border-purple-200">
            基于 {articles.length} 篇文章
          </Badge>
        </div>
      </div>
    </div>
  );
} 