import type { NextPage } from 'next';
import { useMantineTheme, Group } from '@mantine/core';
import LeftGroup from './LeftGroup';
import RightGroup from './RightGroup';

type Props = {
  setQuery: (query: string) => void;
};

const Header: NextPage<Props> = (props: Props) => {
  const theme = useMantineTheme();

  return (
    <Group
      position="apart"
      style={{
        backgroundColor: theme.colors.dark[8],
        padding: theme.spacing.md,
      }}
    >
      <LeftGroup {...props} />
      <RightGroup />
    </Group>
  );
};

export default Header;
