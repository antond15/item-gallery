import { showNotification, updateNotification } from '@mantine/notifications';
import type { ISubmit } from '@interfaces';

export const submit = async (body: ISubmit, clearForm: () => void) => {
  const notificationId = `submit-${Math.floor(Math.random() * 100)}`;

  showNotification({
    id: notificationId,
    title: 'Odesílání',
    message: 'Váše žádost se zpracovává.',
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
      title: 'Úspěšně odesláno',
      message: 'Vaše žádost byla úspěšně odeslána.',
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
