import * as React from 'react';
import { DefaultButton, Icon } from '@fluentui/react';
import styles from './GlobalNavStyles.module.scss';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
//import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';

export interface IGlobalNavCategory {
    ID: string;
    Label: string;
    Url: string;
    Restricted: boolean;
    IconName?: string;
}

export interface IGlobalNavItem extends IGlobalNavCategory {
    CategoryID: string;
    ParentID: string;
}

export interface INavProps {
    expanded: boolean;
}

// export interface INavState {
//     expanded: boolean;
//     toggleIconName: string;
// }

const headers: IGlobalNavCategory[] = [
    { ID: '2', Label: 'Organization', Url: '/', Restricted: false, IconName: "Org" },
    { ID: '3', Label: 'Applications', Url: '/', Restricted: false, IconName: "AppIconDefault" },
    { ID: '4', Label: 'Processes', Url: '/', Restricted: false, IconName: "Processing" },
    { ID: '5', Label: 'Resources', Url: '/', Restricted: false, IconName: "D365BusinessCentral" },
    { ID: '6', Label: 'Contact/Support', Url: '/', Restricted: false, IconName: "ContactList" }
];

const menuitems: IGlobalNavItem[] = [
    { CategoryID: '2', ID: '7', ParentID: '', Label: 'Construction, Facility, and Security Management (CFSM)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '33', ParentID: '7', Label: 'Construction Management (CM)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '34', ParentID: '7', Label: 'Security Management (SM)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '8', ParentID: '', Label: 'Comptroller (COMP)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '35', ParentID: '8', Label: 'Financial Management (FM)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '34', ParentID: '8', Label: 'Policy and Program Analysis (P)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '9', ParentID: '', Label: 'External Affairs (EA)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '10', ParentID: '', Label: 'Executive Director (EX)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '37', ParentID: '10', Label: 'Human Resources (HR)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '38', ParentID: '10', Label: 'Information Resource Management (IRM)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '39', ParentID: '10', Label: 'Management Support Office (MSD)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '11', ParentID: '', Label: 'Executive Office (EXEC)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '12', ParentID: '', Label: 'Front Office (FO)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '13', ParentID: '', Label: 'Operations (OPS)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '40', ParentID: '13', Label: 'Area Management (AM)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '41', ParentID: '13', Label: 'Art in Embassies (ART)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '42', ParentID: '13', Label: 'Cultural Heritage (CH)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '43', ParentID: '13', Label: 'Facilities Management (FAC)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '50', ParentID: '43', Label: 'AMT', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '51', ParentID: '43', Label: 'FMA', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '52', ParentID: '43', Label: 'MM', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '53', ParentID: '43', Label: 'PM', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '44', ParentID: '13', Label: 'Fire Protection (FIRE)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '45', ParentID: '13', Label: 'Residential Design and Furnishings (RDF)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '46', ParentID: '13', Label: 'Health, Safety and Health Administration (SHEM)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '14', ParentID: '', Label: 'Program Development, Coordination, and Support (PDCS)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '15', ParentID: '', Label: 'Planning and Real Estate (PRE)', Url: '/', Restricted: false },
    { CategoryID: '2', ID: '16', ParentID: '', Label: 'Resource Management (RM)', Url: '/', Restricted: false },
    { CategoryID: '3', ID: '17', ParentID: '', Label: 'Asset Management', Url: '/', Restricted: true },
    { CategoryID: '3', ID: '18', ParentID: '', Label: 'BIMS', Url: '/', Restricted: false },
    { CategoryID: '3', ID: '19', ParentID: '', Label: 'E2', Url: '/', Restricted: true },
    { CategoryID: '3', ID: '20', ParentID: '', Label: 'FAC Apps', Url: '/', Restricted: true },
    { CategoryID: '3', ID: '21', ParentID: '', Label: 'GFMS', Url: '/', Restricted: false },
    { CategoryID: '4', ID: '22', ParentID: '', Label: 'SA Tracker', Url: '/', Restricted: false },
    { CategoryID: '4', ID: '23', ParentID: '', Label: 'Project Authorization Documents (PAD)', Url: '/', Restricted: false },
    { CategoryID: '5', ID: '24', ParentID: '', Label: 'FSI (Training)', Url: '/', Restricted: false },
    { CategoryID: '5', ID: '25', ParentID: '', Label: 'Onboarding', Url: '/', Restricted: false },
    { CategoryID: '5', ID: '26', ParentID: '', Label: 'HR', Url: '/', Restricted: false },
    { CategoryID: '5', ID: '27', ParentID: '', Label: 'Policies & Procedures', Url: '/', Restricted: false },
    { CategoryID: '5', ID: '28', ParentID: '', Label: 'Telework Information', Url: '/', Restricted: false },
    { CategoryID: '5', ID: '29', ParentID: '', Label: 'Acronyms', Url: '/', Restricted: false },
    { CategoryID: '6', ID: '30', ParentID: '', Label: 'rOBO', Url: '/', Restricted: false },
    { CategoryID: '6', ID: '31', ParentID: '', Label: 'OBO SharePoint Support', Url: '/', Restricted: false },
    { CategoryID: '6', ID: '32', ParentID: '', Label: 'IT Service Center', Url: '/', Restricted: false }
];



