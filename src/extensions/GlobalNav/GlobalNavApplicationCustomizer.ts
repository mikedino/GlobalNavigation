import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IGlobalNavProps } from './components/MenuProps';
import { IGlobalFooterProps } from './components/FooterProps';
import GlobalNav from './components/Menu';
import { GlobalFooter } from './components/Footer';
import { Datasource } from './provider/ds';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from "@microsoft/sp-application-base";
//import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GlobalNavApplicationCustomizerStrings';
import Strings from '../../strings';

import { override } from '@microsoft/decorators';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGlobalNavApplicationCustomizerProperties {
  /**
   * If isDebug=true then the customizer will use fake json data instead of
   * existing sharepoint list.
   * Note: that property in the debug url queryString should be:
   *                  GOOD:{"isDebug":false}
   *                  WRONG: {"isDebug":"false"}
   */
  isDebug: boolean;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GlobalNavApplicationCustomizer
  extends BaseApplicationCustomizer<IGlobalNavApplicationCustomizerProperties> {

  // global variable
  private _navbar: PlaceholderContent | any = null;
  private _footer: PlaceholderContent | any = null;

  @override
  public async onInit(): Promise<void> {
    Log.info(Strings.ProjectName, `Initialized ${strings.Title}`);

    // Handle possible changes on the existence of placeholders
    //this.context.placeholderProvider.changedEvent.add(this, this.renderGlobalNav);

    Datasource.init(this.context, this.properties.isDebug).then(
      //data successfully loaded
      () => {
        Log.info(Strings.ProjectName, "DataProvider > init() ran successfully");

        this.renderGlobalNav().then(() => {
          return Promise.resolve();
        }).catch(error => {
          Log.warn(Strings.ProjectName, "Error rendering Global Nav " + JSON.stringify(error));
        });
      }
    ).catch(error => {
      Log.warn(Strings.ProjectName, "Error initializing data source " + JSON.stringify(error));
  });

  }

  private async renderGlobalNav(): Promise<void> {

    // Ensure the header doesn't exist already
    if (this._navbar === null) {

      // Create the header
      this._navbar = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
      Log.info(Strings.ProjectName, "created the header");

      const navElement: React.ReactElement<IGlobalNavProps> = React.createElement(
        GlobalNav,
        {
          isExpanded: false,
          categories: Datasource.Categories,
          menuitems: Datasource.MenuItems,
          defaultExpandedKey: Datasource.DefaultExpandedKey
        }
      );

      // render the Nav UI using a React component
      await new Promise<void>((resolve, reject) => {
        try {
          ReactDom.render(navElement, this._navbar.domElement, () => { Log.info(Strings.ProjectName, "render the header"); resolve() });
        } catch (error) {
          console.error(error);
          Log.error(Strings.ProjectName, error);
          reject(error);
        }
      });

    } else {
      //unmount existing ones if they exist
      ReactDom.unmountComponentAtNode(this._navbar.domElement);
      this._navbar = undefined;
    }

    // Ensure the footer doesn't exist already
    if (this._footer === null) {
      // Create the footer
      this._footer = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
      Log.info(Strings.ProjectName, "created the footer");

      const footerElement: React.ReactElement<IGlobalFooterProps> = React.createElement(
        GlobalFooter,
        {
          footerItems: Datasource.FooterItems
        }
      );

      // render the Footer UI using a React component
      await new Promise<void>((resolve, reject) => {
        try {
          ReactDom.render(footerElement, this._footer.domElement, () => { Log.info(Strings.ProjectName, "render the footer"); resolve() });
        } catch (error) {
          console.error(error);
          Log.error(Strings.ProjectName, error);
          reject(error);
        }
      });

    } else {
      //unmount existing ones if they exist
      ReactDom.unmountComponentAtNode(this._footer.domElement);
      this._footer = undefined;
    }

    return Promise.resolve();

  }

  private _onDispose(): void {
    Log.info(Strings.ProjectName, "Global navigation disposed");

  }

}