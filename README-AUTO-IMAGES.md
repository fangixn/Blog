# 自动图片更新功能

## 功能概述

博客现在支持**自动获取项目网站的截图或Open Graph图片**，让项目展示的图片随着网站内容的更迭而自动更新，无需手动维护图片链接。

## 工作原理

### 1. 智能图片选择策略
- **优先级1**: 获取网站的Open Graph图片 (`og:image`)
- **优先级2**: 获取Twitter卡片图片 (`twitter:image`)  
- **优先级3**: 使用截图API服务生成网站截图
- **备用方案**: 生成包含项目名称的占位符图片

### 2. 动态加载机制
- 项目数据中图片设置为 `'auto'` 时触发自动获取
- 页面加载时实时获取最新的网站图片
- 包含加载状态指示和错误处理

## 使用方法

### 自动模式（推荐）
在 `lib/data.ts` 中将项目的 `image` 字段设置为 `'auto'`：

```typescript
{
  id: '1',
      title: 'EconWeb - 经济学资源导航',
  description: '...',
  image: 'auto', // 自动获取网站图片
  link: 'https://www.economicsweb.org/',
  // ...
}
```

### 手动更新
运行脚本来手动更新所有项目图片：

```bash
node scripts/update-images.js
```

### API调用
通过API端点手动触发更新：

```bash
# GET请求
curl https://your-domain.com/api/update-images

# POST请求
curl -X POST https://your-domain.com/api/update-images
```

## 当前项目状态

所有4个项目现在都设置为自动获取图片：

| 项目 | 网站 | 状态 |
|------|------|------|
| EconWeb | https://www.economicsweb.org/ | ✅ 自动获取 |
| EconAI | https://www.economicsai.org/ | ✅ 自动获取 |
| TranslationCompare | https://www.translationcompare.com/ | ✅ 自动获取 |
| AIMCP Web | https://www.aimcpweb.com/zh | ✅ 自动获取 |

## 截图服务商

目前使用以下免费截图API服务：

1. **Microlink API** (主要) - 每月1000次免费
2. **Screenshot Machine** (备用)
3. **Placeholder Service** (最终备用)

## 优势特性

### 🔄 自动更新
- 网站改版后图片自动跟随更新
- 无需手动维护图片链接

### 🎯 智能选择
- 优先使用网站官方的Open Graph图片
- 备用截图确保始终有图片显示

### ⚡ 性能优化
- 异步加载，不阻塞页面渲染
- 错误处理和备用方案

### 🎨 用户体验
- 显示加载状态
- 优雅的错误降级

## 技术实现

### 核心文件
- `lib/screenshot.ts` - 图片获取核心逻辑
- `app/api/update-images/route.ts` - API端点
- `scripts/update-images.js` - 命令行工具
- `components/ProjectShowcase.tsx` - 前端展示组件

### 技术栈
- **前端**: React + TypeScript
- **图片获取**: Fetch API + HTML解析
- **截图服务**: Microlink API
- **错误处理**: 多层级备用方案

## 维护建议

### 定期更新
建议每周或每月运行一次手动更新：
```bash
node scripts/update-images.js
```

### 监控API配额
注意Microlink API的免费配额（每月1000次），超出后会自动降级到备用服务。

### 添加新项目
新项目只需在 `lib/data.ts` 中设置 `image: 'auto'` 即可自动获取图片。

## 故障排除

### 图片不显示
1. 检查网站是否可访问
2. 查看浏览器控制台错误信息
3. 确认API配额是否用完

### 获取的图片不理想
1. 检查网站是否设置了Open Graph图片
2. 可以手动指定图片URL替代 `'auto'`
3. 联系网站管理员添加合适的og:image

### 性能问题
- 图片获取是异步进行的，不会影响页面加载速度
- 如果需要更快的加载，可以考虑缓存图片URL

---

这个功能让项目展示更加动态和实时，确保访客看到的始终是最新的项目状态！🚀 