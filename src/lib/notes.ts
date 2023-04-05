import prisma from './prisma';

export const getNotes = async () => {
  try {
    const notes = await prisma.note.findMany();
    return { notes };
  } catch (error: any) {
    return { error };
  }
};
