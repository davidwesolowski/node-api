import db from '../db';

export const getProducts = async (req, res) => {
    const user = await db.user.findUnique({
        where: {
            id: req.user.id,
        },
        include: {
            products: true // include robi joina
        }
    })

    res.json({ data: user.products });
}

export const getProduct = async (req, res) => {
    const productId = req.params.id;

    // const user = await db.user.findUnique({
    //     where: {
    //         id: req.user.id,
    //     },
    //     include: {
    //         products: true
    //     }
    // });

    // try {
    //     const product = await user.products.find((product) => product.id == productId);
    //     res.json({ data: product });

    // } catch (error) {
    //     res.status(404);
    //     res.json({ error: 'Not found' });
    // }

    const product = await db.product.findFirst({
        where: {
            id: productId,
            userId: req.user.id
        }
    });

    res.json({ data: product });
};

export const createProduct = async (req, res) => {
     const product = await db.product.create({
        data: {
            name: req.body.name,
            userId: req.user.id,
        }
     });

     res.json({ data: product });
};

export const updateProduct = async (req, res) => {
    const updated = await db.product.update({
        where: {
            // joined index - compound
            id_userId: {
                id: req.params.id,
                userId: req.body.id,
            }
        },
        data: {
            name: req.body.name,
        }
    });

    res.json({ data: updated })
};

export const deleteProduct = async (req, res) => {
    const deleted = await db.product.delete({
        where: {
            id_userId: {
                id: req.params.id,
                userId: req.user.id,
            }
        }
    });

    res.json({ data: deleted });
}