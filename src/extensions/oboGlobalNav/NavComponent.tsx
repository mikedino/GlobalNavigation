import * as React from 'react';
import { DefaultButton, Icon } from '@fluentui/react';
import styles from './GlobalNavStyles.module.scss';

export interface MenuItem {
    Col: string;
    Label: string;
    Url: string;
}

export interface INavProps{
    expanded: boolean
}

export interface INavState{
    expanded: boolean,
    toggleIconName: string
}
 
const headers: MenuItem[] = [
        { Col: '1', Label: 'Directorate of Construction, Facility, and Security Management', Url: '' },
        { Col: '2', Label: 'Comptroller', Url: '' },
        { Col: '3', Label: 'Directorate for Operations', Url: '' }
    ];
const menuitems: MenuItem[] = [
        { Col: '1', Label: 'Office of Construction Management (OBO/CFSM/CM)', Url: '#' },
        { Col: '1', Label: 'Office of Security Management (OBO/CFSM/SM)', Url: '#' },
        { Col: '2', Label: 'Office of Financial Management (OBO/COMP/FM) ', Url: '#' },
        { Col: '2', Label: 'Office of Policy and Program Analysis (OBO/COMP/P)', Url: '#' },
        { Col: '2', Label: 'Office of Area Management (OBO/OPS/AM)', Url: '#' },
        { Col: '3', Label: 'Office of Art in Embassies (OBO/OPS/ART)', Url: '#' },
        { Col: '3', Label: 'Office of Cultural Heritage (OBO/OPS/CH) ', Url: '#' },
        { Col: '3', Label: 'Office of Facilities Management (OBO/OPS/FAC) ', Url: '' },
        { Col: '3', Label: 'Office of Fire Protection (OBO/OPS/FIRE)', Url: '' },
        { Col: '3', Label: 'Office of Residential Design and Furnishings (OBO/OPS/RDF) ', Url: '' },
        { Col: '3', Label: 'Office of Health, Safety and Health Administration (OBO/OPS/SHEM)', Url: '' }
    ];

export default class GlobalNav extends React.Component<INavProps,INavState> {  
    constructor(props: INavProps){
        super(props)

        this.state = {
            expanded: false,
            toggleIconName: "CollapseMenu"
        }
    }

    private _handleToggle = (): void => {
        const wasExpanded: boolean = this.state.expanded;
        this.setState({
            expanded: !wasExpanded,
            toggleIconName: wasExpanded ? "CollapseMenu" : "ChromeClose"
        })
    }


    public render(): React.ReactElement<any> {

        return (
            <div className={styles.menu}>
                <div className={styles.header}>
                    <div id="menu-icon" className={styles.menuIcon}>
                        <DefaultButton
                            iconProps={{ iconName: this.state.toggleIconName }}
                            title={this.state.expanded ? "Close OBO Global Menu" : "Open OBO Global Menu"}
                            className={styles.toggleButton}
                            onClick={this._handleToggle}
                        />
                    </div>
                    <div className={`${styles.globalMenu} ${this.state.expanded ? styles.change : ""}`} id="GlobalMenu" >
                        {headers.map(header => 
                            <div>
                                <h3>{header.Label}</h3>
                                <ul>
                                    {menuitems.filter(item => item.Col === header.Col)
                                        .map(filteredItem =>{ 
                                            <li>{filteredItem.Label} <Icon iconName='ShieldSolid'></Icon></li> 
                                        })
                                    }
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

    }

}