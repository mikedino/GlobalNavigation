import * as React from 'react';
import { DefaultButton, Icon } from '@fluentui/react';
import styles from '../GlobalNavStyles.module.scss';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
//import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';

export interface ITopLevelItem {
    ID: string;
    Label: string;
    Url: string;
    Restricted: boolean;
    IconName?: string;
}

export interface ISecondLevelItem extends ITopLevelItem{
    ParentID: string;
}

export interface INavProps {
    expanded: boolean;
}

export interface INavState {
    expanded: boolean;
    toggleIconName: string;
}

const headers: ITopLevelItem[] = [
    { ID: '2', Label: 'Organization', Url: '', Restricted: false, IconName: "Org" },
    { ID: '3', Label: 'Applications', Url: '', Restricted: false, IconName: "AppIconDefault" },
    { ID: '4', Label: 'Processes', Url: '', Restricted: false, IconName: "Processing" },
    { ID: '5', Label: 'Resources', Url: '', Restricted: false, IconName: "D365BusinessCentral" },
    { ID: '6', Label: 'Contact/Support', Url: '', Restricted: false, IconName: "ContactList" }
];

// const headers: MenuItem[] = [
//         { ID: '1', Label: 'Directorate of Construction, Facility, and Security Management', Url: '' },
//         { ID: '2', Label: 'Comptroller', Url: '' },
//         { ID: '3', Label: 'Directorate for Operations', Url: '' }
//     ];

const menuitems: ISecondLevelItem[] = [
    { ParentID: '2', ID: '2', Label: 'CFSM', Url: '#', Restricted: false },
    { ParentID: '2', ID: '2', Label: 'COMP', Url: '#', Restricted: false },
    { ParentID: '2', ID: '2', Label: 'EA', Url: '#', Restricted: false },
    { ParentID: '2', ID: '2', Label: 'EX', Url: '#', Restricted: false },
    { ParentID: '2', ID: '2', Label: 'EXEC', Url: '#', Restricted: false },
    { ParentID: '2', ID: '2', Label: 'FO', Url: '#', Restricted: false },
    { ParentID: '2', ID: '2', Label: 'OPS', Url: '#', Restricted: false },
    { ParentID: '2', ID: '2', Label: 'PDCS', Url: '#', Restricted: false },
    { ParentID: '2', ID: '2', Label: 'PRE', Url: '#', Restricted: false },
    { ParentID: '2', ID: '2', Label: 'RM', Url: '#', Restricted: false },
    // { ID: '2', Label: 'Office of Construction Management (OBO/CFSM/CM)', Url: '#', Restricted: false },
    // { ID: '2', Label: 'Office of Security Management (OBO/CFSM/SM)', Url: '#', Restricted: false },
    // { ID: '2', Label: 'Office of Financial Management (OBO/COMP/FM) ', Url: '#', Restricted: false },
    // { ID: '2', Label: 'Office of Policy and Program Analysis (OBO/COMP/P)', Url: '#', Restricted: true },
    // { ID: '2', Label: 'Office of Area Management (OBO/OPS/AM)', Url: '#', Restricted: true },
    // { ID: '2', Label: 'Office of Art in Embassies (OBO/OPS/ART)', Url: '#', Restricted: false },
    // { ID: '2', Label: 'Office of Cultural Heritage (OBO/OPS/CH) ', Url: '#', Restricted: false },
    // { ID: '2', Label: 'Office of Facilities Management (OBO/OPS/FAC) ', Url: '', Restricted: false },
    // { ID: '2', Label: 'Office of Fire Protection (OBO/OPS/FIRE)', Url: '', Restricted: true },
    // { ID: '2', Label: 'Office of Residential Design and Furnishings (OBO/OPS/RDF) ', Url: '', Restricted: false },
    // { ID: '2', Label: 'Office of Health, Safety and Health Administration (OBO/OPS/SHEM)', Url: '', Restricted: false },
    { ParentID: '3', ID: '3', Label: 'Asset Management', Url: '', Restricted: true },
    { ParentID: '3', ID: '3', Label: 'BIMS', Url: '', Restricted: false },
    { ParentID: '3', ID: '3', Label: 'E2', Url: '', Restricted: true },
    { ParentID: '3', ID: '3', Label: 'FAC Apps', Url: '', Restricted: true },
    { ParentID: '3', ID: '3', Label: 'GFMS', Url: '', Restricted: false },
    { ParentID: '4', ID: '4', Label: 'SA Tracker', Url: '', Restricted: false },
    { ParentID: '4', ID: '4', Label: 'Project Authorization Documents (PAD)', Url: '', Restricted: false },
    { ParentID: '5', ID: '5', Label: 'FSI (Training)', Url: '', Restricted: false },
    { ParentID: '5', ID: '5', Label: 'Onboarding', Url: '', Restricted: false },
    { ParentID: '5', ID: '5', Label: 'HR', Url: '', Restricted: false },
    { ParentID: '5', ID: '5', Label: 'Policies & Procedures', Url: '', Restricted: false },
    { ParentID: '5', ID: '5', Label: 'Telework Information', Url: '', Restricted: false },
    { ParentID: '5', ID: '5', Label: 'Acronyms', Url: '', Restricted: false },
    { ParentID: '6', ID: '6', Label: 'rOBO', Url: '', Restricted: false },
    { ParentID: '6', ID: '6', Label: 'OBO SharePoint Support', Url: '', Restricted: false },
    { ParentID: '6', ID: '6', Label: 'IT Service Center', Url: '', Restricted: false }
];


