import { getCipherInfo } from "crypto";
import Link from "next/link";

type Props = {
  className: string;
  selectedClassName: string;
  pageNumber: number;
  totalPageNumber: number;
  hrefPrefix: string | any;
  pageRangeDisplayed: number | any;
};

function getHref(hrefPrefix: string, num: number | string) {
  if (hrefPrefix != null) {
    return hrefPrefix + "/" + num;
  } else {
    return num.toString();
  }
}

export const Pagination = ({
  className,
  selectedClassName,
  pageNumber,
  totalPageNumber,
  hrefPrefix,
  pageRangeDisplayed,
}: Props) => {
  const paginationClassName = className;

  let numArr = [];
  for (let i = 0; i < totalPageNumber; i++) {
    numArr.push(i + 1);
  }
  const nextPageNumber = Math.min(totalPageNumber, pageNumber+1);
  const prevPageNumber = Math.max(1, pageNumber-1);

  return (
    <div className={paginationClassName}>
      {pageLabel(null, "prev", "", getHref("/page", prevPageNumber))}
      {numArr.map((n) => {
        if (pageNumber == n) {
          return pageLabel(null, n.toString(), selectedClassName, getHref("/page", n));
        } else {
          return pageLabel(null, n.toString(), "", getHref("/page", n));
        }
      })}
      {pageLabel(null, "next", "", getHref("/page", nextPageNumber))}
    </div>
  );
};

const pageLabel = (
  hrefPrefix: string | any,
  num: number | string,
  selectedClassName: string,
  forceLink: any = null
) => {
    console.log(forceLink)
  return (
    <li key={"pagination" + num.toString()}>
      <Link href={forceLink}>
        <a className={selectedClassName}>{num}</a>
      </Link>
    </li>
  );
};
