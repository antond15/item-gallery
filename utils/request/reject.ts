import { showNotification, updateNotification } from '@mantine/notifications';

export const reject = async (id: number, removeRequest: (id: number) => void) => {
  showNotification({
    id: 'request-reject',
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
      id: 'request-reject',
      title: 'Rejected',
      message: `Request #${id} has been successfully rejected.`,
      color: 'green',
      autoClose: 10000,
    });
  } else {
    updateNotification({
      id: 'request-reject',
      title: 'Something bad happened',
      message: 'Try again later. No changes were made.',
      color: 'red',
      autoClose: false,
    });
  }
};
