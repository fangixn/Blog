const fs = require('fs');
const path = require('path');

// 基础配置
const DOMAIN = 'https://www.fangxin1230.com';
const CONTENT_DIR = path.join(__dirname, '../content/articles');
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

// 获取当前日期，格式化为 YYYY-MM-DD
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// 从文件名提取文章信息
function extractArticleInfo(filename) {
  if (!filename.endsWith('.md')) return null;
  
  // 移除 .md 扩展名
  const nameWithoutExt = filename.replace('.md', '');
  
  // 提取日期（格式：YYYYMMDD_标题）
  const match = nameWithoutExt.match(/^(\d{8})_(.+)$/);
  if (!match) return null;
  
  const [, dateStr, title] = match;
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  
  return {
    filename: nameWithoutExt,
    title,
    date: `${year}-${month}-${day}`,
    url: `${DOMAIN}/articles/md-${encodeURIComponent(nameWithoutExt)}`
  };
}

// 生成 sitemap XML
function generateSitemap() {
  const articles = [];
  
  // 读取文章目录
  if (fs.existsSync(CONTENT_DIR)) {
    const files = fs.readdirSync(CONTENT_DIR);
    files.forEach(file => {
      const articleInfo = extractArticleInfo(file);
      if (articleInfo) {
        articles.push(articleInfo);
      }
    });
  }
  
  // 按日期排序（最新的优先级更高）
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // 生成 XML 内容
  const currentDate = getCurrentDate();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- 首页 -->
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- 知识库页面 -->
  <url>
    <loc>${DOMAIN}/knowledge</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- 文章页面 -->`;

  articles.forEach((article, index) => {
    // 最新的文章优先级更高
    const priority = index === 0 ? 0.9 : 0.7;
    
    xml += `
  <!-- ${article.title} -->
  <url>
    <loc>${article.url}</loc>
    <lastmod>${article.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}

// 主函数
function main() {
  try {
    const sitemapXml = generateSitemap();
    fs.writeFileSync(OUTPUT_FILE, sitemapXml, 'utf8');
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${OUTPUT_FILE}`);
    console.log(`🌐 URL: ${DOMAIN}/sitemap.xml`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { generateSitemap, extractArticleInfo };