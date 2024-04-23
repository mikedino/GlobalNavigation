import * as React from 'react';
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
//import SearchResultsList from './SearchProvider';

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 300, color: "#000" } };

/* eslint-disable react/jsx-no-bind */
export const SearchBoxCustom = () => (
  <div>
    <SearchBox
      styles={searchBoxStyles}
      placeholder="Search Global Nav"
      underlined={true}
      onEscape={ev => {
        console.log('Custom onEscape Called');
      }}
      onClear={ev => {
        console.log('Custom onClear Called');
      }}
      onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
      onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
    />
  </div>
);