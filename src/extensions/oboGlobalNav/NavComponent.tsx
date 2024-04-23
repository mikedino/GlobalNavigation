import * as React from 'react';
import { DefaultButton, Icon } from '@fluentui/react';
import styles from './GlobalNavStyles.module.scss';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import { SearchBoxCustom } from './SearchComponent';
import { IGlobalNavCategory, IGlobalNavItem } from './DummyNavProvider';
// import { DummyNavProvider } from './DummyNavProvider';
// import { Log } from '@microsoft/sp-core-library';
// import Strings from '../../strings';

export interface INavProps {
    isExpanded: boolean;
    categories: IGlobalNavCategory[];
    menuitems: IGlobalNavItem[];
}

// interface INavState {
//     expanded: boolean;
//     categories: IGlobalNavCategory[];
//     menuitems: IGlobalNavItem[];
// }

const GlobalNav: React.FC<INavProps> = ({ isExpanded, categories, menuitems }) => {

    //local state to hold the categories and menu items 
    // const [navData, setNavData] = React.useState<INavState>({
    //     expanded: isExpanded,
    //     categories: [],
    //     menuitems: [],
    // });

    // Use useEffect hook to get the data
    // React.useEffect(() => {

    //     DummyNavProvider.init().then(
    //         //successfully loaded data
    //         () => {
    //             console.log("GlobalNav Data loaded successfully");
    //             //update state with data
    //             setNavData({
    //                 ...navData,
    //                 categories: DummyNavProvider.Categories,
    //                 menuitems: DummyNavProvider.MenuItems
    //             });

    //         },
    //         error => {
    //             Log.warn(Strings.ProjectName, "Error loading Datasource: " + error);
    //             console.error("Error loading GlobalNav Datasource: " + error);
    //         }
    //     );

    // }, []); // Empty dependency array ensures this effect runs only once after the component mounts

    // Use useEffect set default Click menu parent
    React.useEffect(() => {

        // Call menuSelect with the first item if categories are available
        if (categories.length > 0) {
            menuSelect(categories[0], true);
        }

    }, []);

    // State to set menu toggle status
    const [expanded, setExpanded] = React.useState<boolean>(isExpanded);
    // State to swap the menu icon 
    const [toggleIconName, setToggleIconName] = React.useState<string>("CollapseMenu");
    // State for breadcrumb & click menu
    //const [breadcrumb, setBreadcrumb] = React.useState<string[]>(["Organization"]); ///this was for a breadcrumb (using array)
    const [breadcrumb, setBreadcrumb] = React.useState<IGlobalNavCategory>(); ///this is for a string only (show Division)
    const [showClickMenu, setClickMenu] = React.useState<boolean>(false);
    // State for the click menu parent item id
    const [clickMenuParentID, setClickMenuParentID] = React.useState<string>("");

    // Toggle menu function
    const menuToggle = (): void => {
        setExpanded(!expanded);
        setToggleIconName(expanded ? "CollapseMenu" : "ChromeClose");
    };

    // Handler for menu item click
    const menuSelect = (item: IGlobalNavCategory, reset: boolean): void => {
        // if this is a click on parent item, reset the breadcrumb/array and hide it
        if (reset) {
            //setBreadcrumb([item.Label]);
            //setBreadcrumb(null);
            setClickMenu(false);
        } else {
            // append to end of breadcrumb and show it
            //setBreadcrumb(prevBreadcrumb => [...prevBreadcrumb, item.Label]);
            setBreadcrumb(item);
            // once we have a second level click, show the breadcrumb
            setClickMenu(true);
            setClickMenuParentID(item.ID);
        }
    };


    return (
        <div className={styles.menu}>
            <div className={styles.category}>
                <div id="menu-icon" className={styles.menuIcon}>
                    <DefaultButton
                        iconProps={{ iconName: toggleIconName }}
                        title={expanded ? "Close OBO Global Menu" : "Open OBO Global Menu"}
                        className={styles.toggleButton}
                        onClick={menuToggle}
                    />
                </div>
                <div className={`${styles.globalMenu} ${expanded ? styles.change : ""}`} id="GlobalMenu" >
                    <div className={`${styles.clickMenu} ${showClickMenu ? styles.toggle : ""}`}>
                        <div className={`${styles.menuTopRow} ${styles.mainMenuBack} accordion-button`} onClick={() => menuSelect(categories[0], true)}>
                            <Icon iconName='Back' className={styles.categoryIcon} about='Back to main menu' title='Back to main menu'></Icon>
                            Main Menu
                        </div>
                        {/* <div className={`${styles.menuTopRow} accordion-button`}>{breadcrumb.join(' > ')}</div> */}
                        <div className={`${styles.menuTopRow} ${styles.parentItem} accordion-button`} onClick={() => {
                            if (breadcrumb && breadcrumb.Url) {
                                window.location.href = breadcrumb.Url;
                            }
                        }}>{breadcrumb?.Label}
                        </div>
                        <div className='clickMenuSubItemsContainer accordion-body'>
                            {menuitems.filter(item => item.ParentID === clickMenuParentID)
                                .map(filteredItem =>
                                    <div key={filteredItem.ID}>
                                        <div className={styles.childItem}>
                                            <div>
                                                <a href={filteredItem.Url}>{filteredItem.Label}</a>
                                                {filteredItem.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : ""}
                                            </div>
                                        </div>
                                        {menuitems.filter(childItem => childItem.ParentID === filteredItem.ID).map(childFilteredItem =>
                                            <div className={`${styles.childItem} ${styles.indent}`}>
                                                <div>
                                                    <a href={childFilteredItem.Url}>{childFilteredItem.Label}</a>
                                                    {childFilteredItem.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : ""}
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={`${showClickMenu ? styles.accordionContainerHide : ""}`}>
                        <div className={`${styles.menuTopRow} accordion-button`}>
                            <div className={styles.menuHome}><Icon iconName='Home' className={styles.categoryIcon}></Icon>OBO Home</div>
                            <div className={styles.menuExpand}><Icon iconName='ExpandAll' className='mx-1'></Icon></div>
                        </div>
                        <div>
                            {/* <Accordion defaultActiveKey='2' activeKey={activeKeys} onSelect={handleSelect} alwaysOpen> */}
                            <Accordion defaultActiveKey='2'>
                                {categories.map(category =>
                                    <AccordionItem eventKey={category.ID}>
                                        <AccordionHeader onClick={() => menuSelect(category, true)}><Icon iconName={category.IconName} className={styles.categoryIcon}></Icon> {category.Label}</AccordionHeader>
                                        <AccordionBody>
                                            {menuitems.filter(item => item.CategoryID === category.ID && item.ParentID === '')
                                                .map(filteredItem => {

                                                    // Check if filteredItem.ID is also ParentID in the array (if it has children)
                                                    const hasChildren = menuitems.some(childItem => childItem.ParentID === filteredItem.ID);

                                                    return (

                                                        <div key={filteredItem.ID} className={styles.childItem} onClick={() => menuSelect(filteredItem, false)}>
                                                            <div>
                                                                <a href={filteredItem.Url}>{filteredItem.Label}</a>
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
                    <SearchBoxCustom />
                </div>
            </div>
        </div>
    );
};

export default GlobalNav;