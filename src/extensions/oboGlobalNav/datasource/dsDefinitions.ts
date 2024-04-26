export interface IGlobalNavCategory {
    ID: string;
    Label: string;
    Url: string;
    Restricted: boolean;
    IconName?: string;
}

export interface IGlobalNavItem extends IGlobalNavCategory {
    CategoryID: string;
    ParentID: string;
}