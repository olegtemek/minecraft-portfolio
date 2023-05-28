import { PrismaClient, Project, Stack } from "@prisma/client";
const prisma = new PrismaClient();

export class PrismaRepository {
  async findAllStacks(): Promise<Stack[]> {
    const stacks: Stack[] = await prisma.stack.findMany();
    return stacks;
  }

  async findAllProjects(): Promise<Project[]> {
    const projects: Project[] = await prisma.project.findMany();
    return projects;
  }

  async findProjectBySlug(slug: string): Promise<Project | null> {
    const project: Project | null = await prisma.project.findFirst({
      where: {
        slug: slug,
      },
    });
    return project;
  }
}
