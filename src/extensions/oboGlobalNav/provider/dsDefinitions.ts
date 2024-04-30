export interface IGlobalNavCategory {
    ID: number;
    Title: string;
    Url: string;
    Restricted: boolean; 
    // "Restricted" is technically not needed for categories, and doesn't "do" anything on them but I'm using
    // it for the click actions on both the categories AND the child items so I can use this
    // interface for both instead of writing 2 functions or complex logic for 2nd level clicks
    IconName?: string;
}

export interface IGlobalNavItem extends IGlobalNavCategory {
    //CategoryID: string;
    //ParentID: string;
    Category: {
        Id: number;
        Title: string;
    };
    Parent?: {
        Id: number;
        Title: string;
    };
}