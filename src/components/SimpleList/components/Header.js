import React, { useState, useEffect, useContext } from 'react';
// import GetSvg from '../../GetSvg';
import { SimpleListContext } from '../index';

type HeaderItem = {
  name: string,
  order: boolean,
  sortType: 'asc' | 'desc',
  sortable: boolean,
  text: string,
  flex: string,
};

const getNewColumnHeadings = (
  headings: Object[],
  parsedSortArray: Array<Object>,
): Array<HeaderItem> =>
  headings.map((header: any): HeaderItem => {
    const headingIndexInSort = parsedSortArray.findIndex(
      (sortItem: Object): boolean =>
        Object.keys(sortItem).includes(header.name),
    );
    return {
      ...header,
      sortType:
        (headingIndexInSort > -1 &&
          parsedSortArray[headingIndexInSort][header.name]) ||
        '',
      order: headingIndexInSort > -1 || false,
    };
  });

function parseSort(sortParam: string): Array<Object> {
  return sortParam
    ? sortParam.split(',').map((param: string): Object => {
        const paramKeyValue = param.split('|');
        return { [paramKeyValue[0]]: paramKeyValue[1] };
      }) || []
    : [];
}

// Note: Going forward - SimpleList will accept Header, Body, etc... as props, this will allow more custom rendering behaviours, as Header, Body, Paginator, Filter can be Project specific components on their own

// note project will implement a AllianzHeader, which will define it's own Sort Renderer
// const AllianzSortRenderer = (active = false, type = 'asc') => {
//   return (
//     <div>
//       {(active === true && type === 'asc' && (
//         <div className="simple-list__header__item__aside">
//           <GetSvg svg="sort_up" wrapperClass="u-fill--base-dkst" />
//           <GetSvg svg="sort_down" wrapperClass="u-fill--base-lt" />
//         </div>
//       )) ||
//         (active === true && type === 'desc' && (
//           <div className="simple-list__header__item__aside">
//             <GetSvg svg="sort_up" wrapperClass="u-fill--base-lt" />
//             <GetSvg svg="sort_down" wrapperClass="u-fill--base-dkst" />
//           </div>
//         )) ||
//         (active === false && (
//           <div className="simple-list__header__item__aside">
//             <GetSvg svg="sort_up" wrapperClass="u-fill--base-lt" />
//             <GetSvg svg="sort_down" wrapperClass="u-fill--base-lt" />
//           </div>
//         )) ||
//         null}
//     </div>
//   );
// };

const Header = ({ SortComponent = null }) => {
  const { headings, onSort, sortString, name, initial_sort } = useContext(
    SimpleListContext,
  );
  const [columns, setColumns] = useState(
    getNewColumnHeadings(headings, parseSort(initial_sort)),
  );
  useEffect(() => {
    setColumns(getNewColumnHeadings(headings, parseSort(sortString)));
  }, [headings, sortString]);

  const clickHandler = (index: number): any => {
    const { name: colName } = columns[index];
    const nextSortType = columns[index].sortType === 'asc' ? 'desc' : 'asc';
    return onSort(colName, nextSortType);
  };

  return (
    <div className="simple-list__header">
      {columns.map((item: HeaderItem, vk: number): React$Element<*> => (
        <div
          className={`simple-list__header__item ${
            item.align ? `simple-list__header__item__${item.align}` : ''
          }`}
          key={`${vk}`}
          style={{
            flexBasis: item.flex || `${(1 / columns.length) * 100}%`,
          }}>
          <button
            type="button"
            className={`btn--text--base-dk ${
              item.sortable ? '' : 'btn--disabled'
            }`}
            onClick={(e: Object): any => {
              e.preventDefault();
              return clickHandler(vk);
            }}
            data-qe-id={`${name}-table-sort-column-${vk}`}>
            <div>{item.text}</div>
            {item.sortable && SortComponent ? (
              <SortComponent active={item.order} type={item.sortType} />
            ) : (
              <span />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Header;
