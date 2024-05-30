import React from 'react';
import styles from './GraphCard.module.scss';
import { data } from './constants';
import { Colors } from '@cadence-support/utils';
import { Skeleton } from '@cadence-support/components';
import {
  BarChart,
  Bar,
  LineChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
} from 'recharts';

const GraphCard = ({ loading, activeGraph, width, height }) => {
  const totalTasks = data?.reduce(
    (prevVal, curr) =>
      prevVal +
      (curr?.total_task ? curr?.total_task : 0) +
      (curr?.avg_task ? curr?.avg_task : 0),

    0
  );

  const xAxisTickFormatter = (value) =>
    value === 9 || value === 11 ? `${value}AM` : `${value}PM`;

  const CustomTooltip = ({ active, payload, label }) => {
    const contentrow = (index, req) => {
      return (
        <div className={styles.customtooltip_content}>
          <div
            className={`${styles.customtooltip_content_circle} ${
              index === 1
                ? styles.total
                : index === 2
                ? styles.avg
                : styles.blue
            }`}
          ></div>
          <div className={styles.customtooltip_content_value}>
            {Object.values(req)?.[index]}
          </div>
          <div className={styles.customtooltip_content_text}>
            {Object.keys(req)?.[index]}
          </div>
        </div>
      );
    };

    if (active && payload) {
      let req = payload?.[0]?.payload;
      return (
        <div className={styles.customtooltip}>
          <div className={styles.customtooltip_label}>{label}</div>
          {contentrow(1, req)}
          {contentrow(2, req)}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={styles.graph}>
      <ResponsiveContainer height={'240px'} width={'100%'}>
        {activeGraph === 'line' ? (
          <>
            {!loading ? (
              totalTasks > 0 ? (
                <LineChart
                  width={width}
                  height={height}
                  data={data}
                  margin={{
                    top: 20,
                    right: 0,
                    left: -10,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    stroke={Colors.veryLightBlue}
                    strokeDasharray="1 4"
                    vertical={false}
                    cursor={'none'}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    padding={{
                      left: 50,
                      right: 50,
                      bottom: 0,
                      top: 0,
                    }}
                    stroke={Colors.veryLightBlue}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    stroke={Colors.veryLightBlue}
                  />
                  <Tooltip
                    cursor={{
                      strokeWidth: '10.3%',
                      stroke: '#4B90E2',
                      strokeOpacity: 0.2,
                    }}
                    content={<CustomTooltip />}
                  />
                  {!loading ? (
                    totalTasks > 0 && (
                      <>
                        <Line
                          type="monotone"
                          dataKey={'total_task'}
                          stroke="#00B3A8"
                          strokeWidth={2}
                          activeDot={{
                            fill: Colors.white,
                            stroke: '#00B3A8',
                            r: 3,
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey={'avg_task'}
                          stroke="#037DFC"
                          strokeWidth={2}
                          activeDot={{
                            fill: Colors.white,
                            stroke: '#037DFC',
                            r: 3,
                          }}
                        />
                      </>
                    )
                  ) : (
                    <></>
                  )}
                </LineChart>
              ) : (
                <LineChart
                  width={width}
                  height={height}
                  data={data}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    stroke={Colors.veryLightBlue}
                    strokeDasharray="1 4"
                    vertical={false}
                    cursor={'none'}
                  />
                  <XAxis
                    dataKey="name"
                    // ticks={[9, 11, 1, 3, 4, 5, 6, 7, 8]}
                    // domain={["auto", "auto"]}
                    axisLine={false}
                    tickLine={false}
                    padding={{
                      left: 50,
                      right: 50,
                      bottom: 0,
                      top: 0,
                    }}
                    // tickFormatter={xAxisTickFormatter}
                    tick={{ fill: '#778F9B' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 25, 50, 75]}
                    domain={[0, 75]}
                    tick={{ fill: '#778F9B' }}
                  />
                </LineChart>
              )
            ) : (
              <div className={styles.linePlaceholders}>
                {[...Array(4).keys()].map((key) => (
                  <Skeleton className={styles.linePlaceholder} />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {!loading ? (
              totalTasks > 0 ? (
                <BarChart
                  width={width}
                  height={height}
                  data={data}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    stroke={Colors.veryLightBlue}
                    strokeDasharray="1 4"
                    vertical={false}
                    cursor={'none'}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    padding={{
                      left: 50,
                      right: 50,
                      bottom: 0,
                      top: 0,
                    }}
                    stroke={Colors.veryLightBlue}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    // ticks={[0, 25, 50, 75]}
                    // domain={[0, 75]}
                    tick={{ fill: '#778F9B' }}
                    stroke={Colors.veryLightBlue}
                  />
                  <Tooltip
                    cursor={{
                      strokeWidth: '0.5%',
                      fill: '#4B90E2',
                      fillOpacity: 0.2,
                    }}
                    content={<CustomTooltip />}
                  />

                  <>
                    <Bar
                      stackId="a"
                      dataKey={'total_task'}
                      fill={'#00B3A8'}
                      radius={[3, 3, 0, 0]}
                      barCategoryGap={20}
                    />
                    <Bar
                      stackId="b"
                      dataKey={'avg_task'}
                      fill={'#037DFC'}
                      radius={[3, 3, 0, 0]}
                      barCategoryGap={20}
                    />
                  </>
                </BarChart>
              ) : (
                <BarChart
                  width={width}
                  height={height}
                  data={data}
                  margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    stroke={Colors.veryLightBlue}
                    strokeDasharray="1 4"
                    vertical={false}
                    cursor={'none'}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    padding={{
                      left: 50,
                      right: 50,
                      bottom: 0,
                      top: 0,
                    }}
                    // ticks={[9, 11, 1, 3, 4, 5, 6, 7, 8]}
                    // domain={[0, 24]}
                    // tickFormatter={xAxisTickFormatter}
                    tick={{ fill: '#778F9B' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 25, 50, 75]}
                    domain={[0, 75]}
                    tick={{ fill: '#778F9B' }}
                  />
                </BarChart>
              )
            ) : (
              <div className={styles.linePlaceholders}>
                {[...Array(4).keys()].map((key) => (
                  <Skeleton className={styles.linePlaceholder} />
                ))}
              </div>
            )}
          </>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default GraphCard;
