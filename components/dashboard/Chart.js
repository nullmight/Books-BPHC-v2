import * as React from 'react';
import { useTheme } from '@mui/material/styles';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
// import Typography from '@mui/material/Typography';

import { PieChart, Pie, Legend, Sector, Cell, ResponsiveContainer } from 'recharts';

// Generate Sales Data
function createData(name, value) {
  return { name, value };
}

const data = [
  createData('CS F111', 2),
  createData('CS F241', 4),
  createData('CS F211', 3),
  createData('MATH F211', 4),
  createData('BIO F111', 1)
];

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

export default function Example() {
  // static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#BC5090'];
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ name,cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <React.Fragment>
      <Title>
        Course-wise Distribution
      </Title>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            style={{marginBottom:50}}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
            <Legend
              payload={
                data.map(
                  (item, index) => ({
                    id: item.name,
                    type: "square",
                    value: `${item.name} (${item.value})`,
                    color: COLORS[index % COLORS.length]
                  })
                )
              }
            />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
    );
}

// export default function Chart() {
//   const theme = useTheme();

//   return (
//     <React.Fragment>
//       <Title>Today</Title>
//       <ResponsiveContainer>
//         <LineChart
//           data={data}
//           margin={{
//             top: 16,
//             right: 16,
//             bottom: 0,
//             left: 24,
//           }}
//         >
//           <XAxis
//             dataKey="time"
//             stroke={theme.palette.text.secondary}
//             style={theme.typography.body2}
//           />
//           <YAxis
//             stroke={theme.palette.text.secondary}
//             style={theme.typography.body2}
//           >
//             <Label
//               angle={270}
//               position="left"
//               style={{
//                 textAnchor: 'middle',
//                 fill: theme.palette.text.primary,
//                 ...theme.typography.body1,
//               }}
//             >
//               Sales ($)
//             </Label>
//           </YAxis>
//           <Line
//             isAnimationActive={false}
//             type="monotone"
//             dataKey="amount"
//             stroke={theme.palette.primary.main}
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </React.Fragment>
//   );
// }
