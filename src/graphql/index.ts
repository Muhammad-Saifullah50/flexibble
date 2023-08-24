// this is the file where we make our graphql queries

export const getUserQuery = `  
query GetUser($email: String!) { 
    user(by: {email: $email}) {
        id
        name
        email
        avatarUrl
        description
        githubUrl
        linkedInUrl

    }
}
`
// query is operation type
//GetUser is operation name
// $email: String! is a variable declared with type of string and required
// user(by: {email: $email}) this retrieves a user filed, with a parametrer 'by' which is an object contaiing the email
// retrieving other properties from the graphbase server



// using backtics to write in multiple lines

export const createUserMutation = `
mutation CreateUser($input: UserCreateInput!){
    userCreate(input: $input) {
        user{
            name
            email
            avatarUrl
            description
            githubUrl
            linkedInUrl
            id
        }
    }
}
`

// query and mutation are reserved keywords for graphql

