import { getAllMarkdownArticles } from '@/lib/markdown';
import HomeClient from './HomeClient';

export default function Home() {
  // 在服务器端获取所有文章数据（只使用markdown文件）
  const allArticles = getAllMarkdownArticles();

  return <HomeClient allArticles={allArticles} />;
}