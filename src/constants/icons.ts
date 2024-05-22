import HomeTab from '../assets/tab_home.svg';
import LetterTab from '../assets/tab_letter.svg';
import PetTab from '../assets/tab_pet.svg';
import AccountTab from '../assets/tab_account.svg';
import WritingTab from '../assets/tab_writing.svg';

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
