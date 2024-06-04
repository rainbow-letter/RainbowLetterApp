import HomeTab from '../assets/ic_tab_home.svg';
import LetterTab from '../assets/ic_tab_letter.svg';
import PetTab from '../assets/ic_tab_pet.svg';
import AccountTab from '../assets/ic_tab_account.svg';
import WritingTab from '../assets/ic_tab_writing.svg';

type TabBarType = {
  [id: string]: any;
};
export const tabBar: TabBarType = {
  Home: HomeTab,
  LetterBox: LetterTab,
  WriteLetter: WritingTab,
  MyPet: PetTab,
  MyPage: AccountTab,
};
