import { showNotification, updateNotification } from '@mantine/notifications';

export const accept = async (body: any, removeRequest: (id: number) => void) => {
  showNotification({
    id: 'request-accept',
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
      id: 'request-accept',
      title: 'Successfully saved',
      message: `Request #${body.id} has been successfully saved to database.`,
      color: 'green',
      autoClose: 10000,
    });
  } else {
    updateNotification({
      id: 'request-accept',
      title: 'Something bad happened',
      message: 'Try again later. No changes were made.',
      color: 'red',
      autoClose: false,
    });
  }
};
