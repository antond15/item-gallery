import { showNotification, updateNotification } from '@mantine/notifications';
import { ISubmit } from '../interfaces';

export const submit = async (body: ISubmit, clearForm: () => void) => {
  const notificationId = `submit-${Math.floor(Math.random() * 100)}`;

  showNotification({
    id: notificationId,
    title: 'Submitting',
    message: 'Your submission is being processed.',
    loading: true,
    autoClose: false,
    disallowClose: true,
  });

  const response = await fetch('/api/user/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    clearForm();

    updateNotification({
      id: notificationId,
      title: 'Successfully submitted',
      message: 'Your item submission has been successfully sent to the review team.',
      color: 'green',
      autoClose: 10000,
    });
  } else {
    updateNotification({
      id: notificationId,
      title: 'Something bad happened',
      message: 'Try again later or ask for help at our Discord server.',
      color: 'red',
      autoClose: false,
    });
  }
};
