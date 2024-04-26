import * as React from 'react';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import styles from '../GlobalNavStyles.module.scss';
import { createTheme } from '@fluentui/react/lib/Styling';

const lightTheme = createTheme({
  palette: {
    themePrimary: '#0078D4', // Adjust colors as needed
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff',
  },
});

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

    <div className={styles.searchBox}>
      <SearchBox
        placeholder="Search OBO Enterprise Navigation"
        underlined={true}
        value={searchTerm}
        onEscape={handleClearSearch}
        onClear={handleClearSearch}
        onChange={handleSearchTermChange} theme={lightTheme}
      />
    </div>

  )
};

export default SearchBoxCustom;