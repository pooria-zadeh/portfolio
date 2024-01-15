import { MUList } from "@/components/base/MList/styled";
import { MText } from "@/components/base/MText";
import { Fragment } from "react";

export const CSVUList = ({ list }: { list: Array<string> }) => {
  return (
    <MUList>
      {list.map((d: string, idx: number) => (
        <Fragment key={idx}>
          <MText span>{d}</MText>
          {idx !== list.length - 1 && <MText span>{", "}</MText>}
        </Fragment>
      ))}
    </MUList>
  );
};
