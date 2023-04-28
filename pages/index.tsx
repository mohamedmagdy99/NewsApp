import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { GetServerSideProps } from 'next'
import { NewsArticle, NewsResponse } from '@/models/NewsArticle'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticleGrid from '@/components/NewsArticleGrid'

interface BreakingNewsProps {
  newsArticles: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsProps> = async ()=>{
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY);
  const newsResponse : NewsResponse = await response.json();
  return {
    props: {newsArticles: newsResponse.articles}
  }
}
 
export default function BreakingNews({newsArticles} : BreakingNewsProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <NewsArticleGrid article={newsArticles} />
      </main>
    </>
  )
}
