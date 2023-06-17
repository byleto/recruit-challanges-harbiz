import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';

export const UserProfile = ({ picture, name }) => { 
    return (
      <Stack direction="horizontal" gap={3}>
        <Image src={picture} roundedCircle />
        <p>{name}</p>
      </Stack>
    );
  };