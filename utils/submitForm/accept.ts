import { showNotification, updateNotification } from '@mantine/notifications';
import type { ISubmit } from '@interfaces';

export const accept = async (
  values: ISubmit & { id: number },
  removeRequest: (id: number) => void
) => {
  const notificationId = `request-accept-${values.id}`;

  showNotification({
    id: notificationId,
    title: 'Ukládání',
    message: 'Probíhá zaznamenávání změn v databázi.',
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
      title: 'Úspěšně uloženo',
      message: `Žádost #${values.id} byla úspěšně uložena.`,
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
