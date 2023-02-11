import { showNotification, updateNotification } from '@mantine/notifications';

export const reject = async (id: number, removeRequest: (id: number) => void) => {
  const notificationId = `request-reject-${id}`;

  showNotification({
    id: notificationId,
    title: 'Ukládání',
    message: 'Probíhá zaznamenávání změn v databázi.',
    loading: true,
    autoClose: false,
    disallowClose: true,
  });

  const response = await fetch('/api/admin/reject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (response.ok) {
    removeRequest(id);

    updateNotification({
      id: notificationId,
      title: 'Zamítnuto',
      message: `Žádost #${id} byla úspěšně zamítnuta.`,
      color: 'green',
      autoClose: 10000,
    });
  } else {
    updateNotification({
      id: notificationId,
      title: 'Stalo se něco neočekávaného',
      message: 'Zkuste to později.',
      color: 'red',
      autoClose: false,
    });
  }
};
