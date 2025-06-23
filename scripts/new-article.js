#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 问询函数
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// 获取当前日期
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// 生成文件名
function generateFileName(title, date) {
  const dateString = date.replace(/-/g, '');
  const cleanTitle = title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '');
  return `${dateString}_${cleanTitle}.md`;
}

// 创建文章模板
function createArticleTemplate(data) {
  return `---
title: "${data.title}"
excerpt: "${data.excerpt}"
category: "${data.category}"
tags: [${data.tags.map(tag => `"${tag}"`).join(', ')}]
publishedAt: "${data.date}"
readTime: ${data.readTime}
featured: ${data.featured}
---

# ${data.title}

${data.content}

## 总结

在这里写总结...

---

*本文发布于 ${data.date}，欢迎在评论区分享您的想法！*
`;
}

// 估算阅读时间
function estimateReadTime(content) {
  const wordsPerMinute = 200; // 中文大约200字/分钟
  const wordCount = content.length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// 智能建议标签
function suggestTags(title, content, category) {
  const allTags = [
    '经济学', '技术', 'AI', 'React', 'TypeScript', 'Python', 
    '数据分析', '前端开发', '机器学习', '写作',
    '哲学思考', '项目管理', '用户体验', 'RAG', 
    'LLM', '文档处理', 'AI问答', 'Markdown', '博客写作', '技术分享',
    '资源导航', 'SEO', '学术资源', '数据源', 'AI助手', 
    '经济学研究', 'GPT', 'Claude', '学术工具', 'ChatBot',
    '翻译对比', '语言服务', 'Web应用', '质量评估', '多语言',
    'AI工具', '团队协作', 'SaaS', '效率工具', 'Next.js',
    '书籍推荐', '经济学入门', '萨缪尔森', '曼昆', '经济学原理',
    '书单', '学术著作', '经济学理论', '必读书籍', '人工智能',
    '劳动力市场', '数字经济', '技术变革', '学习心得', '经济学学习',
    '研究方法', '学术技能', '实践应用', '网站开发', '用户体验', '学术平台'
  ];

  const text = (title + ' ' + content).toLowerCase();
  const suggestedTags = allTags.filter(tag => 
    text.includes(tag.toLowerCase()) || 
    tag.toLowerCase().includes(category.toLowerCase())
  );

  // 根据分类添加相关标签
  const categoryTags = {
    'economics': ['经济学', '经济学理论'],
    'ai': ['AI', '人工智能', 'AI工具'],
    'notes': ['学习心得', '学术技能'],
    'projects': ['项目管理', '技术分享'],
    'thoughts': ['哲学思考', '写作']
  };

  if (categoryTags[category]) {
    suggestedTags.push(...categoryTags[category]);
  }

  // 去重并限制数量
  return [...new Set(suggestedTags)].slice(0, 8);
}

// 主要功能
async function main() {
  console.log('🎯 智能文章管理工具');
  console.log('====================');
  
  const action = await question('选择操作: (1) 创建新文章 (2) 列出现有文章 (3) 退出: ');
  
  if (action === '1') {
    await createNewArticle();
  } else if (action === '2') {
    await listExistingArticles();
  } else {
    console.log('再见！');
    rl.close();
    return;
  }
  
  rl.close();
}

// 创建新文章
async function createNewArticle() {
  console.log('\n📝 创建新文章');
  console.log('---------------');
  
  const title = await question('文章标题: ');
  const excerpt = await question('文章摘要: ');
  
  console.log('\n可选分类:');
  console.log('1. economics (经济学思考)');
  console.log('2. notes (学习笔记)');
  console.log('3. projects (项目展示)');
  console.log('4. ai (AI观察)');
  console.log('5. thoughts (随笔杂谈)');
  
  const categoryChoice = await question('选择分类 (1-5): ');
  const categories = ['economics', 'notes', 'projects', 'ai', 'thoughts'];
  const category = categories[parseInt(categoryChoice) - 1] || 'thoughts';
  
  const content = await question('文章内容 (简短版，可稍后编辑): ');
  
  const readTime = estimateReadTime(content);
  const suggestedTags = suggestTags(title, content, category);
  
  console.log(`\n🏷️ 建议标签: ${suggestedTags.join(', ')}`);
  const tagsInput = await question('输入标签 (逗号分隔，留空使用建议标签): ');
  const tags = tagsInput.trim() ? tagsInput.split(',').map(tag => tag.trim()) : suggestedTags.slice(0, 5);
  
  const featured = await question('是否为精选文章? (y/N): ');
  
  const articleData = {
    title,
    excerpt,
    category,
    tags,
    date: getCurrentDate(),
    readTime,
    featured: featured.toLowerCase() === 'y',
    content
  };
  
  const fileName = generateFileName(title, articleData.date);
  const template = createArticleTemplate(articleData);
  
  // 确保目录存在
  const articlesDir = path.join(process.cwd(), 'content', 'articles');
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true });
  }
  
  // 保存文件
  const filePath = path.join(articlesDir, fileName);
  fs.writeFileSync(filePath, template, 'utf8');
  
  console.log(`\n✅ 文章已创建: ${fileName}`);
  console.log(`📍 位置: ${filePath}`);
  console.log(`📊 预估阅读时间: ${readTime} 分钟`);
  console.log(`🏷️ 标签: ${tags.join(', ')}`);
  console.log('\n💡 提示: 您现在可以在文件中编辑完整内容！');
}

// 列出现有文章
async function listExistingArticles() {
  console.log('\n📚 现有文章列表');
  console.log('----------------');
  
  const articlesDir = path.join(process.cwd(), 'content', 'articles');
  
  if (!fs.existsSync(articlesDir)) {
    console.log('❌ 文章目录不存在');
    return;
  }
  
  const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));
  
  if (files.length === 0) {
    console.log('📭 暂无文章');
    return;
  }
  
  files.forEach((file, index) => {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 简单解析标题
    const titleMatch = content.match(/title: "([^"]+)"/);
    const categoryMatch = content.match(/category: "([^"]+)"/);
    const dateMatch = content.match(/publishedAt: "([^"]+)"/);
    
    const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
    const category = categoryMatch ? categoryMatch[1] : '未知';
    const date = dateMatch ? dateMatch[1] : '未知';
    
    console.log(`${index + 1}. ${title}`);
    console.log(`   📂 分类: ${category} | 📅 日期: ${date}`);
    console.log(`   📄 文件: ${file}\n`);
  });
  
  console.log(`共 ${files.length} 篇文章`);
}

// 运行主程序
main().catch(console.error); 