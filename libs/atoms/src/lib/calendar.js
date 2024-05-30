import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const calendar = atom({
	key: "calendar",
	default: {
		error: "",
		events: [],
	},
	effects_UNSTABLE: [persistAtom],
});

export default calendar;
