import { useMutation, useQueryClient } from "react-query";
import { AuthorizedApi, PublicApi } from "./api";

const useRingoverOAuth = () => {
	const fetchRingoverURIApi = () =>
		PublicApi.get("/v1/agent/ringover/redirect").then(res => res.data.data);

	const { mutate: fetchRingoverURI, isLoading: fetchRingoverURILoading } = useMutation(
		fetchRingoverURIApi,
		{
			onSuccess: data => {
				sessionStorage.setItem("redirectAfterRingoverAuth", `/company`);
				if (data.URI) window.location.href = data.URI;
			},
		}
	);

	const fetchAuthTokensApi = code => {
		let URL = `/v1/agent/ringover/authorize?code=${code}`
		return PublicApi.get(URL).then(res => res.data.data);
	};

	const { mutate: fetchAuthTokens, isLoading: fetchAuthTokensLoading } =
		useMutation(fetchAuthTokensApi);

	const updateAccessTokenApi = ({ body, user }) =>
		AuthorizedApi.post("/v1/agent/ringover/access-token", body, {
			params: {
				user,
			},
		}).then(res => res.data.data);

	const { mutate: updateAccessToken, isLoading: updateAccessTokenLoading } =
		useMutation(updateAccessTokenApi);

	const signOutFromRingoverApi = () =>
		AuthorizedApi.get("/v1/agent/ringover/signout").then(res => res.data);

	const { mutate: signOutFromRingover, isLoading: signOutFromRingoverLoading } =
		useMutation(signOutFromRingoverApi);

	return {
		fetchRingoverURI,
		fetchRingoverURILoading,
		fetchAuthTokens,
		fetchAuthTokensLoading,
		updateAccessToken,
		updateAccessTokenLoading,
		signOutFromRingover,
		signOutFromRingoverLoading,
	};
};

export default useRingoverOAuth;
