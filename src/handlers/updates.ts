import db from '../db';

export const getUpdates = async (req, res) => {
    const updates = await db.product.findUnique({
        where: {
            id_userId: {
                id: req.params.productId,
                userId: req.user.id,
            }
        },
        select: {
            updates: true
        }
    })

    res.json({ data: updates });
};

export const getUpdate = async (req, res) => {
    const update = await db.product.findUnique({
        where: {
            id_userId: {
                id: req.params.productId,
                userId: req.user.id,
            },
        },
        select: {
            updates: {
                where: {
                    id: req.params.id
                }
            }
        }
    })

    res.json({ data: update });
}

export const createUpdate = async (req, res) => {

    // nie zwraca nowego updatea
    // const update = await db.product.update({
    //     where: {
    //         id_userId: {
    //             id: req.params.productId,
    //             userId: req.user.id,
    //         },
    //     },
    //     data: {
    //         updates: {
    //             create: {
    //                 title: req.body.title,
    //                 body: req.body.body
    //             },
    //         }
    //     }
    // });

    // nie sprawdza czy podany product nalezy do uzytkownika, by trzeba bylo zrobic dwa zapytania
    const product = await db.product.findUnique({
        where: {
            id_userId: {
                id: req.params.productId,
                userId: req.user.id,
            }
        }
    });

    if (!product) {
        res.status(400);
        res.json({ message: 'nope' });
        return;
    }

    const update = await db.update.create({
        data: {
            ...req.body,
            productId: req.params.productId,
        }
    });

    res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
    // nie zwraca aktualnego
    // const updates = await db.product.update({
    //     where: {
    //         id_userId: {
    //             id: req.params.productId,
    //             userId: req.user.id
    //         }
    //     },
    //     data: {
    //         updates: {
    //             update: {
    //                 where: {
    //                     id: req.params.id,
    //                 },
    //                 data: req.body
    //             }
    //         }
    //     }
    // });

    const product = await db.product.findUnique({
        where: {
            id_userId: {
                id: req.params.productId,
                userId: req.user.id,
            }
        }
    });

    if (!product) {
        res.status(400);
        res.json({ message: 'nope' });
        return;
    }

    const update = await db.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    })

    res.json({ data: update });
};

export const deleteUpdate = async (req, res) => {
    // nie zwraca usunietego
    // const update = await db.product.update({
    //     where: {
    //         id_userId: {
    //             id: req.params.productId,
    //             userId: req.user.id,
    //         },
    //     },
    //     data: {
    //         updates: {
    //             delete: {
    //                 id: req.params.id
    //             }
    //         }
    //     }
    // });

    const product = await db.product.findUnique({
        where: {
            id_userId: {
                id: req.params.productId,
                userId: req.user.id,
            }
        }
    });

    if (!product) {
        res.status(400);
        res.json({ message: 'nope' });
        return;
    }

    const update = await db.update.delete({
        where: {
            id: req.params.id,
        }
    })

    res.json({ data: update });
};