export default class GlobalNav extends React.Component<INavProps, INavState> {
    constructor(props: INavProps) {
        super(props)

        this.state = {
            expanded: false,
            toggleIconName: "CollapseMenu"
        }
    }

    private _menuToggle = (): void => {
        const wasExpanded: boolean = this.state.expanded;
        this.setState({
            expanded: !wasExpanded,
            toggleIconName: wasExpanded ? "CollapseMenu" : "ChromeClose"
        })
    }

    public render(): React.ReactElement<any> {

        // // hook to pass the state value into the activeKey prop on the accordion
        // const [activeKeys, setActiveKeys] = React.useState(["0"]);
        // // onSelect handler for accordion so when it changes the value by click, the new value can flow to the activeKeys state
        // const handleSelect = (eventKey: AccordionEventKey) => setActiveKeys(eventKey as string[]);
        // // collapse all handler.  sends blank array to activeKey prop.
        // const handleCollapseClick = () => {
        //     setActiveKeys([]);
        // }

        // hook to pass the breadcrumb value when menu items are clicked
        const [breadcrumb, setBreadcrumb] = React.useState<string[]>([]);
        // onSelect handler for menu item
        const menuSelect = (label:string) => { 
            setBreadcrumb(prevBreadcrumb => [...prevBreadcrumb, label]);
        };

        return (
            <div className={styles.menu}>
                <div className={styles.header}>
                    <div id="menu-icon" className={styles.menuIcon}>
                        <DefaultButton
                            iconProps={{ iconName: this.state.toggleIconName }}
                            title={this.state.expanded ? "Close OBO Global Menu" : "Open OBO Global Menu"}
                            className={styles.toggleButton}
                            onClick={this._menuToggle}
                        />
                    </div>
                    <div className={`${styles.globalMenu} ${this.state.expanded ? styles.change : ""}`} id="GlobalMenu" >
                        <div className={`${styles.menuTopRow} accordion-button`}>
                            <div className={styles.menuHome}><Icon iconName='Home' className={styles.headerIcon}></Icon>OBO Home</div>
                            <div className={styles.menuExpand}><Icon iconName='ExpandAll' className='mx-1'></Icon></div>
                        </div>
                        <div>
                            {/* <Accordion defaultActiveKey='2' activeKey={activeKeys} onSelect={handleSelect} alwaysOpen> */}
                            <Accordion defaultActiveKey='2'>
                                {headers.map(header =>
                                    <AccordionItem eventKey={header.ID}>
                                        <AccordionHeader onClick={() => menuSelect(`${header.Label}`)}><Icon iconName={header.IconName} className={styles.headerIcon}></Icon> {header.Label}</AccordionHeader>
                                        <AccordionBody>
                                            {menuitems.filter(item => item.ParentID === header.ID)
                                                .map(filteredItem =>
                                                    <div className={styles.childItem}>{filteredItem.Label} {filteredItem.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : null}</div>
                                                )
                                            }
                                        </AccordionBody>
                                    </AccordionItem>
                                )}
                            </Accordion>
                        </div>
                        <div>{breadcrumb}</div>
                    </div>
                </div>
            </div>
        );

    }

}