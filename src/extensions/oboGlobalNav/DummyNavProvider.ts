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

/**
 * Fake data provider for offline tests and debugging.
 **/
export class DummyNavProvider {

    //prevent this from being initialized twice
    static initialized: boolean = false;

    //initialize
    public static init(): Promise<any> {

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
                { ID: '2', Label: 'Organization', Url: '/', Restricted: false, IconName: "Org" },
                { ID: '3', Label: 'Applications', Url: '/', Restricted: false, IconName: "AppIconDefault" },
                { ID: '4', Label: 'Processes', Url: '/', Restricted: false, IconName: "Processing" },
                { ID: '5', Label: 'Resources', Url: '/', Restricted: false, IconName: "D365BusinessCentral" },
                { ID: '6', Label: 'Contact/Support', Url: '/', Restricted: false, IconName: "ContactList" }
            ];

            resolve(_categories);

        });

    }

    private static _menuItems: IGlobalNavItem[] = [];
    static get MenuItems(): IGlobalNavItem[] { return this._menuItems; }
    private static getMenuItems(): Promise<IGlobalNavItem[]> {

        return new Promise<IGlobalNavItem[]>((resolve, reject) => {

            const _menuItems: IGlobalNavItem[] = [
                { CategoryID: '2', ID: '7', ParentID: '', Label: 'Construction, Facility, and Security Management (CFSM)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '33', ParentID: '7', Label: 'Construction Management (CM)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '63', ParentID: '33', Label: 'Construction Operations (CO)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '64', ParentID: '33', Label: 'Construction Support (CS)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '34', ParentID: '7', Label: 'Security Management (SM)', Url: '/', Restricted: true },
                { CategoryID: '2', ID: '65', ParentID: '34', Label: 'Administrative Services (ASD)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '66', ParentID: '34', Label: 'Security Countermeasures (SCD)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '67', ParentID: '34', Label: 'Security Operations (SOD)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '8', ParentID: '', Label: 'Comptroller (COMP)', Url: '/', Restricted: true },
                { CategoryID: '2', ID: '35', ParentID: '8', Label: 'Financial Management (FM)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '36', ParentID: '8', Label: 'Policy and Program Analysis (P)', Url: '/', Restricted: false },
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
                { CategoryID: '2', ID: '43', ParentID: '13', Label: 'Facilities Management (FAC)', Url: '/', Restricted: true },
                { CategoryID: '2', ID: '50', ParentID: '43', Label: 'Asset Management & Transitions (AMT)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '51', ParentID: '43', Label: 'Facility Management Administration (FMA)', Url: '/', Restricted: true },
                { CategoryID: '2', ID: '52', ParentID: '43', Label: 'Maintenance Management (MM)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '53', ParentID: '43', Label: 'Program Management (PM)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '44', ParentID: '13', Label: 'Fire Protection (FIRE)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '60', ParentID: '44', Label: 'Fire Protection Analysis and Field Inspections (FPA)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '61', ParentID: '44', Label: 'Fire Protection Engineering (FPE)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '62', ParentID: '44', Label: 'Fire Protection Systems (FPS)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '45', ParentID: '13', Label: 'Residential Design and Furnishings (RDF)', Url: '/', Restricted: false },
                { CategoryID: '2', ID: '46', ParentID: '13', Label: 'Health, Safety and Health Administration (SHEM)', Url: '/', Restricted: true },
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

            resolve(_menuItems);

        });

    }

}