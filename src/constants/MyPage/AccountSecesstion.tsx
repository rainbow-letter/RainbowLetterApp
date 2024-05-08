import Secesstion from '../../model/Secesstion.model';

const ACCOUNT_SECESSTION_GUIDELINES: Secesstion[] = [
  {
    id: 1,
    contents: `<p>\u2022 탈퇴 시 <strong>편지는 모두 삭제</strong>됩니다.</p>`,
  },
  {
    id: 2,
    contents: `<p>\u2022 삭제된 데이터(편지, 동물정보 등)은 <strong>복구되지 않습니다.</strong></p>`,
  },
  {
    id: 3,
    contents: `<p>\u2022 <strong>동일 이메일로 재가입해도</strong> 삭제된 데이터는 복구되지 않습니다.</p>`,
  },
  {
    id: 4,
    contents: `<p>\u2022 탈퇴 후 <strong>일주일 동안 재가입이 불가</strong>합니다.</p>`,
  },
];

export default ACCOUNT_SECESSTION_GUIDELINES;
