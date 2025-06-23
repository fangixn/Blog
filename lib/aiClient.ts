// 客户端AI调用库 - 适配静态导出模式
export interface AIProvider {
  name: string;
  testConnection: (apiKey: string) => Promise<{ success: boolean; error?: string; response?: string }>;
  chat: (apiKey: string, message: string, knowledgeContext: string) => Promise<{ success: boolean; content?: string; error?: string }>;
}

// AI提供商配置
export const AI_PROVIDERS: Record<string, AIProvider> = {
  openai: {
    name: 'ChatGPT (GPT-4o-mini)',
    testConnection: async (apiKey: string) => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "测试连接" }],
            max_tokens: 50,
            temperature: 0.1
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          response: data.choices[0]?.message?.content || '连接成功' 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    chat: async (apiKey: string, message: string, knowledgeContext: string) => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}`
              },
              { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 2000
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          content: data.choices[0]?.message?.content 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
  },

  deepseek: {
    name: 'DeepSeek v2',
    testConnection: async (apiKey: string) => {
      try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: "测试连接" }],
            max_tokens: 50,
            temperature: 0.1
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          response: data.choices[0]?.message?.content || '连接成功' 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    chat: async (apiKey: string, message: string, knowledgeContext: string) => {
      try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}`
              },
              { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 2000
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          content: data.choices[0]?.message?.content 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
  },

  gemini: {
    name: 'Google Gemini 1.5 Flash',
    testConnection: async (apiKey: string) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: "测试连接" }] }],
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 50
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          response: data.candidates[0]?.content?.parts[0]?.text || '连接成功' 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    chat: async (apiKey: string, message: string, knowledgeContext: string) => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ 
                text: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}\n\n用户问题：${message}` 
              }] 
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2000
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          content: data.candidates[0]?.content?.parts[0]?.text 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
  },

  claude: {
    name: 'Anthropic Claude 3.5 Sonnet',
    testConnection: async (apiKey: string) => {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 50,
            temperature: 0.1,
            messages: [{ role: "user", content: "测试连接" }]
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          response: data.content[0]?.text || '连接成功' 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    chat: async (apiKey: string, message: string, knowledgeContext: string) => {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 2000,
            temperature: 0.7,
            messages: [{ 
              role: "user", 
              content: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}\n\n用户问题：${message}` 
            }]
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          content: data.content[0]?.text 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
  },

  qwen: {
    name: 'Qwen-Max (通义千问)',
    testConnection: async (apiKey: string) => {
      try {
        const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "qwen-max",
            input: { prompt: "测试连接" },
            parameters: {
              temperature: 0.1,
              max_tokens: 50
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          response: data.output?.text || '连接成功' 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    },
    chat: async (apiKey: string, message: string, knowledgeContext: string) => {
      try {
        const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "qwen-max",
            input: {
              prompt: `你是一个专业的经济学助手。请基于以下知识库内容回答用户问题：\n\n${knowledgeContext}\n\n用户问题：${message}`
            },
            parameters: {
              temperature: 0.7,
              max_tokens: 2000
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          return { success: false, error: `HTTP ${response.status}: ${errorText.slice(0, 200)}` };
        }

        const data = await response.json();
        return { 
          success: true, 
          content: data.output?.text 
        };
      } catch (error: any) {
        return { success: false, error: error.message };
      }
    }
  }
};

// 知识库内容
export const KNOWLEDGE_BASE = `
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

// 测试API连接
export async function testProvider(provider: string, apiKey: string) {
  const aiProvider = AI_PROVIDERS[provider];
  if (!aiProvider) {
    return { success: false, error: '不支持的AI提供商' };
  }

  return await aiProvider.testConnection(apiKey);
}

// AI聊天
export async function chatWithAI(
  provider: string, 
  apiKey: string, 
  message: string, 
  knowledgeContext: string = KNOWLEDGE_BASE
) {
  const aiProvider = AI_PROVIDERS[provider];
  if (!aiProvider) {
    return { success: false, error: '不支持的AI提供商' };
  }

  return await aiProvider.chat(apiKey, message, knowledgeContext);
}

// 对比模式聊天
export async function compareChat(
  apiKeys: Record<string, string>, 
  message: string, 
  knowledgeContext: string = KNOWLEDGE_BASE
) {
  const providers = Object.keys(AI_PROVIDERS).filter(provider => apiKeys[provider]);
  const maxProviders = Math.min(providers.length, 3); // 最多3个提供商

  const promises = providers.slice(0, maxProviders).map(async (provider) => {
    try {
      const result = await chatWithAI(provider, apiKeys[provider], message, knowledgeContext);
      return {
        provider: AI_PROVIDERS[provider].name,
        success: result.success,
        content: result.content,
        error: result.error,
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      return {
        provider: AI_PROVIDERS[provider].name,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  });

  const results = await Promise.all(promises);
  const successful = results.filter(r => r.success).length;

  return {
    compareMode: true,
    results,
    summary: {
      total: results.length,
      successful,
      failed: results.length - successful
    }
  };
} 