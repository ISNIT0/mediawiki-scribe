import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { getClassesFromArticleName, getArticlesFromClass } from 'src/lib/wikidata';
import { getStructureFromArticles } from 'src/lib/articleStructure';
import { getNewsReferences, getCoreReferences, getBingResults } from 'src/lib/references';
import { translate } from 'src/lib/translate';

const router = Router();

router.get('/ruok',
    asyncHandler(async (req, res) => {
        res.send('IMOK');
    })
);

router.get('/classes/:articleName',
    asyncHandler(async (req, res) => {
        const classes = await getClassesFromArticleName(req.params.articleName);
        res.send(classes);
    })
);

router.get('/articleTemplate/:classId',
    asyncHandler(async (req, res) => {
        const articleIds = await getArticlesFromClass(req.params.classId);
        const bestStructure = await getStructureFromArticles(articleIds);
        res.send(bestStructure);
    })
);

router.get('/references/:articleName/:sectionName',
    asyncHandler(async (req, res) => {

        const sourceSearch = `${req.params.articleName} ${req.params.sectionName}`;

        const enSearch = await translate(sourceSearch, 'en');

        const [news, papers, search] = await Promise.all([
            getNewsReferences(enSearch),
            getCoreReferences(enSearch),
            getBingResults(sourceSearch),
        ]);

        res.send(news.concat(papers).concat(search));
    })
);

export {
    router
};