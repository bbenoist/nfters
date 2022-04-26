import { Button, HStack } from '@chakra-ui/react';
import { sentenceCase } from 'change-case';
import { useCallback } from 'react';
import { CategoryFilter, useNfts } from '../../../context/nfts.context';
import { Category } from '../../../graphql-types';

type CategoryButtonProps = { category: CategoryFilter };

const CategoryButton = ({ category }: CategoryButtonProps) => {
  const { category: selectedCategory, setCategory } = useNfts();
  const handleClick = useCallback(() => {
    if (category === selectedCategory) return;
    setCategory(category);
  }, [category, selectedCategory, setCategory]);
  const colorScheme = category === selectedCategory ? 'brand' : 'gray';
  return (
    <Button colorScheme={colorScheme} onClick={handleClick}>
      {sentenceCase(category)}
    </Button>
  );
};

export const Categories = () => (
  <HStack>
    <CategoryButton category="all" />
    {Object.values(Category).map((category) => (
      <CategoryButton key={category} category={category} />
    ))}
  </HStack>
);
