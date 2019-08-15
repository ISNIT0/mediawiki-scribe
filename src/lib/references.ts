import { getJSON } from './http';
import { config } from 'src/config';

export async function getNewsReferences(query: string) {
    const newsReferences = await getJSON<any>(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${config.newsapi.key}`);
    return newsReferences.articles.slice(0, 3).map(({ title, url }: any) => ({ title, url, type: 'news' }));
}

export async function getCoreReferences(query: string) {
    const coreReferences = await getJSON<any>(`https://core.ac.uk:443/api-v2/search/${encodeURIComponent(query)}?page=1&pageSize=10&apiKey=${config.core.key}`);
    const referencesDetail = await Promise.all(
        coreReferences.data.slice(0, 2).map((r: any) => {
            return getJSON<any>(`https://core.ac.uk:443/api-v2/articles/get/${r._id}?metadata=true&urls=true&fulltext=false&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=${config.core.key}`)
                .then((a) => a.data);
        }),
    );
    return referencesDetail.filter((a: any) => a.downloadUrl).map(({ title, downloadUrl }) => ({ title, url: downloadUrl, type: 'paper' }));
}

export async function getBingResults(query: string) {
    const results = await getJSON<any>(`https://api.cognitive.microsoft.com/bing/v7.0/search?q=${encodeURIComponent(`${query} NOT site:wikipedia.org`)}&count=3`, { 'Ocp-Apim-Subscription-Key': config.azure.searchKey });
    return ((results.webPages || {}).value || []).map((page: any) => {
        return {
            title: page.name,
            url: page.url,
            type: 'search',
        };
    });
}
