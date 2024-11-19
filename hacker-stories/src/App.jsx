import * as React from 'react';

const welcome = {
  greeting: 'Hey',
  title: 'React',
};

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

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    // console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const searchedStores = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}</h1>

      <Search onSearch={handleSearch} />

      <hr />

      <List list={searchedStores} />
    </div>
  );
}

const Search = (props) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" onChange={props.onSearch} />

    <p>
      Searching for <strong>{props.searchTerm}</strong>
    </p>
  </div>
)

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
