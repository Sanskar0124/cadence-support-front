import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: "userInfo",
});

const userInfo = atom({
  key: 'userInfo',
  default: {
    ringover_tokens: {},
    sa_id: '',
    email: '',
    role: '',
    last_name: '',
    linkedin_url: null,
    primary_email: '',
    primary_phone_number: '',
    profile_picture: '',
    timezone: '',
    is_call_iframe_fixed: null,
    language: 'english',
    mail_integration_type: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const accessToken = selector({
	key: "accessToken",
	get: ({ get }) => {
		const user = get(userInfo);
		return user.ringover_tokens?.id_token;
	},
});

export default userInfo;
