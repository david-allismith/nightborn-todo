# Theoretical Knowledge Assessment

## Database & ORM Questions

### Q1. Database Choice Explain the difference between SQL and NoSQL databases. In what scenarios would you choose one over the other? Give a concrete example for each.

Answer: SQL is mainly used for structured data with clear relationships. 
For example, a list of employee records (Employee No, Name, Department) where data consistency is important. 
Examples include: PostgreSQL and MySQL.

NoSQL, on the other hand, is suited for unstructured or semi-structured data, 
like JSON documents or social media content where the structure may vary, some post may have images, others videos. 
It works best in scenarios where flexibility and scalability are more important than strict structure.
**Examples include**:  Redis cache for quick key-value pair, preferrably for things like cart list in an ecommerce website.
Neo4J for social media relationship. 
MongoDb for non-relational documents

### Q2. ORM Understanding What is an ORM (Object-Relational Mapping)? What are the main advantages and potential drawbacks of using an ORM like Prisma or TypeORM in a Node.js application?

Answer: ORM are useful for bridging the gap between relational databases and object-oriented code by allowing you to interact with your relational database using objects in your code. 
A user table in the database can be represented as a user class in the backend.
The main benefits are faster development and easier handling of the database. One drawback is that for very complex queries, you might still have to drop down to raw SQL.

### Q3. Database Relations In the context of our TODO application, imagine we want to add "Categories" where each TODO belongs to one category, but each category can have multiple TODOs. What type of database relationship is this? How would you structure this in a relational database?

This is a relational database setup with a one-to-many relationship.
We would have a Category table containing category_id and category_name. Then, in the TODO table, we would include category_id as a foreign key to link each TODO to its category.

## API Design Questions

### Q4. RESTful Principles, Explain what makes an API "RESTful". What are the key principles of REST architecture? In our TODO API, why did we use different HTTP methods (GET, POST, PUT, DELETE)?

A RESTful API follows the REST (Representational State Transfer) principles, which are a set of rules for designing web APIs that are simple, scalable, and stateless.
it treats resources (like TODOs, users, or categories) as entities that can be created, read, updated, or deleted through standard HTTP methods.

We use different HTTP methods to match the action we want to perform on our resources:

GET /todos → fetch a list of TODOs
POST /todos → create a new TODO
PUT /todos/:id → update an existing TODO
DELETE /todos/:id → remove a TODO

### Q5. API Status Codes For each of the following scenarios, what HTTP status code would you return and why?

Successfully creating a new TODO: (201 Created) which is the HTTP code for when a resource is created

Requesting a TODO that doesn't exist : (404 Not found) When a resource cant be found

Trying to update a TODO with invalid data: (400 Bad request) request is malformed or fails validation (e.g., missing required fields, wrong data type).

Server encounters an unexpected error: (500 Internal Server Error) Something went wrong on the server side

### Q6. API Versioning Why is API versioning important? Describe at least two different approaches to versioning an API (e.g., /api/v1/todos vs /api/todos).

API versioning ensures that changes or improvements in the API don’t break existing clients. Without versioning, updating endpoints, changing data formats, or adding new features could break apps that rely on the old behavior.

