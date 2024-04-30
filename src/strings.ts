import { ContextInfo, Helper } from "gd-sprest";

// Sets the context information
export const setContext = (context: any) => {
    // Set the context
    ContextInfo.setPageContext(context.pageContext);

    // Load SP Core libraries
    Helper.loadSPCore();

    // Update the source url
    Strings.TenantUrl = ContextInfo.webServerRelativeUrl;
}


/** Global Constants **/
const Strings = {
    ProjectName: "OBO Global Navigation",
    NavLinksSite: "TheLanding",
    CategoriesListName: "GlobalNavCategory",
    MenuItemsListName: "GlobalNavItem",
    TenantUrl: ContextInfo.portalUrl,
    Version: "0.1"
};

export default Strings;