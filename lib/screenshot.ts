// 网站截图和元数据获取工具

export interface WebsiteMetadata {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
}

// 获取网站的Open Graph元数据
export async function getWebsiteMetadata(url: string): Promise<WebsiteMetadata> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Blog Screenshot Bot/1.0)',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    
    // 简单的HTML解析来提取meta标签
    const metadata: WebsiteMetadata = {};
    
    // 提取title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) {
      metadata.title = titleMatch[1].trim();
    }
    
    // 提取Open Graph图片
    const ogImageMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i);
    if (ogImageMatch) {
      metadata.image = ogImageMatch[1];
    }
    
    // 如果没有OG图片，寻找其他图片meta标签
    if (!metadata.image) {
      const twitterImageMatch = html.match(/<meta[^>]+name="twitter:image"[^>]+content="([^"]+)"/i);
      if (twitterImageMatch) {
        metadata.image = twitterImageMatch[1];
      }
    }
    
    // 提取description
    const ogDescMatch = html.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i);
    if (ogDescMatch) {
      metadata.description = ogDescMatch[1];
    } else {
      const descMatch = html.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
      if (descMatch) {
        metadata.description = descMatch[1];
      }
    }
    
    // 提取favicon
    const faviconMatch = html.match(/<link[^>]+rel="(?:icon|shortcut icon)"[^>]+href="([^"]+)"/i);
    if (faviconMatch) {
      const faviconUrl = faviconMatch[1];
      metadata.favicon = faviconUrl.startsWith('http') ? faviconUrl : new URL(faviconUrl, url).href;
    }
    
    return metadata;
  } catch (error) {
    console.error(`获取网站元数据失败 (${url}):`, error);
    return {};
  }
}

// 生成网站截图URL（使用免费的截图API服务）
export function generateScreenshotUrl(url: string, options: {
  width?: number;
  height?: number;
  fullPage?: boolean;
  quality?: number;
} = {}): string {
  const {
    width = 1200,
    height = 630,
    fullPage = false,
    quality = 80
  } = options;
  
  // 使用多个免费截图API服务作为备选
  const apis = [
    // Screenshot API (免费层)
    `https://shot.screenshotapi.net/screenshot?token=YOUR_TOKEN&url=${encodeURIComponent(url)}&width=${width}&height=${height}&output=image&file_type=png&wait_for_event=load`,
    
    // Microlink API (免费层，每月1000次)
    `https://api.microlink.io/screenshot?url=${encodeURIComponent(url)}&embed=screenshot.url&viewport.width=${width}&viewport.height=${height}&screenshot=true&meta=false`,
    
    // htmlcsstoimage API的免费alternative
    `https://api.screenshotmachine.com/?key=demo&url=${encodeURIComponent(url)}&dimension=${width}x${height}&format=png&cacheLimit=0`,
    
    // Placeholder service with website URL as fallback
    `https://via.placeholder.com/${width}x${height}/1e293b/ffffff?text=${encodeURIComponent(new URL(url).hostname)}`
  ];
  
  // 返回第一个API（可以根据需要切换）
  return apis[1]; // 使用Microlink作为默认
}

// 获取网站的最佳展示图片
export async function getBestWebsiteImage(url: string): Promise<string> {
  try {
    // 首先尝试获取Open Graph图片
    const metadata = await getWebsiteMetadata(url);
    
    if (metadata.image) {
      // 验证图片URL是否有效
      try {
        const imageResponse = await fetch(metadata.image, { method: 'HEAD' });
        if (imageResponse.ok) {
          return metadata.image;
        }
      } catch (imageError) {
        console.warn(`OG图片无效 (${url}):`, imageError);
      }
    }
    
    // 如果没有有效的OG图片，使用截图API
    return generateScreenshotUrl(url);
    
  } catch (error) {
    console.error(`获取网站图片失败 (${url}):`, error);
    // 最后的fallback：使用placeholder
    return generateScreenshotUrl(url);
  }
}

// 批量更新项目图片
export async function updateProjectImages(projects: Array<{ id: string; link: string; title: string }>): Promise<Array<{ id: string; image: string }>> {
  const updatedImages = await Promise.all(
    projects.map(async (project) => {
      try {
        const image = await getBestWebsiteImage(project.link);
        return { id: project.id, image };
      } catch (error) {
        console.error(`更新项目图片失败 (${project.title}):`, error);
        return { 
          id: project.id, 
          image: `https://via.placeholder.com/800x400/1e293b/ffffff?text=${encodeURIComponent(project.title)}` 
        };
      }
    })
  );
  
  return updatedImages;
}

// 创建一个后台任务来定期更新图片
export function scheduleImageUpdates(projects: Array<{ id: string; link: string; title: string }>, intervalHours: number = 24) {
  const updateImages = async () => {
    console.log('开始更新项目图片...');
    const updatedImages = await updateProjectImages(projects);
    
    // 这里可以保存到数据库或缓存
    console.log('项目图片更新完成:', updatedImages);
    return updatedImages;
  };
  
  // 立即执行一次
  updateImages();
  
  // 设置定期更新
  const interval = setInterval(updateImages, intervalHours * 60 * 60 * 1000);
  
  return () => clearInterval(interval);
} 