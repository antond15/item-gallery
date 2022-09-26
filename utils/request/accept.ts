import { showNotification, updateNotification } from '@mantine/notifications';

export const accept = async (body: any, removeRequest: (id: number) => void) => {
  const notificationId = `request-accept-${body.id}`;

  showNotification({
    id: notificationId,
    title: 'Saving',
    message: 'Recording changes to database.',
    loading: true,
    autoClose: false,
    disallowClose: true,
  });

  const response = await fetch('/api/request/accept', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: body.id,
      label: body.label,
      description: body.description,
      image: body.image,
      tags: body.tags,
    }),
  });

  if (response.ok) {
    removeRequest(body.id);

    updateNotification({
      id: notificationId,
      title: 'Successfully saved',
      message: `Request #${body.id} has been successfully saved to database.`,
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
