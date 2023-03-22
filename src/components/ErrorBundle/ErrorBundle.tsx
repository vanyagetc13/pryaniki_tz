import React from "react";
import styles from "./ErrorBundle.module.scss";
import errors from "./../../store/errors";
import CloseIcon from "@mui/icons-material/Close";
import { observer } from "mobx-react-lite";

const ErrorBundle = observer(() => {
	return (
		<div className={styles.wrapper}>
			{errors.errors.map((error) => (
				<div key={error.id.toString()} className={styles.error}>
					<h5>Code: {error.code}</h5>
					<div>{error.text}</div>
					<CloseIcon
						className={styles.close}
						onClick={() => {
							errors.deleteError(error.id);
						}}
					/>
				</div>
			))}
		</div>
	);
});

export default ErrorBundle;
