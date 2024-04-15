import { INavTopLevelItem, INavChild } from "./GlobalNavModel";

/**
 * Dummy data provider for offline tests.
 */
export class DummyDataProvider {

    // Initializes the application
    public static init(): PromiseLike<any> {

        // Return a promise
        return new Promise((resolve, reject) => {

            //Get the data
            this.getTopLevel().then(() => {
                // Then load the links list data
                this.getChildren().then(resolve, reject);
            }, reject);

        });
    }

    private static _topNavItems: INavTopLevelItem[] = [];
    static get TopNavItems(): INavTopLevelItem[] { return this._topNavItems; }
    private static getTopLevel(): Promise<INavTopLevelItem[]> {
        return new Promise<INavTopLevelItem[]>((resolve, reject) => {

            const _topNavItems: INavTopLevelItem[] = [
                {
                    id: 1,
                    title: "OBO/CFSM",
                    tooltip: "Directorate of Construction, Facility, and Security Management",
                    url: "#",
                    order: 1
                },
                {
                    id: 8,
                    title: "OBO/COMP",
                    tooltip: "Comptroller",
                    url: "#",
                    order: 2
                }

            ];

            resolve(_topNavItems);
        });
    }

    private static _navChildren: INavChild[] = [];
    static get NavChildren(): INavChild[] { return this._navChildren; }
    private static getChildren(): Promise<INavChild[]> {
        return new Promise<INavChild[]>((resolve, reject) => {

            const _navChildren: INavChild[] = [
                {
                    id: 2,
                    title: "OBO/CFSM/CM",
                    tooltip: "long description",
                    url: "#",
                    order: 1,
                    isCategory: false,
                    parent: 1,
                    items: [
                        { id: 3, title: "OBO/CFSM/CM/CO", tooltip: "long description", url: "#", order: 1 },
                        { id: 3, title: "OBO/CFSM/CM/CS", tooltip: "long description", url: "#", order: 2 }
                    ]
                },
                {
                    id: 4,
                    title: "OBO/CFSM/SM",
                    tooltip: "long description",
                    url: "#",
                    order: 2,
                    isCategory: false,
                    parent: 1,
                    items: [
                        { id: 5, title: "OBO/CFSM/SM/ASD", tooltip: "long description", url: "#", order: 1 },
                        { id: 6, title: "OBO/CFSM/SM/SCD", tooltip: "long description", url: "#", order: 2 },
                        { id: 7, title: "OBO/CFSM/SM/SOD", tooltip: "long description", url: "#", order: 3 },
                    ]
                },
                {
                    id: 9,
                    title: "OBO/COMP/FM/CB",
                    tooltip: "long description",
                    url: "#",
                    order: 1,
                    isCategory: true,
                    parent: 8,
                    items: [
                        { id: 10, title: "OBO/COMP/FM/FO", tooltip: "long description", url: "#", order: 1 },
                        { id: 12, title: "OBO/COMP/FM/FPC", tooltip: "long description", url: "#", order: 2 },
                        { id: 13, title: "OBO/COMP/FM/OB", tooltip: "long description", url: "#", order: 3 },
                    ]
                },
                {
                    id: 14,
                    title: "OBO/COMP/P",
                    tooltip: "long description",
                    url: "#",
                    order: 2,
                    isCategory: true,
                    parent: 8,
                    items: [
                        { id: 15, title: "OBO/COMP/P/O", tooltip: "long description", url: "#", order: 1 },
                        { id: 16, title: "OBO/COMP/P/PSP", tooltip: "long description", url: "#", order: 2 }
                    ]
                }
            ];

            resolve(_navChildren);
        });
    }
}