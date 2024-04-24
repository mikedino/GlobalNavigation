import * as React from 'react';
import * as ReactDom from 'react-dom';
import { INavProps } from './NavComponent';
import GlobalNav from './NavComponent';
import { GlobalFooter } from './FooterComponent';
import { DummyNavProvider } from './DummyNavProvider';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from "@microsoft/sp-application-base";
//import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'OboGlobalNavApplicationCustomizerStrings';
import Strings from '../../strings';
import 'bootstrap/dist/css/bootstrap.min.css';
import { override } from '@microsoft/decorators';


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
  private _navbar: PlaceholderContent | any = null;
  private _footer: PlaceholderContent | any = null;

  @override
  public async onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Handle possible changes on the existence of placeholders
    //this.context.placeholderProvider.changedEvent.add(this, this.renderGlobalNav);

    DummyNavProvider.init().then(
      //data successfully loaded
      () => {
        Log.info(Strings.ProjectName, "DataProvider > init() ran successfully");

        this.renderGlobalNav().then(() => {
          return Promise.resolve();
        });

      },
      //error loading data
      error => {
        Log.warn(Strings.ProjectName, "error loading Datasource" + error);

        return Promise.reject();
      }
    )

  }


  private async renderGlobalNav(): Promise<void> {

    // Ensure the header doesn't exist already
    if (!this._navbar) {

      // Create the header
      this._navbar = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
      Log.info(Strings.ProjectName, "created the header");

      const navElement: React.ReactElement<INavProps> = React.createElement(
        GlobalNav,
        {
          isExpanded: false,
          categories: DummyNavProvider.Categories,
          menuitems: DummyNavProvider.MenuItems
        }
      );

      // render the Nav UI using a React component
      await new Promise<void>((resolve, reject) => {
        try {
          ReactDom.render(navElement, this._navbar.domElement, () => { console.log("render the header"); resolve() });
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
    if (!this._footer) {
      // Create the footer
      this._footer = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
      Log.info(Strings.ProjectName, "created the footer");

      const footerElement: React.ReactElement = React.createElement(
        GlobalFooter
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