# Meet the React Component

- Create Vite React project with typescript `npm create vite@latest hacker_stories_typescript -- --template react-ts`
- As a rule of thumb: If a variable does not need anything from within the function component’s body (e.g. parameters), then define it outside of the component which avoids re-defining it on every function call.
- Since JSX is closer to JavaScript than to HTML, React uses the camelCase naming convention. Which HTML does not.
- A React app has a component hierarch (or tree), with one root component which is typically `App`. A component can have zero, one or many child components.
- React components, also known as function components.
- Often block bodies will be necessary to introduce more business logic between function signature and return statement.
- React’s synthetic event is essentially a wrapper around the browser’s native event.
- In native HTML submitting a form triggers a page refresh. However, in React this page refresh should be prevented, because the developer should take care about what happens next.
- Always pass functions to these JSX event handlers, not the return value of the function.