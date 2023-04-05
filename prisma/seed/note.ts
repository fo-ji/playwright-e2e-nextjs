import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const note = async () => {
  await prisma.note.createMany({
    data: Array(50)
      .fill('')
      .map((_, idx) => ({
        title: `Note ${idx + 1}`,
      })),
  });
};
