import * as React from 'react';
import { DefaultButton, Icon } from '@fluentui/react';
import styles from './GlobalNavStyles.module.scss';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
//import { AccordionEventKey } from 'react-bootstrap/esm/AccordionContext';

export interface MenuItem {
    Col: string;
    Label: string;
    Url: string;
    Restricted: boolean;
    IconName?: string;
}

export interface INavProps{
    expanded: boolean;
}

export interface INavState{
    expanded: boolean;
    toggleIconName: string;
}

const headers: MenuItem[] = [
    { Col: '2', Label: 'Organization', Url: '', Restricted: false, IconName: "Org" },
    { Col: '3', Label: 'Applications', Url: '', Restricted: false, IconName: "AppIconDefault" },
    { Col: '4', Label: 'Processes', Url: '', Restricted: false, IconName: "Processing" },
    { Col: '5', Label: 'Resources', Url: '', Restricted: false, IconName: "D365BusinessCentral" },
    { Col: '6', Label: 'Contact/Support', Url: '', Restricted: false, IconName: "ContactList" }
];

// const headers: MenuItem[] = [
//         { Col: '1', Label: 'Directorate of Construction, Facility, and Security Management', Url: '' },
//         { Col: '2', Label: 'Comptroller', Url: '' },
//         { Col: '3', Label: 'Directorate for Operations', Url: '' }
//     ];

const menuitems: MenuItem[] = [
        { Col: '2', Label: 'Office of Construction Management (OBO/CFSM/CM)', Url: '#', Restricted: false },
        { Col: '2', Label: 'Office of Security Management (OBO/CFSM/SM)', Url: '#', Restricted: false },
        { Col: '2', Label: 'Office of Financial Management (OBO/COMP/FM) ', Url: '#', Restricted: false },
        { Col: '2', Label: 'Office of Policy and Program Analysis (OBO/COMP/P)', Url: '#', Restricted: true },
        { Col: '2', Label: 'Office of Area Management (OBO/OPS/AM)', Url: '#', Restricted: true },
        { Col: '2', Label: 'Office of Art in Embassies (OBO/OPS/ART)', Url: '#', Restricted: false },
        { Col: '2', Label: 'Office of Cultural Heritage (OBO/OPS/CH) ', Url: '#', Restricted: false },
        { Col: '2', Label: 'Office of Facilities Management (OBO/OPS/FAC) ', Url: '', Restricted: false },
        { Col: '2', Label: 'Office of Fire Protection (OBO/OPS/FIRE)', Url: '', Restricted: true },
        { Col: '2', Label: 'Office of Residential Design and Furnishings (OBO/OPS/RDF) ', Url: '', Restricted: false },
        { Col: '2', Label: 'Office of Health, Safety and Health Administration (OBO/OPS/SHEM)', Url: '', Restricted: false },
        { Col: '3', Label: 'Asset Management', Url: '', Restricted: true },
        { Col: '3', Label: 'BIMS', Url: '', Restricted: false },
        { Col: '3', Label: 'E2', Url: '', Restricted: true },
        { Col: '3', Label: 'FAC Apps', Url: '', Restricted: true },
        { Col: '3', Label: 'GFMS', Url: '', Restricted: false },
        { Col: '4', Label: 'SA Tracker', Url: '', Restricted: false },
        { Col: '4', Label: 'Project Authorization Documents (PAD)', Url: '', Restricted: false },
        { Col: '5', Label: 'FSI (Training)', Url: '', Restricted: false },
        { Col: '5', Label: 'Onboarding', Url: '', Restricted: false },
        { Col: '5', Label: 'HR', Url: '', Restricted: false },
        { Col: '5', Label: 'Policies & Procedures', Url: '', Restricted: false },
        { Col: '5', Label: 'Telework Information', Url: '', Restricted: false },
        { Col: '5', Label: 'Acronyms', Url: '', Restricted: false },
        { Col: '6', Label: 'rOBO', Url: '', Restricted: false },
        { Col: '6', Label: 'OBO SharePoint Support', Url: '', Restricted: false },
        { Col: '6', Label: 'IT Service Center', Url: '', Restricted: false }
    ];

export default class GlobalNav extends React.Component<INavProps,INavState> {  
    constructor(props: INavProps){
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
                        {headers.map(header => 
                            <div>
                            {/* <Accordion defaultActiveKey='2' activeKey={activeKeys} onSelect={handleSelect} alwaysOpen> */}
                            <Accordion defaultActiveKey='2'>
                                <AccordionItem eventKey={header.Col}>
                                    <AccordionHeader><Icon iconName={header.IconName} className={styles.headerIcon}></Icon> {header.Label}</AccordionHeader>
                                    <AccordionBody>
                                        {menuitems.filter(item => item.Col === header.Col)
                                            .map(filteredItem => 
                                                <div className={styles.childItem}>{filteredItem.Label} {filteredItem.Restricted ? <Icon iconName='BlockedSite' about='Restricted Site' title='Restricted Site' className='ms-fontColor-alert'></Icon> : null}</div> 
                                            )
                                        }
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

    }

}