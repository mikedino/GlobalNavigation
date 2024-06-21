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

import * as strings from 'OboGlobalNavApplicationCustomizerStrings';
import Strings from '../../strings';

import { override } from '@microsoft/decorators';

export interface IOboGlobalNavApplicationCustomizerProperties {
  isDebug: boolean;
}

export default class OboGlobalNavApplicationCustomizer
  extends BaseApplicationCustomizer<IOboGlobalNavApplicationCustomizerProperties> {

  private _navbar: PlaceholderContent | undefined = undefined;
  private _footer: PlaceholderContent | undefined = undefined;

  @override
  public async onInit(): Promise<void> {
    Log.info(Strings.ProjectName, `Initialized ${strings.Title}`);

    try {
      await Datasource.init(this.context, this.properties.isDebug);
      Log.info(Strings.ProjectName, "DataProvider > init() ran successfully");

      await this.renderGlobalNav();
    } catch (error) {
      Log.warn(Strings.ProjectName, `Error initializing or rendering Global Nav: ${JSON.stringify(error)}`);
    }
  }

  private async renderGlobalNav(): Promise<void> {
    try {
      // Ensure the header doesn't exist already
      if (!this._navbar) {
        this._navbar = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this._onDispose });
        Log.info(Strings.ProjectName, "Created the header");

        const navElement: React.ReactElement<IGlobalNavProps> = React.createElement(
          GlobalNav,
          {
            isExpanded: false,
            categories: Datasource.Categories,
            menuitems: Datasource.MenuItems,
            defaultExpandedKey: Datasource.DefaultExpandedKey
          }
        );

        await this.renderElement(navElement, this._navbar!.domElement);
      }

      // Ensure the footer doesn't exist already
      if (!this._footer) {
        this._footer = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, { onDispose: this._onDispose });
        Log.info(Strings.ProjectName, "Created the footer");

        const footerElement: React.ReactElement<IGlobalFooterProps> = React.createElement(
          GlobalFooter,
          {
            footerItems: Datasource.FooterItems
          }
        );

        await this.renderElement(footerElement, this._footer!.domElement);
      }
    } catch (error) {
      Log.warn(Strings.ProjectName, `Error rendering Global Nav/Footer: ${JSON.stringify(error)}`);
    }
  }

  private async renderElement(element: React.ReactElement, domElement: HTMLElement): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      try {
        ReactDom.render(element, domElement, () => {
          Log.info(Strings.ProjectName, "Component rendered");
          resolve();
        });
      } catch (error) {
        console.error(error);
        Log.error(Strings.ProjectName, error);
        reject(error);
      }
    });
  }

  private _onDispose(): void {
    Log.info(Strings.ProjectName, "Global navigation disposed");

    if (this._navbar) {
      ReactDom.unmountComponentAtNode(this._navbar.domElement);
      this._navbar = undefined;
    }

    if (this._footer) {
      ReactDom.unmountComponentAtNode(this._footer.domElement);
      this._footer = undefined;
    }
  }
}
