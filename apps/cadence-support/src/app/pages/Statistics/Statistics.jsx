import React, { useState, useRef, useEffect } from 'react';
import styles from './Statistics.module.scss';
import {
  Container,
  Skeleton,
  Title,
  Tooltip as Tooltip1,
} from '@cadence-support/components';
import SelectCompany from './components/SelectCompany/SelectCompany';
import { Select, ThemedButton } from '@cadence-support/widgets';
import {
  COMPANY_DATA,
  COMPANY_TASK_COMPLETION_TOOLTIP,
  getHeaders,
  getTooltipText,
  OVERALL_TASK_COMPLETION_TOOLTIP,
  SORTING_OPTIONS,
  SPECIFIC_COMPANY_TASK_TOOLTIP,
  SPECIFIC_COMPANY_USERS_TOOLTIP,
  TASK_DETAILS,
  TIMERANGEFILTER_OPTIONS,
} from './constants';
import { Colors } from '@cadence-support/utils';
import { ThemedButtonThemes } from '@cadence-support/themes';
import {
  ArrowDown,
  ArrowUp,
  BarChart,
  Info,
  LineChart,
  TriangleArrow,
} from '@cadence-support/icons';
import GraphCard from './components/GraphCard/GraphCard';
import TableRow from './components/TableRow/TableRow';
import Tooltip from './components/Tooltip/Tootltip';

