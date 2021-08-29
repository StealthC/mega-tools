import React from 'react';
import { AnalysisData } from './VDPAnalysis';

export interface AnalysisPrintData {
  data: AnalysisData;
}

export function AnalysisPrint({ data }: AnalysisPrintData): JSX.Element {
  return (
    <>
      <h3>{data.title}</h3>
      <dl className="row">
        {data.data.map((v) => (
          <>
            <dt className="col-3 text-end">{v.key}</dt>
            <dd className="col-9">{v.value}</dd>
          </>
        ))}
      </dl>
    </>
  );
}
