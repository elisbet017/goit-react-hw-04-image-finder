import { useState } from 'react';
import Modal from '../Modal';
import { Item, Image, ModalImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, largeImage }) => {

  const [largeImageURL, setLargeImageURL] = useState(null);

  const onOpenModal = image => {
    setLargeImageURL(image);
  };

  const onCloseModal = () => {
    setLargeImageURL(null);
  };


  return (
    <>
      <Item
        onClick={() => {
          onOpenModal(largeImage);
        }}
      >
        <Image src={image} alt="" />
      </Item>
      {largeImageURL && (
        <Modal onCloseModal={onCloseModal}>
          <ModalImage src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
