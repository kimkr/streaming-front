import { Toaster, resolveValue } from 'react-hot-toast';
import styles from "../page.module.css";

export default function SuccessToast() {
    return (
        <Toaster
            position="bottom-center"
            toastOptions={{
                duration: 5000,
            }}
        >
            {(t) => (
                <div
                    className={styles.successToast}>
                    <img
                        style={{ width: 10, height: 6 }}
                        src={'/images/check.svg'} />
                    <span className={styles.message}>
                        {resolveValue(t.message, t)}
                    </span>
                </div>
            )}
        </Toaster>
    );
}