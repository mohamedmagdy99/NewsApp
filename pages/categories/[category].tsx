import NewsArticleGrid from "@/components/NewsArticleGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticle";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface categoryNewsPageProps {
       newsArticles: NewsArticle[],

}

export const getStaticPaths: GetStaticPaths = async ()=>{
       const categoryTypes = [
              "business",
              "entertainment",
              "general",
              "health",
              "science",
              "sports",
              "technology",
       ];
       const paths = categoryTypes.map(slug=>({params:{ category: slug }}));
       return {
              paths,
              fallback: false,
       }
}

export const getStaticProps:GetStaticProps<categoryNewsPageProps> = async ({params})=>{
       const category = params?.category?.toString();
       const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`);
       const newsResponse: NewsResponse = await response.json();
       return{
              props: {newsArticles: newsResponse.articles}
       }
}

const categoryNewsPage = ({newsArticles}: categoryNewsPageProps) => {
       const router = useRouter();
       const categoryName = router.query.category?.toString();
       const title = "category: " + categoryName;
       return ( 
              <>
              <Head>
                     <title key="title">{title} - Nextjs News App</title>
              </Head>
                     <main>
                            <h1>{title}</h1>
                            <NewsArticleGrid article={newsArticles} />
                     </main>
              </>
        );
}
 
export default categoryNewsPage;