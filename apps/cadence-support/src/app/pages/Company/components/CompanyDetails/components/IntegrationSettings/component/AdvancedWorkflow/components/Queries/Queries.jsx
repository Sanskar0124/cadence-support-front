import QueriesTree from './components/QueriesTree/QueriesTree';
import QueriesCondition from './components/QueriesCondition/QueriesCondition';

const Queries = ({ originalFilter }) => {
  return originalFilter?.operation === 'condition' ? (
    <QueriesCondition originalFilter={originalFilter} level={0} />
  ) : (
    <QueriesTree originalFilter={originalFilter} level={0} />
  );
};

export default Queries;
