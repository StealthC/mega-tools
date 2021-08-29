import React from 'react';
import { AnalysisData } from './VDPAnalysis';

export interface AnalysisPrintData {
  data: AnalysisData;
}

export function AnalysisPrint({ data }: AnalysisPrintData): JSX.Element {
  return (
    <>
      <h3 className="text-center">{data.title}</h3>
      <dl className="row">
        {data.data.map((v) => (
          <>
            <dt className="col col-6 text-end">{v.key}</dt>
            <dd className="col col-6">{v.value}</dd>
          </>
        ))}
      </dl>
    </>
  );
}
