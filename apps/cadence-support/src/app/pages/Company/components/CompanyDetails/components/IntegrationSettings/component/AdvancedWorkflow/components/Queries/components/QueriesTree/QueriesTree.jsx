import QueriesCondition from '../QueriesCondition/QueriesCondition';
import AndOrLink from './Component/AndorLink/AndorLink';
import styles from './QueriesTree.module.scss';

const QueriesTree = ({ originalFilter, level }) => {
  return (
    <div className={`${styles.oNode} ${level === 0 && styles.bor}`}>
      <div className={`${styles.box} ${level === 0 && styles.dis}`}></div>
      {originalFilter?.children?.map((item, index) => {
        return (
          <>
            {item?.operation === 'condition' ? (
              <QueriesCondition originalFilter={item} level={level + 1} />
            ) : (
              <QueriesTree originalFilter={item} level={level + 1} />
            )}
            <AndOrLink index={index} originalFilter={originalFilter} />
          </>
        );
      })}
    </div>
  );
};

export default QueriesTree;
