import React, { PureComponent } from 'react';
import Title from './Title';

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Nov \'21',
    uv: 5,
    pv: 8,
    amt: 14,
  },
  {
    name: 'Dec \'21',
    uv: 8,
    pv: 9,
    amt: 15,
  },
  {
    name: 'Jan \'22',
    uv: 13,
    pv: 10,
    amt: 9,
  },
  {
    name: 'Feb \'22',
    uv: 14,
    pv: 12,
    amt: 12,
  },
  {
    name: 'Mar \'22',
    uv: 15,
    pv: 11,
    amt: 11,
  },
  {
    name: 'Apr \'22',
    uv: 14,
    pv: 6,
    amt: 17,
  },
];

export default function Example() {
    return (
        <React.Fragment>
      <Title>
        Monthly User Registrations
      </Title>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="uv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#FF7700" />
        </ComposedChart>
      </ResponsiveContainer>
        </React.Fragment>
    );
}
