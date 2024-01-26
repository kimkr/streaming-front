'use client'

import React, { useState, useCallback } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import toast from 'react-hot-toast';
import { APPLICATION_STATE } from "../constants";
import HostPartyItem from './_components/hostPartyItem';
import PartyApplicationItem from './_components/partyApplicationItem';
import CancelModal from './_components/cancelModal';
import SuccessToast from './_components/successToast';
import { PartyApplicationType, ImageType } from './types';

export default function PartyHome() {
    const [applicationStatus, setApplicationStatus] = useState(APPLICATION_STATE.NA);
    const [application, setApplication] = useState<PartyApplicationType | null>(null);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);

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
                        "id": 123,
                        "name": "BTS",
                        "image": {
                            "id": 123,
                            "filename": "/images/123.svg",
                            "thumb_url": "https://storeage.makestar.com/ATEEZ_main.thumb.png",
                            "mime": "PNG"
                        }
                    }
                }
            },
            status: APPLICATION_STATE.IN_REVIEW
        })
    }, []);

    const quitHostingParty = useCallback(() => {
        setCancelModalOpen(false);
        onApplicationApproved();
    }, []);

    const showCancelModal = useCallback(() => {
        setCancelModalOpen(true);
    }, []);

    const onApplicationApproved = () => toast('Application complete!')

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
                        <HostPartyItem onClickApply={startHostingParty} />
                    ) : (
                        <>
                            <div className={styles.itemtitle}>
                                Your party application
                            </div>
                            <PartyApplicationItem
                                application={{ ...application, status: applicationStatus }}
                                onClickMore={showCancelModal}
                            />
                        </>
                    )
                }
                {
                    cancelModalOpen && (<div className={styles.dim} />)
                }
            </div>
            <CancelModal
                isOpen={cancelModalOpen}
                onClickQuit={() => quitHostingParty()}
                onClose={() => setCancelModalOpen(false)} />
            <SuccessToast />
        </main>
    );
}
