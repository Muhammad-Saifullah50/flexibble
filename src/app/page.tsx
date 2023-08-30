import { ProjectCard } from "@/components";
import { fetchAllProjects } from "@/lib/actions"
import { ProjectInterface } from "@/types/commonTypes"

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string
    }
  }
}

const Home = async () => {
  const data = await fetchAllProjects() as ProjectSearch;
  // console.log(data, 'data');

  const ProjectsToDisplay = data?.projectSearch?.edges || []

  if (ProjectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings mb-16">
        Categories
        <section className="projects-grid">
          {ProjectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
            <ProjectCard />
          ))}
        </section>


        <p className="no-result-text text-center">No projects found, create some first</p>
      </section>
    )
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1> Categories </h1>
      <h1> Posts </h1>
      <h1>LoadMore </h1>
    </section>
  )
}
export default Home
