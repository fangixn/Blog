import { NextRequest, NextResponse } from 'next/server';

// 基于 apiConfig.ts 的设计，但针对博客知识库优化
interface ApiConfig {
  name: string;
  apiUrl: string;
  timeout?: number;
  buildHeaders: (apiKey: string) => Record<string, string>;
  buildBody: (prompt: string, knowledgeContext: string) => any;
  parseResponse: (data: any) => string;
  getApiUrl?: (apiKey: string) => string;
}

const API_CONFIGS: Record<string, ApiConfig> = {
  openai: {
    name: 'ChatGPT',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    timeout: 30000,
    buildHeaders: (apiKey: string) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }),
    buildBody: (prompt: string, knowledgeContext: string) => ({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `你是方馨博客的经济学AI助手。你的任务是基于提供的知识库内容回答用户的经济学问题。

知识库内容：
${knowledgeContext}

请遵循以下原则：
1. 优先使用知识库中的信息回答问题
2. 如果知识库中没有相关信息，基于你的经济学专业知识回答
3. 回答要准确、专业但易懂
4. 如果涉及到知识库中的文章，可以提及文章标题
5. 保持友好、有帮助的语调
6. 用中文回答`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
    parseResponse: (data: any) => {
      return data.choices?.[0]?.message?.content || 'AI助手暂时无法回答，请稍后再试。';
    }
  },

  deepseek: {
    name: 'DeepSeek',
    apiUrl: 'https://api.deepseek.com/chat/completions',
    timeout: 30000,
    buildHeaders: (apiKey: string) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }),
    buildBody: (prompt: string, knowledgeContext: string) => ({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `你是方馨博客的专业经济学助手，基于博客知识库为用户提供经济学学习指导。

知识库内容：
${knowledgeContext}

回答要求：
- 优先使用知识库内容
- 结合经济学理论提供深入分析
- 语言通俗易懂，适合学习者
- 可以推荐相关的博客文章
- 用中文回答`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    }),
    parseResponse: (data: any) => {
      return data.choices?.[0]?.message?.content || 'AI助手暂时无法回答，请稍后再试。';
    }
  }
};

// 获取API密钥（优先使用前端传递的，其次使用环境变量）
const getApiKey = (provider: string, frontendApiKeys?: any): string | null => {
  // 优先使用前端传递的API密钥
  if (frontendApiKeys && frontendApiKeys[provider]) {
    return frontendApiKeys[provider];
  }
  
  // 降级到环境变量
  switch (provider) {
    case 'openai':
      return process.env.OPENAI_API_KEY || null;
    case 'deepseek':
      return process.env.DEEPSEEK_API_KEY || null;
    default:
      return null;
  }
};

// 获取可用的API提供商
const getAvailableProvider = (frontendApiKeys?: any): { provider: string; config: ApiConfig } | null => {
  // 按优先级尝试
  const providers = ['openai', 'deepseek'];
  
  for (const provider of providers) {
    const apiKey = getApiKey(provider, frontendApiKeys);
    if (apiKey && API_CONFIGS[provider]) {
      return { provider, config: API_CONFIGS[provider] };
    }
  }
  
  return null;
};

// 构建知识库上下文
const buildKnowledgeContext = (articles: any[]): string => {
  if (!articles || articles.length === 0) {
    return "当前没有可用的知识库内容。";
  }

  // 限制上下文长度，避免token超限
  const maxContextLength = 3000;
  let context = "以下是博客知识库中的相关内容：\n\n";
  
  for (const article of articles.slice(0, 5)) { // 最多取5篇文章
    const articleInfo = `标题：${article.title}\n摘要：${article.excerpt}\n标签：${article.tags?.join(', ') || '无'}\n内容片段：${article.content?.slice(0, 200) || ''}...\n\n`;
    
    if (context.length + articleInfo.length < maxContextLength) {
      context += articleInfo;
    } else {
      break;
    }
  }
  
  return context;
};

export async function POST(request: NextRequest) {
  try {
    const { message, articles, apiKeys } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的问题' },
        { status: 400 }
      );
    }

    // 获取可用的API提供商
    const availableApi = getAvailableProvider(apiKeys);
    if (!availableApi) {
      return NextResponse.json({
        message: '抱歉，AI助手服务暂时不可用。不过我可以为您推荐一些相关的博客文章来学习：\n\n' +
                '• 《如何从零开始自学一门学科？2.0》\n' +
                '• 《四本书带你迈进经济学的门槛》\n' +
                '• 《100位经济学领域关键学者》\n\n' +
                '您可以在知识库中搜索相关内容，或者点击右上角的设置按钮配置AI服务密钥。'
      });
    }

    const { provider, config } = availableApi;
    const apiKey = getApiKey(provider, apiKeys);

    // 构建知识库上下文
    const knowledgeContext = buildKnowledgeContext(articles || []);

    // 构建请求
    const headers = config.buildHeaders(apiKey!);
    const body = config.buildBody(message, knowledgeContext);
    const apiUrl = config.getApiUrl ? config.getApiUrl(apiKey!) : config.apiUrl;

    // 调用AI API
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout || 30000);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = config.parseResponse(data);

      return NextResponse.json({ 
        message: aiResponse,
        provider: config.name 
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        throw new Error('请求超时');
      }
      throw fetchError;
    }

  } catch (error) {
    console.error('AI Chat API Error:', error);

    // 返回友好的错误信息和备用建议
    return NextResponse.json({
      message: '抱歉，我现在无法回答您的问题。您可以尝试：\n\n' +
               '• 检查网络连接后重试\n' +
               '• 在知识库中搜索相关文章\n' +
               '• 浏览"学习路径"获取系统性指导\n' +
               '• 查看"关键学者"了解经济学家\n\n' +
               '我会继续努力为您提供更好的服务！'
    });
  }
}

// 健康检查端点
export async function GET() {
  const availableProviders = ['openai', 'deepseek'].filter(provider => 
    getApiKey(provider) !== null
  );

  return NextResponse.json({
    status: 'ok',
    availableProviders,
    hasApiKeys: availableProviders.length > 0
  });
} 