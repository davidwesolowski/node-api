import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await prisma.user.create({
            data: {
                username,
                password: await hashPassword(password),
            }
        });
    
        const token = createJWT({ id: user.id, username: user.username });
    
        res.json({ token });
    } catch (error) {
        error.type = 'input';
        next(error);
    }
}

export const signIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if (!user) {
        res.status(404);
        res.json({ message: 'Not found' });
        return
    }

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
        res.status(404);
        res.json({ message: 'Not found' });
        return
    }

    const token = createJWT({ id: user.id, username: user.username });

    res.status(200);
    res.json({ token });
}