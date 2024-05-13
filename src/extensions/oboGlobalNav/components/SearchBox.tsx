import * as React from 'react';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import styles from '../styles/styles.module.scss';
import { darkTheme } from '../styles/themes';

const SearchBoxCustom: React.FC<{ onSearchTermChange: (searchTerm: string) => void }> = ({ onSearchTermChange }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  // Function to handle search term change
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const newSearchTerm = event ? event.target.value : '';
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

    <div className={styles.searchBox}>
      <SearchBox
        placeholder="Search OBO Enterprise Navigation"
        underlined={true}
        value={searchTerm}
        onEscape={handleClearSearch}
        onClear={handleClearSearch}
        onChange={handleSearchTermChange} 
        theme={darkTheme}
      />
    </div>

  )
};

export default SearchBoxCustom;