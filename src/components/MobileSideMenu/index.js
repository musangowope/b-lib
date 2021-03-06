import React, { useRef, useEffect } from 'react';
import './scss/Styles.scss';

type PropsShape = {
  /** css class name assigned to root div. All child css class names are appended
   from this baseClassName  */
  baseClassName?: string,
  /** array of item that contain jsx */
  menuItems?: Array,
  /** Method to close `MobileSideMenu` */
  closeAction: Function,
  /** Jsx renders with `div.`${baseClassName}__content__footer` */
  footerContent?: any,
  /** if true, MobileSideMenu is visible */
  isOpen?: boolean,
  /** title of menu  */
  menuTitle?: string,
  /** data identifier for menu items  */
  dataIdentifier?: string,
};

/**
 * MobileSideMenu provides a simple scaffold for implementing a menu, especially for Mobile websites
 */
const MobileSideMenu = ({
  baseClassName,
  menuItems,
  closeAction,
  footerContent,
  isOpen,
  menuTitle,
  dataIdentifier,
}: PropsShape) => {
  const menuContentRef = useRef();
  useEffect(() => {
    const handleClickOutside = e => {
      if (menuContentRef && !menuContentRef.current.contains(e.target)) {
        closeAction();
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeAction]);

  return (
    <div className={`${baseClassName}${isOpen ? '--active' : ''}`}>
      <div className={`${baseClassName}__overlay`} />
      <div className={`${baseClassName}__content`} ref={menuContentRef}>
        <div className={`${baseClassName}__content__title`}>{menuTitle}</div>
        {menuItems.map((item, key) => (
          <div
            key={dataIdentifier ? `${dataIdentifier}--${key}` : key}
            className={`${baseClassName}__content__item`}>
            {item}
          </div>
        ))}

        {footerContent && (
          <div className={`${baseClassName}__content__footer`}>
            {footerContent()}
          </div>
        )}
      </div>
    </div>
  );
};

MobileSideMenu.defaultProps = {
  baseClassName: 'mobile-side-menu',
  menuItems: [],
  footerContent: null,
  isOpen: false,
  menuTitle: '',
  dataIdentifier: 'menu-item',
};

export default MobileSideMenu;
