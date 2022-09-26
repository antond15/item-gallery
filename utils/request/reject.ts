import { showNotification, updateNotification } from '@mantine/notifications';

export const reject = async (id: number, removeRequest: (id: number) => void) => {
  const notificationId = `request-reject-${id}`;

  showNotification({
    id: notificationId,
    title: 'Rejecting',
    message: 'Recording changes to database.',
    loading: true,
    autoClose: false,
    disallowClose: true,
  });

  const response = await fetch('/api/request/reject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (response.ok) {
    removeRequest(id);

    updateNotification({
      id: notificationId,
      title: 'Rejected',
      message: `Request #${id} has been successfully rejected.`,
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
