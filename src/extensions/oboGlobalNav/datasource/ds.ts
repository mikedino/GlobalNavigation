import { IGlobalNavCategory, IGlobalNavItem } from "./dsDefinitions";
import Strings from "../../../strings";
import { Web } from "gd-sprest";

/**
 * Fake data provider for offline tests and debugging.
 **/
export class Datasource {

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

            // clear the categories
            this._categories = [];

            // load the data
            Web(`${Strings.TenantUrl}/sites/${Strings.NavLinksSite}`).Lists(Strings.CategoriesListName).Items().query({
                GetAllItems: true,
                OrderBy: ["SortOrder"],
                Select: ["Title", "ID", "Url", "IconName"]
            }).execute(
                // success
                items => {

                    // ensure there are items
                    if (items) {

                        // Parse the items
                        for (let i = 0; i < items.results.length; i++) {
                            let item: IGlobalNavCategory = items.results[i] as any;
                            this._categories.push({
                                ID: item.ID,
                                Title: item.Title,
                                Url: item.Url,
                                Restricted: false
                            })

                            // resolve the requet
                            resolve(this._categories);
                        }
                    } else reject(); console.error(Strings.ProjectName, "No categories loaded in list")
                },
                //error
                (error) => { reject(error); console.log(Strings.ProjectName, "Error loading categories: " + error); }
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
            Web(`${Strings.TenantUrl}/sites/${Strings.NavLinksSite}`).Lists(Strings.MenuItemsListName).Items().query({
                GetAllItems: true,
                OrderBy: ["SortOrder"],
                Expand: [ "Category", "Parent"],
                Select: ["Title", "ID", "Url", "Restricted", "Category/Id", "Parent/Id"],
                Top: 5000
            }).execute(
                // success
                items => {

                    // ensure there are items
                    if (items) {

                        this._menuItems = items.results as any;
                        
                    } else reject(); console.error(Strings.ProjectName, "No menu items loaded in list")
                },
                //error
                (error) => { reject(error); console.log(Strings.ProjectName, "Error loading menu items: " + error); }
            )

        });

    }

}