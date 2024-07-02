import Letter from '../../assets/im_home_letter.jpeg';
import Comment from '../../assets/im_home_comment.png';
import Type from '../../assets/im_home_type.jpeg';
import InterView from '../../assets/im_home_interview.jpeg';
import { Contents } from '../../model/Home.model';

export const CONTENTS_ITEMS: Contents[] = [
  {
    title: '무지개마을에서 우리 강아지는',
    description: '강아지 유형 테스트 하러 가기',
    link: 'https://smore.im/quiz/IEiAubtaOQ',
    image: Type,
    isImpotant: true,
  },
  {
    title: '고객 만족도 조사',
    description: '무지개 편지에 의견을 보내주세요!',
    link: 'https://forms.gle/bHsDq3XSqHsMuSh36',
    image: Letter,
    isImpotant: false,
  },
  {
    title: '편지 쓰기가 도움이 되나요?',
    description: '펫로스 상담사 인터뷰',
    link: 'https://blog.naver.com/rainbowletter/223324381170',
    image: InterView,
    isImpotant: false,
  },
  {
    title: '잔디 언니의 따뜻한 조언',
    description: '무지개마을 그림을 그린 이야기',
    link: 'https://blog.naver.com/rainbowletter/223324567774',
    image: Comment,
    isImpotant: false,
  },
];
