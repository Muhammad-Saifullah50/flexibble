import { getUserProjects } from "@/lib/actions"
import { ProjectInterface, UserProfile } from "@/types/commonTypes"
import Image from "next/image"
import Link from "next/link"
import { ProjectCard } from ".."

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
                <Link
                    href={`/profile/${result?.user?.id}`}
                    className="text-primary-purple text-base"
                >
                    View All
                </Link>
            </div>

            <div className="related_projects-grid">
                {filteredProjects?.map(({ node }: { node: ProjectInterface }) => (
                    <div className="flexCenter related_project-card drop-shadow-card" key={node?.id}>
                    <Link href={`/project/${node?.id}`} className="flexCenter group relative w-full h-[80%]">
                        <Image src={node?.image} width={414} height={314} className="w-full h-full object-fill rounded-2xl" alt="project image" />
        
                        <div className="hidden group-hover:flex related_project-card_title">
                            <p className="w-full">{node?.title}</p>
                        </div>
                    </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default RelatedProjects