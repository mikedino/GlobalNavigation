import { IGlobalNavCategory, IGlobalNavItem } from "./dsDefinitions";

/**
 * Fake data provider for offline tests and debugging.
 **/
export class DummyDatasource {

    //initialize
    public static init(): Promise<any> {

        return new Promise<void>((resolve, reject) => {
            //get the categories
            this.getCategories().then(() => {
                //then get the menu items
                this.getMenuItems().then(() => {
                    resolve();
                }, reject)
            }, reject)
        })

    }

    private static _categories: IGlobalNavCategory[] = [];
    static get Categories(): IGlobalNavCategory[] { return this._categories; }
    private static getCategories(): Promise<IGlobalNavCategory[]> {

        return new Promise<IGlobalNavCategory[]>((resolve, reject) => {

            const _categories: IGlobalNavCategory[] = [
                { ID: 6, Title: 'OBO Home', Url: '/', Restricted: false, isHome: true, defaultExpanded: false, IconName: "Home", SortOrder: 1 },
                { ID: 1, Title: 'Organization', Url: '/', Restricted: false, isHome: false, defaultExpanded: true, IconName: "Org", SortOrder: 5 },
                { ID: 2, Title: 'Applications', Url: '/', Restricted: false, isHome: false, defaultExpanded: false, IconName: "AppIconDefault", SortOrder: 10 },
                { ID: 3, Title: 'Processes', Url: '/', Restricted: false, isHome: false, defaultExpanded: false, IconName: "Processing", SortOrder: 15 },
                { ID: 4, Title: 'Resources', Url: '/', Restricted: false, isHome: false, defaultExpanded: false, IconName: "D365BusinessCentral", SortOrder: 20 },
                { ID: 5, Title: 'Contact/Support', Url: '/', Restricted: false, isHome: false, defaultExpanded: false, IconName: "ContactList", SortOrder: 25 }
            ];
            this._categories = _categories;
            resolve(_categories);

        });

    }

