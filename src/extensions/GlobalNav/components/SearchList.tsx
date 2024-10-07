import * as React from 'react';
import styles from '../styles/styles.module.scss';
import { Datasource } from '../provider/ds';
import { IGlobalNavCategory, IGlobalNavItem } from '../provider/dsDefinitions';
import SearchBoxCustom from './SearchBox';
import { Icon } from '@fluentui/react';

interface SearchResultsListProps {
    onSearchTermChange: (term: string) => void; // Callback function prop
}

const boldifyMatch = (text: string, searchTerm: string): string => {

    // If the search term is empty, return the original text without any modifications
    if (!searchTerm) {
        return text;
    }

    // Create a regular expression with the global flag to match all occurrences of the search term
    // eslint-disable-next-line @rushstack/security/no-unsafe-regexp
    const regex = new RegExp(searchTerm, 'gi');

    // Replace occurrences of the search term with bold text
    return text.replace(regex, match => `<strong class="${styles.matchingSearchText}">${match}</strong>`);
};

const SearchResultsList: React.FC<SearchResultsListProps> = ({ onSearchTermChange }) => {

    // Initialize categories, menuitem and loading state with null
    const [categories, setCategories] = React.useState<IGlobalNavCategory[] | null>(null);
    const [menuItems, setMenuItems] = React.useState<IGlobalNavItem[] | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    // State for search term from SearchBoxCustom
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    React.useEffect(() => {
        Datasource.init().then(() => {
            setIsLoading(false); // Set loading state to false regardless of success or failure
            setCategories(Datasource.Categories);
            setMenuItems(Datasource.MenuItems);
            //console.log("[Search Menu Items]", Datasource.MenuItems);
        })
            .catch(error => {
                // Handle the error here
                console.error("Error initializing datasource for search list: ", error);
                setIsLoading(false); // Set loading state to false if an error occurs
            });
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount)

    // Function to filter menu items based on search term and include parent items of matching children
    const getFilteredMenuItems = (items: IGlobalNavItem[], searchTerm: string): IGlobalNavItem[] => {
        if (!searchTerm) return items;
        const lowerSearchTerm = searchTerm.toLowerCase();
        const filteredItems = items.filter(item => item.Title && item.Title.toLowerCase().includes(lowerSearchTerm));

        const parentIds = new Set<number>();
        const allMatchingItems = new Set<number>();

        // Collect matching items and their parent IDs
        filteredItems.forEach(item => {
            allMatchingItems.add(item.ID);
            let parentId = item.Parent.Id;
            while (parentId) {
                parentIds.add(parentId);
                const parentItem = items.find(i => i.ID === parentId);
                parentId = parentItem?.Parent.Id;
            }
        });
        return items.filter(item => allMatchingItems.has(item.ID) || parentIds.has(item.ID));
    };

    const handleDivClick = (url: string): void => {
        window.location.href = url;
    };

    // Call the callback function with the new search term whenever it changes
    React.useEffect(() => {
        onSearchTermChange(searchTerm);
    }, [searchTerm, onSearchTermChange]);

    // Function to recursively render menu items
    const renderMenuItems = (items: IGlobalNavItem[], parentId: number | undefined, level: number = 2): React.ReactNode => {
        return items.filter(item => item.Parent.Id === parentId)
            .map(item => (
                <div key={item.ID}>
                    <div className={styles.resultsItem} style={{paddingLeft: `${level * 20}px`}} onClick={() => handleDivClick(item.Url)}>
                        <Icon iconName='Childof' className={styles.childOfIcon}></Icon>
                        <div dangerouslySetInnerHTML={{ __html: boldifyMatch(item.Title, searchTerm) }}></div>
                    </div>
                    {renderMenuItems(items, item.ID, level + 1)}
                </div>
            ));
    };

    // Get the filtered menu items
    const filteredMenuItems = getFilteredMenuItems(menuItems || [], searchTerm);

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
                        {/* always render the categories */}
                        {categories?.map(category => (
                            <div key={category.ID}>
                                <div className='py-1'>{category.Title}</div>
                                {/* level 2 items (linked to a category) */}
                                {filteredMenuItems?.filter(level2Item => level2Item.Category.Id === category.ID && level2Item.Parent.Id === undefined)
                                    .map(level2Item => (
                                        <div key={level2Item.ID}>
                                            <div className={`${styles.resultsItem} ${styles.level2item}`} onClick={() => handleDivClick(level2Item.Url)} >
                                                <Icon iconName='Childof' className={styles.childOfIcon}></Icon>
                                                <div dangerouslySetInnerHTML={{ __html: boldifyMatch(level2Item.Title, searchTerm) }}></div>
                                            </div>
                                            {/* level 3 and below items (recursive) */}
                                            {renderMenuItems(filteredMenuItems, level2Item.ID)}
                                        </div>
                                    )
                                    )}
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default SearchResultsList;
