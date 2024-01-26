import React, { ReactElement } from 'react'
import Sheet from 'react-modal-sheet';
import styles from "../page.module.css";

type CancelModalProps = {
    isOpen: boolean
    onClose: () => void
    onClickQuit: () => void
}


export default function CancelModal({ isOpen, onClickQuit, onClose }: CancelModalProps): ReactElement {
    return (
        <Sheet
            snapPoints={[200, 0]}
            initialSnap={0}
            isOpen={isOpen}
            onClose={onClose}>
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <button className={styles.quit} onClick={onClickQuit}>
                        <span>Quit a host</span>
                    </button>
                    <button className={styles.close} onClick={onClose}>
                        <span>Close</span>
                    </button>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    )
}
