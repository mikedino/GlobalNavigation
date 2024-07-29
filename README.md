# OBO Enterprise Navigation 

## Summary

Application Extension that provides a global navigation as a hamburger menu which has an accordion and search function.  Items are data-driven from an SP List defined in the Strings.

Creates a fixed footer with a logo, center links and support link on the right.  This data is also data-driven.

[pictures forthcoming...]

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.18.2-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> The following lists (and columns) must be created and on the current site:
  - GlobalNavCategory
    * Title
    * Url
    * IconName
    * SortOrder
    * isHome (boolean)
    * defaultExpanded (boolean)
  - GlobalNavItem
    * Title
    * Url
    * Restricted (boolean)
    * SortOrder
    * Category (lookup)
    * Parent (lookup)

NOTE:  The Development branch is only for local development and contains the client-side assets.  The main branch 
does not include the client-side assets.  Those are hosted in the Azure CDN here: https://obo.azureedge.us

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| GlobalNav   | Mike Landino, Koniag Government Services                |

## Version history

| Version | Date             | Comments                                                                                                         |
| ------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1.0     | May 1, 2024      | Initial release                                                                                                  |
| 1.0.4   | June 13, 2024    | Add Bootstrap wrapper to these components in order to limit effect on rest of SPO site.                          |
| 1.0.5   | June 24, 2024    | Bug Fix for menu displaying twice on occasion.  Dispose of component properly.                                   |
| 1.0.6   | July 15, 2024    | Change click action of nested children to display as accordions. Update search results to show infinite levels.  |
| 1.0.7   | July 29, 2024    | Add "Menu" text to the right of the pancake icon                                                                 |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
