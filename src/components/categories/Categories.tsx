"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { categoryFilters } from "@/constants"
const Categories = () => {

    const router = useRouter(); //allows you to programmatically change routes inside Client Components.
    const pathName = usePathname() // lets you read the current URL's pathname. (poora path le aaye ga)
    const searchParams = useSearchParams(); // you read the current URL's query string (value).

    const category = searchParams.get('category')
    const handleTags = (filter: string) => {
        router.push(`${pathName}?category=${filter}`)
    }
    return (
        <div className="flexBetween w-full gap-5 flex-wrap">
            <ul className="flex gap-2 overflow-auto">
                {categoryFilters.map((filter) => (
                    <button
                        key={filter}
                        type="button"
                        onClick={() => handleTags(filter)}
                        className={`${category === filter ? 'bg-light-white-300 font-medium' : 'font-normal'
                            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
                    >
                        {filter}
                    </button>
                ))}
            </ul>
        </div>
    )
}

export default Categories