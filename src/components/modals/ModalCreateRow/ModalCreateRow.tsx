import React from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

interface ModalCreateRowProps {
	close: () => any;
}

const ModalCreateRow = ({ close }: ModalCreateRowProps) => {
	return (
		<ModalWrapper close={close}>
            <div></div>
        </ModalWrapper>
	);
};

export default ModalCreateRow;
