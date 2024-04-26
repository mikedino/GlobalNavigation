import * as React from 'react';
import styles from '../GlobalNavStyles.module.scss';
import { DummyNavProvider } from '../datasource/DummyNavProvider';
import { IGlobalNavCategory, IGlobalNavItem } from '../datasource/dsDefinitions';
import SearchBoxCustom from './SearchBox';
import { Icon } from '@fluentui/react';

interface SearchResultsListProps {
    onSearchTermChange: (term: string) => void; // Callback function prop
}

const boldifyMatch = (text: string, searchTerm: string): React.ReactNode => {

    // If the search term is empty, return the original text without any modifications
    if (!searchTerm) {
        return text;
    }

    // Create a regular expression with the global flag to match all occurrences of the search term
    const regex = new RegExp(searchTerm, 'gi');

    // Replace occurrences of the search term with bold text
    return text.replace(regex, match => `<strong>${match}</strong>`);
};

const SearchResultsList: React.FC<SearchResultsListProps> = ({ onSearchTermChange }) => {

    // Initialize categories, menuitem and loading state with null
    const [categories, setCategories] = React.useState<IGlobalNavCategory[] | null>(null);
    const [menuItems, setMenuItems] = React.useState<IGlobalNavItem[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    // State for search term from SearchBoxCustom
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    React.useEffect(() => {
        const fetchDataAsync = async (): Promise<void> => {
            try {
                // wait for the data initialization function which returns a Promise
                await DummyNavProvider.init();

                // Set the categories and menuItems states with the data from DummyNavProvider
                setCategories(DummyNavProvider.Categories);
                setMenuItems(DummyNavProvider.MenuItems);

            } catch (error) {
                console.error('Error fetching data for search results:', error);
            } finally {
                setIsLoading(false); // Set loading state to false regardless of success or failure
            }
        };

        fetchDataAsync().catch(error => // Call the async function to fetch data
            console.error('Error in fetchDataAsync:', error) // Ensure that the Promise is handled properly 
        );
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    // Function to filter menu items based on search term
    const filteredMenuItems = menuItems?.filter(item =>
        item.Label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );

    const handleDivClick = (url:string):void => {
        window.location.href = url;
    }

    // Call the callback function with the new search term whenever it changes
    React.useEffect(() => {
        onSearchTermChange(searchTerm);
    }, [searchTerm, onSearchTermChange]);

    return (
        <div className={styles.searchCustom}>
            {/* Search box */}
            <SearchBoxCustom onSearchTermChange={setSearchTerm} />

            {isLoading ? (
                <div>Loading data....</div>
            ) : (
                // Conditionally render the search results based on the length of searchTerm
                searchTerm.length > 0 && (
                    <div id='searchResults' className={styles.searchResults}>
                        {categories?.map(category => (
                            <div key={category.ID}>
                                <div className='py-1'>{category.Label}</div>
                                {/* Filtered items for the current category that are not a level 3 child */}
                                {filteredMenuItems?.filter(level2Item => level2Item.CategoryID === category.ID && level2Item.ParentID === '')
                                    .map(level2Item => (
                                        <div key={level2Item.ID}>
                                            <div className={`${styles.resultsItem} ${styles.level2item}`} onClick={() => handleDivClick(level2Item.Url)} >
                                                <Icon iconName='Childof' className={styles.childOfIcon}></Icon>
                                                <div dangerouslySetInnerHTML={{ __html: boldifyMatch(level2Item.Label, searchTerm) }}></div>
                                            </div>
                                            {/* level 3 items for the menu item */}
                                            {filteredMenuItems?.filter(level3Item => level3Item.ParentID === level2Item.ID)
                                                .map(level3Item => (
                                                    <div key={level2Item.ID}>
                                                        <div className={`${styles.resultsItem} ${styles.level3item}`} onClick={() => handleDivClick(level3Item.Url)} >
                                                            <Icon iconName='Childof' className={styles.childOfIcon}></Icon>
                                                            <div dangerouslySetInnerHTML={{ __html: boldifyMatch(level3Item.Label, searchTerm) }}></div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                    )}
                            </div>
                        ))}
                    </div>
                )
            )
            }
        </div>
    );
};

export default SearchResultsList;