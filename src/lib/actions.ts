import { createUserMutation, getUserQuery } from "@/graphql";
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