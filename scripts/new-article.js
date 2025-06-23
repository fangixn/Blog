#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50);
}

async function createNewArticle() {
  console.log('📝 创建新的 Markdown 文章\n');

  try {
    const title = await question('文章标题: ');
    const excerpt = await question('文章摘要: ');
    
    console.log('\n选择分类:');
    console.log('1. economics (经济学思考)');
    console.log('2. notes (学习笔记)');
    console.log('3. projects (项目展示)');
    console.log('4. ai (AI观察)');
    console.log('5. thoughts (随笔杂谈)');
    
    const categoryChoice = await question('请选择分类 (1-5): ');
    const categories = ['economics', 'notes', 'projects', 'ai', 'thoughts'];
    const category = categories[parseInt(categoryChoice) - 1] || 'thoughts';
    
    const tagsInput = await question('文章标签 (用逗号分隔): ');
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const readTime = await question('预估阅读时间 (分钟): ') || '10';
    const featured = await question('是否为精选文章? (y/n): ');
    
    const currentDate = new Date().toISOString().split('T')[0];
    const slug = createSlug(title);
    const fileName = `${currentDate}-${slug}.md`;
    
    const frontMatter = `---
title: "${title}"
excerpt: "${excerpt}"
category: "${category}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
publishedAt: "${currentDate}"
readTime: ${parseInt(readTime) || 10}
featured: ${featured.toLowerCase() === 'y' || featured.toLowerCase() === 'yes'}
---

# ${title}

${excerpt}

## 开始写作

在这里编写您的文章内容...

`;

    const articlesDir = path.join(process.cwd(), 'content', 'articles');
    if (!fs.existsSync(articlesDir)) {
      fs.mkdirSync(articlesDir, { recursive: true });
    }
    
    const filePath = path.join(articlesDir, fileName);
    fs.writeFileSync(filePath, frontMatter);
    
    console.log(`\n✅ 文章已创建: ${fileName}`);
    console.log(`📁 位置: content/articles/${fileName}`);
    console.log('\n现在您可以:');
    console.log('1. 编辑这个文件来完成您的文章');
    console.log('2. 运行 npm run dev 来预览您的博客');
    console.log('3. 您的文章将自动显示在网站上!');
    
  } catch (error) {
    console.error('❌ 创建文章时出错:', error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  createNewArticle();
}

module.exports = { createNewArticle }; 