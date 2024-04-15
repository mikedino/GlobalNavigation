import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DummyDataProvider } from './DummyDataProvider';
//import GlobalNavComponent from './GlobalNav';
//import { INavProps } from './GlobalNavState';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from "@microsoft/sp-application-base";
//import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'OboGlobalNavApplicationCustomizerStrings';
import Strings from '../../strings';

const LOG_SOURCE: string = 'OboGlobalNavApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IOboGlobalNavApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class OboGlobalNavApplicationCustomizer
  extends BaseApplicationCustomizer<IOboGlobalNavApplicationCustomizerProperties> {

  // global variable
  private _navbar:PlaceholderContent | any = null;


  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Handle possible changes on the existence of placeholders
    this.context.placeholderProvider.changedEvent.add(this, this.renderGlobalNav);

    // Render the navbars
    this.renderGlobalNav()

    return Promise.resolve();
  }

  private renderGlobalNav(): Promise<void>  {

    // Ensure the header doesn't exist already
    if (!this._navbar) {

      Log.info(strings.Title, `Top placeholder is present`);

      // Create the header
      this._navbar = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
      Log.info(strings.Title, `created the content`);

      DummyDataProvider.init().then(
        // Data successfully loaded
        () => {

          Log.info(Strings.ProjectName, "data successfully loaded");
          
          /*const element: React.ReactElement<INavProps> = React.createElement(
            GlobalNavComponent,
            {
              navBarItems: DummyDataProvider.TopNavItems,
              navBarChildren: DummyDataProvider.NavChildren
            }
          );
          */

          const element: React.ReactElement<any> = React.createElement(
            'div',
            null,
            "<h1>Hello from Top Placeholder!</h1>"
          );

          /*{
                      DummyDataProvider. .map(item => {
                          return <DefaultButton title={item.title} text={item.tooltip} ariaLabel={item.title} />
                      })
                  }*/
                
          // render the UI using a React component
          try {
    
            ReactDom.render(element, this._navbar.domElement);
            Log.info(strings.Title, `[${Strings.ProjectName}] rendered the DOM`);
            return Promise.resolve();
    
          } catch (error) {
            
            console.error(error);
            Log.error(strings.Title, error);
            return Promise.reject();
    
          }
      },
      // Error (data not loaded)
      (err) => {
        Log.warn(Strings.ProjectName, "Error loading Datasource" + err);
      });

    }

    return Promise.resolve();
  }

  private _onDispose(): void {
    console.log(`[${Strings.ProjectName}] Global navigation disposed`);
  }

}