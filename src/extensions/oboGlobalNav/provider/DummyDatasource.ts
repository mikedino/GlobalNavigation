import { IGlobalNavCategory, IGlobalNavItem } from "./dsDefinitions";
import {setContext} from "../../../strings";

/**
 * Fake data provider for offline tests and debugging.
 **/
export class DummyDatasource {

    //prevent this from being initialized twice
    static initialized: boolean = false;

    //initialize
    public static init(context?:any): Promise<any> {

        // See if the page context exists
        if (context) {
            // Set the context
            setContext(context);
        }

        if (!this.initialized) { //ensure this was not already initialized
            //return a promise
            return new Promise<void>((resolve, reject) => {

                //get the categories
                this.getCategories().then((categories) => {
                    this._categories = categories;
                    console.log("Categories", this._categories)
                    //then get the menu items
                    this.getMenuItems().then((menuItems) => {
                        this._menuItems = menuItems;
                        console.log("MenuItems", this.MenuItems)
                        //set initialized flag
                        this.initialized = true;
                        resolve();
                    }, (error) => {
                        console.error("GlobalNav > getMenuItem error: " + error);
                        reject(error);
                    });
                }, (error2) => {
                    console.error("GlobalNav > getCategories error: " + error2);
                    reject(error2);
                });
            })

        } else return Promise.resolve(); //already initialized once

    }

    private static _categories: IGlobalNavCategory[] = [];
    static get Categories(): IGlobalNavCategory[] { return this._categories; }
    private static getCategories(): Promise<IGlobalNavCategory[]> {

        return new Promise<IGlobalNavCategory[]>((resolve, reject) => {

            const _categories: IGlobalNavCategory[] = [
                { ID: 2, Title: 'Organization', Url: '/', Restricted: false, IconName: "Org" },
                { ID: 3, Title: 'Applications', Url: '/', Restricted: false, IconName: "AppIconDefault" },
                { ID: 4, Title: 'Processes', Url: '/', Restricted: false, IconName: "Processing" },
                { ID: 5, Title: 'Resources', Url: '/', Restricted: false, IconName: "D365BusinessCentral" },
                { ID: 6, Title: 'Contact/Support', Url: '/', Restricted: false, IconName: "ContactList" }
            ];

            resolve(_categories);

        });

    }

