export const settings = {
  // APIサーバー設定
  api: {
    host: process.env.API_HOST || '',
    port: Number(process.env.API_PORT) || 80, // デフォルトポート
    apiKey: process.env.API_KEY || ''
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
      within30min: 0.0, // 30分以内折返し率の目標値
      within40min: 0.90  // 40分以内折返し率の目標値 (90%)
    }
  }
};
