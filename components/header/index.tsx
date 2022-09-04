import type { NextPage } from 'next';
import { Group } from '@mantine/core';
import LeftGroup from './LeftGroup';
import RightGroup from './RightGroup';

const Header: NextPage = () => {
  return (
    <Group position="apart">
      <LeftGroup />
      <RightGroup />
    </Group>
  );
};

export default Header;
