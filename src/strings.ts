import { ContextInfo, Helper } from "gd-sprest";

// Sets the context information
export const setContext = (context: any):void => {
    // Set the context
    ContextInfo.setPageContext(context.pageContext);

    // Load SP Core libraries
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Helper.loadSPCore().then(() => {
        // Update the source url
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        Strings.TenantUrl = ContextInfo.portalUrl;
    })
}

/** Global Constants **/
/** must come after setContext despite warnings or else the blanks will not
 * be set before they are used.
 */
const Strings = {
    ProjectName: "Koniag Enterprise Navigation",
    NavLinksSite: "Nav-Sandbox",
    CategoriesList: "GlobalNavCategory",
    MenuItemsList: "GlobalNavItem",
    FooterList: "GlobalNavFooter",
    TenantUrl: "https://koniaggs.sharepoint.com",
    SearchPlaceholder: "Search Koniag Enterprise Navigation",
    HamburgerTooltip: "Enterprise Navigation",
    Version: "1.0.1" 
};

export default Strings;