export const letterReplyStatus = (reply: string) => {
  switch (reply) {
    case 'REQUEST':
      return '답장 중';
    case 'RESPONSE':
      return '답장완료';
    default:
      return null;
  }
};

export const isCheckUnread = (isRead: string, reply: string): boolean => {
  if (reply === 'REQUEST') return false;
  if (isRead === 'READ') return false;

  return true;
};
