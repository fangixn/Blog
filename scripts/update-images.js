#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 简单的HTTP客户端实现（在Node.js环境中）
async function fetchWithTimeout(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Blog Image Bot/1.0)',
        ...options.headers
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// 获取网站的Open Graph图片
async function getWebsiteMetadata(url) {
  try {
    console.log(`正在获取 ${url} 的元数据...`);
    const response = await fetchWithTimeout(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    
    // 提取Open Graph图片
    const ogImageMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
    if (ogImageMatch) {
      return ogImageMatch[1];
    }
    
    // 如果没有OG图片，寻找其他图片meta标签
    const twitterImageMatch = html.match(/<meta[^>]+name="twitter:image"[^>]+content="([^"]+)"/i);
    if (twitterImageMatch) {
      return twitterImageMatch[1];
    }
    
    return null;
  } catch (error) {
    console.error(`获取网站元数据失败 (${url}):`, error.message);
    return null;
  }
}

// 生成截图URL
function generateScreenshotUrl(url) {
  // 使用Microlink API
  return `https://api.microlink.io/screenshot?url=${encodeURIComponent(url)}&embed=screenshot.url&viewport.width=1200&viewport.height=630&screenshot=true&meta=false`;
}

// 获取最佳图片
async function getBestWebsiteImage(url) {
  // 首先尝试获取Open Graph图片
  const ogImage = await getWebsiteMetadata(url);
  
  if (ogImage) {
    try {
      // 验证图片URL是否有效
      const imageResponse = await fetchWithTimeout(ogImage, { method: 'HEAD' });
      if (imageResponse.ok) {
        console.log(`✅ 找到OG图片: ${ogImage}`);
        return ogImage;
      }
    } catch (error) {
      console.warn(`OG图片无效: ${error.message}`);
    }
  }
  
  // 使用截图API
  const screenshotUrl = generateScreenshotUrl(url);
  console.log(`📸 使用截图服务: ${screenshotUrl}`);
  return screenshotUrl;
}

// 更新项目数据文件
async function updateProjectsData() {
  const dataPath = path.join(process.cwd(), 'lib', 'data.ts');
  
  if (!fs.existsSync(dataPath)) {
    console.error('❌ 找不到数据文件:', dataPath);
    return;
  }
  
  let dataContent = fs.readFileSync(dataPath, 'utf8');
  
  // 简单的项目URL提取（这里可以根据实际情况调整）
  const projectUrls = [
    { id: '1', url: 'https://www.economicsweb.org/', title: 'EconWeb' },
    { id: '2', url: 'https://www.economicsai.org/', title: 'EconAI' },
    { id: '3', url: 'https://www.translationcompare.com/', title: 'TranslationCompare' },
    { id: '4', url: 'https://www.aimcpweb.com/zh', title: 'AIMCP Web' }
  ];
  
  console.log('🚀 开始更新项目图片...\n');
  
  for (const project of projectUrls) {
    try {
      console.log(`处理项目: ${project.title}`);
      const imageUrl = await getBestWebsiteImage(project.url);
      
      // 替换数据文件中的图片URL
      const regex = new RegExp(`(id: '${project.id}'[\\s\\S]*?)image: '[^']*'`, 'g');
      dataContent = dataContent.replace(regex, `$1image: '${imageUrl}'`);
      
      console.log(`✅ ${project.title} 图片已更新\n`);
    } catch (error) {
      console.error(`❌ ${project.title} 更新失败:`, error.message);
    }
  }
  
  // 保存更新后的文件
  fs.writeFileSync(dataPath, dataContent, 'utf8');
  console.log('💾 数据文件已保存');
  console.log('🎉 所有项目图片更新完成！');
}

// 主函数
async function main() {
  try {
    await updateProjectsData();
  } catch (error) {
    console.error('❌ 更新失败:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  console.log('📝 项目图片自动更新工具');
  console.log('============================\n');
  main();
}

module.exports = { updateProjectsData, getBestWebsiteImage }; 