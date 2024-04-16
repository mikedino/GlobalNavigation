import * as React from 'react';
import styles from './GlobalNavStyles.module.scss';
import { Icon } from '@fluentui/react/lib/Icon'; 

export class GlobalFooter extends React.Component<any> {

    public render(): React.ReactElement<any> {

        return (
            <div className={styles.footer}>
                <div className={styles.home}>
                    <div className={styles.homeLogo}>
                        <img title="Bureau of Overseas Building Operations" src="https://1g518n.sharepoint.com/_api/siteiconmanager/getsitelogo?siteurl='https://1g518n.sharepoint.com/sites/1g518n'" />
                    </div>
                </div>
                <div className={styles.stickyLinks}>
                    <div><a href="https://seirmprod3.servicenowservices.com/obo">rOBO</a></div>
                    <div><a href="mailto:obosharepoint.state.gov">OBO SharePoint Support</a></div>
                    <div><a href="https://myapps.microsoft.com/">My Apps Dashboard</a></div>
                </div>
                <div className={styles.support}>
                    <div>
                        <div><Icon iconName='Headset' /></div>
                        <div>IT Service Center (202.647.2000)</div>
                    </div>
                </div>
            </div>
        );

    }
}