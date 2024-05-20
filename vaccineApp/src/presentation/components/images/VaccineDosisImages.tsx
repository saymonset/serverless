import React from 'react'
import { FlatList, Image } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';

interface Props {
    images: string[];
  }

export const VaccineDosisImages = ({images}: Props) => {
  return (
    <>
    {/* // source={require('../../..assets/no-product-image.png')} */}
    {images.length === 0 ? (
      <Image
        source={require('../../../assets/no-product-image.png')}
        style={{width: 300, height: 300}}
      />
    ) : (
      <FlatList
        data={images}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <FadeInImage
            uri={item}
            style={{width: 300, height: 300, marginHorizontal: 7}}
          />
        )}
      />
    )}
  </>
  )
}
