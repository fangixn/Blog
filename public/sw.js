const CACHE_NAME = 'fangxin-blog-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/knowledge',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Installation completed');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation completed');
        return self.clients.claim();
      })
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  // 只处理同源请求
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // 对于GET请求使用缓存优先策略
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          // 如果缓存中有，返回缓存的响应
          if (cachedResponse) {
            console.log('Service Worker: Serving from cache', event.request.url);
            return cachedResponse;
          }

          // 如果缓存中没有，从网络获取
          return fetch(event.request)
            .then((response) => {
              // 检查响应是否有效
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // 克隆响应用于缓存
              const responseToCache = response.clone();

              // 缓存响应
              caches.open(CACHE_NAME)
                .then((cache) => {
                  // 只缓存特定类型的文件
                  if (shouldCache(event.request.url)) {
                    console.log('Service Worker: Caching new resource', event.request.url);
                    cache.put(event.request, responseToCache);
                  }
                });

              return response;
            })
            .catch((error) => {
              console.log('Service Worker: Fetch failed, serving offline page', error);
              
              // 如果是页面请求且网络失败，返回离线页面
              if (event.request.destination === 'document') {
                return caches.match('/') || createOfflineResponse();
              }
              
              throw error;
            });
        })
    );
  }
});

// 判断是否应该缓存该资源
function shouldCache(url) {
  // 缓存页面、样式、脚本、图片等
  return url.includes('.html') || 
         url.includes('.css') || 
         url.includes('.js') || 
         url.includes('.png') || 
         url.includes('.jpg') || 
         url.includes('.jpeg') || 
         url.includes('.svg') || 
         url.includes('.ico') ||
         url.endsWith('/') ||
         url.includes('/articles/') ||
         url.includes('/knowledge');
}

// 创建离线响应
function createOfflineResponse() {
  const offlineHTML = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>离线模式 - 方馨的博客</title>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0; padding: 40px 20px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white; text-align: center; min-height: 100vh;
                display: flex; flex-direction: column; justify-content: center;
            }
            .container { max-width: 400px; margin: 0 auto; }
            h1 { font-size: 2.5em; margin-bottom: 20px; }
            p { font-size: 1.2em; line-height: 1.6; margin-bottom: 30px; }
            .btn { 
                display: inline-block; padding: 12px 24px; 
                background: rgba(255,255,255,0.2); color: white; 
                text-decoration: none; border-radius: 25px; 
                border: 1px solid rgba(255,255,255,0.3);
                transition: all 0.3s ease;
            }
            .btn:hover { background: rgba(255,255,255,0.3); }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🔌 离线模式</h1>
            <p>当前网络不可用，但您仍可以浏览已缓存的内容。</p>
            <a href="/" class="btn" onclick="window.location.reload()">重新连接</a>
        </div>
    </body>
    </html>
  `;
  
  return new Response(offlineHTML, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// 处理消息事件
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('Service Worker: Loaded successfully'); 