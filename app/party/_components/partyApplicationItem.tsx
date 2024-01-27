import React, { ReactElement } from 'react'
import styles from "../page.module.css";
import { PartyApplicationType } from "../types";
import { APPLICATION_STATE } from '@/app/constants';

type PartyApplicationItemProps = {
    application: PartyApplicationType,
    applicationStatus: number,
    onClickMore: () => void
}

function formatDate(date: Date) {
    const yy = (date.getFullYear() % 100).toString().padStart(2, '0');
    const mm = (date.getMonth() + 1).toString().padStart(2, '0');
    const dd = (date.getDate()).toString().padStart(2, '0');
    return `${yy}.${mm}.${dd}`;
}

function renderStatusText(status: number) {
    switch (status) {
        case APPLICATION_STATE.PENDING:
            return "Pending";
        case APPLICATION_STATE.CANCELED:
            return "Canceled";
        case APPLICATION_STATE.IN_REVIEW:
            return "In review";
        case APPLICATION_STATE.QUEUED:
            return "In prcessing";
        case APPLICATION_STATE.APPROVAL:
            return "Approved";
        case APPLICATION_STATE.REJECTED:
            return "Rejected"
    }
}

export default function PartyApplicationItem({ application, applicationStatus, onClickMore }: PartyApplicationItemProps): ReactElement {
    return (
        <div className={styles.application}>
            <img className={styles.image}
                src={application.member.fandom.artist.image.filename} />
            <div className={styles.textgroup}>
                <span className={styles.name}>{application.member.fandom.artist.name}</span>
                <span className={styles.date}>{formatDate(new Date())}</span>
            </div>
            <span className={styles.status}>
                {renderStatusText(applicationStatus)}
            </span>
            <button className={styles.more} onClick={onClickMore}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
            </button>
        </div>
    )
}