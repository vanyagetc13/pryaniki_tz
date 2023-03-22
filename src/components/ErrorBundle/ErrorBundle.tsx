import React from "react";
import styles from "./ErrorBundle.module.scss";
import errors from "./../../store/errors";
import CloseIcon from "@mui/icons-material/Close";

const ErrorBundle = () => {
	return (
		<div className={styles.wrapper}>
			{errors.errors.map((error) => (
				<div className={styles.error}>
					{error}
					<CloseIcon className={styles.close}/>
				</div>
			))}
		</div>
	);
};

export default ErrorBundle;
