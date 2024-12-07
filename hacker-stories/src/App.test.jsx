import {
    describe,
    it,
    expect,
    vi
} from 'vitest';

// Import functions for testing
import App, {
    storiesReducer,
    Item,
    List,
    SearchForm,
    InputWithLabel,
} from './App';

import {
    render,
    screen,
    fireEvent,
    waitFor,
} from '@testing-library/react';

import axios from 'axios';
vi.mock('axios');

// Test block
describe('something truthy and falsy', () => {

    // Test case
    it('true to be true', () => {
        expect(true).toBe(true);
    });

    // Test case
    it('false to be false', () => {
        expect(false).toBe(false);
    });
});

const storyOne = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
};

const storyTwo = {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
};

const stories = [storyOne, storyTwo];
describe('storiesReducer', () => {
    it('removes a story from all stories', () => {
        const action = { type: 'REMOVE_STORY', payload: storyOne };

        const state = { data: stories, isLoading: false, isError: false };

        const newState = storiesReducer(state, action);

        const expectedState = {
            data: [storyTwo],
            isLoading: false,
            isError: false,
        };

        expect(newState).toStrictEqual(expectedState);
    });
});

describe('Item', () => {
    it('renders all properties', () => {
        render(<Item item={storyOne} />);

        // screen.debug();

        expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
        expect(screen.getByText('React')).toHaveAttribute(
            'href',
            'https://reactjs.org/'
        );
    });

    it('renders a clickable dismiss button', () => {
        render(<Item item={storyOne} />);

        // screen.getByRole('');

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('clicking the dismiss button calls the callback handler', () => {
        const handleRemoveItem = vi.fn();

        render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);

        fireEvent.click(screen.getByRole('button'));

        expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    });
});

describe('SearchForm', () => {
    const searchFormProps = {
        searchTerm: 'React',
        onSearchInput: vi.fn(),
        onSearchSubmit: vi.fn(),
    };

    it('renders the input field with its value', () => {
        render(<SearchForm {...searchFormProps} />);

        // screen.debug();

        expect(screen.getByDisplayValue('React')).toBeInTheDocument();
    });

    it('renders the correct label', () => {
        render(<SearchForm {...searchFormProps} />);
        expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
    });

    it('calls onSearchInput on input field change', () => {
        render(<SearchForm {...searchFormProps} />);
        fireEvent.change(screen.getByDisplayValue('React'), {
            target: { value: 'Redux' },
        });
        expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
    });
    it('calls onSearchSubmit on button submit click', () => {
        render(<SearchForm {...searchFormProps} />);
        fireEvent.submit(screen.getByRole('button'));
        expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
    });
});

describe('App', () => {
    it('succeeds fetching data', async () => {
        const promise = Promise.resolve({
            data: {
                hits: stories,
            },
        });

        axios.get.mockImplementationOnce(() => promise);
        
        render(<App />);
        
        // screen.debug();
        expect(screen.queryByText(/Loading/)).toBeInTheDocument();
        
        await waitFor(async () => await promise);
        
        // screen.debug();
        expect(screen.queryByText(/Loading/)).toBeNull();
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Redux')).toBeInTheDocument();
        expect(screen.getAllByText('Remove').length).toBe(2);
    });

    it('fails fetching data', async () => {
        const promise = Promise.reject();

        axios.get.mockImplementationOnce(() => promise);

        render(<App />);

        expect(screen.getByText(/Loading/)).toBeInTheDocument();

        try {
            await waitFor(async () => await promise);
        } catch (error) {
            expect(screen.queryByText(/Loading/)).toBeNull();
            expect(screen.queryByText(/went wrong/)).toBeInTheDocument();
        }
    });

    it('removes a story', async () => {
        const promise = Promise.resolve({
            data: {
                hits: stories,
            },
        });
        axios.get.mockImplementationOnce(() => promise);
        render(<App />);
        await waitFor(async () => await promise);
        expect(screen.getAllByText('Remove').length).toBe(2);
        expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
        fireEvent.click(screen.getAllByText('Remove')[0]);
        expect(screen.getAllByText('Remove').length).toBe(1);
        expect(screen.queryByText('Jordan Walke')).toBeNull();
    });

    it('searches for specific stories', async () => {
        const reactPromise = Promise.resolve({
            data: {
                hits: stories,
            },
        });
        const anotherStory = {
            title: 'JavaScript',
            url: 'https://en.wikipedia.org/wiki/JavaScript',
            author: 'Brendan Eich',
            num_comments: 15,
            points: 10,
            objectID: 3,
        };
        const javascriptPromise = Promise.resolve({
            data: {
                hits: [anotherStory],
            },
        });
        axios.get.mockImplementation((url) => {
            if (url.includes('React')) {
                return reactPromise;
            }
            if (url.includes('JavaScript')) {
                return javascriptPromise;
            }
            throw Error();
        });
    });
});