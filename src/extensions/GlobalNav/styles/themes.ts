import { createTheme } from '@fluentui/react/lib/Styling';

export const lightTheme = createTheme({
    palette: {
        themePrimary: '#0078D4', // Adjust colors as needed
        themeLighterAlt: '#eff6fc',
        themeLighter: '#deecf9',
        themeLight: '#c7e0f4',
        themeTertiary: '#71afe5',
        themeSecondary: '#2b88d8',
        themeDarkAlt: '#106ebe',
        themeDark: '#005a9e',
        themeDarker: '#004578',
        neutralLighterAlt: '#f8f8f8',
        neutralLighter: '#f4f4f4',
        neutralLight: '#eaeaea',
        neutralQuaternaryAlt: '#dadada',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c8c8',
        neutralTertiary: '#c2c2c2',
        neutralSecondary: '#858585',
        neutralPrimaryAlt: '#4b4b4b',
        neutralPrimary: '#333333',
        neutralDark: '#272727',
        black: '#1d1d1d',
        white: '#ffffff',
    }
});


export const darkTheme = createTheme({
    palette: {
        themePrimary: '#289bbe',
        themeLighterAlt: '#095a8a',
        themeLighter: '#289bbe',
        themeLight: '#1a708f',
        themeTertiary: '#638991',
        themeSecondary: '#91c9d5',
        themeDarkAlt: '#688194',
        themeDark: '#289bbe',
        themeDarker: '#87bac5',
        neutralLighterAlt: '#454a52',
        neutralLighter: '#093e60',
        neutralLight: '#666e79',
        neutralQuaternaryAlt: '#092a41',
        neutralQuaternary: '#08283e',
        neutralTertiaryAlt: '#08263c',
        neutralTertiary: '#fdf4d8',
        neutralSecondary: '#dfecff',
        neutralPrimaryAlt: '#FAD980',
        neutralPrimary: '#ffffff',
        neutralDark: '#bea561',
        black: '#0A2240',
        white: '#275766' //search box fill
        //white: '#0a314d' darker blue
    }
});