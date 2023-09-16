# Post

- collections: posts
- Add new post
- id
- title
- slug
- image
- createdAt
- status: 1(approved) 2(pending) 3(reject)
- content
- userId
- categoryId

# Category

- id
- title
- slug
- status: 1(approved) 2(pending)
- createdAt

# User

- id
- displayName
- email
- password
- status: 1(active) 2(pending) 3(ban)
- roles: 1(admin) 2(mod) 3(user)
- permissions: 'ADD_POST'
- createdAt
