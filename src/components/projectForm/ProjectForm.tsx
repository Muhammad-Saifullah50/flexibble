"use client"
import { SessionInterface } from "@/types/commonTypes"
import Image from "next/image"
import { ChangeEvent } from "react"
import { CustomButton, CustomMenu, FormField } from ".."
import { categoryFilters } from "@/constants"
import { useState } from "react"
import { createNewProject, fetchToken } from "@/lib/actions"
import { useRouter } from "next/navigation"

type Props = {
    type: string
    session: SessionInterface
}

const ProjectForm = ({ type, session }: Props) => {
    const router = useRouter();
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setisSubmitting(true)

        const { token } = await fetchToken()

        try {
            if (type === "create") {
                await createNewProject(form, session?.user?.id, token)
                router.push('/')
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setisSubmitting(false)
        }
    }


    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0]
        if (!file) return;

        if (!file.type.includes('image')) { // user uploads some other file
            return alert("Please upload an image file")
        }

        const reader = new FileReader

        reader.readAsDataURL(file)

        reader.onload = () => {
            const result = reader.result as string

            handleStateChange('image', result)
        }
    }


    const handleStateChange = (fieldName: string, value: string) => {
        setform((prevState) => ({
            ...prevState, [fieldName]: value
        }))
    }

    const [isSubmitting, setisSubmitting] = useState(false)
    const [form, setform] = useState({
        title: '',
        description: '',
        image: '',
        liveSiteUrl: '',
        githubUrl: '',
        category: ''
    })
    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form"
        >
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && 'Chooose a poster for your project'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type === 'create'}
                    className="form_image-input"
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20"
                        alt="poster"
                        fill
                    />
                )}
            </div>


            <FormField
                title="Title"
                state={form.title}
                placeholder="Flexibble"
                setState={(value) => handleStateChange('title', value)}
            />
            <FormField
                title="Description"
                state={form.description}
                placeholder="Discover the remarkable developer projects"
                setState={(value) => handleStateChange('description', value)}
            />
            <FormField
                type="url"
                title="Website URL"
                state={form.liveSiteUrl}
                placeholder="https://flexibble.com"
                setState={(value) => handleStateChange('liveSiteUrl', value)}
            />
            <FormField
                type="url"
                title="GitHub URL"
                state={form.githubUrl}
                placeholder="https://github.com/xxx"
                setState={(value) => handleStateChange('githubUrl', value)}
            />

            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}

            />
            <div className="flexStart w-full">
                <CustomButton
                    title={
                        isSubmitting
                            ? `${type === "create" ? "Creating" : "Editing"}`
                            : `${type === "create" ? "Create" : "Edit"}`
                    }
                    type='submit'
                    leftIcon={isSubmitting ? "" : '/plus.svg'}
                    isSubmitting={isSubmitting}
                />
            </div>
        </form>)
}

export default ProjectForm