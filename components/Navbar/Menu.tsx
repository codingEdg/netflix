/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { Maybe } from '../../types';
import { CaretDown } from '../../utils/icons';
import styles from '../../styles/Navbar.module.scss';
import useDimensions from '../../hooks/useDimensions';

const Dialog = dynamic(import('../Dialog'));

// const browseList = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'];
const browseList = [
  { id: 1, navlink: 'Home', route: '/browse' },
  { id: 2, navlink: 'TV Shows', route: '/tv-shows' },
  { id: 3, navlink: 'Movies', route: '/movies' },
  { id: 4, navlink: 'New & Popular', route: '/new-popular' },
  { id: 5, navlink: 'My List', route: '/my-list' }
];

export default function Menu() {
  const { isMobile, isTablet } = useDimensions();
  const menuRef = useRef<Maybe<HTMLDivElement>>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onMenu = (): void => {
    setIsVisible(true);
  };
  const onClose = (): void => {
    setIsVisible(false);
  };

  const caretAnimation = {
    animate: isVisible ? 'up' : 'down',
    variants: {
      up: {
        rotate: 180
      },
      down: {
        rotate: 0
      }
    },
    transition: { duration: 0.25 }
  };

  return (
    <>
      <Image src='/assets/logo.png' alt='' width={90} height={30} className={styles.nfLogo} />
      {isTablet || isMobile ? (
        <>
          <div className={styles.browse}>
            <div className={styles.options} onMouseOver={onMenu}>
              browse
            </div>
            <motion.div {...caretAnimation}>
              <CaretDown />
            </motion.div>
          </div>
          <Dialog dialogRef={menuRef} onClose={onClose} classname={styles.menu} visible={isVisible}>
            {browseList.map((item, index) => (
              <div key={item.id} className={styles.options}>
                <Link href={item.route}> {item.navlink}</Link>
              </div>
            ))}
          </Dialog>
        </>
      ) : (
        browseList.map((item, index) => (
          <div key={item.id} className={styles.options}>
            <Link href={item.route}> {item.navlink}</Link>
          </div>
        ))
      )}
    </>
  );
}
