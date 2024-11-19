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
- Props passed down should be treated as immutable data structure and not changed within the function component it is passed to.
- React state introduces a mutable data structure, i.e. stateful values.
- When a state gets mutated, the component with the state and all child components will re-render.
- When an (event) handler is passed as props from a parent component to its child component, it becomes a callback handler.
- React props are always passed down the component tree and therefore functions that are passed down as callback handlers in props can be used to communicate up the component tree.
- Knowing where to instantiate state in React is important. State should always be there where all components which depend on the state can read (via props) and update (via callback handler) it