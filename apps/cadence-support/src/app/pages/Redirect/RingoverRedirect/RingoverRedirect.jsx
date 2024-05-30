/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable react-hooks/exhaustive-deps */
import { userInfo } from "@cadence-support/atoms";
import { PageContainer, Spinner } from "@cadence-support/components";
import { useCompanyIntegration, useRingoverOAuth } from "@cadence-support/data-access";
import { Common as COMMON_TRANSLATION } from "@cadence-support/languages";
import { ThemedButtonThemes } from "@cadence-support/themes";
import { useQuery } from "@cadence-support/utils";
import { ThemedButton } from "@cadence-support/widgets";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import styles from "../RedirectPage.module.scss";
import { useNavigate } from "react-router-dom";
import {
	INTEGRATION_TYPE,
	ROLES,
	SESSION_STORAGE_KEYS,
} from "@cadence-support/constants";
import { RingoverLogoWithColor, ErrorGradient } from "@cadence-support/icons";

const RingoverRedirect = () => {
	const navigate = useNavigate();
	const [user, setUser] = useRecoilState(userInfo);

	const query = useQuery();
	let auth_code = query.get("code");

	const [error, setError] = useState({
		isError: false,
		title: "An error has occured",
		msg: "",
	});

	const { fetchAuthTokens, fetchAuthTokensLoading } = useRingoverOAuth();

	const saveUser = usr => {
		setUser({
			...usr,
			token_expires_at: Date.now() + (usr.ringover_tokens.expires_in - 300) * 1000,
		})
		window.location.href = "/company";
	}

	useEffect(() => {
		fetchAuthTokens(auth_code, {
			onSuccess: usr => saveUser(usr),
			onError: err => {
				if (err.response?.data?.msg?.message)
					setError(prev => ({
						...prev,
						isError: true,
						msg: err.response?.data?.msg?.message,
					}));
				else
					setError(prev => ({
						...prev,
						isError: true,
						msg: err.response?.data?.msg,
					}));
			},
		});
	}, []);
	return (
		<div style={{ height: "100%", width: "100%" }}>
			{error?.isError ? (
				<PageContainer className={styles.loginContainer}>
					<div className={styles.container2}>
						<div className={styles.logo}>
							<RingoverLogoWithColor size="38px" />
							<div>
								<span>Cadence Support</span>
								<span>By Ringover</span>
							</div>
						</div>
						<div className={styles.content}>
							<div className={styles.errorcontainer}>
								<ErrorGradient />
								<div className={styles.errortitle}>{error?.title}</div>
							</div>
							<span className={styles.error}>{error?.msg}</span>
							<ThemedButton
								onClick={() =>
									navigate("/login")
								}
								theme={ThemedButtonThemes.WHITE}
								className={styles.backbtn}
								height="54px"
								width="178px"
							>
								Go Back
							</ThemedButton>
						</div>
						<div className={styles.bgLogo1}>
							<RingoverLogoWithColor size="180px" />
						</div>
						<div className={styles.bgLogo2}>
							<RingoverLogoWithColor size="170px" />
						</div>
						<div className={styles.bgLogo3}>
							<RingoverLogoWithColor size="400px" />
						</div>
					</div>
				</PageContainer>
			) : 
			(
				<PageContainer className={styles.loginContainer}>
					<div className={styles.container2}>
						<div className={styles.logo}>
							<RingoverLogoWithColor size="38px" />
							<div>
								<span>Cadence Support</span>
								<span>By Ringover</span>
							</div>
						</div>
						<div className={styles.content}>
							<p className={styles.msg}>Redirecting to cadence support...</p>
							<div className={styles.spinnerdiv}>
								{fetchAuthTokensLoading && (
									<Spinner size="" className={styles.redirectSpinner} />
								)}
							</div>
						</div>
						<div className={styles.bgLogo1}>
							<RingoverLogoWithColor size="180px" />
						</div>
						<div className={styles.bgLogo2}>
							<RingoverLogoWithColor size="170px" />
						</div>
						<div className={styles.bgLogo3}>
							<RingoverLogoWithColor size="400px" />
						</div>
					</div>
				</PageContainer>
			)}
		</div>
	);
};

export default RingoverRedirect;
