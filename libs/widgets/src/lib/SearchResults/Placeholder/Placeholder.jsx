import { Skeleton } from '@cadence-support/components';

import './Placeholder.scss';

const SearchPlaceholder = () => {
  return (
    <div className="search-placeholder">
      <Skeleton className="lead" />
      <Skeleton className="lead" />
      <Skeleton className="lead" />
    </div>
  );
};

export default SearchPlaceholder;
