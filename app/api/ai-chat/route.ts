import { NextRequest, NextResponse } from 'next/server';

// 接口定义
interface AIConfig {
  name: string;
  apiUrl: string;
  buildHeaders: (apiKey: string) => Record<string, string>;
  buildBody: (prompt: string, knowledgeContext: string) => any;
  parseResponse: (data: any) => string;
  timeout: number;
  getApiUrl?: (apiKey: string) => string;
}

// 借鉴apiConfig.ts的配置结构，适配AI聊天功能
const AI_CHAT_CONFIGS: Record<string, AIConfig> = {
  openai: {
    name: 'ChatGPT (GPT-4o-mini)',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    buildHeaders: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    buildBody: (prompt: string, knowledgeContext: string) => ({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}`
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }),
    parseResponse: (data: any) => data.choices[0]?.message?.content,
    timeout: 30000
  },
  gemini: {
    name: 'Google Gemini 1.5 Flash',
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    buildHeaders: () => ({ 'Content-Type': 'application/json' }),
    buildBody: (prompt: string, knowledgeContext: string) => ({
      contents: [{ 
        parts: [{ 
          text: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}\n\n用户问题：${prompt}` 
        }] 
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000
      }
    }),
    getApiUrl: (apiKey: string) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    parseResponse: (data: any) => data.candidates[0]?.content?.parts[0]?.text,
    timeout: 25000
  },
  deepseek: {
    name: 'DeepSeek v2',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    buildHeaders: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    buildBody: (prompt: string, knowledgeContext: string) => ({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}`
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    }),
    parseResponse: (data: any) => data.choices[0]?.message?.content,
    timeout: 35000
  },
  claude: {
    name: 'Anthropic Claude 3.5 Sonnet',
    apiUrl: 'https://api.anthropic.com/v1/messages',
    buildHeaders: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    }),
    buildBody: (prompt: string, knowledgeContext: string) => ({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 2000,
      temperature: 0.7,
      messages: [{ 
        role: "user", 
        content: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}\n\n用户问题：${prompt}` 
      }],
    }),
    parseResponse: (data: any) => data.content[0]?.text,
    timeout: 40000
  },
  qwen: {
    name: 'Qwen-Max (通义千问)',
    apiUrl: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    buildHeaders: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    buildBody: (prompt: string, knowledgeContext: string) => ({
      model: "qwen-max",
      input: {
        prompt: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}\n\n用户问题：${prompt}`
      },
      parameters: {
        temperature: 0.7,
        max_tokens: 2000
      }
    }),
    parseResponse: (data: any) => data.output?.text,
    timeout: 30000
  }
};

// 性能设置
const PERFORMANCE_SETTINGS = {
  MAX_CONCURRENT_REQUESTS: 3,
  DEFAULT_TIMEOUT: 30000,
  MAX_RETRIES: 2,
  RETRY_DELAY: 1000
};

// AI提供商优先级（用于结果对比）
const AI_PRIORITY = ['openai', 'deepseek', 'claude', 'gemini', 'qwen'];

// 知识库内容
const KNOWLEDGE_BASE = `
经济学核心领域包括：

1. 微观经济学
- 消费者行为理论
- 生产者理论
- 市场结构与竞争
- 博弈论基础

2. 宏观经济学
- GDP与国民收入核算
- 货币政策与财政政策
- 通胀与失业
- 经济增长理论

3. 国际经济学
- 国际贸易理论
- 汇率与国际金融
- 全球化影响

4. 发展经济学
- 经济发展模式
- 贫困与不平等
- 可持续发展

5. 行为经济学
- 认知偏差
- 决策心理学
- 实验经济学

重要经济学家：亚当·斯密、凯恩斯、弗里德曼、萨缪尔森等。
`;

async function callAPI(provider: string, apiKey: string, prompt: string, knowledgeContext: string) {
  const config = AI_CHAT_CONFIGS[provider as keyof typeof AI_CHAT_CONFIGS];
  if (!config) {
    throw new Error(`不支持的AI提供商: ${provider}`);
  }

  const url = config.getApiUrl ? config.getApiUrl(apiKey) : config.apiUrl;
  const headers = config.buildHeaders(apiKey);
  const body = config.buildBody(prompt, knowledgeContext);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API请求失败 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const result = config.parseResponse(data);
    
    if (!result) {
      throw new Error('API返回了空响应');
    }

    return {
      success: true,
      provider: config.name,
      content: result,
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    return {
      success: false,
      provider: config.name,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, compareMode = false } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的问题' },
        { status: 400 }
      );
    }

    // 获取API密钥
    const getApiKey = (provider: string) => {
      return request.headers.get(`x-${provider}-key`) || process.env[`${provider.toUpperCase()}_API_KEY`];
    };

    // 查找可用的提供商
    const availableProviders = AI_PRIORITY.filter(provider => getApiKey(provider));
    
    if (availableProviders.length === 0) {
      return NextResponse.json(
        { error: '未配置任何AI API密钥' },
        { status: 400 }
      );
    }

    if (compareMode && availableProviders.length > 1) {
      // 对比模式：同时调用多个AI提供商
      console.log(`对比模式：同时调用 ${availableProviders.slice(0, 3).join(', ')}`);
      
      const promises = availableProviders.slice(0, 3).map(provider => 
        callAPI(provider, getApiKey(provider)!, message, KNOWLEDGE_BASE)
      );

      const results = await Promise.all(promises);
      const successResults = results.filter(r => r.success);
      const failedResults = results.filter(r => !r.success);

      if (successResults.length === 0) {
        return NextResponse.json({
          error: '所有AI提供商都无法响应',
          details: failedResults.map(r => `${r.provider}: ${r.error}`)
        }, { status: 500 });
      }

      return NextResponse.json({
        compareMode: true,
        results: results,
        summary: {
          total: results.length,
          successful: successResults.length,
          failed: failedResults.length
        }
      });
    } else {
      // 单一模式：使用优先级最高的可用提供商
      const primaryProvider = availableProviders[0];
      console.log(`单一模式：使用 ${primaryProvider}`);
      
      const result = await callAPI(primaryProvider, getApiKey(primaryProvider)!, message, KNOWLEDGE_BASE);

      if (!result.success) {
        // 如果主要提供商失败，尝试备用提供商
        if (availableProviders.length > 1) {
          const backupProvider = availableProviders[1];
          console.log(`主要提供商失败，尝试备用：${backupProvider}`);
          
          const backupResult = await callAPI(backupProvider, getApiKey(backupProvider)!, message, KNOWLEDGE_BASE);
          
          if (backupResult.success) {
            return NextResponse.json({
              reply: backupResult.content,
              provider: backupResult.provider,
              isBackup: true,
              timestamp: backupResult.timestamp
            });
          }
        }

        return NextResponse.json({
          error: `AI响应失败: ${result.error}`,
          provider: result.provider
        }, { status: 500 });
      }

      return NextResponse.json({
        reply: result.content,
        provider: result.provider,
        timestamp: result.timestamp
      });
    }
  } catch (error: any) {
    console.error('AI聊天API错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误', details: error.message },
      { status: 500 }
    );
  }
}

 