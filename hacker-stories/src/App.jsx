import * as React from 'react';

const welcome = {
  greeting: 'Hey',
  title: 'React',
};

const initialStories = [
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

const getAsyncStories = () => 
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ data: { stories: initialStories } }),
      // Two second delay to simulate data fetch
      2000
    )
  );

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue]
}

const App = () => {

  // Set search term state
  const [searchTerm, setSearchTerm] = useStorageState('search2', 'React');

  // Set story state. Initiate empty to simulate async data fetch
  const [stories, setStories] = React.useState([]);

  // Maintain application loading state
  const [isLoading, setIsLoading] = React.useState(false)

  // Simulate an async data fetch
  React.useEffect(() => {
    // Update loading state
    setIsLoading(true);

    // Fetch async data
    getAsyncStories().then((result) => {
      setStories(result.data.stories)

      // Data has been fetch so set state false
      setIsLoading(false)
    });
  }, []);

  // Callback handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  // Callback handler
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );

    setStories(newStories);
  }

  const searchedStores = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <h2>{welcome.greeting} {welcome.title}</h2>

      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search List:</strong>
      </InputWithLabel>

      <hr />
      { isLoading ? (
        <p>Loading...</p>
      ) : (
          <List list={searchedStores} onRemoveItem={handleRemoveStory} />
      )}
      
    </div>
  );
}

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor='{id}'>{children}</label>
      &nbsp;
      <input
        id={id}
        type={type}
        value={value}
        ref={inputRef}
        onChange={onInputChange}
      />
    </>
  )
}

const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
);

const Item = ({ item, onRemoveItem }) => {

  // Component callback handler
  const handleRemoveItem = () => {
    onRemoveItem(item)
  }

  return (
    <li>
      <span>
        <a href="{item.url}">{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Remove
        </button>
      </span>
    </li>
  )
};

export default App
