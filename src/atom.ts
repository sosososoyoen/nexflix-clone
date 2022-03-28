import { atom } from "recoil";

export const isDarkAtom = atom({
    key:"isDark",
    default: true,
})

export interface IParam {
	path: string;
	url: string; 
	isExact: boolean;
	params: {
		movieId: string;
	}
}
export const favState = atom<IParam[]>({
	key: "favs",
	default: [],
	// effects: [localStorageEffects("favs")],
});