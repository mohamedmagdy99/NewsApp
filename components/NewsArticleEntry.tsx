import { NewsArticle } from "@/models/NewsArticle";
import { Card } from "react-bootstrap";

interface NewsArticleEntryProps {
       article: NewsArticle,
}

const NewsArticleEntry = ({article : {title, description, url, urlToImage, publishedAt} }: NewsArticleEntryProps) => {
       const validImageUrl = (urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://"))? urlToImage : "./public/no-produt-img.png";
       return (  
              <a href={url}>
                     <Card className="h-100">
                            <Card.Img 
                                   variant="top"
                                   src={urlToImage}
                            />
                            <Card.Body>
                                   <Card.Title>{title}</Card.Title>
                                   <Card.Text>{description}</Card.Text>
                            </Card.Body>
                     </Card>
              </a>
       );
}
 
export default NewsArticleEntry;