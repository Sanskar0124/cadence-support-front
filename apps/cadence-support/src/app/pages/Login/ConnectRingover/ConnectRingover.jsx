/* eslint-disable no-console */

import { MessageContext } from "@cadence-support/context";
import { useRingoverOAuth } from "@cadence-support/data-access";
import { RingoverLogoWithColor } from "@cadence-support/icons";
import { ThemedButtonThemes } from "@cadence-support/themes";
import { ThemedButton } from "@cadence-support/widgets";
import { useContext } from "react";
import styles from "./ConnectRingover.module.scss";

const ConnectRingover = () => {
	const { addError } = useContext(MessageContext);
	const { fetchRingoverURI, fetchRingoverURILoading } = useRingoverOAuth();

	const onLogin = () => {
		fetchRingoverURI(null, {
			onError: err => addError(err?.response?.data?.msg),
		});
	};

	return (
		<div className={styles.container}>
			<ThemedButton
				onClick={onLogin}
				loading={fetchRingoverURILoading}
				loadingText="Logging in"
				theme={ThemedButtonThemes.GREEN}
				width="436px"
				height="64px"
			>
				<RingoverLogoWithColor size="1.5rem" />
				<div>Log in with Ringover</div>
			</ThemedButton>
		</div>
	);
};

export default ConnectRingover;
