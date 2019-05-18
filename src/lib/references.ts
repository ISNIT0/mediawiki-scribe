import { getJSON } from "./http";
import { config } from "src/config";

export async function getNewsReferences(query: string) {
    const newsReferences = await getJSON<any>(`https://newsapi.org/v2/everything?q=${query}&apiKey=${config.newsapi.key}`);
    return newsReferences.articles.slice(0, 3);
}

export async function getCoreReferences(query: string) {
    const coreReferences = await getJSON<any>(`https://core.ac.uk:443/api-v2/search/${query}?page=1&pageSize=10&apiKey=${config.core.key}`);
    const referencesDetail = await Promise.all(
        coreReferences.data.slice(0, 3).map((r: any) => {
            return getJSON<any>(`https://core.ac.uk:443/api-v2/articles/get/${r._id}?metadata=true&urls=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=${config.core.key}`)
                .then(a => a.data);
        })
    );
    return referencesDetail;
}