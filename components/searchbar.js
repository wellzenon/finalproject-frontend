import { Button } from '@chakra-ui/button';
import { CloseButton } from '@chakra-ui/close-button';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Flex } from '@chakra-ui/layout';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useAppContext } from '../components/context/state'


const SearchBar = ({...props}) => {
  const {search, setSearch} = useAppContext();
  const [val, setVal] = useState(search);

  const handleClearSearch = () => {
    setVal('');
    setSearch('');
  };

  return (
    <Flex align="stretch" position="relative" bottom={0} {...props}>
      <InputGroup>
        <Input
          placeholder="Enter search"
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && setSearch(val)}
        />

        <InputRightElement width="12rem" justifyContent="flex-end">
        {val && <CloseButton marginX={1} onClick={handleClearSearch} />}
          <Button
            width="8rem"
            size="sm"
            marginX={1}
            leftIcon={<HiSearch />}
            variant="solid"
            onClick={() => setSearch(val)}
          >
            SEARCH
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
