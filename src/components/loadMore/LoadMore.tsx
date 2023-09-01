"use client"
import { useRouter } from "next/navigation"
import { CustomButton } from ".."
type Props = {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
}
const LoadMore = ({startCursor, endCursor, hasNextPage, hasPreviousPage}: Props ) => {

    const router = useRouter()
    const handleNavigation = (direction: string) => {
const currentParams = new URLSearchParams(window.location.search)
    }
  return (
    <div className="w-full mt-10 flexCenter gap-5">
        {hasPreviousPage && (
            <CustomButton 
            title="First Page"
            handleClick={() => handleNavigation('first')}
            />
        )}
        {hasNextPage && (
            <CustomButton 
            title="Next Page"
            handleClick={() => handleNavigation('next')}
            />
        )}
    </div>
  )
}

export default LoadMore