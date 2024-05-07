import { IGlobalNavCategory, IGlobalNavItem } from "../provider/dsDefinitions";

export interface IGlobalNavProps {
    isExpanded: boolean;
    categories: IGlobalNavCategory[];
    menuitems: IGlobalNavItem[];
}