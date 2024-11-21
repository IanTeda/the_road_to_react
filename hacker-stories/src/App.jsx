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

  const [searchTerm, setSearchTerm] = React.useState('React');

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

      <Search search={searchTerm} onSearch={handleSearch} />

      <hr />

      <List list={searchedStores} />
    </div>
  );
}

const Search = ({ search, onSearch, searchTerm }) => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" value={search} onChange={onSearch} />

    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>
  </div>
)

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

const Item = ({
  item: {
    title,
    url,
    author,
    num_comments,
    points,
  }
}) => (
  <li>
    <span>
      <a href="{url}">{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </li>
);

export default App