const GlobalNav: React.FC<INavProps> = () => {
    // State to set menu toggle status
    const [expanded, setExpanded] = React.useState<boolean>(false);
    // State to swap the menu icon 
    const [toggleIconName, setToggleIconName] = React.useState<string>("CollapseMenu");
    // State for breadcrumb & click menu
    const [breadcrumb, setBreadcrumb] = React.useState<string[]>(["Organization"]);
    const [showClickMenu, setClickMenu] = React.useState<boolean>(false);
    // State for the click menu parent item id
    const [clickMenuParentID, setClickMenuParentID] = React.useState<string>("");

    // Toggle menu function
    const menuToggle = (): void => {
        setExpanded(!expanded);
        setToggleIconName(expanded ? "CollapseMenu" : "ChromeClose");
    };

    // Handler for menu item click
    const menuSelect = (label: string, reset: boolean, ID: string): void => {
        // if this is a click on parent item, reset the breadcrumb/array and hide it
        if (reset) {
            setBreadcrumb([label])
            setClickMenu(false);
        } else {
            // append to end of breadcrumb and show it
            setBreadcrumb(prevBreadcrumb => [...prevBreadcrumb, label]);
            // once we have a second level click, show the breadcrumb
            setClickMenu(true);
            setClickMenuParentID(ID);
        }
    };

    return (
        <div className={styles.menu}>
            <div className={styles.header}>
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
                        <div className={`${styles.menuTopRow} ${styles.mainMenuBack} accordion-button`} onClick={() => menuSelect('Organization', true, '')}><Icon iconName='Back' className={styles.headerIcon} about='Back to main menu' title='Back to main menu'></Icon>Main Menu</div>
                        <div className={`${styles.menuTopRow} accordion-button`}>{breadcrumb.join(' > ')}</div>
                        <div className='clickMenuSubItemsContainer accordion-body'>
                            {menuitems.filter(item => item.ParentID === clickMenuParentID)
                                .map(filteredItem =>
                                    <div key={filteredItem.ID} className={styles.childItemClickMenu}>
                                        <div>
                                            <a href={filteredItem.Url}>{filteredItem.Label}</a>
                                            {filteredItem.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : ""}
                                        </div>
                                        {menuitems.filter(childItem => childItem.ParentID === filteredItem.ID).map(childFilteredItem =>
                                            <div className='ps-4 py-1'>{childFilteredItem.Label}</div>
                                        )}

                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={`${showClickMenu ? styles.accordionContainerHide : ""}`}>
                        <div className={`${styles.menuTopRow} accordion-button`}>
                            <div className={styles.menuHome}><Icon iconName='Home' className={styles.headerIcon}></Icon>OBO Home</div>
                            <div className={styles.menuExpand}><Icon iconName='ExpandAll' className='mx-1'></Icon></div>
                        </div>
                        <div>
                            {/* <Accordion defaultActiveKey='2' activeKey={activeKeys} onSelect={handleSelect} alwaysOpen> */}
                            <Accordion defaultActiveKey='2'>
                                {headers.map(header =>
                                    <AccordionItem eventKey={header.ID}>
                                        <AccordionHeader onClick={() => menuSelect(`${header.Label}`, true, '')}><Icon iconName={header.IconName} className={styles.headerIcon}></Icon> {header.Label}</AccordionHeader>
                                        <AccordionBody>
                                            {menuitems.filter(item => item.CategoryID === header.ID && item.ParentID === '')
                                                .map(filteredItem =>
                                                    <div key={filteredItem.ID} className={styles.childItem} onClick={() => menuSelect(`${filteredItem.Label}`, false, `${filteredItem.ID}`)}>
                                                        <div>
                                                            <a href={filteredItem.Url}>{filteredItem.Label}</a>
                                                            {filteredItem.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : ""}
                                                        </div>
                                                        <div className={styles.moreItemsIcon}>
                                                            <Icon iconName='ChevronRight' about='See sub-sites' title='See sub-sites'></Icon>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </AccordionBody>
                                    </AccordionItem>
                                )}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GlobalNav;