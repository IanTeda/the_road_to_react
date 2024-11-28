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

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    // case 'SET_STORIES':
    //   return action.payload
    case 'REMOVE_STORY':
      // return state.filter(
      //   (story) => action.payload.objectID !== story.objectID
    // )
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        )
      }
    default:
      throw new Error();
  }
}

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
  const [searchTerm, setSearchTerm] = useStorageState(
    'search',
    'React'
  );

  // Set story state. Initiate empty to simulate async data fetch
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {
      data: [],
      isLoading: false,
      isError: false,
    }
  );

  // // Maintain application loading state
  // const [isLoading, setIsLoading] = React.useState(false);

  // // Error state handling
  // const [isError, setIsError] = React.useState(false);

  // Simulate an async data fetch
  React.useEffect(() => {
    // Update loading state
    // setIsLoading(true);
    dispatchStories({ type: 'STORIES_FETCH_INIT' })

    // Fetch async data
    getAsyncStories().then((result) => {
      // setStories(result.data.stories)
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.stories,
      });

      // Data has been fetch so set state false
      setIsLoading(false)
    })
      .catch(() => 
        dispatchStories({ type: 'STORIES_FETCH_FAILURE'})
      );
  }, []);

  // Callback handler
  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item
    })
  };

  // Callback handler
  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  };

  const searchedStores = stories.data.filter((story) =>
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

      {stories.isError && <p>Ops, something went wrong ...</p>}

      { stories.isLoading ? (
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
