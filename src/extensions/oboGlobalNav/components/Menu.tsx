import * as React from 'react';
import { DefaultButton, Icon } from '@fluentui/react';
import styles from '../styles/styles.module.scss';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import { IGlobalNavItem } from '../provider/dsDefinitions';
import SearchResultsList from './SearchList';
import { IGlobalNavProps } from './MenuProps';
import Strings from '../../../strings';
import '../styles/bootstrap-custom.scss';

interface RenderMenuItemsProps {
    items: IGlobalNavItem[];
    allItems: IGlobalNavItem[];
    parentId: number | undefined;
    activeKeys: { [key: number]: { eventKey: string, parentKey: string | undefined }[] };
    handleToggle: (itemId: number, eventKey: string | undefined, parentKey: string | undefined) => void;
}

const GlobalNav: React.FC<IGlobalNavProps> = ({ isExpanded, categories, menuitems, defaultExpandedKey }) => {
    // Reference to the menu container
    const menuRef = React.useRef<HTMLDivElement>(null);
    // State to set menu toggle status
    const [expanded, setExpanded] = React.useState<boolean>(isExpanded);
    // State to swap the menu icon
    const [toggleIconName, setToggleIconName] = React.useState<string>("CollapseMenu");
    // State for holding the search term callback
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    // State for managing the active keys of child accordions
    const [activeKeys, setActiveKeys] = React.useState<{ [key: number]: { eventKey: string, parentKey: string | undefined }[] }>({});

    // Collapse the menu if clicked outside
    const handleClickOutside = (event: MouseEvent): void => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setExpanded(false);
            setToggleIconName("CollapseMenu");
        }
    };

    // Add and clean up the event listener
    React.useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle menu function
    const menuToggle = (): void => {
        setExpanded(!expanded);
        setToggleIconName(expanded ? "CollapseMenu" : "ChromeClose");
    };

    // Open menu items without children by clicking the entire DIV
    const handleDivClick = (url: string): void => {
        window.location.href = url;
    };

    const handleToggle = (itemId: number, eventKey: string | undefined, parentKey: string | undefined): void => {
        if (eventKey === undefined) return;

        setActiveKeys(prevState => {
            const currentKeys = prevState[itemId] || [];
            const isCurrentlyActive = currentKeys.some(key => key.eventKey === eventKey);
            const newKeys = isCurrentlyActive
                ? currentKeys.filter(key => key.eventKey !== eventKey)
                : [...currentKeys, { eventKey, parentKey }];

            if (isCurrentlyActive) {
                const updatedKeys = { ...prevState };

                const removeDescendants = (parentId: string): void => {
                    for (const key in updatedKeys) {
                        if (Object.prototype.hasOwnProperty.call(updatedKeys, key)) {
                            // Find all children of the current parentId
                            const children = updatedKeys[key].filter(childKey => childKey.parentKey === parentId);
                            // Recursively remove all descendants of each child
                            children.forEach(child => removeDescendants(child.eventKey));
                            // Remove the children of the current parentId
                            updatedKeys[key] = updatedKeys[key].filter(childKey => childKey.parentKey !== parentId);
                            // If there are no more keys for this item, delete the key from updatedKeys
                            if (updatedKeys[key].length === 0) {
                                delete updatedKeys[key];
                            }
                        }
                    }
                };

                // Start removing from the specified eventKey
                removeDescendants(eventKey);

                return { ...updatedKeys, [itemId]: newKeys };
            }

            return { ...prevState, [itemId]: newKeys };
        });
    };


    // Function to clear active keys when parent accordion is selected
    const handleParentSelect = (): void => {
        setActiveKeys({});
    };

    // Repeatable function to render the child menu items recursively
    const RenderMenuItems: React.FC<RenderMenuItemsProps> = ({ items, allItems, parentId, activeKeys, handleToggle }) => {
        return (
            <>
                {items.map(item => {
                    const children = allItems.filter(childItem => childItem.Parent?.Id === item.ID);
                    const currentActiveKeys = activeKeys[item.ID]?.map(key => key.eventKey) || [];

                    return children.length > 0 ? (
                        <Accordion
                            key={item.ID}
                            className={styles.customChildAccordion}
                            activeKey={currentActiveKeys}
                            onSelect={(eventKey) => handleToggle(item.ID, eventKey as string | undefined, parentId !== undefined ? parentId.toString() : undefined)}
                        >
                            <AccordionItem className={styles.customChildAccordionItem} eventKey={item.ID.toString()}>
                                <AccordionHeader className={styles.customChildAccordionHeader} title={item.Title}>
                                    <a href={item.Url}>{item.Title}</a>
                                    {item.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : ""}
                                </AccordionHeader>
                                <AccordionBody className={styles.customChildAccordionBody}>
                                    <RenderMenuItems items={children} allItems={allItems} parentId={item.ID} activeKeys={activeKeys} handleToggle={handleToggle} />
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    ) : (
                        <div key={item.ID} className={`${styles.childItem} ${styles.linkOnly}`} onClick={() => handleDivClick(item.Url)} title={item.Title}>
                            <div>
                                <a href={item.Url} >{item.Title}</a>
                                {item.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : ""}
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    return (
        <div className='bootstrap-wrapper'>
            <div id='OBOGlobalMenuContainer' className={styles.menu} ref={menuRef}>
                <div className={styles.menuIconContainer}>
                    <div id="menu-icon" className={styles.menuIcon}>
                        <DefaultButton
                            iconProps={{ iconName: toggleIconName }}
                            title={expanded ? "Close OBO Global Menu" : "Open OBO Global Menu"}
                            className={styles.toggleButton}
                            onClick={menuToggle}
                        />
                    </div>
                    <div className={`${styles.globalMenu} ${expanded ? styles.change : ""}`} id="GlobalMenu">
                        <SearchResultsList onSearchTermChange={(term) => setSearchTerm(term)} />
                        {!searchTerm && (
                            <div id='accordionContainer'>
                                {categories
                                    .filter(category => category.isHome)
                                    .slice(0, 1)
                                    .map(fCategory => (
                                        <div key={fCategory.ID} className={`${styles.menuTopRow} accordion-button`} onClick={() => handleDivClick(fCategory.Url)} title={fCategory.Title}>
                                            <div className={styles.menuHome} ><Icon iconName={fCategory.IconName} className={styles.categoryIcon}></Icon>{fCategory.Title}</div>
                                            <div className={styles.menuExpand}></div>
                                        </div>
                                    ))
                                }
                                <div>
                                    <Accordion defaultActiveKey={defaultExpandedKey}>
                                        {categories
                                            .filter(category => !category.isHome)
                                            .map(fCategory =>
                                                <AccordionItem key={fCategory.ID} eventKey={fCategory.ID.toString()}>
                                                    <AccordionHeader onClick={handleParentSelect} title={fCategory.Title}>
                                                        <Icon iconName={fCategory.IconName} className={styles.categoryIcon}></Icon>{fCategory.Title}
                                                    </AccordionHeader>
                                                    <AccordionBody>
                                                        <RenderMenuItems items={menuitems.filter(item => item.Category.Id === fCategory.ID && (!item.Parent.Title || item.Parent.Title === undefined))} allItems={menuitems} parentId={undefined} activeKeys={activeKeys} handleToggle={handleToggle} />
                                                    </AccordionBody>
                                                </AccordionItem>
                                            )}
                                    </Accordion>
                                </div>
                            </div>
                        )}
                        <div className={styles.versionContainer}><div className={styles.version}>v{Strings.Version}</div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalNav;