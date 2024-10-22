# Enterprise Navigation (Hamburger Menu)

## Summary

Application Extension that provides a global navigation as a hamburger menu which has an accordion and search function.  Items are data-driven from an SP List defined in the Strings.

Also creates a fixed footer with a logo, center links and support link on the right.  This data is also data-driven.

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


## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| GlobalNav   | Mike Landino, Koniag Government Services                |

## Version history

| Version | Date             | Comments                                                                                                         |
| ------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1.0.5   | Oct 22, 2024     | Initial release                                                                                                  |

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

Example of the menu while expanded 
![ScreenShot](/src/screenshots/MenuScreenshot.PNG)

Example of the fixed footer 
![ScreenShot](/src/screenshots/FooterScreenshot.PNG)

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
