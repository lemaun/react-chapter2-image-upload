import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { onOpen, isOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [selectedImage, setSelectedImage] = useState('');
  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    setSelectedImage(url);
    onOpen();
  }
  return (
    <>
      <SimpleGrid columns={3} spacing="10">
        {
          cards.map(card => {
            return (<Card key={card.id} data={card} viewImage={() => handleViewImage(card.url) }/>)
          })
        }
      </SimpleGrid>

      {
        /* TODO MODALVIEWIMAGE */
        isOpen && (
          <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={selectedImage} />
        )
      }
    </>
  )
}
