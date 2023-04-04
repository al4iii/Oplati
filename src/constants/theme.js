import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
    // base colors
    primary: "#38B8E0",
    secondary: "#a8e8f7",
    // colors
    gray: "#787880",
    grayLight: "#D4D4D4",
    grayLight2: "#E5E5E5",
    black: "#1E1F20",
    white: "#FFFFFF",
    red: "#D64641",
};

export const SIZES = {
    // global sizes
    radius: 8,
    padding: 10,
    padding1: 16,
    padding2: 12,
    margin: 16,
    // font sizes
    largeTitle: 50,
    h1: 25,
    h2: 20,
    h3: 17,
    h4: 15,
    h5: 11,
    body1: 15,
    body2: 14,
    body3: 12,
    body4: 11,
    body5: 10,
    body6: 13,
    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 55 },
    h2: { fontFamily: 'SFProDisplay-Black', fontSize: SIZES.h2, lineHeight: 22 },
    h3: { fontFamily: 'SFProDisplay-Bold', fontSize: SIZES.h3, lineHeight: 20.29 },
    h5: { fontFamily: 'SFProDisplay-Semibold', fontSize: SIZES.body6, lineHeight: 18 },
    body1: { fontFamily: 'SFProDisplay-Regular', fontSize: SIZES.body1, lineHeight: 17.9 },

};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
