import { INavTopLevelItem, INavChild } from "./GlobalNavModel";

export interface INavProps {
    navBarItems: INavTopLevelItem[];
    navBarChildren: INavChild[];
}

export interface INavState {
    //holds all the parent items
    navBarItems: INavTopLevelItem[];
    //holds all the children items
    navBarChildren: INavChild[];
}