    private static _menuItems: IGlobalNavItem[] = [];
    static get MenuItems(): IGlobalNavItem[] { return this._menuItems; }
    private static getMenuItems(): Promise<IGlobalNavItem[]> {

        return new Promise<IGlobalNavItem[]>((resolve, reject) => {

            const _menuItems: IGlobalNavItem[] = [
                { Category: { Title: 'Organization', Id: 1 }, ID: 7, Parent: { Title: undefined, Id: undefined }, Title: 'Construction, Facility, and Security Management (CFSM)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 33, Parent: { Title: 'CFSM', Id: 7 }, Title: 'Construction Management (CM)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 63, Parent: { Title: 'CM', Id: 33 }, Title: 'Construction Operations (CO)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 64, Parent: { Title: 'CM', Id: 33 }, Title: 'Construction Support (CS)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 34, Parent: { Title: 'CFSM', Id: 7 }, Title: 'Security Management (SM)', Url: '/', Restricted: true, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 65, Parent: { Title: 'SM', Id: 34 }, Title: 'Administrative Services (ASD)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 66, Parent: { Title: 'SM', Id: 34 }, Title: 'Security Countermeasures (SCD)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 67, Parent: { Title: 'SM', Id: 34 }, Title: 'Security Operations (SOD)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 8, Parent: { Title: undefined, Id: undefined }, Title: 'Comptroller (COMP)', Url: '/', Restricted: true, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 35, Parent: { Title: 'COMP', Id: 8 }, Title: 'Financial Management (FM)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 36, Parent: { Title: 'COMP', Id: 8 }, Title: 'Policy and Program Analysis (P)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 9, Parent: { Title: undefined, Id: undefined }, Title: 'External Affairs (EA)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 10, Parent: { Title: undefined, Id: undefined }, Title: 'Executive Director (EX)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 37, Parent: { Title: 'EX', Id: 10 }, Title: 'Human Resources (HR)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 38, Parent: { Title: 'EX', Id: 10 }, Title: 'Information Resource Management (IRM)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 39, Parent: { Title: 'EX', Id: 10 }, Title: 'Management Support Office (MSD)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 11, Parent: { Title: undefined, Id: undefined }, Title: 'Executive Office (EXEC)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 12, Parent: { Title: undefined, Id: undefined }, Title: 'Front Office (FO)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 13, Parent: { Title: undefined, Id: undefined }, Title: 'Operations (OPS)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 40, Parent: { Title: 'OPS', Id: 13 }, Title: 'Area Management (AM)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 41, Parent: { Title: 'OPS', Id: 13 }, Title: 'Art in Embassies (ART)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 42, Parent: { Title: 'OPS', Id: 13 }, Title: 'Cultural Heritage (CH)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 43, Parent: { Title: 'OPS', Id: 13 }, Title: 'Facilities Management (FAC)', Url: '/', Restricted: true, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 50, Parent: { Title: 'FAC', Id: 43 }, Title: 'Asset Management & Transitions (AMT)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 51, Parent: { Title: 'FAC', Id: 43 }, Title: 'Facility Management Administration (FMA)', Url: '/', Restricted: true, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 52, Parent: { Title: 'FAC', Id: 43 }, Title: 'Maintenance Management (MM)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 53, Parent: { Title: 'FAC', Id: 43 }, Title: 'Program Management (PM)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 44, Parent: { Title: 'OPS', Id: 13 }, Title: 'Fire Protection (FIRE)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 60, Parent: { Title: 'FIRE', Id: 44 }, Title: 'Fire Protection Analysis and Field Inspections (FPA)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 61, Parent: { Title: 'FIRE', Id: 44 }, Title: 'Fire Protection Engineering (FPE)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 62, Parent: { Title: 'FIRE', Id: 44 }, Title: 'Fire Protection Systems (FPS)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 45, Parent: { Title: 'OPS', Id: 13 }, Title: 'Residential Design and Furnishings (RDF)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: undefined, Id: undefined }, ID: 46, Parent: { Title: 'OPS', Id: 13 }, Title: 'Health, Safety and Health Administration (SHEM)', Url: '/', Restricted: true, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 14, Parent: { Title: undefined, Id: undefined }, Title: 'Program Development, Coordination, and Support (PDCS)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 15, Parent: { Title: undefined, Id: undefined }, Title: 'Planning and Real Estate (PRE)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 16, Parent: { Title: undefined, Id: undefined }, Title: 'Resource Management (RM)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Organization', Id: 1 }, ID: 99, Parent: { Title: undefined, Id: undefined }, Title: '*Dummy Datasource*', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Apps', Id: 2 }, ID: 17, Parent: { Title: undefined, Id: undefined }, Title: 'Asset Management', Url: '/', Restricted: true, SortOrder: 5 },
                { Category: { Title: 'Apps', Id: 2 }, ID: 18, Parent: { Title: undefined, Id: undefined }, Title: 'BIMS', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Apps', Id: 2 }, ID: 19, Parent: { Title: undefined, Id: undefined }, Title: 'E2', Url: '/', Restricted: true, SortOrder: 5 },
                { Category: { Title: 'Apps', Id: 2 }, ID: 20, Parent: { Title: undefined, Id: undefined }, Title: 'FAC Apps', Url: '/', Restricted: true, SortOrder: 5 },
                { Category: { Title: 'Apps', Id: 2 }, ID: 21, Parent: { Title: undefined, Id: undefined }, Title: 'GFMS', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Processes', Id: 3 }, ID: 22, Parent: { Title: undefined, Id: undefined }, Title: 'SA Tracker', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Processes', Id: 3 }, ID: 23, Parent: { Title: undefined, Id: undefined }, Title: 'Project Authorization Documents (PAD)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Procedures', Id: 4 }, ID: 24, Parent: { Title: undefined, Id: undefined }, Title: 'FSI (Training)', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Procedures', Id: 4 }, ID: 25, Parent: { Title: undefined, Id: undefined }, Title: 'Onboarding', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Procedures', Id: 4 }, ID: 26, Parent: { Title: undefined, Id: undefined }, Title: 'HR', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Procedures', Id: 4 }, ID: 27, Parent: { Title: undefined, Id: undefined }, Title: 'Policies & Procedures', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Procedures', Id: 4 }, ID: 28, Parent: { Title: undefined, Id: undefined }, Title: 'Telework Information', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Procedures', Id: 4 }, ID: 29, Parent: { Title: undefined, Id: undefined }, Title: 'Acronyms', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Support', Id: 5 }, ID: 30, Parent: { Title: undefined, Id: undefined }, Title: 'rOBO', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Support', Id: 5 }, ID: 31, Parent: { Title: undefined, Id: undefined }, Title: 'OBO SharePoint Support', Url: '/', Restricted: false, SortOrder: 5 },
                { Category: { Title: 'Support', Id: 5 }, ID: 32, Parent: { Title: undefined, Id: undefined }, Title: 'IT Service Center', Url: '/', Restricted: false, SortOrder: 5 }
            ];
            this._menuItems = _menuItems;
            resolve(_menuItems);

        });

    }

}