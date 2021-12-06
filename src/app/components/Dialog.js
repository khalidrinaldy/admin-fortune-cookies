import { Button, Modal } from "rsuite"

export const Dialog = ({
    open,
    onClose,
    onAction,
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
                <Button onClick={onAction} appearance="primary">
                    Ok
                </Button>
                <Button onClick={onClose} appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}