import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const stepChange = atom({
	key: "stepChange",
	default: true,
	effects_UNSTABLE: [persistAtom],
});

export default stepChange;
