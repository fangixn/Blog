import { NextRequest, NextResponse } from 'next/server';

// 接口定义（与主API一致）
interface AIConfig {
  name: string;
  apiUrl: string;
  buildHeaders: (apiKey: string) => Record<string, string>;
  buildBody: () => any;
  parseResponse: (data: any) => string;
  timeout: number;
  getApiUrl?: (apiKey: string) => string;
}

// 测试用的简化配置（借鉴apiConfig.ts结构）
const TEST_CONFIGS: Record<string, AIConfig> = {
  openai: {
    name: 'ChatGPT (GPT-4o-mini)',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    buildHeaders: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    buildBody: () => ({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "测试连接" }],
      max_tokens: 50,
      temperature: 0.1
    }),
    parseResponse: (data: any) => data.choices[0]?.message?.content,
    timeout: 10000
  },
  gemini: {
    name: 'Google Gemini 1.5 Flash',
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    buildHeaders: () => ({ 'Content-Type': 'application/json' }),
    buildBody: () => ({
      contents: [{ parts: [{ text: "测试连接" }] }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 50
      }
    }),
    getApiUrl: (apiKey: string) => `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    parseResponse: (data: any) => data.candidates[0]?.content?.parts[0]?.text,
    timeout: 10000
  },
  deepseek: {
    name: 'DeepSeek v2',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    buildHeaders: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    buildBody: () => ({
      model: "deepseek-chat",
      messages: [{ role: "user", content: "测试连接" }],
      max_tokens: 50,
      temperature: 0.1
    }),
    parseResponse: (data: any) => data.choices[0]?.message?.content,
    timeout: 10000
  },
  claude: {
    name: 'Anthropic Claude 3.5 Sonnet',
    apiUrl: 'https://api.anthropic.com/v1/messages',
    buildHeaders: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    }),
    buildBody: () => ({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 50,
      temperature: 0.1,
      messages: [{ role: "user", content: "测试连接" }],
    }),
    parseResponse: (data: any) => data.content[0]?.text,
    timeout: 10000
  },
  qwen: {
    name: 'Qwen-Max (通义千问)',
    apiUrl: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
    buildHeaders: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    buildBody: () => ({
      model: "qwen-max",
      input: { prompt: "测试连接" },
      parameters: {
        temperature: 0.1,
        max_tokens: 50
      }
    }),
    parseResponse: (data: any) => data.output?.text,
    timeout: 10000
  }
};

async function testProvider(provider: string, apiKey: string) {
  const config = TEST_CONFIGS[provider];
  if (!config) {
    return {
      provider: provider,
      success: false,
      error: '不支持的AI提供商'
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const url = config.getApiUrl ? config.getApiUrl(apiKey) : config.apiUrl;
    const response = await fetch(url, {
      method: 'POST',
      headers: config.buildHeaders(apiKey),
      body: JSON.stringify(config.buildBody()),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      return {
        provider: config.name,
        success: false,
        error: `HTTP ${response.status}: ${errorText}`,
        status: response.status
      };
    }

    const data = await response.json();
    const result = config.parseResponse(data);

    return {
      provider: config.name,
      success: true,
      response: result || '连接成功',
      responseTime: Date.now()
    };

  } catch (error: any) {
    clearTimeout(timeoutId);
    return {
      provider: config.name,
      success: false,
      error: error.name === 'AbortError' ? '请求超时' : error.message
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const { provider, apiKey } = await request.json();

    if (!provider || !apiKey) {
      return NextResponse.json(
        { error: '请提供AI提供商和API密钥' },
        { status: 400 }
      );
    }

    if (!TEST_CONFIGS[provider]) {
      return NextResponse.json(
        { error: `不支持的AI提供商: ${provider}` },
        { status: 400 }
      );
    }

    const result = await testProvider(provider, apiKey);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        provider: result.provider,
        message: '连接测试成功！',
        response: result.response
      });
    } else {
      return NextResponse.json({
        success: false,
        provider: result.provider,
        error: result.error,
        status: result.status
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('API测试错误:', error);
    return NextResponse.json(
      { error: '测试过程中发生错误', details: error.message },
      { status: 500 }
    );
  }
} 