'use client';

import { FC, useCallback, useState } from 'react';
import GenerativeAiModal, { GenerativeAiState } from './generativeAiModal';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '../ui/drawer';
import { Button } from '../ui/button';
import { getGenerativeItems } from './utils';

const GenerativeAiContainer: FC = () => {
  const savedHistoryItems = getGenerativeItems();
  const [isShowModal, setIsShowModal] = useState<boolean>(!savedHistoryItems);
  const [history, setHistory] = useState<GenerativeAiState[] | null>(
    savedHistoryItems,
  );

  const onHandleSetShowingModal = useCallback((isOpen: boolean) => {
    setIsShowModal(isOpen);
    setHistory(getGenerativeItems());
  }, []);

  return (
    <>
      <Drawer open={!isShowModal}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>History</DrawerTitle>
            <DrawerDescription>
              There we show your history of searches:
            </DrawerDescription>
            {history &&
              history?.map((x, i) => (
                <p key={Math.random()}>
                  {i + 1} » {x.question}
                </p>
              ))}
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => setIsShowModal(true)}>Ask question</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <GenerativeAiModal
        isOpen={isShowModal}
        setIsOpen={onHandleSetShowingModal}
      />
    </>
  );
};

export default GenerativeAiContainer;
