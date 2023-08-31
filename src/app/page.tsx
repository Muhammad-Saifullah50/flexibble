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
        <p className="no-result-text text-center">No projects found, create some first</p>
      </section>
    )
  }
  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1> Categories </h1>

      <section className="projects-grid">

        {ProjectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}

          />
        ))}
      </section>

      <h1>LoadMore </h1>
    </section>
  )
}
export default Home
