import { KpiData } from '../types/kpi';
import { formatPercentage, calcBuffer, wfc } from '../utils/kpi';
import { settings } from '../config/settings';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      {/* Box1: 総着信数 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">総着信数</h2>
        <div className="flex flex-col items-center">
          <span className={`text-5xl font-bold mb-4 ${textColor}`}>
            {data.total_calls}
          </span>
          <div className={`text-xl ${textColor} flex flex-col items-center gap-4`}>
            <div className={`${subTextColor} flex items-center gap-2`}>
              放棄呼: <span className="font-mono">{data.abandoned_calls}</span>
            </div>
            <div className={`${subTextColor} flex items-center gap-2`}>
              留守電: <span className="font-mono">{data.voicemails}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Box2: 応答率 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">応答率</h2>
        <div className="flex flex-col items-center">
          <span className={`text-5xl font-bold mb-4 ${textColor}`}>
            {formatPercentage(data.response_rate)}%
          </span>
          <div className={`text-2xl ${textColor} flex items-center gap-2`}>
            <span className="font-mono">{data.responses}</span>
            <span className="text-lg mx-2">/</span>
            <span className="font-mono">{data.total_calls}</span>
          </div>
        </div>
      </div>

      {/* Box3: 直受け率 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">直受け率</h2>
        <div className="flex flex-col items-center">
          <span className={`text-5xl font-bold mb-4 ${textColor}`}>
            {formatPercentage(data.direct_handling_rate)}%
          </span>
          <div className={`text-2xl ${textColor} flex items-center gap-2`}>
            <span className="font-mono">{data.direct_handling}</span>
            <span className="text-lg mx-2">/</span>
            <span className="font-mono">{data.phone_inquiries}</span>
          </div>
          <div className={`text-xl mt-4 ${textColor}`}>
            Buffer:&nbsp;<span className={`buffer font-mono ${Number(calcBuffer(settings.kpiTargets.directHandlingRate, data.direct_handling, data.phone_inquiries)) > 0 ? 'positive' : ''}`}>
              {calcBuffer(settings.kpiTargets.directHandlingRate, data.direct_handling, data.phone_inquiries)}
            </span>
          </div>
        </div>
      </div>

      {/* Box4: 20分以内折返し率 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">20分以内折返し率</h2>
        <div className="flex flex-col items-center">
          <span className={`text-5xl font-bold mb-4 ${textColor}`}>
            {formatPercentage(data.cumulative_callback_rate_under_20_min)}%
          </span>
          <div className={`text-2xl ${textColor} flex items-center gap-2`}>
            <span className="font-mono">{data.cumulative_callback_under_20_min}</span>
            <span className="text-lg mx-2">/</span>
            <span className="font-mono">
              {cumulativeAndWfcOver20min}
              <span className={`ml-1 text-2xl ${textColor}`}>
                ({data.waiting_for_callback_over_20min})
              </span>
            </span>
          </div>
          <div className={`text-xl mt-4 ${textColor}`}>
            Buffer:&nbsp;<span className={`buffer font-mono ${Number(calcBuffer(settings.kpiTargets.callbackRates.within20min, data.cumulative_callback_under_20_min, cumulativeAndWfcOver20min)) > 0 ? 'positive' : ''}`}>
              {calcBuffer(settings.kpiTargets.callbackRates.within20min, data.cumulative_callback_under_20_min, cumulativeAndWfcOver20min)}
            </span>
          </div>
        </div>
      </div>

      {/* Box5: 30分以内折返し率 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">30分以内折返し率</h2>
        <div className="flex flex-col items-center">
          <span className={`text-5xl font-bold mb-4 ${textColor}`}>
            {formatPercentage(data.cumulative_callback_rate_under_30_min)}%
          </span>
          <div className={`text-2xl ${textColor} flex items-center gap-2`}>
            <span className="font-mono">{data.cumulative_callback_under_30_min}</span>
            <span className="text-lg mx-2">/</span>
            <span className="font-mono">
              {cumulativeAndWfcOver30min}
              <span className={`ml-1 text-2xl ${textColor}`}>
                ({data.waiting_for_callback_over_30min})
              </span>
            </span>
          </div>
          <div className={`text-xl mt-4 ${textColor}`}>
            Buffer:&nbsp;<span className={`buffer font-mono ${Number(calcBuffer(settings.kpiTargets.callbackRates.within30min, data.cumulative_callback_under_30_min, cumulativeAndWfcOver30min)) > 0 ? 'positive' : ''}`}>
              {calcBuffer(settings.kpiTargets.callbackRates.within30min, data.cumulative_callback_under_30_min, cumulativeAndWfcOver30min)}
            </span>
          </div>
        </div>
      </div>

      {/* Box6: 40分以内折返し率 */}
      <div className={`${boxBg} rounded-lg p-4 shadow-md`}>
        <h2 className="text-lg font-bold mb-4">40分以内折返し率</h2>
        <div className="flex flex-col items-center">
          <span className={`text-5xl font-bold mb-4 ${textColor}`}>
            {formatPercentage(data.cumulative_callback_rate_under_40_min)}%
          </span>
          <div className={`text-2xl ${textColor} flex items-center gap-2`}>
            <span className="font-mono">{data.cumulative_callback_under_40_min}</span>
            <span className="text-lg mx-2">/</span>
            <span className="font-mono">
              {cumulativeAndWfcOver40min}
              <span className={`ml-1 text-2xl ${textColor}`}>
                ({data.waiting_for_callback_over_40min})
              </span>
            </span>
          </div>
          <div className={`text-xl mt-4 ${textColor}`}>
            Buffer:&nbsp;<span className={`buffer font-mono ${Number(calcBuffer(settings.kpiTargets.callbackRates.within40min, data.cumulative_callback_under_40_min, cumulativeAndWfcOver40min)) > 0 ? 'positive' : ''}`}>
              {calcBuffer(settings.kpiTargets.callbackRates.within40min, data.cumulative_callback_under_40_min, cumulativeAndWfcOver40min)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
