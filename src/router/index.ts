import { Router } from 'express';
import * as asyncHandler from 'express-async-handler';

const router = Router();

router.get('/ruok',
    asyncHandler(async (req, res) => {
        res.send('IMOK');
    })
);

export {
    router
};