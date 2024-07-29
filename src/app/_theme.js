const THEME = {
  borderRadius: 6,
  borderRadiusLG: 8,
  borderRadiusOuter: 4,
  borderRadiusSM: 4,
  borderRadiusXS: 2,

  colorBgBase: "#121212",  // base background color
  colorBgBlur: "rgba(255, 255, 255, 0.1)",  // frosted glass effect
  colorBgContainer: "#1e1e1e",  // container background
  colorBgElevated: "#2e2e2e",  // elevated background
  colorBgLayout: "#141414",  // layout background
  colorBgMask: "rgba(0, 0, 0, 0.8)",  // mask background
  colorBgSpotlight: "rgba(255, 255, 255, 0.1)",  // spotlight background

  colorBorder: "#333333",  // default border color
  colorBorderSecondary: "#444444",  // secondary border color

  colorError: "#ff4d4f",  // error state color
  colorErrorActive: "#d9363e",  // error active state
  colorErrorBg: "#400000",  // error background
  colorErrorBgActive: "#660000",  // error active background
  colorErrorBgHover: "#550000",  // error hover background
  colorErrorBorder: "#ff4d4f",  // error border
  colorErrorBorderHover: "#ff7875",  // error hover border
  colorErrorHover: "#ff7875",  // error hover color
  colorErrorText: "#ff4d4f",  // error text
  colorErrorTextActive: "#d9363e",  // error active text
  colorErrorTextHover: "#ff7875",  // error hover text

  colorInfo: "#007acc",  // info state color
  colorInfoActive: "#005f99",  // info active state
  colorInfoBg: "#001f33",  // info background
  colorInfoBgHover: "#002b4d",  // info hover background
  colorInfoBorder: "#007acc",  // info border
  colorInfoBorderHover: "#008ae6",  // info hover border
  colorInfoHover: "#008ae6",  // info hover color
  colorInfoText: "#007acc",  // info text
  colorInfoTextActive: "#005f99",  // info active text
  colorInfoTextHover: "#008ae6",  // info hover text

  colorLink: "#1e90ff",  // hyperlink color
  colorLinkActive: "#1565c0",  // hyperlink active state
  colorLinkHover: "#0d47a1",  // hyperlink hover state

  colorPrimary: "#bd66ea",  // primary color
  colorPrimaryActive: "#3700b3",  // primary active state
  colorPrimaryBg: "#6c22ea",  // primary background
  colorPrimaryBgHover: "#6200ee",  // primary hover background
  colorPrimaryBorder: "#bb86fc",  // primary border
  colorPrimaryBorderHover: "#3700b3",  // primary hover border
  colorPrimaryHover: "#7f39fb",  // primary hover color
  colorPrimaryText: "#bb86fc",  // primary text
  colorPrimaryTextActive: "#3700b3",  // primary active text
  colorPrimaryTextHover: "#6200ee",  // primary hover text

  colorSuccess: "#4caf50",  // success state color
  colorSuccessActive: "#388e3c",  // success active state
  colorSuccessBg: "#1b5e20",  // success background
  colorSuccessBgHover: "#2e7d32",  // success hover background
  colorSuccessBorder: "#4caf50",  // success border
  colorSuccessBorderHover: "#81c784",  // success hover border
  colorSuccessHover: "#81c784",  // success hover color
  colorSuccessText: "#4caf50",  // success text
  colorSuccessTextActive: "#388e3c",  // success active text
  colorSuccessTextHover: "#81c784",  // success hover text

  colorWarning: "#ff9800",  // warning state color
  colorWarningActive: "#e65100",  // warning active state
  colorWarningBg: "#4e342e",  // warning background
  colorWarningBgHover: "#6d4c41",  // warning hover background
  colorWarningBorder: "#ff9800",  // warning border
  colorWarningBorderHover: "#ffa726",  // warning hover border
  colorWarningHover: "#ffa726",  // warning hover color
  colorWarningText: "#ff9800",  // warning text
  colorWarningTextActive: "#e65100",  // warning active text
  colorWarningTextHover: "#ffa726",  // warning hover text

  colorTextBase: "#ffffff",  // base text color
  colorText: "#e0e0e0",  // default text color
  colorTextQuaternary: "rgba(255, 255, 255, 0.25)",  // quaternary text color
  colorTextSecondary: "rgba(255, 255, 255, 0.65)",  // secondary text color
  colorTextTertiary: "rgba(255, 255, 255, 0.45)",  // tertiary text color

  colorWhite: "#ffffff",  // white color

  controlHeight: 32,  // default control height
  controlHeightLG: 40,  // large control height
  controlHeightSM: 24,  // small control height
  controlHeightXS: 16,  // extra small control height

  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",  // font family
  fontFamilyCode: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",  // code font family
  fontSize: 14,  // base font size
  fontSizeHeading1: 38,  // h1 font size
  fontSizeHeading2: 30,  // h2 font size
  fontSizeHeading3: 24,  // h3 font size
  fontSizeHeading4: 20,  // h4 font size
  fontSizeHeading5: 16,  // h5 font size
  fontSizeLG: 16,  // large font size
  fontSizeSM: 12,  // small font size
  fontSizeXL: 20,  // extra large font size

  lineHeight: 1.57,  // default line height
  lineHeightHeading1: 1.21,  // h1 line height
  lineHeightHeading2: 1.26,  // h2 line height
  lineHeightHeading3: 1.33,  // h3 line height
  lineHeightHeading4: 1.4,  // h4 line height
  lineHeightHeading5: 1.5,  // h5 line height
  lineHeightLG: 1.5,  // large text line height
  lineHeightSM: 1.67,  // small text line height

  lineWidth: 1,  // default line width
  lineWidthBold: 2,  // bold line width

  motion: true,  // motion effect
  motionBase: 0,  // motion base
  motionEaseInBack: "cubic-bezier(0.71, -0.46, 0.88, 0.6)",  // ease-in-back motion curve
  motionEaseInOut: "cubic-bezier(0.645, 0.045, 0.355, 1)",  // ease-in-out motion curve
  motionEaseInOutCirc: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",  // ease-in-out-circ motion curve
  motionEaseInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",  // ease-in-quint motion curve
  motionEaseOut: "cubic-bezier(0.215, 0.61, 0.355, 1)",  // ease-out motion curve
  motionEaseOutBack: "cubic-bezier(0.12, 0.4, 0.29, 1.46)",  // ease-out-back motion curve
  motionEaseOutCirc: "cubic-bezier(0.08, 0.82, 0.17, 1)",  // ease-out-circ motion curve
  motionEaseOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",  // ease-out-quint motion curve
  motionDurationFast: "0.1s",  // fast motion duration
  motionDurationMid: "0.2s",  // mid motion duration
  motionDurationSlow: "0.3s",  // slow motion duration

  opacityImage: 1,  // image opacity
  sizePopupArrow: 16,  // popup arrow size
  sizeStep: 4,  // base step for size change
  sizeUnit: 4,  // size change unit
  wireframe: false,  // wireframe effect

  zIndexBase: 0,  // base z-index
  zIndexPopupBase: 1000  // popup base z-index
};


export default THEME;
