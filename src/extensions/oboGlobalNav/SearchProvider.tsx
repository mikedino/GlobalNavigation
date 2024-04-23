import * as React from 'react';
import { DummyNavProvider, IGlobalNavCategory, IGlobalNavItem } from './DummyNavProvider';

const categories:IGlobalNavCategory[] = DummyNavProvider.Categories;
const menuitems:IGlobalNavItem[] = DummyNavProvider.MenuItems;

const SearchResultsList: React.FC = () => {
    return (
        <div>
            {categories.map(category => (
                <div key={category.ID}>
                    <div>{category.Label}</div>
                    {/* Filtered items for the current category */}
                    {menuitems.filter(item => item.CategoryID === category.ID)
                        .map(filteredItem => (
                            <div key={filteredItem.ID}>
                                {filteredItem.Label}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default SearchResultsList;