# 📝 Markdown 文章管理指南

现在您的博客支持Markdown格式的文章了！您可以用更简单的方式创建和管理文章。

## 🚀 快速开始

### 方法一：使用自动创建脚本（推荐）

运行以下命令来创建新文章：

```bash
npm run new-article
```

脚本会询问您：
- 文章标题
- 文章摘要  
- 分类（经济学思考/学习笔记/项目展示/AI观察/随笔杂谈）
- 标签
- 预估阅读时间
- 是否为精选文章

脚本会自动创建文件并设置好格式！

### 方法二：手动创建文章

1. 在 `content/articles/` 目录下创建新的 `.md` 文件
2. 文件名建议格式：`YYYY-MM-DD-文章标题.md`
3. 按照模板格式编写文章

## 📋 文章模板

每篇Markdown文章都需要以下格式：

```markdown
---
title: "您的文章标题"
excerpt: "文章摘要，会显示在文章列表中"
category: "economics"  # economics/notes/projects/ai/thoughts
tags: ["标签1", "标签2", "标签3"]
publishedAt: "2024-12-20"  # YYYY-MM-DD格式
readTime: 10  # 预估阅读时间（分钟）
featured: true  # 是否为精选文章
---

# 文章标题

这里开始写您的文章内容...

## 二级标题

支持所有标准的Markdown语法：

- **粗体文字**
- *斜体文字*  
- ~~删除线~~

### 代码示例

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

### 引用

> 这是一个引用块

### 列表

1. 有序列表
2. 第二项

- 无序列表
- 另一项
```

## 📂 文件结构

```
content/
  articles/
    example.md                    # 示例文章
    2024-12-20-your-article.md   # 您的文章
    2024-12-21-another-post.md   # 另一篇文章
```

## 🎯 分类说明

- `economics` - 经济学思考
- `notes` - 学习笔记
- `projects` - 项目展示  
- `ai` - AI观察
- `thoughts` - 随笔杂谈

## 🏷️ 标签建议

常用标签：
- 经济学、技术、AI、React、TypeScript、Python
- 数据分析、前端开发、机器学习、写作
- 哲学思考、项目管理、用户体验
- Markdown、博客写作、技术分享

## 🔄 发布流程

1. **创建文章**：使用 `npm run new-article` 或手动创建
2. **编写内容**：用您喜欢的编辑器编写Markdown
3. **预览效果**：运行 `npm run dev` 查看效果
4. **自动发布**：保存文件后，文章会自动出现在网站上！

## 💡 实用技巧

### 预估阅读时间
- 一般按每分钟200-300字计算
- 或者按文章字数除以250

### 精选文章
- 设置 `featured: true` 的文章会在首页突出显示
- 建议精选文章不要太多，保持质量

### 文章排序
- 文章按发布日期倒序排列（最新的在前）
- Markdown文章会优先显示

### 标签管理
- 新标签会自动添加到标签列表
- 保持标签简洁和一致性

## 🛠️ 技术细节

- 使用 `gray-matter` 解析Front Matter
- 使用 `remark` 处理Markdown语法
- 自动转换为HTML显示
- 支持代码高亮和所有标准Markdown特性

## ❓ 常见问题

**Q: 文章没有显示怎么办？**
A: 检查Front Matter格式是否正确，特别是日期格式

**Q: 可以使用图片吗？**  
A: 可以，使用标准Markdown图片语法：`![alt text](image-url)`

**Q: 支持数学公式吗？**
A: 目前支持基本Markdown，如需数学公式可以后续添加插件

**Q: 如何删除文章？**
A: 直接删除对应的 `.md` 文件即可

---

🎉 现在开始享受用Markdown写博客的乐趣吧！ 