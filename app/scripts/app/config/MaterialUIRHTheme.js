/*
 Refer to light theme source
 https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js
 */

import {
  grey100, grey200, grey300, grey400, grey500,
  white, darkBlack, fullBlack
} from 'material-ui/styles/colors';
import ColorManipulator from 'material-ui/utils/colorManipulator';

export default {
  spacing   : {
    iconSize                     : 24,
    desktopGutter                : 24,
    desktopGutterMore            : 32,
    desktopGutterLess            : 16,
    desktopGutterMini            : 8,
    desktopKeylineIncrement      : 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize  : 15,
    desktopLeftNavMenuItemHeight : 48,
    desktopSubheaderHeight       : 48,
    desktopToolbarHeight         : 56
  },
  fontFamily: "'Open sans', sans-serif",
  palette   : {
    primary1Color     : 'rgb(3, 65, 82)',
    primary2Color     : 'rgb(11, 122, 134)',
    primary3Color     : 'rgb(58, 1, 127)',
    accent1Color      : 'rgb(22, 185, 225)',
    accent2Color      : grey100,
    accent3Color      : grey500,
    textColor         : 'rgb(30, 30, 30)',
    alternateTextColor: white,
    canvasColor       : white,
    borderColor       : grey300,
    disabledColor     : grey500,
    pickerHeaderColor : 'rgb(3, 65, 82)',
    clockCircleColor  : grey500,
    shadowColor       : 'rgb(30, 30, 30)'
  }
};