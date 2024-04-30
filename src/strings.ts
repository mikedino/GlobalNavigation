import { ContextInfo, Helper } from "gd-sprest";

// Sets the context information
export const setContext = (context: any):void => {
    // Set the context
    ContextInfo.setPageContext(context.pageContext);

    // Load SP Core libraries
    Helper.loadSPCore().then(() => {
        // Update the source url
        Strings.TenantUrl = ContextInfo.portalUrl;
    });

}

/** Global Constants **/
const Strings = {
    ProjectName: "OBO Global Navigation",
    NavLinksSite: "TheLanding",
    CategoriesList: "GlobalNavCategory",
    MenuItemsList: "GlobalNavItem",
    FooterList: "GlobalNavFooter",
    //TenantUrl: ContextInfo.portalUrl,
    TenantUrl: "",
    Version: "0.1"
};

export default Strings;