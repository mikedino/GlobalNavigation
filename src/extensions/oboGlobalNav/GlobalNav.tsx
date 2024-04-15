import * as React from 'react';
import { DefaultButton } from "@fluentui/react";
//import { Callout } from "office-ui-fabric-react/lib/Callout";
import { INavProps, INavState } from './GlobalNavState';

export default class GlobalNavComponent extends React.Component<INavProps, INavState> {

    constructor(props: INavProps) {
        super(props);

        this.state = {
            navBarItems: props.navBarItems,
            navBarChildren: props.navBarChildren,
        };
    }

    /*
    public getAllNavItems(): void {

        //component is loaded - set the items
        this.setState((prevState: INavState, props: INavProps): INavState => {
            prevState.navBarItems = DummyDataProvider.TopNavItems;
            prevState.navBarChildren = DummyDataProvider.NavChildren;
            return prevState;
        });

    }
    */

    public render(): React.ReactElement<INavProps> {
        return (
            <div>
                {
                    this.state.navBarItems.map(item => {
                        return <DefaultButton title={item.title} text={item.tooltip} ariaLabel={item.title} />
                    })
                }
            </div>
        );
    }
}