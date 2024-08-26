import { PrismaClient } from "@prisma/client";
import { nanoid } from 'nanoid'

const db = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
});
export default db;

export const genId = () => nanoid(16)
// temp, remove after deploy
const seedDb = async () => {
    if ((await db.submission.findMany()).length === 0) {
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
seedDb();
// end
