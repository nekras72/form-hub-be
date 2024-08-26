import express from "express";
import morgan from "morgan";
import db, { genId } from "./modules/db";

const seedDb = async () => {
    if (await db.submission.count() === 0) {
        await db.submission.createMany({
            data: [{
                id: genId(),
                submittedAt: new Date(),
                data: {
                    name: 'Ilia Nekrasov',
                    email: 'test@email.com'
                }
            }]
        });
    }
};

const app = express();
app.use(morgan('dev'));

seedDb();
app.get('/', async (req, res) => {
    const submissions = await db.submission.findMany();
    res.json(submissions);
});

const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
    console.log(`server is running at port ${port}`);
});