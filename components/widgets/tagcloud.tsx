import Link from "next/link";

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
    <div>
      {tags.map((tag: string) => {
        return (
          <div key={tag} style={style}>
            <Link href={"/tags/" + tag}>
              <a>{tag}</a>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
