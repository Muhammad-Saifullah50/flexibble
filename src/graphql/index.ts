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
        linkedinUrl

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
// this mutation will create project
export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) { 
		projectCreate(input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;


export const projectsQuery = `
  query getProjects($categories: [String!], $endCursor: String) {
    projectSearch(first: 8, after: $endCursor, filter: {category: {in: $categories}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteUrl
      githubUrl
      category
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;


export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedinUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;