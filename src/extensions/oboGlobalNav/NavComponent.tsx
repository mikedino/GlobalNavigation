import * as React from 'react';
import styles from './GlobalNavStyles.module.scss';

export interface MenuItem {
    Col: string;
    Label: string;
    Url: string;
}
 
const _headers: MenuItem[] = [
        { Col: '1', Label: 'Directorate of Construction, Facility, and Security Management', Url: '' },
        { Col: '2', Label: 'Comptroller', Url: '' },
        { Col: '3', Label: 'Directorate for Operations', Url: '' }
    ];
const _menuitems: MenuItem[] = [
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

export default class GlobalNav extends React.Component<any> {  

    public render(): React.ReactElement<any> {

        return (
            <div className={styles.menu}>
                <div className={styles.header}>
                    <div id="menu-icon" className={styles.menuicon}>
                        <div id={styles.menubar1} className={styles.menubar}></div>
                        <div id={styles.menubar2} className={styles.menubar}></div>
                        <div id={styles.menubar3} className={styles.menubar}></div>
                    </div>
                    <div className={styles.globalMenu} id="GlobalMenu" >
                        {_headers.map(h => 
                            <div><h2>{h.Label}</h2></div>
                        )}
                        <div></div>
                    </div>
                </div>
            </div>

        );

    }

}