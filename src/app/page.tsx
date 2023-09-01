import { Categories, LoadMore, ProjectCard } from "@/components";
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
type SearchParams = {
  category?: string
  endcursor?: string 
}
type Props = {
  searchParams: SearchParams
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidate = 0
const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  // console.log(category)

  const data = await fetchAllProjects(category, endcursor) as ProjectSearch;

  const ProjectsToDisplay = data?.projectSearch?.edges || []

  if (ProjectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings mb-16">
        <Categories />
        <p className="no-result-text text-center font-semibold text-lg">Oops! No projects found ... </p>
      </section>
    )
  }
  const pagination = data?.projectSearch?.pageInfo

  return (
    <section className="flex-start flex-col paddings mb-16">

      <Categories />

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

      <LoadMore
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasPreviousPage={pagination?.hasPreviousPage}
        hasNextPage={pagination?.hasNextPage}
      />

    </section>
  )
}
export default Home
