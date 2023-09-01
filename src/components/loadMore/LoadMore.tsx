"use client"
import { useRouter } from "next/navigation"
import { CustomButton } from ".."
type Props = {
    startCursor: string
    endCursor: string
    hasNextPage: boolean
    hasPreviousPage: boolean
}
const LoadMore = ({ startCursor, endCursor, hasNextPage, hasPreviousPage }: Props) => {

    const router = useRouter()
    const handleNavigation = (direction: string) => {
        const currentParams = new URLSearchParams(window.location.search)

        if (direction === 'next' && hasNextPage) {
            currentParams.delete('startcursor')
            currentParams.set('endcursor', endCursor)
        } else if (direction === 'first' && hasPreviousPage) {
            currentParams.delete('endcursor')
            currentParams.set('startcursor', startCursor)
        }
        const newSearchParams = currentParams.toString()
        const newPathname = `${window.location.pathname}?${newSearchParams}`
        router.push(newPathname)
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