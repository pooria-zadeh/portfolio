import { Localization } from "@/i18n/types";
import themeObj from "@/theme/themeObject";
import { Variants, Weights } from "@/theme/typographySettings";
import { IconProps } from "src/assets/icons/SvgIcon";
import { StyledComponent } from "@emotion/styled";
import { breakpointsKeys } from "@/theme/breakpoint";

type Palette = keyof typeof themeObj["palette"];
type Degree =
  | keyof typeof themeObj["palette"]["primary"]
  | keyof typeof themeObj["palette"]["info"];

declare global {
  type AppLanguages = "en" | "fr" | "es" | "fa" | "ar";
  type AppDir = "ltr" | "rtl";

  type AppOptions = {
    value: string | number;
    option: string | number;
  };
  type ArrayOptionLoading = Array<AppOptions> | "loading";

  type AppCommonChild = { children: React.ReactNode };
  
  type AppLocalization = {
    localization: Localization;
  };

  type AppBaseColorType = {
    palette?: Palette;
    degree?: Degree;
  };

  type AppTypographyVariant = {
    variant?: Variants;
  };
  type AppScaleVariant = {
    scale?: "tiny" | "xsmall" | "small" | "medium" | "large" | "xlarge";
  };
  type AppTypographyWeight = {
    fontWeight?: Weights;
  };
  type AppTypographyProperty = {
    align?: Property.TextAlign;
  };

  type CommonIconProps = IconProps;

  type AppBreakpointKeys = keyof typeof breakpointsKeys;

  type AppStyledComponent<T> = StyledComponent<T>;
}
