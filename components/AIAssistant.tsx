'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Settings, GitCompare, Trash2, History, Copy, Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { type Article } from '@/lib/data';
import AISettings from './AISettings';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  compareResults?: {
    provider: string;
    success: boolean;
    content?: string;
    error?: string;
  }[];
  isCompareMode?: boolean;
}

interface AIAssistantProps {
  articles: Article[];
}

export default function AIAssistant({ articles }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKeys, setHasApiKeys] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 初始欢迎消息
  const welcomeMessage: Message = {
    id: 'welcome',
    role: 'assistant',
    content: '你好！我是经济学学习助手 🤖\n\n我可以帮助你：\n• 解答经济学概念和理论\n• 介绍经济学家和他们的贡献\n• 推荐相关学习资料\n• 解释文章中的经济学内容\n\n请随时向我提问！',
    timestamp: new Date()
  };

  // 复制单条消息到剪贴板
  const copyMessage = async (message: Message) => {
    try {
      let textToCopy = '';
      
      if (message.isCompareMode && message.compareResults) {
        // 对比模式的消息
        textToCopy = '## 多AI对比回答\n\n';
        message.compareResults.forEach((result, index) => {
          textToCopy += `### ${result.provider}\n`;
          if (result.success) {
            textToCopy += `${result.content}\n\n`;
          } else {
            textToCopy += `❌ ${result.error}\n\n`;
          }
        });
        textToCopy += `*时间: ${message.timestamp.toLocaleString('zh-CN')}*`;
      } else {
        // 普通消息
        const role = message.role === 'user' ? '👤 用户' : '🤖 AI助手';
        textToCopy = `**${role}** (${message.timestamp.toLocaleString('zh-CN')})\n\n${message.content}`;
      }
      
      await navigator.clipboard.writeText(textToCopy);
      setCopiedMessageId(message.id);
      
      // 2秒后重置复制状态
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    } catch (error) {
      console.error('复制失败:', error);
      alert('复制失败，请手动选择文本复制');
    }
  };

  // 导出聊天历史为Markdown格式
  const exportChatHistory = () => {
    try {
      const chatMessages = messages.filter(msg => msg.id !== 'welcome');
      
      if (chatMessages.length === 0) {
        alert('没有聊天记录可以导出');
        return;
      }

      let markdown = `# AI助手聊天记录\n\n`;
      markdown += `**导出时间**: ${new Date().toLocaleString('zh-CN')}\n`;
      markdown += `**对话数量**: ${chatMessages.length} 条\n\n`;
      markdown += `---\n\n`;

      chatMessages.forEach((message, index) => {
        const msgNumber = index + 1;
        const timestamp = message.timestamp.toLocaleString('zh-CN');
        
        if (message.role === 'user') {
          markdown += `## ${msgNumber}. 👤 用户提问\n\n`;
          markdown += `**时间**: ${timestamp}\n\n`;
          markdown += `${message.content}\n\n`;
        } else if (message.isCompareMode && message.compareResults) {
          markdown += `## ${msgNumber}. 🔍 多AI对比回答\n\n`;
          markdown += `**时间**: ${timestamp}\n\n`;
          
          message.compareResults.forEach((result) => {
            markdown += `### ${result.provider}\n\n`;
            if (result.success) {
              markdown += `${result.content}\n\n`;
            } else {
              markdown += `❌ **错误**: ${result.error}\n\n`;
            }
          });
        } else {
          markdown += `## ${msgNumber}. 🤖 AI回答\n\n`;
          markdown += `**时间**: ${timestamp}\n\n`;
          markdown += `${message.content}\n\n`;
        }
        
        markdown += `---\n\n`;
      });

      markdown += `*此聊天记录由方馨博客-用文字和代码，构建理想中的乌托邦AI助手导出*`;

      // 创建并下载文件
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AI助手聊天记录_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('导出失败:', error);
      alert('导出失败，请稍后重试');
    }
  };

  // 保存聊天记录到localStorage
  const saveChatHistory = (messages: Message[]) => {
    try {
      // 过滤掉欢迎消息，只保存真实的对话
      const chatMessages = messages.filter(msg => msg.id !== 'welcome');
      const historyData = {
        messages: chatMessages,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('ai-chat-history', JSON.stringify(historyData));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  };

  // 从localStorage加载聊天记录
  const loadChatHistory = (): Message[] => {
    try {
      const saved = localStorage.getItem('ai-chat-history');
      if (saved) {
        const historyData = JSON.parse(saved);
        const loadedMessages = historyData.messages?.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })) || [];
        
        // 如果有历史记录，返回历史记录；否则返回欢迎消息
        return loadedMessages.length > 0 ? loadedMessages : [welcomeMessage];
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
    return [welcomeMessage];
  };

  // 清除聊天记录
  const clearChatHistory = () => {
    if (confirm('确定要清除所有聊天记录吗？此操作不可撤销。')) {
      try {
        localStorage.removeItem('ai-chat-history');
        setMessages([welcomeMessage]);
      } catch (error) {
        console.error('Failed to clear chat history:', error);
      }
    }
  };

  // 自动调整输入框高度
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 120; // 最大高度约5行
      textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';
      textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
    }
  };

  // 处理输入内容变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    adjustTextareaHeight();
  };

  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift+Enter换行，不做处理，让默认行为发生
        return;
      } else {
        // Enter发送消息
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  // 重置输入框高度
  const resetTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
    }
  };

  // 检查本地存储的API密钥和加载聊天记录
  useEffect(() => {
    const checkApiKeys = () => {
      try {
        const savedKeys = localStorage.getItem('ai-api-keys');
        if (savedKeys) {
          const parsed = JSON.parse(savedKeys);
          const hasValidConfig = Object.values(parsed).some(key => key && typeof key === 'string' && key.trim().length > 0);
          setHasApiKeys(hasValidConfig);
        } else {
          setHasApiKeys(false);
        }
      } catch (error) {
        console.error('Failed to parse saved API keys:', error);
        setHasApiKeys(false);
      }
    };

    // 初始检查和加载历史记录
    checkApiKeys();
    const history = loadChatHistory();
    setMessages(history);
    setIsInitialized(true);

    // 监听存储变化事件
    const handleStorageUpdate = () => {
      checkApiKeys();
    };

    window.addEventListener('ai-keys-updated', handleStorageUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('ai-keys-updated', handleStorageUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, []);

  // 输入框内容变化时调整高度
  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage]);

  // 当消息更新时保存聊天记录
  useEffect(() => {
    if (isInitialized && messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages, isInitialized]);

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
    resetTextareaHeight(); // 重置输入框高度
    setIsLoading(true);

    try {
      // 获取本地存储的API密钥
      const savedKeys = localStorage.getItem('ai-api-keys');
      let apiKeys: Record<string, string> = {};
      if (savedKeys) {
        try {
          apiKeys = JSON.parse(savedKeys);
        } catch (error) {
          console.error('Failed to parse API keys:', error);
        }
      }

      // 使用客户端AI库
      const { chatWithAI, compareChat, KNOWLEDGE_BASE, AI_PROVIDERS } = await import('@/lib/aiClient');
      
      let result: any;
      
      if (compareMode) {
        // 对比模式
        result = await compareChat(apiKeys, inputMessage, KNOWLEDGE_BASE);
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          isCompareMode: true,
          compareResults: result.results?.map((res: any) => ({
            provider: res.provider,
            success: res.success,
            content: res.content,
            error: res.error
          })) || []
        };

        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // 单一模式：选择优先级最高的可用提供商
        const availableProviders = Object.keys(AI_PROVIDERS).filter(provider => apiKeys[provider]);
        
        if (availableProviders.length === 0) {
          throw new Error('未配置任何AI API密钥');
        }

        const primaryProvider = availableProviders[0];
        result = await chatWithAI(primaryProvider, apiKeys[primaryProvider], inputMessage, KNOWLEDGE_BASE);
        
        if (!result.success && availableProviders.length > 1) {
          // 尝试备用提供商
          const backupProvider = availableProviders[1];
          const backupResult = await chatWithAI(backupProvider, apiKeys[backupProvider], inputMessage, KNOWLEDGE_BASE);
          if (backupResult.success) {
            result = { ...backupResult, isBackup: true, provider: AI_PROVIDERS[backupProvider].name };
          }
        } else if (result.success) {
          result.provider = AI_PROVIDERS[primaryProvider].name;
        }
        
        if (!result.success) {
          throw new Error(result.error || 'AI助手暂时无法回答，请稍后再试');
        }
        
        let assistantContent = result.content;
        if (result.provider) {
          assistantContent += `\n\n*由 ${result.provider} 提供回答*`;
          if (result.isBackup) {
            assistantContent += ` (备用)`;
          }
        }
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantContent,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `抱歉，我现在无法回答您的问题。\n\n错误详情：${error.message}\n\n您可以尝试：\n• 检查API密钥配置\n• 检查网络连接\n• 稍后再试\n• 或者直接浏览知识库中的相关文章`,
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

  // 处理配置变化
  const handleConfigChange = (hasValidConfig: boolean, shouldClose: boolean = false) => {
    console.log('handleConfigChange called:', { hasValidConfig, shouldClose, isInitialized });
    setHasApiKeys(hasValidConfig);
    // 只有在明确要求关闭时才关闭设置页面
    if (shouldClose && hasValidConfig && isInitialized) {
      console.log('Closing settings page');
      setTimeout(() => {
        setShowSettings(false);
      }, 100);
    }
  };

  // 打开设置页面
  const handleOpenSettings = () => {
    console.log('Opening settings page');
    setShowSettings(true);
  };

  // 关闭设置页面
  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 条件渲染：设置页面或AI助手主界面 */}
      {showSettings ? (
        <AISettings 
          onConfigChange={handleConfigChange} 
          onClose={handleCloseSettings}
        />
      ) : (
        <>
          {/* AI助手介绍卡片 */}
          <Card className="mb-8 glass-effect border-0 rounded-3xl shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-3xl">
              <CardTitle className="flex items-center justify-between text-2xl">
                <div className="flex items-center">
                  <Bot className="h-8 w-8 mr-3" />
                  经济学AI助手
                </div>
                <div className="flex items-center space-x-2">
                  {/* 导出功能 */}
                  {messages.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={exportChatHistory}
                      className="text-white hover:bg-white/20 rounded-xl"
                      title="导出聊天记录"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  {/* 历史记录指示器 */}
                  {messages.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearChatHistory}
                      className="text-white hover:bg-white/20 rounded-xl"
                      title="清除聊天记录"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleOpenSettings}
                    className="text-white hover:bg-white/20 rounded-xl"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </CardTitle>
              <div className="flex items-center justify-between">
                <p className="text-purple-100">基于方馨博客-用文字和代码，构建理想中的乌托邦知识库的智能助手</p>
                {messages.length > 1 && (
                  <div className="flex items-center space-x-2 text-purple-200">
                    <History className="h-4 w-4" />
                    <span className="text-sm">{messages.length - 1} 条对话</span>
                  </div>
                )}
              </div>
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
                    onClick={handleOpenSettings}
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
          <div key={message.id}>
            {/* 用户消息 */}
            {message.role === 'user' && (
              <div className="flex justify-end">
                <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-purple-600 text-white relative group">
                  <div className="flex items-start space-x-2">
                    <User className="h-4 w-4 mt-1 flex-shrink-0 text-white" />
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-2 text-purple-200">
                        {message.timestamp.toLocaleTimeString('zh-CN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  {/* 复制按钮 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyMessage(message)}
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
                    title="复制消息"
                  >
                    {copiedMessageId === message.id ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* AI回答 - 对比模式 */}
            {message.role === 'assistant' && message.isCompareMode && (
              <div className="space-y-3 relative group">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-2">
                    <GitCompare className="h-4 w-4" />
                    <span>多AI对比回答</span>
                    <Badge variant="outline" className="text-xs">
                      {message.compareResults?.filter(r => r.success).length || 0}/{message.compareResults?.length || 0} 成功
                    </Badge>
                  </div>
                  {/* 复制按钮 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyMessage(message)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-6 w-6 p-0"
                    title="复制对比回答"
                  >
                    {copiedMessageId === message.id ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
                
                {message.compareResults?.map((result, index) => (
                  <Card key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
                    <CardHeader className="pb-2 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 text-purple-600" />
                          <span className="font-medium text-sm">{result.provider}</span>
                        </div>
                        <Badge 
                          variant={result.success ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {result.success ? "成功" : "失败"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      {result.success ? (
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">
                          {result.content}
                        </p>
                      ) : (
                        <p className="text-sm text-red-600">
                          ❌ {result.error}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">
                        {message.timestamp.toLocaleTimeString('zh-CN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* AI回答 - 单一模式 */}
            {message.role === 'assistant' && !message.isCompareMode && (
              <div className="flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-white border border-gray-200 text-gray-900 relative group">
                  <div className="flex items-start space-x-2">
                    <Bot className="h-4 w-4 mt-1 flex-shrink-0 text-purple-600" />
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs mt-2 text-gray-500">
                        {message.timestamp.toLocaleTimeString('zh-CN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                  {/* 复制按钮 */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyMessage(message)}
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    title="复制消息"
                  >
                    {copiedMessageId === message.id ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* 加载状态 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center space-x-2">
                {compareMode ? (
                  <GitCompare className="h-4 w-4 text-purple-600" />
                ) : (
                  <Bot className="h-4 w-4 text-purple-600" />
                )}
                <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                <span className="text-sm text-gray-600">
                  {compareMode ? '正在对比多个AI的回答...' : '正在思考...'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 输入框 */}
      <div className="sticky bottom-0 bg-white/80 backdrop-blur-md rounded-3xl p-4 border border-white/20 shadow-lg">
        {/* 对比模式开关 */}
        {hasApiKeys && (
          <div className="flex items-center justify-center mb-3 pb-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <GitCompare className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-700">对比模式</span>
              <Switch
                checked={compareMode}
                onCheckedChange={setCompareMode}
                className="data-[state=checked]:bg-purple-600"
              />
              <span className="text-xs text-gray-500">
                {compareMode ? '多AI对比回答' : '单一AI回答'}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-start space-x-3">
          <Textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={hasApiKeys ? "问我任何经济学问题..." : "请先配置AI服务密钥..."}
            className="flex-1 min-h-[2.5rem] max-h-[7.5rem] resize-none rounded-2xl border-purple-200 focus:border-purple-400 focus:ring-purple-300 py-3 px-4"
            disabled={isLoading || !hasApiKeys}
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading || !hasApiKeys}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-6 py-3 self-end"
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
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                基于 {articles.length} 篇文章
              </Badge>
              {hasApiKeys && (
                <Badge variant="outline" className="text-green-600 border-green-200">
                  AI 已配置
                </Badge>
              )}
              {hasApiKeys && compareMode && (
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  对比模式
                </Badge>
              )}
            </div>
          </div>
      </div>
        </>
      )}
    </div>
  );
} 