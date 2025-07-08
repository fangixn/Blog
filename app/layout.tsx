import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import PWAInstaller from '@/components/PWAInstaller';

const inter = Inter({ subsets: ['latin'] });
const notoSansSC = Noto_Sans_SC({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-sc'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fangxin1230.com'),
  title: '方馨博客-用文字和代码，构建理想中的乌托邦',
  description: '方馨的个人博客，分享经济学思考、AI技术实践和项目展示。创建了EconWeb、EconAI、TranslationCompare等专业平台，探索经济学理论与技术实践的交融。',
  keywords: '方馨,经济学博客,AI项目,EconWeb,EconAI,翻译对比,经济学资源,AI助手,学术工具,技术博客,经济学思考,项目展示',
  authors: [{ name: '方馨' }],
  creator: '方馨',
  
  // Favicon 配置
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: '32x32' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico'
  },
  
  // PWA 配置
  manifest: '/manifest.json',
  
  // 主题色配置
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#9333ea' },
    { media: '(prefers-color-scheme: dark)', color: '#9333ea' }
  ],
  
  // 移动端配置
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  },
  
  // Apple 移动端配置
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '方馨博客',
    startupImage: [
      {
        url: '/apple-splash-2048-2732.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
      }
    ]
  },
  
  openGraph: {
    title: '方馨博客-用文字和代码，构建理想中的乌托邦',
    description: '用文字和代码，构建理想中的乌托邦。创建了多个专业的经济学和AI工具平台。',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://fangxin1230.com',
    siteName: '方馨博客-用文字和代码，构建理想中的乌托邦',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '方馨博客-用文字和代码，构建理想中的乌托邦'
      }
    ]
  },
  
  twitter: {
    card: 'summary_large_image',
    title: '方馨博客-用文字和代码，构建理想中的乌托邦',
    description: '用文字和代码，构建理想中的乌托邦',
    images: ['/og-image.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        {/* PWA 和移动端优化 */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="方馨博客" />
        <meta name="msapplication-TileColor" content="#9333ea" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* 预加载关键资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PWA 安装提示优化 */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.className} ${notoSansSC.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
        <PWAInstaller />
      </body>
    </html>
  );
}