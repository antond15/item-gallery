import type { NextPage } from 'next';
import { createStyles, Button } from '@mantine/core';
import SubmitForm from '../form';
import { submit } from '@utils/submitForm';

const useStyles = createStyles((theme) => ({
  form: {
    background: theme.colors.dark[8],
    borderRadius: theme.radius.md,
    maxWidth: 450,
    padding: theme.spacing.xl,
    margin: 'auto',
    marginTop: theme.spacing.xl,

    '@media (max-width: 450px)': {
      borderRadius: 0,
      marginTop: theme.spacing.xs,
    },
  },
  buttonWrapper: {
    textAlign: 'right',
    marginTop: theme.spacing.xs,
  },
}));

const SubmitPage: NextPage = () => {
  const { classes } = useStyles();

  return (
    <SubmitForm
      className={classes.form}
      onSubmit={submit}
      footerComponent={
        <div className={classes.buttonWrapper}>
          <Button type="submit" variant="light" color="cyan" size="xs">
            Submit request
          </Button>
        </div>
      }
    />
  );
};

export default SubmitPage;
