import NewsArticleGrid from "@/components/NewsArticleGrid";
import { NewsArticle } from "@/models/NewsArticle";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";

const SearchNews = () => {
        const [searchResults, setSearchResults ] = useState<NewsArticle[] | null>(null);
        const [isLoading, setIsLoading] = useState(false);
        const [searchError, setSearchError] = useState(false);

        async function handlingSearch(e: FormEvent<HTMLFormElement>) {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const search = formData.get("search")?.toString().trim();
                if(search){
                        try {
                                setSearchResults(null);
                                setSearchError(false);
                                setIsLoading(true);
                                const response = await fetch("/api/search-news?q=" + search);
                                const articles: NewsArticle[] = await response.json();
                                setSearchResults(articles);
                        } catch (error) {
                                console.log(error);
                                setSearchError(true);
                        }finally {
                                setIsLoading(false);
                        }
                }
        }

        return ( 
                <>
                <Head>
                        <title key="title">Search News</title>
                </Head>
                <main>
                        <h1>Search News</h1>
                        <Form className="mb-3" onSubmit={handlingSearch}>
                                <Form.Group className="mb-3" controlId="search-input">
                                        <Form.Label>Search</Form.Label>
                                        <Form.Control 
                                                name="search"
                                                placeholder="E.g. politics, sports, ...."
                                        />
                                </Form.Group>
                                <Button type="submit" className="mb-3" disabled={isLoading}>Search</Button>
                        </Form>
                        <div className="d-flex flex-column align-items-center">
                                {isLoading && <Spinner animation="border"/>}
                                {searchError && <h3>Something went wrong try again.</h3>}
                                {searchResults?.length === 0 && <p>Can not find anything try again.</p> }
                                {searchResults && <NewsArticleGrid article={searchResults} />}
                        </div>
                </main>
                </>
        );
}
 
export default SearchNews;