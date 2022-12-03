import { validationResult } from 'express-validator'

export const validateHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });

        return;
    }

    next(); 
}