export interface Tip {
  id: number;
  prefix: string;
  question: string;
}

export interface WriteLetter {
  summary: string;
  content: string;
  image: any;
}

export interface Letters {
  id: number;
  summary: string;
  status: 'REQUEST' | 'RESPONSE';
  petName: string;
  readStatus: 'UNREAD' | 'READ';
  createdAt: Date;
}
