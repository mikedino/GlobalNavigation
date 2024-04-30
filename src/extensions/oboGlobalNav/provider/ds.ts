import { IGlobalNavCategory, IGlobalNavItem } from "./dsDefinitions";
import Strings, {setContext} from "../../../strings";
import { Web } from "gd-sprest";

/**
 * Fake data provider for offline tests and debugging.
 **/
export class Datasource {

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
                this.getCategories().then(() => {

                    //this._categories = categories;
                    console.log("Categories", this._categories)

                    //then get the menu items
                    this.getMenuItems().then(() => {

                        //this._menuItems = menuItems;
                        console.log("MenuItems", this.MenuItems)
                        //set initialized flag
                        this.initialized = true;
                        resolve();

                    }, (error) => {
                        console.error(Strings.ProjectName, "getMenuItem error: " + JSON.stringify(error));
                        reject(error);
                    });
                }, (error2) => {
                    console.error(Strings.ProjectName, "getCategories error: " + JSON.stringify(error2));
                    reject(error2);
                });
            })

        } else return Promise.resolve(); //already initialized once

    }

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
                Select: ["Title", "ID", "Url", "IconName", "SortOrder"]
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
                                Restricted: false
                            })    
                        }

                        // resolve the requet
                        resolve(this._categories);
                        
                    } else reject();
                },
                //error
                (error) => { reject(error); }
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

                    } else reject(); console.warn(Strings.ProjectName, "Warning: no menu items loaded in list")
                },
                //error
                (error) => { reject(error); console.error(Strings.ProjectName, "Error loading menu items: " + error); }
            )

        });

    }

}