import { ProfilePage } from "@/components"
import { getUserProjects } from "@/lib/actions"
import { UserProfile } from "@/types/commonTypes"
type Props = {
    params: { id: string }
}
const UserProfilePage = async ({ params }: Props) => {
const result = await getUserProjects(params?.id , 100) as {user: UserProfile}

if(!result.user) {
    <p className="no-result-text">Failed to fetch user info</p>
}
    return (
       <ProfilePage user={result?.user}/>
    )
}

export default UserProfilePage