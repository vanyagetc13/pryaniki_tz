import React from "react";
import styles from "./ModalWrapper.module.scss";

interface ModalWrapperProps {
	children: React.ReactNode;
	close: () => any;
}
const ModalWrapper = ({ children, close }: ModalWrapperProps) => {
	const closeHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		// e.stopPropagation();
		close();
	};

	return (
		<div className={styles.wrapper} onClick={closeHandler}>
			<div onClick={(e) => e.stopPropagation()} className={styles.modal}>
				{children}
			</div>
		</div>
	);
};

export default ModalWrapper;
