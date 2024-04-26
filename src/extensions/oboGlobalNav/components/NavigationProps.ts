import { IGlobalNavCategory, IGlobalNavItem } from "../datasource/dsDefinitions";

export interface IGlobalNavProps {
    isExpanded: boolean;
    categories: IGlobalNavCategory[];
    menuitems: IGlobalNavItem[];
}