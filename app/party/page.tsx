'use client'

import React, { useState, useCallback, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import toast from 'react-hot-toast';
import { APPLICATION_STATE } from "../constants";
import HostPartyItem from './_components/hostPartyItem';
import PartyApplicationItem from './_components/partyApplicationItem';
import CancelModal from './_components/cancelModal';
import SuccessToast from './_components/successToast';
import { PartyApplicationType, ImageType } from './types';
import {
    applyHost as applyHostApi,
    listHostApplyStatus as listHostApplyStatusApi,
    cancelHostApply as cancelHostApplyApi,
} from '../lib/api';

export default function PartyHome() {
    const [applicationStatus, setApplicationStatus] = useState(APPLICATION_STATE.NA);
    const [application, setApplication] = useState<PartyApplicationType | null>(null);
    const [cancelModalOpen, setCancelModalOpen] = useState(false);

    useEffect(() => {
        const loadUserApplyStatus = async () => {
            // Using session(currently none), call 'listHostApplyStatus'
            try {
                const res = await listHostApplyStatusApi(1, 10);
                const items = res?.data?.external_data?.request_list || [];
                const toShowApplication = items
                    .filter(({ status }: PartyApplicationType) => [
                        APPLICATION_STATE.IN_REVIEW, APPLICATION_STATE.QUEUED
                    ].includes(status))?.[0];
                if (toShowApplication) {
                    setApplication(toShowApplication);
                    setApplicationStatus(toShowApplication.status);
                }
            } catch (e) {
                toast("A problem is occurred. Please try again later")
            }
        }
        loadUserApplyStatus();
    }, []);

    const startHostingParty = useCallback(async () => {
        setApplicationStatus(APPLICATION_STATE.PENDING);
        try {
            const res = await applyHostApi({
                artist_id: 123,
                sns: [{ "type": "INSTAGRAM", "content": "http://dev.kimkr.com" }],
                email: "dev.kimkr@gmail.com",
                introduction: "hi kimkr"
            });
            setApplication(res.data.external_data);
            setApplicationStatus(res.data.status);
        } catch (e) {
            toast("A problem is occurred. Please try again later.");
        }
    }, []);

    const quitHostingParty = useCallback(async () => {
        const requestId = application?.id;
        if (requestId !== undefined) {
            try {
                const res = await cancelHostApplyApi(requestId);
                setApplication(null);
                setApplicationStatus(APPLICATION_STATE.NA);
                toast(res.data.message);
            } catch (e) {
                toast("A problem is occurred. Please try again later.");
            } finally {
                setCancelModalOpen(false);
            }
        }
    }, [application]);

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
                    applicationStatus == APPLICATION_STATE.NA ? (
                        <HostPartyItem onClickApply={startHostingParty} />
                    ) : (
                        <>
                            <div className={styles.itemtitle}>
                                Your party application
                            </div>
                            {
                                application === null && (<span>PENDING</span>)
                            }
                            {
                                application !== null && (
                                    <PartyApplicationItem
                                        application={{ ...application, status: applicationStatus }}
                                        onClickMore={showCancelModal}
                                    />
                                )
                            }
                        </>
                    )
                }
                {
                    cancelModalOpen && (<div className={styles.dim} />)
                }
            </div>
            <CancelModal
                isOpen={cancelModalOpen}
                onClickQuit={quitHostingParty}
                onClose={() => setCancelModalOpen(false)} />
            <SuccessToast />
        </main>
    );
}
