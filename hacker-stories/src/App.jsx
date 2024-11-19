const welcome = {
  greeting: 'Hey',
  title: 'React',
};

// const stories = [
//   {
//     title: 'React',
//     url: 'https://reactjs.org/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://redux.js.org/',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   },
//   {
//     title: 'BBob',
//     url: 'https://billybob.org/',
//     author: 'Billy Bob',
//     num_comments: 9,
//     points: 2,
//     objectID: 2,
//   },
//   {
//     title: 'Awesome',
//     url: 'https://superawesome.org/',
//     author: 'Super Awesome',
//     num_comments: 34,
//     points: 9,
//     objectID: 3,
//   },
// ];

const App = () => {

  const stories = [
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

  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}</h1>

      <Search />

      <hr />

      <List list={stories} />
    </div>
  );
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
      <input id="search" type="text" onChange={handleChange} />
    </div>
  )
}

const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = (props) => (
  <li>
    <span>
      <a href="{props.item.url}">{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
);

export default App
