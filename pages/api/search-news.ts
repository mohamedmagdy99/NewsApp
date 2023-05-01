// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from '@/models/NewsArticle';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const search = req.query.q?.toString();
  if(!search){
    return res.status(400).json({error: "please provide a search key"});
  }
  const resposne = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.NEWS_API_KEY}`);
  const newsResponse: NewsResponse = await resposne.json(); 
  res.status(200).json(newsResponse.articles);
}
