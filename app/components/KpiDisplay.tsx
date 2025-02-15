import { KpiData } from '../types/kpi';
import { formatPercentage, calcBuffer, wfc } from '../utils/kpi';

interface KpiDisplayProps {
  data: KpiData;
  textColor: string;
  subTextColor: string;
  boxBg: string;
}

export function KpiDisplay({ data, textColor, subTextColor, boxBg }: KpiDisplayProps) {
  const wfcData = wfc(
    data.wfc_20min_list,
    data.wfc_30min_list,
    data.wfc_40min_list,
    data.wfc_60min_list
  );

  const cumulativeAndWfcOver20min =
    data.cumulative_callback_under_60_min +
    data.callback_count_over_60_min +
    data.waiting_for_callback_over_20min;

  const cumulativeAndWfcOver30min =
    data.cumulative_callback_under_60_min +
    data.callback_count_over_60_min +
    data.waiting_for_callback_over_30min;

  const cumulativeAndWfcOver40min =
    data.cumulative_callback_under_60_min +
    data.callback_count_over_60_min +
    data.waiting_for_callback_over_40min;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      {/* 応答率 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">応答率</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className={subTextColor}>応答率</span>
            <span className={textColor}>{formatPercentage(data.response_rate)}%</span>
          </div>
          <div className="flex justify-between">
            <span className={subTextColor}>応答数</span>
            <span className={textColor}>{data.responses}</span>
          </div>
          <div className="flex justify-between">
            <span className={subTextColor}>総着信数</span>
            <span className={textColor}>{data.total_calls}</span>
          </div>
        </div>
      </div>

      {/* 直受け率 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">直受け率</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className={subTextColor}>直受け率</span>
            <span className={textColor}>{formatPercentage(data.direct_handling_rate)}%</span>
          </div>
          <div className="flex justify-between">
            <span className={subTextColor}>直受け数</span>
            <span className={textColor}>{data.direct_handling}</span>
          </div>
          <div className="flex justify-between">
            <span className={subTextColor}>電話問合せ数</span>
            <span className={textColor}>{data.phone_inquiries}</span>
          </div>
          <div className="flex justify-between">
            <span className={subTextColor}>Buffer</span>
            <span className={`${textColor} buffer`}>
              {calcBuffer(0.35, data.direct_handling, data.phone_inquiries)}
            </span>
          </div>
        </div>
      </div>

      {/* コールバック率 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">コールバック率</h2>
        <div className="space-y-4">
          {/* 20分以内 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={subTextColor}>20分以内</span>
              <span className={textColor}>
                {formatPercentage(data.cumulative_callback_rate_under_20_min)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className={subTextColor}>達成数</span>
              <span className={textColor}>{data.cumulative_callback_under_20_min}</span>
            </div>
            <div className="flex justify-between">
              <span className={subTextColor}>総数</span>
              <span className={textColor}>{cumulativeAndWfcOver20min}</span>
            </div>
            <div className="flex justify-between">
              <span className={subTextColor}>Buffer</span>
              <span className={`${textColor} buffer`}>
                {calcBuffer(0.80, data.cumulative_callback_under_20_min, cumulativeAndWfcOver20min)}
              </span>
            </div>
          </div>

          {/* 40分以内 */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={subTextColor}>40分以内</span>
              <span className={textColor}>
                {formatPercentage(data.cumulative_callback_rate_under_40_min)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className={subTextColor}>達成数</span>
              <span className={textColor}>{data.cumulative_callback_under_40_min}</span>
            </div>
            <div className="flex justify-between">
              <span className={subTextColor}>総数</span>
              <span className={textColor}>{cumulativeAndWfcOver40min}</span>
            </div>
            <div className="flex justify-between">
              <span className={subTextColor}>Buffer</span>
              <span className={`${textColor} buffer`}>
                {calcBuffer(0.90, data.cumulative_callback_under_40_min, cumulativeAndWfcOver40min)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 滞留案件 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">滞留案件</h2>
        <div className="overflow-auto max-h-[calc(100%-2rem)]">
          <table className="w-full">
            <thead>
              <tr>
                <th className={`${subTextColor} text-left py-2`}>案件番号</th>
                <th className={`${subTextColor} text-left py-2`}>経過時間</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(wfcData).map(([time, cases]) => (
                Array.from(cases).map((caseId, index) => (
                  <tr key={`${time}-${index}`}>
                    <td className={`${textColor} py-1`}>{caseId}</td>
                    <td className={`${textColor} py-1`}>{time}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
