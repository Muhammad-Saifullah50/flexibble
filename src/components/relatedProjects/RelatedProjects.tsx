import { getUserProjects } from "@/lib/actions"
import { ProjectInterface, UserProfile } from "@/types/commonTypes"

type Props = {
    userId: string
    projectId: string
}
const RelatedProjects = async ({ userId, projectId }: Props) => {

    const result = await getUserProjects(userId) as { user?: UserProfile };

    const filteredProjects = result?.user?.projects?.edges?.filter(({ node }: { node: ProjectInterface }) => (node?.id !== projectId))

    if (filteredProjects?.length === 0) return null
    return (
        <section className="flex flex-col mt-32 w-full">
            <div className="flexBetween">
                <p className="text-base font-bold">More by {result?.user?.name}</p>
            </div>
        </section>
    )
}

export default RelatedProjects