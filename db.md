# Post

- collections: posts
- Add new post
- id
- title
- slug
- image
- hot(boolean: true | false)
- createdAt
- status: 1(approved) 2(pending) 3(reject)
- content
- userId
- categoryId

# Category

- id
- name
- slug
- status: 1(approved) 2(unapproved)
- createdAt

# User

- id
- displayName
- email
- password
- avatar
- status: 1(active) 2(pending) 3(ban)
- roles: 1(admin) 2(mod) 3(user)
- permissions: 'ADD_POST'
- createdAt
