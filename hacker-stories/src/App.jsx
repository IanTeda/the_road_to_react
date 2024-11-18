const welcome = {
  greeting: 'Hey',
  title: 'React',
};

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'BBob',
    url: 'https://billybob.org/',
    author: 'Billy Bob',
    num_comments: 9,
    points: 2,
    objectID: 2,
  },
  {
    title: 'Awesome',
    url: 'https://superawesome.org/',
    author: 'Super Awesome',
    num_comments: 34,
    points: 9,
    objectID: 3,
  },
];

const App = () => {
  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}</h1>

      <Search />

      <hr />

      <List />

      <hr />

      <List />
    </div>
  );
}

const List = () => {
  return (
    <ul>
      {list.map((item) => {
        return (
          <li key={item.objectID}>
            <span>
              <a href="{item.url}">{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
        )
      })}
    </ul>
  )
}

const Search = () => {
  // Perform task here

  const handleChange = (event) => {
    // Synthetic event
    console.log(event)

    // Value of target (here input HTML element)
    console.log(event.target.value)
  }

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange}/>
    </div>
  )
}

export default App
