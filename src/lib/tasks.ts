import prisma from './prisma';
import type { UpdateTaskInput, CreateTaskInput, TaskId } from '@/schema/task';

export async function getTasks(userId: string) {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
    return { tasks };
  } catch (error) {
    return { error };
  }
}

export async function createTask(task: CreateTaskInput, userId: string) {
  try {
    const createdTask = await prisma.task.create({
      data: {
        ...task,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return { task: createdTask };
  } catch (error) {
    return { error };
  }
}

export async function getTaskById({ taskId }: TaskId) {
  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });
    return { task };
  } catch (error) {
    return { error };
  }
}

export async function deleteTask({ taskId }: TaskId) {
  try {
    const task = await prisma.task.delete({
      where: { id: taskId },
    });
    return { task };
  } catch (error) {
    return { error };
  }
}

export async function updateTask(task: UpdateTaskInput, { taskId }: TaskId) {
  try {
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { ...task },
    });
    return { task: updatedTask };
  } catch (error) {
    return { error };
  }
}
