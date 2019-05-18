import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { getClassesFromArticleName, getArticlesFromClass } from 'src/lib/wikidata';
import { getStructureFromArticles } from 'src/lib/articleStructure';
import { getNewsReferences, getCoreReferences } from 'src/lib/references';

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
        const [news, papers] = await Promise.all([
            getNewsReferences(`${req.params.articleName} ${req.params.sectionName}`),
            getCoreReferences(`${req.params.articleName} ${req.params.sectionName}`)
        ]);

        res.send(news.concat(papers));
    })
);

export {
    router
};