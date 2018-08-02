import * as _ from "lodash";
import * as React from "react";

// @ts-ignore
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";

function average(data: any) {
  return _.round(_.sum(data) / data.length);
}

export default (props: any) => {
  return (
    <div>
      <Sparklines height={120} width={180} data={props.data}>
        <SparklinesLine color={props.color} />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>{average(props.data)} {props.units}</div>
    </div>
  );
};