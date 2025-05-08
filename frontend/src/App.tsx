import { useState } from 'react';

import Dot from './components/Dot';
import usePlans from './hooks/api';
import { setCategories } from './utils';
import { matchCategoryData } from './utils';
import { Navbar } from './components/Layouts';
import ScatterChart from './components/Graph';
import Dropdown from './components/Dropdown';
import Table from './components/Table';
import styles from './css/Layout.module.css';


export default function App() {
  const [category, setCategory] = useState('All');
  const { plans, updatePlan } = usePlans();
  const categories: string[] = setCategories(plans);
  const categorizedData = matchCategoryData(plans, category);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Navbar />
      <ScatterChart 
        data={categorizedData}
        onDragEnd={(id, updatedPlan) => {updatePlan(id, updatedPlan);}}
      />

      <div className={styles.Table}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Dropdown
            categories={categories}
            category={category}
            onChange={(cat: string) => { setCategory(cat); }}
          />
          <Table data={categorizedData} />
        </div>
      </div>
    </div>
  );
}
