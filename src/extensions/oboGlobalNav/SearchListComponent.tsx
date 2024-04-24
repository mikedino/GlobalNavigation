import * as React from 'react';
import { DummyNavProvider, IGlobalNavCategory, IGlobalNavItem } from './DummyNavProvider';
import SearchBoxCustom from './SearchBoxComponent';

const SearchResultsList: React.FC = () => {

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

    return (
        <div>
            {/* Search box */}
            <SearchBoxCustom onSearchTermChange={setSearchTerm} />

            {isLoading ? (
                <div>Loading data....</div>
            ) : (
                categories?.map(category => (
                    <div key={category.ID}>
                        <div className='py-1'>{category.Label}</div>
                        {/* Filtered items for the current category */}
                        {filteredMenuItems?.filter(filteredItem => filteredItem.CategoryID === category.ID)
                            .map(filteredItem => (
                                <div key={filteredItem.ID} className='ps-2 py-1'>{filteredItem.Label}</div>
                            ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default SearchResultsList;