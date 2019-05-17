import * as wdk from 'wikidata-sdk';
import { InstanceType, ArticleSummary } from "src/typings/types";
import { getJSON } from './http';

export async function getClassesFromArticleName(articleTitle: string) {
    const entitiesUrl = await wdk.searchEntities(
        articleTitle,
        'cs',
        10,
        'json'
    );
    const entities = await getJSON<any>(entitiesUrl);

    const firstItemId = entities.search[0].id;

    const classesQueryUrl = wdk.sparqlQuery(`
	SELECT ?item ?itemLabel 
		WHERE 
		{
		  wd:${firstItemId} wdt:P31 ?item.
		  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
		}
    `);
    const classes = await getJSON<any[]>(classesQueryUrl).then(wdk.simplify.sparqlResults as any);
    return classes.map((c) => {
        return {
            id: c.item.value,
            label: c.item.label
        };
    });
}

export async function getArticlesFromClass(classId: string) {
    const url = wdk.sparqlQuery(`
    SELECT ?article 
        WHERE 
        {
          ?item wdt:P31 wd:${classId} .
          ?article schema:about ?item;
                   schema:isPartOf <https://cs.wikipedia.org/> .
          SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    } LIMIT 500
`);
    const articles = await getJSON<any[]>(url).then(wdk.simplify.sparqlResults as any);
    return articles.map(({ article }) => article.split('/wiki/')[1]);
}