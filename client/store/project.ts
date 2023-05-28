import { IProject } from "~/types/IProject";

export const useProjectStore = defineStore("project", {
  // arrow function recommended for full type inference
  state: (): { projects: IProject[]; project: IProject | undefined } => ({
    projects: [],
    project: undefined,
  }),

  actions: {
    async fetchAll() {
      const projects: { projects: IProject[] } = await useApi().fetch(
        "GET",
        "/project"
      );
      this.projects = projects.projects;
    },

    async create(data: IProject) {
      const project: IProject = await useApi().fetch("POST", "/project", data);
      if (project.message) {
        useAlert(project.message);
        return navigateTo("/admin/projects");
      }
    },
    async update(data: IProject, id: number) {
      const project: IProject = await useApi().fetch(
        "PATCH",
        `/project/${id}`,
        data
      );
      if (project.message) {
        useAlert(project.message);
        return navigateTo("/admin/projects");
      }
    },
    async destroy(id: number) {
      const project: IProject = await useApi().fetch(
        "DELETE",
        `/project/${id}`
      );
      if (project.message) {
        useAlert(project.message);
        this.fetchAll();
        return navigateTo("/admin/projects");
      }
    },

    async fetchOne(id: number) {
      const project: { project: IProject } = await useApi().fetch(
        "GET",
        `/project/${id}`
      );
      this.project = project.project;
    },
    async fetchOneBySlug(slug: string) {
      const project: { project: IProject } = await useApi().fetch(
        "GET",
        `/project/project/${slug}`
      );

      this.project = project.project;
    },
  },
  getters: {
    getProjects({ projects }) {
      return projects;
    },
    getProject({ project }) {
      return project;
    },
  },
});