const StatisticsPage = () => {
  const [timerangefilter, setTimerangeFilter] = useState('this_month');
  const [selectedCompany, setSelectedCompany] = useState('all_companies');
  const [isDrop, setIsDrop] = useState({
    companyDropDown: false,
    filterDropDown: false,
  });
  const [activeGraph, setActiveGraph] = useState('line');
  const [dimensions, setdimensions] = useState({ width: 0, height: 0 });
  const graphref = useRef(null);
  const [tableData, setTableData] = useState(COMPANY_DATA);
  const [sorted, setSorted] = useState(null);
  const [sortedHeader, setSortedHeader] = useState(null);

  //useeffects
  useEffect(() => {
    setdimensions({
      width: graphref.current.getBoundingClientRect().width,
      height: graphref.current.getBoundingClientRect().height,
    });
  }, []);

  useEffect(() => {
    if (sorted === SORTING_OPTIONS.INCREASING) {
      let companyArray = [...COMPANY_DATA];
      if (sortedHeader === 'company' || sortedHeader === 'users') {
        companyArray.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortedHeader === 'total_task') {
        companyArray.sort((a, b) => a.total_task - b.total_task);
      } else if (sortedHeader === 'avg_task') {
        companyArray.sort((a, b) => a.avg_task - b.avg_task);
      }
      setTableData(companyArray);
    } else if (sorted === SORTING_OPTIONS.DECREASING) {
      let companyArray = [...COMPANY_DATA];
      if (sortedHeader === 'company' || sortedHeader === 'users') {
        companyArray.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortedHeader === 'total_task') {
        companyArray.sort((a, b) => b.total_task - a.total_task);
      } else if (sortedHeader === 'avg_task') {
        companyArray.sort((a, b) => b.avg_task - a.avg_task);
      }
      setTableData(companyArray);
    } else setTableData(COMPANY_DATA);
  }, [sorted, sortedHeader]);

  //functions
  const handleStepsClick = (label) => {
    if (sorted && label) {
      setSorted(null);
      setSortedHeader(null);
    }
  };
  const handleAsendingOrder = (label) => {
    setSorted(SORTING_OPTIONS.INCREASING);
    setSortedHeader(label);
  };
  const handleDescendingOrder = (label) => {
    setSorted(SORTING_OPTIONS.DECREASING);
    setSortedHeader(label);
  };

  return (
    <Container className={styles.statistics}>
      {/* header starts */}
      <div className={styles.header}>
        <div className={styles.title}>
          <Title>Statistics</Title>
        </div>
        <div className={styles.right}>
          <SelectCompany
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
          />
          <Select
            value={timerangefilter}
            setValue={setTimerangeFilter}
            options={Object.keys(TIMERANGEFILTER_OPTIONS).map((opt) => ({
              label: TIMERANGEFILTER_OPTIONS[opt],
              value: opt,
            }))}
            background={Colors.white}
            color={Colors.lightBlue}
            font_weight={'600'}
            className={styles.filter}
            height={'50px'}
            dropdownarrow="triangularDropDown"
            numberOfOptionsVisible={6}
            isDrop={isDrop}
            setIsDrop={setIsDrop}
            onMouseEnter={() =>
              setIsDrop((prev) => ({
                ...prev,
                companyDropDown: false,
              }))
            }
          />
        </div>
      </div>
      {/* header ends here */}
      {/* body starts from here */}
      <div className={styles.body}>
        {/* graph card */}
        <div className={styles.graphcard} id="historygraph">
          <div className={styles.header}>
            <div className={styles.left}>
              <Title size="16px">Overall task completion</Title>
            </div>
            <div className={styles.right}>
              <div className={styles.info}>
                {TASK_DETAILS?.map((item) => (
                  <TaskInfo
                    key={item?.value}
                    task={item}
                    filter={timerangefilter}
                  />
                ))}
              </div>
              <div className={styles.btns}>
                <ThemedButton
                  theme={ThemedButtonThemes.WHITE}
                  onClick={() => setActiveGraph('line')}
                  className={activeGraph === 'line' ? styles.active : ''}
                >
                  <LineChart />
                </ThemedButton>
                <ThemedButton
                  theme={ThemedButtonThemes.WHITE}
                  className={activeGraph === 'bar' ? styles.active : ''}
                  onClick={() => setActiveGraph('bar')}
                >
                  <BarChart />
                </ThemedButton>
              </div>
              <Tooltip
                text={
                  selectedCompany === 'all_companies'
                    ? OVERALL_TASK_COMPLETION_TOOLTIP
                    : SPECIFIC_COMPANY_TASK_TOOLTIP
                }
              >
                <Info color="#8193A8" className={styles.infoicon} />
              </Tooltip>
            </div>
          </div>
          <div className={styles.content} ref={graphref}>
            <GraphCard
              activeGraph={activeGraph}
              loading={false}
              width={dimensions.width}
              height={dimensions.height}
            />
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.left}>
            <Title size="16px">
              {selectedCompany === 'all_companies'
                ? 'Company task completion'
                : 'User task completion'}
            </Title>
            <Tooltip
              text={
                selectedCompany === 'all_companies'
                  ? COMPANY_TASK_COMPLETION_TOOLTIP
                  : SPECIFIC_COMPANY_USERS_TOOLTIP
              }
            >
              <Info color="#8193A8" className={styles.infoicon} />
            </Tooltip>
          </div>
          <div className={styles.user_and_company_table}>
            <div className={styles.tableheaders}>
              {getHeaders(
                selectedCompany === 'all_companies' ? 'company' : 'users'
              )?.map((header, index) => {
                return (
                  <div
                    className={`${styles.header} ${
                      styles[`header_${index}`]
                    }  `}
                    style={{
                      justifyContent: index === 0 ? 'flex-start' : 'center',
                    }}
                    key={header.name}
                  >
                    {header?.name}

                    <div
                      className={`${styles.arrow_icon_div} ${
                        sorted &&
                        sortedHeader === header?.value &&
                        styles.sorted
                      } `}
                      onClick={
                        sortedHeader === header?.value
                          ? () => handleStepsClick(header?.value)
                          : () => null
                      }
                    >
                      {(!sorted ||
                        sorted === SORTING_OPTIONS.INCREASING ||
                        sortedHeader !== header?.value) && (
                        <TriangleArrow
                          size={9}
                          onClick={() => handleAsendingOrder(header?.value)}
                        />
                      )}
                      {(!sorted ||
                        sorted === SORTING_OPTIONS.DECREASING ||
                        sortedHeader !== header?.value) && (
                        <TriangleArrow
                          size={9}
                          className={styles.downArrow}
                          onClick={() => handleDescendingOrder(header?.value)}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {false ? (
              <div className={styles.linePlaceholders}>
                {[...Array(3).keys()].map((key) => (
                  <Skeleton className={styles.linePlaceholder} />
                ))}
              </div>
            ) : (
              <div className={styles.tabledata}>
                {tableData?.map((company) => (
                  <TableRow
                    key={company?.name}
                    tableFor={
                      selectedCompany === 'all_companies' ? 'company' : 'users'
                    }
                    company={company}
                    filter={timerangefilter}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default StatisticsPage;

//  common component for task information
export const TaskInfo = ({ task, filter }) => {
  return (
    <div className={`${styles.task} ${styles[`box_${task.value}`]}`}>
      <div className={`${styles.details} `}>
        <p className={`${styles.title} ${styles[`fontcolor_${task.value}`]}`}>
          {task.label} completion
        </p>
        <p className={`${styles.count} ${styles[`fontcolor_${task.value}`]}`}>
          {task.count} tasks
        </p>
      </div>
      <Tooltip1
        text={getTooltipText(task?.profit, filter)}
        theme="LEFT"
        className={styles.tooltip1}
      >
        <div
          className={`${styles.percentage} ${
            styles[task?.profit ? `fontcolor_green` : `fontcolor_red`]
          }`}
        >
          <span className={styles.number}>14%</span>
          <span>
            {task?.profit ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
          </span>
        </div>
      </Tooltip1>
    </div>
  );
};
