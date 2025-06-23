'use client';

import { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, Save, Trash2, AlertCircle, CheckCircle2, Key, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ApiKeyConfig {
  openai?: string;
  gemini?: string;
  deepseek?: string;
  claude?: string;
  qwen?: string;
}

interface AISettingsProps {
  onConfigChange?: (hasValidConfig: boolean, shouldClose?: boolean) => void;
  onClose?: () => void;
}

export default function AISettings({ onConfigChange, onClose }: AISettingsProps) {
  const [apiKeys, setApiKeys] = useState<ApiKeyConfig>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, 'testing' | 'success' | 'error'>>({});

  // 从本地存储加载配置
  useEffect(() => {
    const loadSavedKeys = () => {
      try {
        const savedKeys = localStorage.getItem('ai-api-keys');
        if (savedKeys) {
          const parsed = JSON.parse(savedKeys);
          setApiKeys(parsed);
          // 仅在初始化时通知父组件有配置，不触发关闭
          const hasValidConfig = Object.values(parsed).some(key => key && typeof key === 'string' && key.trim().length > 0);
          if (onConfigChange) {
            onConfigChange(hasValidConfig, false);
          }
        }
      } catch (error) {
        console.error('Failed to parse saved API keys:', error);
      }
    };

    loadSavedKeys();
  }, []); // 移除onConfigChange依赖，避免无限循环

  // 保存API密钥到本地存储
  const saveApiKeys = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('ai-api-keys', JSON.stringify(apiKeys));
      
      // 通知父组件配置变化
      const hasValidConfig = Object.values(apiKeys).some(key => key && typeof key === 'string' && key.trim().length > 0);
      onConfigChange?.(hasValidConfig, true); // 保存时才请求关闭
      
      // 触发存储事件，通知其他组件
      window.dispatchEvent(new Event('ai-keys-updated'));
      
      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    } catch (error) {
      console.error('Failed to save API keys:', error);
      setIsSaving(false);
    }
  };

  // 清除所有配置
  const clearAllKeys = () => {
    setApiKeys({});
    localStorage.removeItem('ai-api-keys');
    setTestResults({});
    onConfigChange?.(false, false);
    
    // 触发存储事件，通知其他组件
    window.dispatchEvent(new Event('ai-keys-updated'));
  };

  // 测试API密钥
  const testApiKey = async (provider: string) => {
    const key = apiKeys[provider as keyof ApiKeyConfig];
    if (!key || !key.trim()) return;

    setTestResults(prev => ({ ...prev, [provider]: 'testing' }));

    try {
      // 动态导入客户端库
      const { testProvider } = await import('@/lib/aiClient');
      
      const result = await testProvider(provider, key);
      
      if (result.success) {
        console.log(`${provider} 测试成功:`, result);
        setTestResults(prev => ({ ...prev, [provider]: 'success' }));
        
        // 显示成功信息
        if (result.response && result.response !== '连接成功') {
          alert(`连接成功！\n回应: ${result.response.slice(0, 100)}...`);
        }
      } else {
        console.error(`${provider} 测试失败:`, result);
        setTestResults(prev => ({ ...prev, [provider]: 'error' }));
        
        // 显示详细错误信息
        alert(`测试失败: ${result.error}\n\n💡 常见解决方案:\n• 检查API密钥是否正确\n• 确认账户有足够余额\n• 检查网络连接\n• 某些API可能需要科学上网`);
      }
    } catch (error) {
      console.error(`${provider} 测试异常:`, error);
      setTestResults(prev => ({ ...prev, [provider]: 'error' }));
      alert(`网络错误: ${error instanceof Error ? error.message : '连接失败'}\n请检查网络连接或稍后重试`);
    }
  };

  // 切换密钥显示状态
  const toggleShowKey = (provider: string) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }));
  };

  // 更新API密钥
  const updateApiKey = (provider: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
    // 清除之前的测试结果
    setTestResults(prev => ({ ...prev, [provider]: undefined as any }));
  };

  const providers = [
    {
      id: 'openai',
      name: 'ChatGPT',
      description: 'OpenAI GPT-4o-mini',
      placeholder: 'sk-...',
      helpUrl: 'https://platform.openai.com/api-keys',
      color: 'bg-green-500'
    },
    {
      id: 'gemini',
      name: 'Google Gemini',
      description: 'Gemini 1.5 Flash',
      placeholder: 'AIza...',
      helpUrl: 'https://makersuite.google.com/app/apikey',
      color: 'bg-orange-500'
    },
    {
      id: 'deepseek',
      name: 'DeepSeek',
      description: 'DeepSeek v2',
      placeholder: 'sk-...',
      helpUrl: 'https://platform.deepseek.com/api_keys',
      color: 'bg-blue-500'
    },
    {
      id: 'claude',
      name: 'Claude',
      description: 'Claude 3.5 Sonnet',
      placeholder: 'sk-ant-...',
      helpUrl: 'https://console.anthropic.com/account/keys',
      color: 'bg-purple-500'
    },
    {
      id: 'qwen',
      name: '通义千问',
      description: 'Qwen-Max',
      placeholder: 'sk-...',
      helpUrl: 'https://dashscope.console.aliyun.com/apiKey',
      color: 'bg-red-500'
    }
  ];

  const hasAnyKey = Object.values(apiKeys).some(key => key && typeof key === 'string' && key.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      {onClose && (
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="group bg-white/90 backdrop-blur-sm border-2 border-purple-200 text-purple-700 hover:text-white hover:bg-purple-600 hover:border-purple-600 rounded-2xl px-6 py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            返回
          </Button>
        </div>
      )}

      {/* 设置标题 */}
      <Card className="mb-8 glass-effect border-0 rounded-3xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-3xl">
          <CardTitle className="flex items-center text-2xl">
            <Settings className="h-8 w-8 mr-3" />
            AI助手设置
          </CardTitle>
          <p className="text-purple-100">配置您的AI服务密钥，享受智能问答体验</p>
        </CardHeader>
      </Card>

      {/* 状态提示 */}
      {!hasAnyKey && (
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>首次使用提示：</strong>您需要配置至少一个AI服务的API密钥才能使用AI助手功能。
            配置后将保存在您的浏览器中，无需重复输入。
          </AlertDescription>
        </Alert>
      )}

      {hasAnyKey && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            <div>
              <strong>配置已保存：</strong>您已配置了以下AI服务密钥：
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(apiKeys).map(([provider, key]) => {
                  if (key && typeof key === 'string' && key.trim().length > 0) {
                    const providerName = providers.find(p => p.id === provider)?.name || provider;
                    return (
                      <Badge key={provider} className="bg-green-100 text-green-700">
                        {providerName}
                      </Badge>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="config" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 h-12 glass-effect">
          <TabsTrigger value="config" className="rounded-xl font-medium">🔑 密钥配置</TabsTrigger>
          <TabsTrigger value="help" className="rounded-xl font-medium">❓ 使用帮助</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6">
          {/* API密钥配置 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id} className="glass-effect border-0 rounded-3xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${provider.color}`}></div>
                      <div>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <p className="text-sm text-gray-600">{provider.description}</p>
                      </div>
                    </div>
                    {testResults[provider.id] === 'success' && (
                      <Badge className="bg-green-100 text-green-700">已连接</Badge>
                    )}
                    {testResults[provider.id] === 'error' && (
                      <Badge className="bg-red-100 text-red-700">连接失败</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showKeys[provider.id] ? 'text' : 'password'}
                      placeholder={provider.placeholder}
                      value={apiKeys[provider.id as keyof ApiKeyConfig] || ''}
                      onChange={(e) => updateApiKey(provider.id, e.target.value)}
                      className="pr-20 rounded-2xl border-purple-200 focus:border-purple-400"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleShowKey(provider.id)}
                        className="h-8 w-8 p-0 hover:bg-purple-100"
                      >
                        {showKeys[provider.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testApiKey(provider.id)}
                      disabled={!apiKeys[provider.id as keyof ApiKeyConfig] || testResults[provider.id] === 'testing'}
                      className="flex-1 rounded-xl"
                    >
                      {testResults[provider.id] === 'testing' ? '测试中...' : '测试连接'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(provider.helpUrl, '_blank')}
                      className="rounded-xl"
                    >
                      获取密钥
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={saveApiKeys}
              disabled={!hasAnyKey || isSaving}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-8"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  保存中...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  保存配置
                </>
              )}
            </Button>

            {hasAnyKey && (
              <Button
                variant="outline"
                onClick={clearAllKeys}
                className="border-red-200 text-red-600 hover:bg-red-50 rounded-2xl px-8"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                清除所有
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="help" className="space-y-6">
          {/* 使用帮助 */}
          <Card className="glass-effect border-0 rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-6 w-6 mr-2 text-purple-600" />
                如何获取API密钥？
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                {providers.map((provider) => (
                  <div key={provider.id} className="border-l-4 border-purple-200 pl-4">
                    <h4 className="font-semibold text-gray-900 mb-2">{provider.name}</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                      <li>访问 <a href={provider.helpUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">{provider.helpUrl}</a></li>
                      <li>注册账户并登录</li>
                      <li>在API密钥管理页面创建新的密钥</li>
                      <li>复制密钥并粘贴到上方配置框中</li>
                    </ol>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-0 rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle>安全提示</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>API密钥仅保存在您的浏览器本地，不会上传到服务器</li>
                <li>请妥善保管您的API密钥，不要分享给他人</li>
                <li>如果怀疑密钥泄露，请及时在AI服务商网站上删除并重新创建</li>
                <li>您可以随时在此页面更新或删除保存的密钥</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 