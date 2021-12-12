import Link from "next/link";
import styles from "../../styles/Home.module.css";

type Props = {
  tags: string[];
};

export const Tagcloud = ({ tags }: Props) => {
  console.log(tags);
  const style: any = {
    "padding": "5px",
    "float": "left",
  };
  return (
    <div className={styles.tags}>
      {tags.map((tag: string) => {
        return (
          <div key={tag}  className={styles.tag}>
            <Link href={"/tags/" + tag}>
              <a>{tag}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
