type StatusType = 'REQUEST' | 'RESPONSE';
type ReadType = 'UNREAD' | 'READ';
type ReplyType = 'REPLY' | 'CHAT_GPT';
type PromptType = 'A' | 'B';

type Reply = {
  id: number;
  petId: number;
  letterId: number;
  summary: string;
  content: string;
  promptType: PromptType;
  inspection: true;
  inspectionTime: Date;
  status: ReplyType;
  submitTime: Date;
  readStatus: ReadType;
  createdAt: Date;
  updatedAt: Date;
};

type LetterContents = {
  id: number;
  userId: number;
  petId: number;
  number: number;
  summary: string;
  content: string;
  shareLink: string;
  image: string;
  status: StatusType;
  createdAt: Date | string;
  updatedAt: Date;
};

type Pet = {
  id: number;
  userId: number;
  name: string;
  species: string;
  owner: string;
  personalities: string[];
  deathAnniversary: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
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
  number: number;
  summary: string;
  status: StatusType;
  petName: string;
  readStatus: ReadType;
  createdAt: Date;
}

export interface Letter {
  pet: Pet;
  letter: LetterContents;
  reply: Reply;
}
