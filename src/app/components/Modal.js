import { Button, Modal } from "rsuite"

export const ModalComponent = ({
    open,
    onClose,
    title,
    content
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose} appearance="primary">
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}