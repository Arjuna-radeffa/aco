import React from "react";
import { PieChart, TrendingUp, Users } from "lucide-react";

interface VisualAllocationChartProps {
  commercial: number;
  social: number;
}

const VisualAllocationChart: React.FC<VisualAllocationChartProps> = ({ commercial, social }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-indigo-600" />
          Fund Allocation
        </h3>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
          Proportional Split
        </span>
      </div>

      <div className="space-y-6">
        {/* Progress Bar Visualization */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                Commercial
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {commercial}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-slate-100">
            <div
              style={{ width: `${commercial}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500 ease-out"
            ></div>
            <div
              style={{ width: `${social}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-500 ease-out"
            ></div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Business</p>
              <p className="text-sm font-bold text-slate-800">{commercial}% Commercial</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Social</p>
              <p className="text-sm font-bold text-slate-800">{social}% Social</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 italic mt-4 text-center">
          *Social allocation supports mosques, pesantrens, and community welfare programs.
        </p>
      </div>
    </div>
  );
};

export default VisualAllocationChart;
