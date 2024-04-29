import { ContextInfo, Helper } from "gd-sprest";

// Sets the context information
// This is for SPFx or Teams solutions
export const setContext = (context: any, sourceUrl?: string) => {
    // Set the context
    ContextInfo.setPageContext(context.pageContext);

    // Load SP Core libraries
    Helper.loadSPCore();

    // Update the source url
    Strings.TenantUrl = sourceUrl || ContextInfo.webServerRelativeUrl;
}


/** Global Constants **/
const Strings = {
    ProjectName: "OBO Global Navigation",
    NavLinksSite: "TheLanding",
    CategoriesListName: "GlobalNavCategory",
    MenuItemsListName: "GlobalNavItem",
    TenantUrl: ContextInfo.siteAbsoluteUrl,
    Version: "0.1"
};

export default Strings;