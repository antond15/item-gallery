import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  components: {
    Tooltip: {
      defaultProps: {
        color: 'gray',
        withArrow: true,
        position: 'bottom',
      },
    },
  },
};
