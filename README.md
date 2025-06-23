# 方馨的博客

> 用文字和代码，构建理想中的乌托邦

一个基于 Next.js 14 构建的现代化个人博客网站，专注于经济学思考、AI技术实践和项目展示。

## ✨ 功能特色

### 📝 文章系统
- **Markdown 支持**：完整的 Markdown 文章编写和渲染
- **智能分类**：经济学思考、学习笔记、AI观察、随笔杂谈等多维度分类
- **相关文章推荐**：基于标签和分类的智能文章推荐
- **阅读时间估算**：自动计算文章阅读时间
- **精选文章**：重点文章标记和展示

### 🧠 知识库系统
- **知识图谱**：可视化展示知识点之间的关联关系
- **分类浏览**：按学科、主题等维度组织知识内容
- **智能搜索**：支持全文搜索和语义搜索
- **AI智能助手**：基于知识库内容的智能问答系统

### 🤖 AI助手功能
- **智能对话**：基于博客知识库的AI问答助手
- **多模型支持**：支持OpenAI GPT和DeepSeek等多个AI服务商
- **配置管理**：一次配置API密钥，永久使用AI功能
- **知识问答**：专业的经济学概念解答和学习建议
- **预设问题**：常见经济学问题快速提问
- **上下文理解**：结合博客文章内容进行精准回答

### 🎨 现代化界面
- **Apple 风格设计**：简洁优雅的用户界面
- **响应式布局**：完美适配桌面端和移动端
- **平滑动画**：精心设计的页面过渡和交互动画
- **暗色模式支持**：护眼的深色主题

### 🛠️ 开发工具
- **自动化脚本**：新文章创建、图片更新等自动化工具
- **SEO 优化**：完整的 Meta 标签和 OpenGraph 支持
- **性能监控**：Google Analytics 集成
- **类型安全**：完整的 TypeScript 支持

## 🚀 技术栈

### 前端框架
- **Next.js 14**：React 全栈框架，支持 App Router
- **React 18**：最新版本的 React
- **TypeScript**：类型安全的 JavaScript

### 样式系统
- **Tailwind CSS**：原子化 CSS 框架
- **shadcn/ui**：高质量的 React 组件库
- **Lucide React**：美观的图标库

### 内容管理
- **Gray Matter**：Markdown 文件解析
- **Remark & Rehype**：Markdown 到 HTML 转换
- **Date-fns**：日期处理工具

### AI服务集成
- **OpenAI API**：ChatGPT智能问答服务
- **DeepSeek API**：国产大模型服务
- **本地存储**：API密钥安全管理
- **智能降级**：多服务商自动切换

### 开发工具
- **ESLint**：代码规范检查
- **PostCSS**：CSS 后处理器
- **Vercel**：部署平台

## 📦 快速开始

### 环境要求
- Node.js 18.0 或更高版本
- npm、yarn 或 pnpm

### 安装依赖
```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 启动开发服务器
```bash
# 使用 npm
npm run dev

# 使用 yarn
yarn dev

# 使用 pnpm
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本
```bash
# 构建
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
Blog/
├── app/                      # Next.js App Router
│   ├── api/                 # API 路由
│   │   ├── ai-chat/         # AI助手API
│   │   │   ├── route.ts     # 聊天接口
│   │   │   └── test/        # API密钥测试
│   │   ├── articles/        # 文章相关 API
│   │   └── update-images/   # 图片更新 API
│   ├── articles/[id]/       # 动态文章页面
│   ├── knowledge/           # 知识库页面
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局组件
│   └── page.tsx             # 首页
├── components/              # React 组件
│   ├── ui/                  # shadcn/ui 组件
│   ├── AIAssistant.tsx      # AI助手组件
│   ├── AISettings.tsx       # AI设置管理
│   ├── About.tsx            # 关于组件
│   ├── ArticleGrid.tsx      # 文章网格
│   ├── Header.tsx           # 头部导航
│   ├── Hero.tsx             # 首页横幅
│   └── ...                  # 其他组件
├── content/                 # 内容文件
│   └── articles/            # Markdown 文章
├── lib/                     # 工具库
│   ├── data.ts              # 数据处理
│   ├── markdown.ts          # Markdown 解析
│   ├── utils.ts             # 通用工具
│   └── ...
├── apiConfig.ts             # AI服务配置模板
├── scripts/                 # 自动化脚本
│   ├── new-article.js       # 新文章创建
│   └── update-images.js     # 图片更新
├── hooks/                   # React Hooks
├── next.config.js           # Next.js 配置
├── tailwind.config.ts       # Tailwind 配置
└── package.json             # 项目配置
```

