type StatusType = 'REQUEST' | 'RESPONSE';
type ReadType = 'UNREAD' | 'READ';
type ReplyType = 'REPLY' | 'CHAT_GPT';

type Pet = {
  id: number;
  name: string;
  owner: string;
  species: string;
  personalities: string[];
  deathAnniversary: null;
  image: {
    id: null;
    objectKey: null;
    url: null;
  };
};

type Reply = {
  id: number;
  summary: string;
  content: string;
  inspection: true;
  readStatus: ReadType;
  type: ReplyType;
  timestamp: Date;
};

type Image = {
  id: number;
  objectKey: string;
  url: string;
};

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
  index?: number;
  summary: string;
  status: StatusType;
  petName: string;
  readStatus: ReadType;
  createdAt: Date;
}

export interface Letter {
  id: number;
  summary: string;
  content: string;
  shareLink: string;
  pet: Pet;
  image: Image;
  reply: Reply;
  createdAt: string;
}