URI versioning – Includes the version number in the URL.
Example: /api/v1/todos ( This is mostly used by services that expose apis to the public e.g Twitter (x), it is easy to understand

Header versioning – Specify the version in request headers.
Example: Accept: application/vnd.example.v1+json (Allows more flexibility in how the API evolves without changing the endpoint structure.)

## Frontend Concepts

### Q7. State Management Explain the difference between local component state (useState), global state management (Context API, Redux), and server state management (React Query). When would you use each?

**Local component state (useState)**
Stores data inside a single component.
Ideal for UI-related state that doesn’t need to be shared, like form inputs, toggles, or dropdown visibility.
Example: const [completed, setCompleted] = useState(initial.completed || false);

**Global state management (Context API, Redux)**

Stores data that needs to be shared across multiple components.
Useful for things like user authentication, theme settings, or a shopping cart.
Example: Redux can hold the logged-in user info so any component can access it without prop-drilling.
Prop-drilling is basically passes props across several components till it gets to where is needed which can be suboptimal if alot.

**Server state management (React Query)**

Stores and manages data fetched from a server.
Handles caching, background updates, retries, and synchronization automatically.

### Q8. React Query Benefits Why did we choose React Query for this exercise instead of using regular fetch calls with useEffect? List at least 3 specific benefits.

React Query handles a lot of repetitive and tricky tasks automatically.
**Caching and automatic updates** – Fetched data is cached, and React Query automatically updates the UI when data changes, reducing unnecessary network calls.
**Background fetching & stale data management** – It can refetch data in the background to keep it fresh without manual coding.
**Built-in error and loading state handling** – Makes it easy to show loading spinners, error messages, and retry failed requests without extra code.

### Q9. Component Design What is the difference between a "controlled" and "uncontrolled" component in React? Which approach did you use for your TODO form and why?

A controlled component is a form element (like <input>, <textarea>, <select>) whose value is controlled by React state. Every change in the input triggers a state update.

An uncontrolled component relies on the DOM to manage its own state. You access the value using a ref when needed.

I used controlled because I want real-time validation (e.g., no empty title).
This ensures the UI always reflects the state, and the state always reflects the UI.
Keeps the component state consistent and predictable, which is important when the app grows.

## Server-Side vs Client-Side Rendering

### Q10. SSR vs CSR Explain the difference between Server-Side Rendering (SSR) and Client-Side Rendering (CSR). What are the advantages and disadvantages of each approach?

**Server-Side Rendering (SSR)**

The server generates the full HTML for a page and sends it to the client.

**Advantages:**
Faster initial load and better SEO because the content is already in the HTML.
Good for pages where content changes less frequently.

**Disadvantages:**
More load on the server.

**Client-Side Rendering (CSR)**

The browser downloads a minimal HTML page and builds the UI using JavaScript (e.g., React).

**Advantages:**
Smooth, interactive experiences once the app is loaded.
Reduces server load since most work happens in the browser.

**Disadvantages:**
Slower initial load.
Poor SEO if content is rendered entirely on the client.

### Q11. Next.js Rendering In Next.js App Router, what is the difference between a Server Component and a Client Component? When would you use 'use client' directive and why?

**Server Components**

Rendered on the server by default.
Can fetch data directly from the database or backend without exposing secrets to the client.
Don’t include client-side JavaScript by default, which makes them lightweight.

**Client Components**

Rendered in the browser and can use client-side features like state (useState), effects (useEffect), or event handlers.
Use case: Interactive elements like forms, modals, or dynamic buttons.

We use "use client" at the top of a file to tell nextjs this is a client component, 
if this component is used in the app folder which are the server components, client-side browser features won't work without this.

### Q12. Hydration What is "hydration" in the context of React and Next.js? Why is it important for SSR applications?

Hydration is when React takes the server-rendered HTML and makes it interactive by attaching event listeners and state on the client. 
It’s important for SSR because, without it, the page would look fine but wouldn’t respond to user actions.

## Performance & Best Practices

### Q13. Code Splitting What is code splitting and why is it important for web application performance? How does Next.js handle code splitting automatically?

Code splitting is the process of breaking your JavaScript bundle into smaller chunks which makes apps faster by loading only what’s needed, 
and Next.js does most of it automatically by separating code per page, Each page only loads its own JavaScript bundle when requested.

### Q14. TypeScript Benefits You were required to use TypeScript for this exercise. Explain 3 specific benefits TypeScript provides compared to plain JavaScript, especially in a team environment.

**Type Safety** – TypeScript catches type errors at compile time, reducing bugs before the code runs. For example, if you pass a string instead of a number to a function it would be flagged immediately.

**Better Developer Experience** – With types, IDEs can provide autocomplete, code suggestions, and inline documentation, making it easier to understand and navigate large codebases.

**Improved Team Collaboration** – Types serve as self-documenting contracts between developers. Everyone knows what shape data should have, which reduces misunderstandings and errors when multiple people work on the same project.

### Q15. Security Considerations Imagine our TODO API is now public and accessed by a web frontend. What are 3 security concerns you would need to address? (Think about authentication, data validation, CORS, etc.)

**Authentication & Authorization** – Ensure only authorized users can access or modify their own TODOs. Without this, anyone could read or delete other users’ data. Do this by checking roles and permission, also verifying logged in user with each api call to ensure that is the resource owner

**Input Validation & Sanitization** – Validate all incoming data to prevent attacks like SQL injection or sending malformed data that could break the API.

**CORS (Cross-Origin Resource Sharing)** – Properly configure CORS so that only trusted frontend client domains can access the API, preventing unauthorized clients from making requests.