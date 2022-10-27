import { showNotification, updateNotification } from '@mantine/notifications';
import type { ISubmit } from '@interfaces';

export const accept = async (
  values: ISubmit & { id: number },
  removeRequest: (id: number) => void
) => {
  const notificationId = `request-accept-${values.id}`;

  showNotification({
    id: notificationId,
    title: 'Saving',
    message: 'Recording changes to database.',
    loading: true,
    autoClose: false,
    disallowClose: true,
  });

  const response = await fetch('/api/admin/accept', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (response.ok) {
    removeRequest(values.id);

    updateNotification({
      id: notificationId,
      title: 'Successfully saved',
      message: `Request #${values.id} has been successfully saved to database.`,
      color: 'green',
      autoClose: 10000,
    });
  } else {
    updateNotification({
      id: notificationId,
      title: 'Something bad happened',
      message: 'Try again later. No changes were made.',
      color: 'red',
      autoClose: false,
    });
  }
};
