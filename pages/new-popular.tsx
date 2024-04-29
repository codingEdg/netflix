import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import React, { useContext, useState, useEffect, useMemo } from 'react';
import sections from '@/constants/sections';
import { ModalContext } from '../context/ModalContext';
import List from '../components/List';
import Modal from '../components/Modal';
import Layout from '../components/Layout';
import Banner from '../components/Banner';
import styles from '../styles/Browse.module.scss';
import sections_constants from '@/constants/sections';

export default function NewPopular(): React.ReactElement {
  const { isModal } = useContext(ModalContext);
  const [loading, setLoading] = useState(true);
  const sections = useMemo(() => sections_constants, []);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clear timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isModal && <Modal />}
      <Layout>
        <Banner />

        <div className={styles.contentContainer}>
          {loading ? (
            <motion.div
              className={styles.spinnerContainer}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}>
              <motion.div
                className={styles.spinner}
                animate={{ rotate: 360 }}
                transition={{ loop: Infinity, duration: 1 }}
              />
            </motion.div>
          ) : (
            sections.map((item, index) => (
              <List
                key={index}
                heading={item.heading}
                endpoint={item.endpoint}
                defaultCard={item?.defaultCard}
                topList={item?.topList}
              />
            ))
          )}
        </div>
      </Layout>
    </>
  );
}
