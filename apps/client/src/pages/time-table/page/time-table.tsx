import { Spacing } from '@confeti/design-system';
import TimeTableBoard from '@pages/time-table/components/time-table-board/time-table-board';
import EditFloatingButton from '@pages/time-table/components/edit/edit-floating-button';
import Calender from '../components/calender/calender';
import InfoButton from '../components/info/info-button';
import DeleteButton from '@pages/time-table/components/info/delete-button';
import EmptyFestivalSection from '@pages/time-table/components/empty/empty-festival-section';
import { useButtonSelection } from '../hooks/use-button-selection';
import { useEditModes } from '../hooks/use-edit-mode';
import {
  useFestivalButtonData,
  useFestivalTimetableData,
} from '../hooks/use-festival-data';

import * as styles from './time-table.css';
import { useState, useEffect } from 'react';

const TimeTable = () => {
  const {
    isEditMode,
    isEditTimeTableMode,
    isFestivalDeleteMode,
    isTextVisible,
    isComplete,
    toggleEditMode,
    toggleEditTimeTableMode,
    toggleFestivalDeleteMode,
    toggleTextVisibility,
    toggleComplete,
    resetModes,
  } = useEditModes();

  const [festivalsToDelete, setFestivalsToDelete] = useState<number[]>([]);

  const handleDeleteFestival = (festivalId: number) => {
    setFestivalsToDelete((prev) => [...prev, festivalId]);
  };
  const { festivals } = useFestivalButtonData();
  const {
    clickedFestivalId,
    selectedFestivalDates,
    handleFestivalClick,
    selectedFestivalDateId,
    setSelectedFestivalDateId,
  } = useButtonSelection(festivals);

  useEffect(() => {
    if (clickedFestivalId === null && festivals.length > 0) {
      window.location.reload();
    }
  }, [clickedFestivalId, festivals.length]);

  const handleDateSelect = (festivalDateId: number) => {
    setSelectedFestivalDateId(festivalDateId);
  };

  const { data: boardData } = useFestivalTimetableData(
    selectedFestivalDateId as number,
  );

  return (
    <>
      {festivals.length === 0 ? (
        <EmptyFestivalSection></EmptyFestivalSection>
      ) : (
        <>
          <InfoButton.TotalWrap festivals={festivals}>
            <InfoButton.ItemContainer>
              <InfoButton.FixButton />
              {festivals
                .filter(
                  ({ festivalId }) => !festivalsToDelete.includes(festivalId),
                )
                .map(({ festivalId, title, logoUrl }) => (
                  <div className={styles.festivalBtnWrapper} key={festivalId}>
                    <InfoButton.Items
                      src={logoUrl}
                      alt={title}
                      text={title}
                      onClick={() => handleFestivalClick(festivalId)}
                      isClicked={clickedFestivalId === festivalId}
                    />
                    {festivalId && (
                      <DeleteButton
                        onDelete={() => handleDeleteFestival(festivalId)}
                        isFestivalDeleteMode={isFestivalDeleteMode}
                        festivalId={festivalId}
                      />
                    )}
                  </div>
                ))}
            </InfoButton.ItemContainer>
          </InfoButton.TotalWrap>
          <Spacing />
          <Calender
            festivalDates={selectedFestivalDates}
            onDateSelect={handleDateSelect}
          />
          <Spacing />
          {boardData && (
            <TimeTableBoard
              timeTableInfo={boardData}
              isEditTimeTableMode={isEditTimeTableMode}
              isFestivalDeleteMode={isFestivalDeleteMode}
              isComplete={isComplete}
              onToggleComplete={toggleComplete}
            />
          )}
          <EditFloatingButton
            isEditMode={isEditMode}
            isEditTimeTableMode={isEditTimeTableMode}
            isFestivalDeleteMode={isFestivalDeleteMode}
            isTextVisible={isTextVisible}
            onToggleEditMode={toggleEditMode}
            onToggleEditTimeTableMode={toggleEditTimeTableMode}
            onToggleFestivalDeleteMode={toggleFestivalDeleteMode}
            onToggleTextVisibility={toggleTextVisibility}
            onToggleComplete={toggleComplete}
            onResetModes={resetModes}
            festivalsToDelete={festivalsToDelete}
          />
        </>
      )}
    </>
  );
};

export default TimeTable;
