import * as React from 'react';
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 300, color: "black" } };

//export const SearchBoxCustom = () => (

const SearchBoxCustom: React.FC<{ onSearchTermChange: (searchTerm: string) => void }> = ({ onSearchTermChange }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  // Function to handle search term change
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    // Call the callback function to update the search term in the parent component
    onSearchTermChange(newSearchTerm);
  };

  // Function to clear search term
  const handleClearSearch = ():void => {
    setSearchTerm(''); // Set search term to blank
    onSearchTermChange(''); // Call the callback function to update the search term in the parent component to blank
  };

  return (

    <div>
      <SearchBox
        styles={searchBoxStyles}
        placeholder="Search Global Nav"
        underlined={true}
        value={searchTerm}
        onEscape={handleClearSearch}
        onClear={handleClearSearch}
        onChange={handleSearchTermChange}
      // onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
      />
    </div>

  )
};

export default SearchBoxCustom;