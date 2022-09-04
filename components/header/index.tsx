import type { NextPage } from 'next';
import { useMantineTheme, Group } from '@mantine/core';
import LeftGroup from './LeftGroup';
import RightGroup from './RightGroup';

const Header: NextPage = () => {
  const theme = useMantineTheme();

  return (
    <Group
      position="apart"
      style={{
        backgroundColor: theme.colors.dark[8],
        padding: theme.spacing.md,
      }}
    >
      <LeftGroup />
      <RightGroup />
    </Group>
  );
};

export default Header;
