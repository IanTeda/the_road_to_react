# Meet the React Component

- Create Vite React project with typescript `npm create vite@latest hacker_stories_typescript -- --template react-ts`
- As a rule of thumb: If a variable does not need anything from within the function component’s body (e.g. parameters), then define it outside of the component which avoids re-defining it on every function call.
- Since JSX is closer to JavaScript than to HTML, React uses the camelCase naming convention. Which HTML does not.
- A React app has a component hierarch (or tree), with one root component which is typically `App`. A component can have zero, one or many child components.