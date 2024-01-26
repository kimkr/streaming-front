import React, { ReactElement } from 'react'
import styles from "../page.module.css";
import { PartyApplicationType } from "../types";

type PartyApplicationItemProps = {
    application: PartyApplicationType
}

export default function PartyApplicationItem({ application }: PartyApplicationItemProps): ReactElement {
    return (
        <div className={styles.item}>
            

        </div>
    )
}