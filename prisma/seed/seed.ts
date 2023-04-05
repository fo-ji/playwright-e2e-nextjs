import { PrismaClient } from '@prisma/client';
import { reset } from './reset';
import { note } from './note';

const prisma = new PrismaClient();

async function main() {
  await reset();
  await note();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
