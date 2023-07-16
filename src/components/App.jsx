import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import imagesMapper from '../helpers/imagesMapper';
import { Wrap, Section, Utils, Text } from './App.styled';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '36706034-f5193b0f10336721a563577c8';

export const App = () => {
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (value) {
      setStatus('pending');

      const fetchData = async () => {
        const responce = await axios.get(
          `?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        setImages(prev => [...prev, ...imagesMapper(responce.data.hits)]);
        setStatus('resolved');
      };

      fetchData().catch(error => {
        setStatus('rejected');
        console.log(error.message);
      });
    }
  }, [page, value]);

  const handleSubmit = value => {
    setValue(value);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <Section>
      <Wrap>
        <Searchbar
          onSubmit={value => {
            handleSubmit(value);
          }}
        />
        {status === 'pending' && <Loader />}
        {(status === 'resolved' || status === 'pending') && (
          <ImageGallery images={images} />
        )}
      </Wrap>
      {status === 'resolved' && images.length === 0 && (
        <Text>We are sorry, but we couldn't find anything.</Text>
      )}
      <Utils>
        {status === 'pending' && page !== 1 && <Loader />}
        {status === 'resolved' && images.length !== 0 && (
          <Button
            text="Load more"
            onLoadMore={value => {
              onLoadMore(value);
            }}
          />
        )}
      </Utils>
    </Section>
  );
};
