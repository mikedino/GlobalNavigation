//import * as React from 'react';
//import * as ReactDom from 'react-dom';
//import { DummyDataProvider } from './DummyDataProvider';
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
  private _footer:PlaceholderContent | any = null;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Handle possible changes on the existence of placeholders
    this.context.placeholderProvider.changedEvent.add(this, this.renderGlobalNav);

    // Render the navbars
    this.renderGlobalNav()

    return Promise.resolve();
  }

  private renderGlobalNav() {

    // Ensure the header doesn't exist already
    if (!this._navbar) {

      // Create the header
      this._navbar = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });      
      
    }

    // Ensure the footer doesn't exist already
    if (!this._footer) {
      // Create the footer
      this._footer = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
    }

  }

  private _onDispose(): void {
    console.log(`[${Strings.ProjectName}] Global navigation disposed`);
  }

}