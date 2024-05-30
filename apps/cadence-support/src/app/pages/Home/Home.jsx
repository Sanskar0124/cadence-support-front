import React, { useState } from 'react';
import styles from './Home.module.scss';
import { Title } from '@cadence-support/components';
import Companies from './components/Companies/Comapnies';
import CompanyActivity from './components/CompanyActivity/CompanyActivity';
import Integration from './components/Integration/Integration';
import { ThemedButton } from '@cadence-support/widgets';
import { PlusOutline } from '@cadence-support/icons';
import { ThemedButtonThemes } from '@cadence-support/themes';
import AddNewCompanyModal from './components/AddNewCompanyModal/AddNewCompanyModal';
import OngoingServices from './components/OngoingServices/OngoingServices';

function Home() {
  const [modal, setModal] = useState(false);
  const handleAddNewCompany = () => setModal(true);
  return (
    <div className={styles.home_container}>
      <div className={styles.header}>
        <Title size="2rem" className={styles.title}>
          Home
        </Title>
        <div className={styles.right}>
          <ThemedButton
            width="fit-content"
            className={styles.addNewCompanyBtn}
            theme={ThemedButtonThemes.WHITE}
            onClick={handleAddNewCompany}
          >
            <PlusOutline />
            <div>Add new company</div>
          </ThemedButton>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.companies_and_companyActivity}>
          <Companies />
          <CompanyActivity />
        </div>
        <div className={styles.integration_and_users}>
          <Integration />
          <OngoingServices />
        </div>
      </div>

      <AddNewCompanyModal modal={modal} setModal={setModal} />
    </div>
  );
}

export default Home;
