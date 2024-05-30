import styles from "../../Connections.module.scss";
import { PageContainer, Spinner } from "@google-sheets/components";
import { ThemedButton } from "@google-sheets/widgets";
import { useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import { useAdminLoginAsUser } from "@cadence-support/data-access";
import { userInfo } from "@cadence-support/atoms";
import { useQuery } from "@cadence-support/utils";
import { useNavigate } from "react-router-dom";
import { ThemedButtonThemes } from "@cadence-support/themes";
import { useState } from "react";

const GetAccess = () => {
	const searchParams = useQuery();
	const { data, getData, success, loading: redirectLoading } = useAdminLoginAsUser();
	const [userRecoil, setUserRecoil] = useRecoilState(userInfo);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const saveUser = usr => {
		setUserRecoil(usr);
	};

	useEffect(() => {
		getData(
			{ email: searchParams.get("email") },
			{
				onSuccess: data => saveUser(data?.data),
				onError: err => {
					setError(err?.message ?? "unable to redirect");
				},
			}
		);
	}, []);

	const goTo = pathName => {
		window.location.href = pathName;
	};

	useEffect(() => {
		if (success && userRecoil) goTo("/crm/salesforce");
	}, [userRecoil]);

	return (
		<PageContainer>
			<div className={styles.redirectPage}>
				{redirectLoading && (
					<>
						<p>Redirecting To User....</p>
						<div>
							<Spinner size="" className={styles.redirectSpinner} />
						</div>
					</>
				)}

				{error && (
					<>
						<span className={styles.error}>{error}</span>
						<ThemedButton
							onClick={() => goTo(-1)}
							theme={ThemedButtonThemes.GREY}
							width="fit-content"
						>
							Go Back
						</ThemedButton>
					</>
				)}
			</div>
		</PageContainer>
	);
};

export default GetAccess;
