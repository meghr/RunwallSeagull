
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function checkNotices() {
    const notices = await prisma.notice.findMany({
        select: {
            title: true,
            noticeType: true,
            published: true,
            visibility: true
        }
    });
    console.log('Total notices:', notices.length);
    console.log('Notices:', JSON.stringify(notices, null, 2));

    const urgentNotices = notices.filter(n => n.noticeType === 'URGENT');
    console.log('Urgent notices:', urgentNotices.length);
}

checkNotices()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
