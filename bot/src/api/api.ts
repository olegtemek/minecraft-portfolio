import axios from "axios";
import { IStack } from "../interfaces/IStack";
import { IProject } from "../interfaces/IProject";

export class Api {
  async findAllStacks(): Promise<IStack[]> {
    const fetch = await axios.get(`${process.env.API_URL}/stack`);
    const stacks: IStack[] = fetch.data.stacks;
    return stacks;
  }

  async findAllProjects(): Promise<IProject[]> {
    const fetch = await axios.get(`${process.env.API_URL}/project`);
    const projects: IProject[] = fetch.data.projects;
    return projects;
  }

  async findProjectBySlug(slug: string): Promise<IProject | null> {
    const fetch = await axios.get(
      `${process.env.API_URL}/project/project/${slug}`
    );
    const project: IProject = fetch.data.project;
    return project;
  }
}
