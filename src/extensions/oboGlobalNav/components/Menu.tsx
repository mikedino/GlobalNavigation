import * as React from 'react';
import { DefaultButton, Icon } from '@fluentui/react';
import styles from '../styles/styles.module.scss';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import { IGlobalNavCategory, IGlobalNavItem } from '../provider/dsDefinitions';
import SearchResultsList from './SearchList';
import { IGlobalNavProps } from './MenuProps';
require('../styles/bootstrap-custom.scss');

const GlobalNav: React.FC<IGlobalNavProps> = ({ isExpanded, categories, menuitems, defaultExpandedKey }) => {

    // State to set menu toggle status
    const [expanded, setExpanded] = React.useState<boolean>(isExpanded);
    // State to swap the menu icon 
    const [toggleIconName, setToggleIconName] = React.useState<string>("CollapseMenu");
    // State for breadcrumb & click menu
    //const [breadcrumb, setBreadcrumb] = React.useState<string[]>(["Organization"]); ///this was for a breadcrumb (using array)
    const [breadcrumb, setBreadcrumb] = React.useState<IGlobalNavCategory | IGlobalNavItem>(); ///this is for a string only (show Division)
    const [showClickMenu, setClickMenu] = React.useState<boolean>(false);
    // State for the click menu parent item id
    const [clickMenuParentID, setClickMenuParentID] = React.useState<number | null>(null);
    // State for holding the search term callback
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    // Handler for menu item click
    const menuSelect = (item: IGlobalNavCategory | IGlobalNavItem, reset: boolean): void => {
        // if this is a click on parent item, reset the breadcrumb/array and hide it
        if (reset) {
            setClickMenu(false);
        } else {
            setBreadcrumb(item);
            // once we have a second level click, show the breadcrumb
            setClickMenu(true);
            setClickMenuParentID(item.ID);
        }
    };

    // Use useEffect set default Click menu parent on component load
    React.useEffect(() => {
        // Call menuSelect with the first item if categories are available
        if (categories.length > 0) {
            menuSelect(categories[0], true);
        }
        // Disable the warning for missing 'categories' in the dependency array because we only want this to run once on load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // get the default active key (expanded menu item)

    // Toggle menu function
    const menuToggle = (): void => {
        setExpanded(!expanded);
        setToggleIconName(expanded ? "CollapseMenu" : "ChromeClose");
    };

    // open menu items without children by clicking the entire DIV
    const handleDivClick = (url: string): void => {
        window.location.href = url;
    }

    return (
        <div id='OBOGlobalMenuContainer' className={styles.menu}>
            <div className={styles.menuIconContainer}>
                <div id="menu-icon" className={styles.menuIcon}>
                    <DefaultButton
                        iconProps={{ iconName: toggleIconName }}
                        title={expanded ? "Close OBO Global Menu" : "Open OBO Global Menu"}
                        className={styles.toggleButton}
                        onClick={menuToggle}
                    />
                </div>
                <div className={`${styles.globalMenu} ${expanded ? styles.change : ""}`} id="GlobalMenu" >
                    <SearchResultsList onSearchTermChange={(term) => setSearchTerm(term)} />
                    {/* Conditionally render the "click menu" based on searchTerm */}
                    {!searchTerm && (
                        <div id='clickMenuContainer' className={`${styles.clickMenu} ${showClickMenu ? styles.toggle : ""}`}>
                            <div className={`${styles.menuTopRow} ${styles.mainMenuBack} accordion-button`} onClick={() => menuSelect(categories[0], true)}>
                                <Icon iconName='Back' className={styles.categoryIcon} about='Back to main menu' title='Back to main menu'></Icon>
                                Main Menu
                            </div>
                            <div className={`${styles.menuTopRow} ${styles.parentItem} accordion-button`} onClick={() => {
                                if (breadcrumb && breadcrumb.Url) handleDivClick(breadcrumb.Url)
                            }}>{breadcrumb?.Title}
                            </div>
                            <div className='clickMenuSubItemsContainer accordion-body'>
                                {menuitems
                                    .filter(item => item.Parent?.Id === clickMenuParentID)
                                    .map(filteredItem =>
                                        <div key={filteredItem.ID}>
                                            <div className={`${styles.childItem} ${styles.linkOnly}`} onClick={() => handleDivClick(filteredItem.Url)}>
                                                <div>
                                                    <a href={filteredItem.Url}>{filteredItem.Title}</a>
                                                    {filteredItem.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : ""}
                                                </div>
                                            </div>
                                            {menuitems.filter(childItem => childItem.Parent?.Id === filteredItem.ID).map(childFilteredItem =>
                                                <div className={`${styles.childItem} ${styles.indent} ${styles.linkOnly}`} onClick={() => handleDivClick(filteredItem.Url)}>
                                                    <div>
                                                        <a href={childFilteredItem.Url}>{childFilteredItem.Title}</a>
                                                        {childFilteredItem.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : ""}
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}
                    {/* Conditionally render the accordionContainer based on searchTerm */}
                    {!searchTerm && (
                        <div id='accordionContainer' className={`${showClickMenu ? styles.accordionContainerHide : ""}`}>
                            {/********* render the home page link above the accordion ***** */}
                            {categories
                                .filter(category => category.isHome)
                                .slice(0, 1) // Only take the first item if any
                                .map(fCategory => (
                                    <div key={fCategory.ID} className={`${styles.menuTopRow} accordion-button`} onClick={() => handleDivClick(fCategory.Url)}>
                                        <div className={styles.menuHome}><Icon iconName={fCategory.IconName} className={styles.categoryIcon}></Icon>{fCategory.Title}</div>
                                        <div className={styles.menuExpand}>{/*<Icon iconName='Color' className='mx-1' onClick={toggleTheme}></Icon>*/}</div>
                                    </div>
                                ))
                            }
                            <div>
                                {/********* render the rest of the categories for the accordion ***** */}
                                <Accordion flush defaultActiveKey={defaultExpandedKey}>
                                    {categories
                                        .filter(category => !category.isHome)
                                        .map(fCategory =>
                                            <AccordionItem eventKey={fCategory.ID.toString()}>
                                                <AccordionHeader onClick={() => menuSelect(fCategory, true)}><Icon iconName={fCategory.IconName} className={styles.categoryIcon}></Icon> {fCategory.Title}</AccordionHeader>
                                                <AccordionBody>
                                                    {menuitems
                                                        .filter(item => item.Category.Id === fCategory.ID && item.Parent.Id === undefined)
                                                        .map(filteredItem => {

                                                            // Check if filteredItem.ID is also ParentID in the array (if it has children)
                                                            const hasChildren = menuitems.some(childItem => childItem.Parent?.Id === filteredItem.ID);

                                                            return (
                                                                <div key={filteredItem.ID} className={`${styles.childItem} ${hasChildren ? '' : styles.linkOnly}`} onClick={() =>
                                                                    hasChildren ? menuSelect(filteredItem, false) : handleDivClick(filteredItem.Url)
                                                                }>
                                                                    <div>
                                                                        <a href={filteredItem.Url}>{filteredItem.Title}</a>
                                                                        {filteredItem.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : ""}
                                                                    </div>
                                                                    {hasChildren ? <div className={styles.moreItemsIcon}>
                                                                        <Icon iconName='ChevronRight' about='See sub-sites' title='See sub-sites'></Icon>
                                                                    </div> : ""}
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </AccordionBody>
                                            </AccordionItem>
                                        )}
                                </Accordion>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlobalNav;