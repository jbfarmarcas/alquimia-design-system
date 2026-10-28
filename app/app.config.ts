import {
  adsButtonTheme,
  adsCalendarTheme,
  adsInputDateTheme,
  adsInputTheme,
  adsSelectMenuTheme,
  adsSelectTheme,
  adsToastTheme,
  adsToasterTheme,
  adsTooltipTheme,
} from "./theme/ads-theme";

export default defineAppConfig({
  ui: {
    button: adsButtonTheme,
    input: adsInputTheme,
    inputDate: adsInputDateTheme,
    calendar: adsCalendarTheme,
    select: adsSelectTheme,
    selectMenu: adsSelectMenuTheme,
    toast: adsToastTheme,
    toaster: adsToasterTheme,
    tooltip: adsTooltipTheme,
  },
});
