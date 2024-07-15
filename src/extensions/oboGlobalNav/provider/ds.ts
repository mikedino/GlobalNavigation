import { IGlobalNavCategory, IGlobalNavItem, IGlobalFooter } from "./dsDefinitions";
import { DummyDatasource } from "./DummyDatasource";
import Strings, { setContext } from "../../../strings";
import { Web } from "gd-sprest";

/**
 * Fake data provider for offline tests and debugging.
 **/
export class Datasource {

    //prevent this from being initialized twice
    static initialized: boolean = false;

    //initialize
    public static init(context?: any, isDebug?: boolean): Promise<any> {

        // See if the page context exists
        if (context) {
            // Set the context
            setContext(context);
        }

        if (!this.initialized) { //ensure this was not already initialized

            if (isDebug) {

                // get dummy data for debug
                return DummyDatasource.init().then(() => {
                    this._categories = DummyDatasource.Categories;
                    this._menuItems = DummyDatasource.MenuItems;
                    // get real footer data
                    return this.getFooterItems();
                }).then(() => {
                    //set initialized flag
                    this.initialized = true;
                });


            } else {
                //get SP list data
                //return a promise
                return new Promise<void>((resolve, reject) => {

                    //get the categories
                    this.getCategories().then(() => {
                        //console.log("Categories", this._categories)
                        //then get the menu items
                        this.getMenuItems().then(() => {
                            //console.log("MenuItems", this.MenuItems)
                            //then get the footer items
                            this.getFooterItems().then(() => {
                                //set initialized flag
                                this.initialized = true;
                                resolve();
                            },(error) => {
                                console.error(Strings.ProjectName, "[Datasource] getFooterItems error: " + JSON.stringify(error));
                                reject(error);
                            });
                        }, (error2) => {
                            console.error(Strings.ProjectName, "[Datasource] getMenuItems error: " + JSON.stringify(error2));
                            reject(error2);
                        });
                    }, (error3) => {
                        console.error(Strings.ProjectName, "[Datasource] getCategories error: " + JSON.stringify(error3));
                        reject(error3);
                    });
                })

            }

        } else {
            console.log(Strings.ProjectName, "tried to init the datasource again");
            return Promise.resolve(); //already initialized once
        }

    }

    private static _defaultExpandedKey: string = '';
    static get DefaultExpandedKey(): string { return this._defaultExpandedKey; }
    private static _categories: IGlobalNavCategory[] = [];
    static get Categories(): IGlobalNavCategory[] { return this._categories; }
    private static getCategories(): Promise<IGlobalNavCategory[]> {

        return new Promise<IGlobalNavCategory[]>((resolve, reject) => {

            // clear the categories
            this._categories = [];

            // load the data
            Web(`${Strings.TenantUrl}/sites/${Strings.NavLinksSite}`).Lists(Strings.CategoriesList).Items().query({
                GetAllItems: true,
                OrderBy: ["SortOrder"],
                Select: ["Title", "ID", "Url", "IconName", "SortOrder", "isHome", "defaultExpanded"]
            }).execute(
                // success
                items => {

                    // ensure items is defined and is not empty
                    if (items && items.results.length > 0) {

                        // Parse the items & set the categories
                        for (let i = 0; i < items.results.length; i++) {
                            const item: IGlobalNavCategory = items.results[i] as any;
                            this._categories.push({
                                ID: item.ID,
                                Title: item.Title,
                                Url: item.Url,
                                SortOrder: item.SortOrder,
                                IconName: item.IconName,
                                isHome: item.isHome,
                                defaultExpanded: item.defaultExpanded
                            })
                            if(item.defaultExpanded) this._defaultExpandedKey = item.ID.toString()
                        }

                        // resolve the requet
                        resolve(this._categories);

                    } else reject();

                }, (error) => reject(error)
            )

        });

    }

    private static _menuItems: IGlobalNavItem[] = [];
    static get MenuItems(): IGlobalNavItem[] { return this._menuItems; }
    private static getMenuItems(): Promise<IGlobalNavItem[]> {

        return new Promise<IGlobalNavItem[]>((resolve, reject) => {

            // clear the items
            this._menuItems = [];

            // load the data
            Web(`${Strings.TenantUrl}/sites/${Strings.NavLinksSite}`).Lists(Strings.MenuItemsList).Items().query({
                GetAllItems: true,
                OrderBy: ["Title"],
                Expand: ["Category", "Parent"],
                Select: ["Title", "ID", "Url", "SortOrder", "Restricted0", "Category/Id", "Category/Title", "Parent/Id", "Parent/Title"],
                Top: 5000
            }).execute(
                // success
                (items) => {

                    // ensure items is defined and is not empty
                    if (items && items.results.length > 0) {

                        // Parse the items & set the menu items
                        for (let i = 0; i < items.results.length; i++) {
                            const item = items.results[i] as any;
                            this._menuItems.push({
                                ID: item.ID,
                                Title: item.Title,
                                Url: item.Url,
                                SortOrder: item.SortOrder,
                                Restricted: item.Restricted0,
                                Category: {
                                    Id: item.Category.Id,
                                    Title: item.Category.Title
                                },
                                Parent: {
                                    Id: item.Parent.Id,
                                    Title: item.Parent.Title
                                }
                            });
                        }

                        // resolve the requet
                        resolve(this._menuItems);

                    } else reject();

                },
                //error
                (error) => { reject(error); console.error(Strings.ProjectName, "Error loading menu items: " + error); }
            )

        });

    }

    private static _footerItems: IGlobalFooter[] = [];
    static get FooterItems(): IGlobalFooter[] { return this._footerItems; }
    private static getFooterItems(): Promise<IGlobalFooter[]> {

        return new Promise<IGlobalFooter[]>((resolve, reject) => {

            // clear the items
            this._footerItems = [];

            // load the data
            Web(`${Strings.TenantUrl}/sites/${Strings.NavLinksSite}`).Lists(Strings.FooterList).Items().query({
                GetAllItems: true,
                OrderBy: ["SortOrder"],
                Select: ["Title", "Url", "SortOrder", "Position", "IconName"]
            }).execute(
                // success
                (items) => {

                    // ensure items is defined and is not empty
                    if (items && items.results.length > 0) {

                        // Parse the items & set the menu items
                        for (let i = 0; i < items.results.length; i++) {
                            const item: IGlobalFooter = items.results[i] as any;
                            this._footerItems.push({
                                ID: item.ID,
                                Title: item.Title,
                                Url: item.Url,
                                Position: item.Position,
                                SortOrder: item.SortOrder,
                                IconName: item.IconName
                            });
                        }

                        // resolve the requet
                        resolve(this._footerItems);

                    } else reject();

                },
                //error
                (error) => { reject(error); console.error(Strings.ProjectName, "Error loading footer items: " + error); }
            )

        });

    }

}