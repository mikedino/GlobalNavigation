export interface INavTopLevelItem {
    id: number,
    title: string,
    tooltip: string,
    url: string,
    order: number
}

export interface INavChild extends INavTopLevelItem {
    items: INavTopLevelItem[],
    parent: number,
    isCategory: boolean
}