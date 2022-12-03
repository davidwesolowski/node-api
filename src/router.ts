import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/products';
import { createUpdate, deleteUpdate, getUpdate, getUpdates, updateUpdate } from './handlers/updates';
import { validateHandler } from './modules/middleware';

const router = Router();

router.get('/products', getProducts);

router.post('/products', body('name').isString(), validateHandler, createProduct);

router.get('/products/:id', getProduct);

router.put('/products/:id', body('name').exists().isString(), validateHandler, updateProduct);

router.delete('/products/:id', deleteProduct);



router.get('/products/:productId/updates', validateHandler, getUpdates);

router.post('/products/:productId/updates',
    body('title').exists().isString(),
    body('body').exists().isString(),
    validateHandler,
    createUpdate
);

router.get('/products/:productId/updates/:id', getUpdate);

router.put('/products/:productId/updates/:id',
    body('title').optional(),
    body('body').optional(),
    body('status').optional().isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECEATED']),
    body('version').optional(),
    validateHandler,
    updateUpdate
);

router.delete('/products/:productId/updates/:id', deleteUpdate);

router.get('/updatepoint', () => {});

router.post('/updatepoint',
    body('name').exists().isString(),
    body('description').exists().isString(),
    body('updateId').exists().isString(),
    validateHandler,
    () => {}
);

router.get('/updatepoint/:id', () => {});

router.put('/updatepoint/:id',
    body('name').optional().isString(),
    body('description').optional().isString(),
    validateHandler,
    () => {}
);

router.delete('/updatepoint/:id', () => {});

export default router;