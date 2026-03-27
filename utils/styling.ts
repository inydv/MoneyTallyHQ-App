import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIdTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const [shortDimension, longDimension] =
  SCREEN_WIdTH < SCREEN_HEIGHT
    ? [SCREEN_WIdTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIdTH];

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      (shortDimension / guidelineBaseWidth) * (size as number),
    ),
  );

export const verticalScale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel(
      (longDimension / guidelineBaseHeight) * (size as number),
    ),
  );
