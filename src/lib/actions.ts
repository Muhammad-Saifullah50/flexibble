import { categoryFilters } from "@/constants";
import { createProjectMutation, createUserMutation, getProjectByIdQuery, getUserQuery, projectsQuery } from "@/graphql";
import { ProjectForm } from "@/types/commonTypes";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === 'production'; // prod environment

const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || "" : 'http://127.0.0.1:4000/graphql' // api url in both dev and prod

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "" : "letmein" // api key in both dev and prod     dummy on local

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000' // sever url on local and prod

const client = new GraphQLClient(apiUrl)
// console.log(client)

const makeGraphQLRequest = async (query: string, variables = {}) => { //making request
    try {
        return await client.request(query, variables)
    } catch (error) {
        throw error
    }
}
// get user from database
export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey) // settign api key in header
    return makeGraphQLRequest(getUserQuery, { email })
}

// create a user in the database
export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey)
    const variables = {
        input: {
            name, email, avatarUrl
        }
    }

    return makeGraphQLRequest(createUserMutation, variables)

}

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`); // next auth by default publishes our tokens here 
        return response.json();
    } catch (error) {
        throw error
    }
}

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({ path: imagePath })
        })
        return response.json()
    } catch (error) {
        throw error
    }
}

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image)

    if (imageUrl.url) {
        client.setHeader("Authorization", `Bearer ${token}`)

        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
                // spreading the data coming from form, appending the url and tghe creator id
            }
        }


        return makeGraphQLRequest(createProjectMutation, variables)
    }
}

export const fetchAllProjects = async (category?: string | null, endcursor?: string | null) => {
    client.setHeader('x-api-key', apiKey) // settign api key in header

    const categories = category == null ? categoryFilters : [category];
    // show all projects when category is not provided i.e null
    return makeGraphQLRequest(projectsQuery, { categories, endcursor })
}

export const getProjectDetails = (id: string) => {
    client.setHeader('x-api-key', apiKey) // settign api key in header
    return makeGraphQLRequest(getProjectByIdQuery, { id })
}