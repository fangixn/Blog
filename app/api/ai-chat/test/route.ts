import { NextRequest, NextResponse } from 'next/server';

interface ApiConfig {
  name: string;
  apiUrl: string;
  timeout?: number;
  buildHeaders: (apiKey: string) => Record<string, string>;
  buildBody: () => any;
  parseResponse: (data: any) => boolean;
  getApiUrl?: (apiKey: string) => string;
}

const API_CONFIGS: Record<string, ApiConfig> = {
  openai: {
    name: 'ChatGPT',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    timeout: 10000,
    buildHeaders: (apiKey: string) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }),
    buildBody: () => ({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: 'Hello! This is a test message.'
        }
      ],
      max_tokens: 10,
      temperature: 0.7,
    }),
    parseResponse: (data: any) => {
      return !!(data.choices && data.choices.length > 0);
    }
  },

  deepseek: {
    name: 'DeepSeek',
    apiUrl: 'https://api.deepseek.com/chat/completions',
    timeout: 10000,
    buildHeaders: (apiKey: string) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }),
    buildBody: () => ({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: 'Hello! This is a test message.'
        }
      ],
      max_tokens: 10,
      temperature: 0.7,
    }),
    parseResponse: (data: any) => {
      return !!(data.choices && data.choices.length > 0);
    }
  }
};

export async function POST(request: NextRequest) {
  try {
    const { provider, apiKey } = await request.json();

    if (!provider || !apiKey) {
      return NextResponse.json(
        { error: 'Provider and API key are required' },
        { status: 400 }
      );
    }

    const config = API_CONFIGS[provider];
    if (!config) {
      return NextResponse.json(
        { error: 'Unsupported provider' },
        { status: 400 }
      );
    }

    // 构建测试请求
    const headers = config.buildHeaders(apiKey);
    const body = config.buildBody();
    const apiUrl = config.getApiUrl ? config.getApiUrl(apiKey) : config.apiUrl;

    // 调用API进行测试
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout || 10000);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // 根据状态码返回具体错误
        if (response.status === 401) {
          return NextResponse.json(
            { error: 'API密钥无效，请检查密钥是否正确' },
            { status: 401 }
          );
        } else if (response.status === 429) {
          return NextResponse.json(
            { error: '请求频率过高，请稍后再试' },
            { status: 429 }
          );
        } else {
          return NextResponse.json(
            { error: `API调用失败: ${response.status}` },
            { status: response.status }
          );
        }
      }

      const data = await response.json();
      const isValid = config.parseResponse(data);

      if (isValid) {
        return NextResponse.json({ 
          success: true, 
          message: 'API密钥验证成功',
          provider: config.name 
        });
      } else {
        return NextResponse.json(
          { error: 'API响应格式异常' },
          { status: 500 }
        );
      }

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return NextResponse.json(
          { error: '请求超时，请检查网络连接' },
          { status: 408 }
        );
      }
      
      return NextResponse.json(
        { error: '网络连接失败，请检查网络设置' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API Test Error:', error);
    return NextResponse.json(
      { error: '测试过程中发生错误' },
      { status: 500 }
    );
  }
} 