import { atom, DefaultValue } from "recoil";
import { IMovie } from "./api";

const localStorageEffect =
  (key: any) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: IMovie) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const isDarkAtom = atom({
    key:"isDark",
    default: true,
})

export const favState = atom<IMovie[]>({
	key: "favs",
	default: [],
	effects: [localStorageEffect("favs")],
});