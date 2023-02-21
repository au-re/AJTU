import { Modal, ModalContent, ModalOverlay, Progress, Text } from "@chakra-ui/react";

interface ChapterLoadingModalProps {
  isLoadingChapter: boolean;
  narration: string;
}

export const ChapterLoadingModal = ({ isLoadingChapter, narration }: ChapterLoadingModalProps) => {
  return (
    <Modal isCentered onClose={() => {}} isOpen={isLoadingChapter}>
      <ModalOverlay />
      <ModalContent>
        <Text padding="6">{narration}</Text>
        <Progress bg="background.MID" colorScheme="teal" size="sm" isIndeterminate />
      </ModalContent>
    </Modal>
  );
};
