export const settings = {
  // APIサーバー設定
  api: {
    host: "letsw8-0408",
    port: 80, // デフォルトポート
    apiKey: "p22ehtbS.T4G1f9urNz84QaeID8IV7iNPlTNLCD15"
  },

  // 表示設定
  display: {
    percentageDecimalPlaces: 2 // パーセンテージの小数点以下桁数
  },

  // KPI目標値設定
  kpiTargets: {
    directHandlingRate: 0.35, // 直受け率の目標値 (35%)
    callbackRates: {
      within20min: 0.80, // 20分以内折返し率の目標値 (80%)
      within30min: 0.85, // 30分以内折返し率の目標値 (85%)
      within40min: 0.90  // 40分以内折返し率の目標値 (90%)
    }
  }
};
