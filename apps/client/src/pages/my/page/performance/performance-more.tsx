import { useMemo, useState } from 'react';
import PerformanceList from '@pages/my/components/performance/performance-list';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Chip, Footer, Header } from '@confeti/design-system';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { PerformancesFilterType } from '@shared/types/user-response';

import * as styles from './performance-more.css';

const categories = ['전체', '콘서트', '페스티벌'] as const;

const PerformanceMore = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const filterType = useMemo<PerformancesFilterType>(() => {
    switch (selectedCategory) {
      case '콘서트':
        return 'CONCERT';
      case '페스티벌':
        return 'FESTIVAL';
      default:
        return 'ALL';
    }
  }, [selectedCategory]);

  const { data } = useSuspenseQuery({
    ...USER_QUERY_OPTIONS.MY_PERFORMANCES(filterType),
  });

  return (
    <>
      <Header variant="detail" title="My Confeti" />
      <nav>
        <ul className={styles.chipList}>
          {categories.map((category) => (
            <li key={category}>
              <Chip
                label={category}
                variant={selectedCategory === category ? 'active' : 'default'}
                onClick={() => setSelectedCategory(category)}
              />
            </li>
          ))}
        </ul>
      </nav>
      <PerformanceList performances={data.performances ?? []} />
      <Footer />
    </>
  );
};

export default PerformanceMore;
