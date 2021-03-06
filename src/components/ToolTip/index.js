import React, { Fragment } from 'react';
import './scss/Styles.scss';

type PropsShape = {
  /** text that appears in the tooltip when hovering on target element */
  text: string,
  /** When hovered, tooltip will be visible */
  children: any,
};

/**
 * ToolTip is a component that simplifies the implementation of ToolTips
 */
const Tooltip = ({ text, children }: PropsShape) => (
  <span className="hover-tooltip">
    <Fragment>
      {children}
      <span id="hover-tooltip-inner" className="hover-tooltip__inner">
        <span className="hover-tooltip__inner__text">{text}</span>
      </span>
    </Fragment>
  </span>
);

export default Tooltip;
