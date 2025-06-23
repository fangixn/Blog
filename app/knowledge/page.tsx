import { getAllMarkdownArticles } from '@/lib/markdown';
import KnowledgeBaseClient from './KnowledgeBaseClient';

export default async function KnowledgePage() {
  const articles = getAllMarkdownArticles();
  
  return <KnowledgeBaseClient articles={articles} />;
} 