## ✍️ 写作指南

### 创建新文章
使用自动化脚本创建新文章：

```bash
node scripts/new-article.js
```

脚本会提示您输入：
- 文章标题
- 文章分类
- 是否为精选文章
- 预计阅读时间
- 文章标签

### 文章格式
文章使用 Markdown 格式，支持 Front Matter：

```markdown
---
title: "文章标题"
excerpt: "文章摘要"
publishedAt: "2024-01-01"
category: "economics"
featured: true
readTime: 5
tags: ["经济学", "AI"]
---

# 文章正文

这里是文章内容...
```

### 图片管理
使用图片更新脚本：

```bash
node scripts/update-images.js
```

## 🎯 部署

### Vercel 部署（推荐）
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量（如需要）
4. 自动部署完成

### 其他平台
项目支持部署到任何支持 Next.js 的平台：
- Netlify
- Railway
- AWS Amplify
- 自建服务器

## 🔧 配置说明

### 环境变量
在 `.env.local` 文件中配置：

```env
# Google Analytics (可选)
NEXT_PUBLIC_GA_ID=your-ga-id

# AI助手服务密钥 (可选，也可在前端配置)
OPENAI_API_KEY=your-openai-api-key
DEEPSEEK_API_KEY=your-deepseek-api-key

# 其他配置...
```

### AI助手配置
AI助手支持两种配置方式：

#### 方式一：环境变量配置（开发者）
适合开发者统一配置，用户无需额外设置：

```env
OPENAI_API_KEY=sk-xxx...
DEEPSEEK_API_KEY=sk-xxx...
```

#### 方式二：前端用户配置（推荐）
用户在网站上自行配置API密钥：

1. 访问知识库页面的"🤖 AI助手"标签
2. 点击右上角设置按钮
3. 输入您的API密钥
4. 测试连接并保存配置
5. 开始使用AI助手功能

**获取API密钥：**
- OpenAI：[https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- DeepSeek：[https://platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys)

### SEO 配置
在 `app/layout.tsx` 中修改网站元信息：

```typescript
export const metadata: Metadata = {
  title: '您的网站标题',
  description: '网站描述',
  // ...
};
```

## 🔮 未来规划

### EconAI 生态系统集成
我们计划将博客与 [EconAI](https://econai.com) 深度集成，构建完整的经济学学习生态：

#### 🎯 近期目标
- **智能推荐**：基于用户阅读历史和AI分析推荐相关文章
- **知识图谱增强**：结合EconAI的知识库扩展文章关联性
- **学习路径规划**：为不同水平的读者制定个性化学习计划

#### 🚀 中期目标
- **专业问答升级**：接入EconAI的专业经济学问答能力
- **论文推荐系统**：基于文章内容推荐相关学术论文
- **互动学习工具**：经济学概念测试、案例分析等

#### 🌟 长期愿景
- **学术社区集成**：连接EconAI学术社区，促进学者交流
- **智能写作助手**：AI辅助经济学文章创作和审校
- **多语言支持**：国际化的经济学知识传播平台

### 技术演进路线
1. **基础AI助手** ✅ (当前阶段)
2. **EconAI API集成** 🚧 (开发中)
3. **智能推荐引擎** 📋 (规划中)
4. **完整生态集成** 🎯 (未来目标)

## 📚 开发文档

详细的开发文档请查看：
- [Markdown 使用指南](./README-MARKDOWN.md)
- [知识库系统](./README-KNOWLEDGE-BASE.md)
- [图片自动更新](./README-AUTO-IMAGES.md)
- [AI助手开发指南](./README-AI-ASSISTANT.md) 📝 (待完善)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 开源协议

本项目基于 MIT 协议开源。详情请查看 [LICENSE](./LICENSE) 文件。

## 📞 联系方式

- 作者：方馨
- 邮箱：fangin1230@gmail.com
- 网站：[fangxin1230.com](https://fangxin1230.com)

## 🙏 致谢

感谢以下开源项目和服务：
- [Next.js](https://nextjs.org/) - React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - 组件库
- [Lucide](https://lucide.dev/) - 图标库
- [OpenAI](https://openai.com/) - AI服务提供商
- [DeepSeek](https://deepseek.com/) - 国产AI大模型
- [EconAI](https://econai.com) - 经济学AI生态合作伙伴

---

⭐ 如果这个项目对您有帮助，请给个 Star！ 