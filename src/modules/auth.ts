import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 8);
}

export const createJWT = (user: { username: string, id: string }) => {
    const { id, username } = user;

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET);

    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.json({ message: 'not authorized' });
        return;
    }

    const [, token] = bearer.split(' ');

    if (!token) {
        res.status(401);
        res.json({ message: 'not authorized' });
        return;
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        
        res.status(401);
        res.json({ message: 'not authorized' });
        return;
    }
}