    private static _menuItems: IGlobalNavItem[] = [];
    static get MenuItems(): IGlobalNavItem[] { return this._menuItems; }
    private static getMenuItems(): Promise<IGlobalNavItem[]> {

        return new Promise<IGlobalNavItem[]>((resolve, reject) => {

            const _menuItems: IGlobalNavItem[] = [
                { Category: { Title: 'Organization', Id: 2 }, ID: 7, Parent : { Title: 'na', Id: 0 }, Title: 'Construction, Facility, and Security Management (CFSM)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 33, Parent : { Title: 'CFSM', Id: 7 },  Title: 'Construction Management (CM)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 63, Parent : { Title: 'CM', Id: 33 },  Title: 'Construction Operations (CO)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 64, Parent : { Title: 'CM', Id: 33 }, Title: 'Construction Support (CS)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 34, Parent : { Title: 'CFSM', Id: 7 }, Title: 'Security Management (SM)', Url: '/', Restricted: true },
                { Category: { Title: 'Organization', Id: 2 }, ID: 65, Parent : { Title: 'SM', Id: 34 }, Title: 'Administrative Services (ASD)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 66, Parent : { Title: 'SM', Id: 34 },  Title: 'Security Countermeasures (SCD)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 67, Parent : { Title: 'SM', Id: 34 },  Title: 'Security Operations (SOD)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 8, Parent : { Title: 'na', Id: 0 },  Title: 'Comptroller (COMP)', Url: '/', Restricted: true },
                { Category: { Title: 'Organization', Id: 2 }, ID: 35, Parent : { Title: 'COMP', Id: 8 },  Title: 'Financial Management (FM)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 36, Parent : { Title: 'COMP', Id: 8 },  Title: 'Policy and Program Analysis (P)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 9, Parent : { Title: 'na', Id: 0 },  Title: 'External Affairs (EA)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 10, Parent : { Title: 'na', Id: 0 },  Title: 'Executive Director (EX)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 37, Parent : { Title: 'EX', Id: 10 }, Title: 'Human Resources (HR)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 38, Parent : { Title: 'EX', Id: 10 }, Title: 'Information Resource Management (IRM)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 39, Parent : { Title: 'EX', Id: 10 }, Title: 'Management Support Office (MSD)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 11, Parent : { Title: 'na', Id: 0 },  Title: 'Executive Office (EXEC)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 12, Parent : { Title: 'na', Id: 0 },  Title: 'Front Office (FO)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 13, Parent : { Title: 'na', Id: 0 },  Title: 'Operations (OPS)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 40, Parent : { Title: 'OPS', Id: 13 }, Title: 'Area Management (AM)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 41, Parent : { Title: 'OPS', Id: 13 }, Title: 'Art in Embassies (ART)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 42, Parent : { Title: 'OPS', Id: 13 }, Title: 'Cultural Heritage (CH)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 43, Parent : { Title: 'OPS', Id: 13 }, Title: 'Facilities Management (FAC)', Url: '/', Restricted: true },
                { Category: { Title: 'Organization', Id: 2 }, ID: 50, Parent : { Title: 'FAC', Id: 43 }, Title: 'Asset Management & Transitions (AMT)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 51, Parent : { Title: 'FAC', Id: 43 }, Title: 'Facility Management Administration (FMA)', Url: '/', Restricted: true },
                { Category: { Title: 'Organization', Id: 2 }, ID: 52, Parent : { Title: 'FAC', Id: 43 }, Title: 'Maintenance Management (MM)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 53, Parent : { Title: 'FAC', Id: 43 }, Title: 'Program Management (PM)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 44, Parent : { Title: 'OPS', Id: 13 }, Title: 'Fire Protection (FIRE)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 60, Parent : { Title: 'FIRE', Id: 44 }, Title: 'Fire Protection Analysis and Field Inspections (FPA)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 61, Parent : { Title: 'FIRE', Id: 44 }, Title: 'Fire Protection Engineering (FPE)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 62, Parent : { Title: 'FIRE', Id: 44 }, Title: 'Fire Protection Systems (FPS)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 45, Parent : { Title: 'OPS', Id: 13 }, Title: 'Residential Design and Furnishings (RDF)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 46, Parent : { Title: 'OPS', Id: 13 }, Title: 'Health, Safety and Health Administration (SHEM)', Url: '/', Restricted: true },
                { Category: { Title: 'Organization', Id: 2 }, ID: 14, Parent : { Title: 'na', Id: 0 },  Title: 'Program Development, Coordination, and Support (PDCS)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 15, Parent : { Title: 'na', Id: 0 },  Title: 'Planning and Real Estate (PRE)', Url: '/', Restricted: false },
                { Category: { Title: 'Organization', Id: 2 }, ID: 16, Parent : { Title: 'na', Id: 0 },  Title: 'Resource Management (RM)', Url: '/', Restricted: false },
                { Category: { Title: 'Apps', Id: 3 }, ID: 17, Parent : { Title: 'na', Id: 0 },  Title: 'Asset Management', Url: '/', Restricted: true },
                { Category: { Title: 'Apps', Id: 3 }, ID: 18, Parent : { Title: 'na', Id: 0 },  Title: 'BIMS', Url: '/', Restricted: false },
                { Category: { Title: 'Apps', Id: 3 }, ID: 19, Parent : { Title: 'na', Id: 0 },  Title: 'E2', Url: '/', Restricted: true },
                { Category: { Title: 'Apps', Id: 3 }, ID: 20, Parent : { Title: 'na', Id: 0 },  Title: 'FAC Apps', Url: '/', Restricted: true },
                { Category: { Title: 'Apps', Id: 3 }, ID: 21, Parent : { Title: 'na', Id: 0 },  Title: 'GFMS', Url: '/', Restricted: false },
                { Category: { Title: 'Processes', Id: 4 }, ID: 22, Parent : { Title: 'na', Id: 0 },  Title: 'SA Tracker', Url: '/', Restricted: false },
                { Category: { Title: 'Processes', Id: 4 }, ID: 23, Parent : { Title: 'na', Id: 0 },  Title: 'Project Authorization Documents (PAD)', Url: '/', Restricted: false },
                { Category: { Title: 'Procedures', Id: 5 }, ID: 24, Parent : { Title: 'na', Id: 0 },  Title: 'FSI (Training)', Url: '/', Restricted: false },
                { Category: { Title: 'Procedures', Id: 5 },  ID: 25, Parent : { Title: 'na', Id: 0 },  Title: 'Onboarding', Url: '/', Restricted: false },
                { Category: { Title: 'Procedures', Id: 5 },  ID: 26, Parent : { Title: 'na', Id: 0 },  Title: 'HR', Url: '/', Restricted: false },
                { Category: { Title: 'Procedures', Id: 5 },  ID: 27, Parent : { Title: 'na', Id: 0 },  Title: 'Policies & Procedures', Url: '/', Restricted: false },
                { Category: { Title: 'Procedures', Id: 5 },  ID: 28, Parent : { Title: 'na', Id: 0 },  Title: 'Telework Information', Url: '/', Restricted: false },
                { Category: { Title: 'Procedures', Id: 5 },  ID: 29, Parent : { Title: 'na', Id: 0 },  Title: 'Acronyms', Url: '/', Restricted: false },
                { Category: { Title: 'Support', Id: 6 },  ID: 30, Parent : { Title: 'na', Id: 0 },  Title: 'rOBO', Url: '/', Restricted: false },
                { Category: { Title: 'Support', Id: 6 },  ID: 31, Parent : { Title: 'na', Id: 0 },  Title: 'OBO SharePoint Support', Url: '/', Restricted: false },
                { Category: { Title: 'Support', Id: 6 },  ID: 32, Parent : { Title: 'na', Id: 0 },  Title: 'IT Service Center', Url: '/', Restricted: false }
            ];

            resolve(_menuItems);

        });

    }

}