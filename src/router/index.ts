import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';
import { getClassesFromArticleName, getArticlesFromClass } from 'src/lib/wikidata';
import { getStructureFromArticles } from 'src/lib/articleStructure';

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


export {
    router
};