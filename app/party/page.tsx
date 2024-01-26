'use client'

import React, { useState, useCallback } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import { APPLICATION_STATE } from "../constants";
import HostPartyItem from './_components/hostPartyItem';
import PartyApplicationItem from './_components/partyApplicationItem';
import { PartyApplicationType, ImageType } from './types';

export default function PartyHome() {
    const [applicationStatus, setApplicationStatus] = useState(APPLICATION_STATE.NA);
    const [application, setApplication] = useState<PartyApplicationType | null>(null);

    const startHostingParty = useCallback(() => {
        setApplicationStatus(APPLICATION_STATE.IN_REVIEW);
        setApplication({
            id: 123,
            before_level: 0,
            after_level: 2,
            member: {
                "id": 1234,
                "level": 0,
                "profile_image": {
                    "id": 2345,
                    "filename": "myprofile.png",
                    "thumb_url": "https://storeage.makestar.com/myprofile.thumb.png",
                    "mime": "PNG"
                },
                "nickname": "닉네임",
                "user": {
                    "id": 3456,
                    "email": "sample@makestar.com",
                    "is_active": true
                },
                "fandom": {
                    "id": 456,
                    "title": "ATINY",
                    "image": {
                        "id": 2345,
                        "filename": "ATINY_logo.png",
                        "thumb_url": "https://storeage.makestar.com/ATINY_logo.thumb.png",
                        "mime": "PNG"
                    },
                    "artist": {
                        "id": 56,
                        "name": "ATEEZ",
                        "image": {
                            "id": 2345,
                            "filename": "ATEEZ_main.png",
                            "thumb_url": "https://storeage.makestar.com/ATEEZ_main.thumb.png",
                            "mime": "PNG"
                        }
                    }
                }
            },
            status: APPLICATION_STATE.IN_REVIEW
        })
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.party}>
                <span className={styles.title}>
                    {applicationStatus == APPLICATION_STATE.NA ? "Party" : "streamwith"}
                </span>
            </div>
            <div className={styles.partylist}>
                {
                    application == null ? (
                        <HostPartyItem onClick={startHostingParty} />
                    ) : (
                        <>
                            <div className={styles.itemtitle}>
                                Your party application
                            </div>
                            <PartyApplicationItem
                                application={{ ...application, status: applicationStatus }}
                            />
                        </>
                    )
                }
            </div>
        </main>
    );
}
