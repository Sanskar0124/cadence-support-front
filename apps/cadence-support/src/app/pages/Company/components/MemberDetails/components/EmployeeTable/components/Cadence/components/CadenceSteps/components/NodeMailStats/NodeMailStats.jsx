import { useEffect, useState, useMemo } from 'react';
import { useNodeStats } from '@cadence-support/data-access';

import styles from './NodeMailStats.module.scss';
import { Button, Tooltip } from '@pipedrive/components';
import {
  Unsubscribe,
  View,
  Bounced,
  Leads,
  Close,
  ClickGradient as Click,
  Reply,
} from '@cadence-support/icons';
import { SearchBar, ThemedButton } from '@pipedrive/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import LeadsWrapper from './LeadsWrapper';
const header = {
  Bounced: ['Mail Bounced', <Bounced size="1.2em" />, 'Bounced mail'],
  Clicked: [
    'Link clicked',
    <Click size="1.2em" color="black" />,
    'Link clicked',
  ],
  People: ['People', <Leads size="1.2em" />],
  Opened: ['Mail viewed', <View size="1.2em" />, 'Viewed mail'],
  Unsubscribed: [
    'Unsubscribed People',
    <Unsubscribe size="1.2em" />,
    'Unsubscribed',
  ],
  Replied: ['Replied mail', <Reply size="1.2em" />, 'Replied'],
};

const maps = {
  Bounced: 'BOUNCED',
  Clicked: 'CLICKED',
  People: 'PEOPLE',
  Opened: 'OPENED',
  Unsubscribed: 'UNSUBSCRIBED',
  Replied: 'REPLIED',
};

const NodeMailStats = ({ statsData, onClose, cadence }) => {
  const [query, setQuery] = useState('');
  const { stats, type } = statsData;
  const total_people =
    type !== 'People'
      ? (stats?.BOUNCED?.length ?? 0) +
        (stats?.CLICKED?.length ?? 0) +
        (stats?.OPENED?.length ?? 0) +
        (stats?.UNSUBSCRIBED?.length ?? 0)
      : stats?.PEOPLE?.length ?? 0;

  const leads_relevant = useMemo(
    () =>
      stats?.[maps[type]]?.filter((lead) => {
        return (
          (lead.user_first_name + ' ' + lead.user_last_name)
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          (lead.lead_first_name + ' ' + lead.lead_last_name)
            .toLowerCase()
            .includes(query)
        );
      }),
    [query, statsData]
  );

  useEffect(() => {
    setQuery('');
  }, [statsData]);

  return (
    <div className={styles.NodeMailStats}>
      <div className={styles.header}>
        <ThemedButton
          className={styles.closeBtn}
          onClick={onClose}
          theme={ThemedButtonThemes.ICON}
        >
          <Tooltip text="Close">
            <Close color={'#567191'} />
          </Tooltip>
        </ThemedButton>
        <h3>
          <span style={{ verticalAlign: 'middle' }}> {header[type]?.[1]} </span>
          {header[type]?.[0]}
        </h3>
      </div>
      <div className={styles.main}>
        {
          <div className={styles.lightenTheme} style={{ width: '90%' }}>
            {type === 'People'
              ? 'Total People: ' + total_people
              : 'Total mails sent:  ' +
                (stats?.DELIVERED + stats?.BOUNCED.length)}
          </div>
        }

        {type !== 'People' && (
          <div className={styles.statWrapper}>
            <div className={styles.lightenTheme}>
              % {header[type]?.[2]} : &nbsp;
              {stats?.DELIVERED + stats?.BOUNCED.length === 0
                ? '...'
                : Math.round(
                    (stats?.[maps[type]]?.length * 100) /
                      (stats?.DELIVERED + stats?.BOUNCED.length)
                  ) + '%'}
            </div>

            <div className={styles.lightenTheme}>
              {header[type]?.[2]} : &nbsp;
              {total_people === 0
                ? stats?.[maps[type]]?.length
                : Math.round(stats?.[maps[type]]?.length)}
            </div>
          </div>
        )}

        <div className={styles.searchBarWrapper}>
          <SearchBar
            width="100%"
            value={query}
            setValue={setQuery}
            height="40px"
            className={styles.searchBar}
          />
        </div>

        <div className={styles.leadsWrapper}>
          {leads_relevant?.map((lead) => (
            <LeadsWrapper lead={lead} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NodeMailStats;
