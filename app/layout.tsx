import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });
const notoSansSC = Noto_Sans_SC({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-sc'
});

export const metadata: Metadata = {
  title: '方馨的博客 - 思想的记录器，代码的操作者',
  description: '方馨的个人博客，分享经济学思考、AI技术实践和项目展示。创建了EconomicsWeb、EconAI、TranslationCompare等专业平台，探索经济学理论与技术实践的交融。',
  keywords: '方馨,经济学博客,AI项目,EconomicsWeb,EconAI,翻译对比,经济学资源,AI助手,学术工具,技术博客,经济学思考,项目展示',
  authors: [{ name: '方馨' }],
  creator: '方馨',
  openGraph: {
    title: '方馨的博客 - 经济学与AI技术的探索者',
    description: '思想的记录器，代码的操作者。创建了多个专业的经济学和AI工具平台。',
    type: 'website',
    locale: 'zh_CN',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className={`${inter.className} ${notoSansSC.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}