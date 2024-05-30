import moment from 'moment-timezone';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tooltip } from '@cadence-support/components';
import { MessageContext } from '@cadence-support/context';
import {
  Copy,
  Leads,
  More,
  Pause,
  Paused,
  Play,
  Rocket,
  Settings,
  Share,
  Star,
  Trash,
} from '@cadence-support/icons';
import { userInfo } from '@cadence-support/atoms';
import { CADENCE_TYPES, ROLES } from '@cadence-support/constants';
import { Colors } from '@cadence-support/utils';
import { useRecoilValue } from 'recoil';
import styles from './CadenceCard.module.scss';
import { DropDown, ThemedButton } from '@cadence-support/widgets';
import { ThemedButtonThemes } from '@cadence-support/themes';
import { useCadencesTemplates } from '@cadence-support/data-access';

const ICON_SIZE = '18px';

const CadenceCard = (
  { cadence, cadenceNo, totalCadences, setDeleteModal, setSettingsModal },
  ref
) => {
  const { addError, addSuccess } = useContext(MessageContext);
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  //functions

  const handleDeleteClick = (e, cadence) => {
    e.stopPropagation();
    setDeleteModal(cadence);
  };

  const handleSettingsClick = (e, cadence) => {
    e.stopPropagation();
    setSettingsModal(cadence);
  };

  const positionProps = (() => {
    const props = { right: '10px' };
    if (totalCadences > 4 && cadenceNo > totalCadences - 2)
      props.bottom = '50px';
    else props.top = '50px';
    return props;
  })();

  return (
    <div
      ref={ref}
      className={styles.cadenceCard}
      onClick={() => navigate(`/cadence/edit/${cadence.cadence_template_id}`)}
    >
      {/* <div className={styles.favorite}>
        <Star color={favorite ? '#FFB12A' : Colors.disabled} size="1.2rem" />
      </div> */}

      <div className={styles.cadenceName} title={cadence.cadence_name}>
        {cadence.name}
      </div>

      <div className={styles.steps}>{cadence?.nodes?.length}</div>
      <div className={styles.createdBy}>
        {cadence?.User?.first_name} {cadence?.User?.last_name}
      </div>

      <div className={styles.type} title={cadence.type}>
        {cadence?.type}
      </div>

      <div className={styles.language} title={cadence.language}>
        {cadence?.language}
      </div>
      <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
        <div>
          <DropDown
            btn={
              <ThemedButton
                height="40px"
                width="60px"
                className={styles.dotsBtn}
                theme={ThemedButtonThemes.GREY}
              >
                <div>
                  <More />
                </div>
              </ThemedButton>
            }
            tooltipText={'More'}
            width={'max-content'}
            {...positionProps}
          >
            <button
              className={styles.dropdownBtn}
              onClick={(e) => handleSettingsClick(e, cadence)}
            >
              <div>
                <Settings size={ICON_SIZE} />
              </div>
              <div> Edit details</div>
            </button>

            <button
              className={styles.dropdownBtn}
              onClick={(e) => handleDeleteClick(e, cadence)}
            >
              <div>
                <Trash size={ICON_SIZE} />
              </div>
              <div>Delete</div>
            </button>
          </DropDown>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(CadenceCard);
