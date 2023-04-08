import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const reset = async () => {
  await prisma.task.deleteMany();
  await prisma.note.deleteMany();
  await prisma.user.deleteMany();
};
