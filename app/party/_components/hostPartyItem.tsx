import React, { ReactElement } from 'react'
import styles from "../page.module.css";

type HostPartyItemProps = {
    onClick: () => void 
}

export default function HostPartyItem({ onClick }: HostPartyItemProps): ReactElement {
    return (
        <div className={styles.item}>
            <div className={styles.textgroup}>
                <span className={styles.label}>Host a party</span>
                <span className={styles.desc}>Be the first to host your artist’s party</span>
            </div>
            <button className={styles.apply} onClick={onClick}>
                <span>Apply now</span>
            </button>
        </div>
    )
}
