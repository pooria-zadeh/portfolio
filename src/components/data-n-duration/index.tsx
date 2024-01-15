import { BSHyperlink } from "../base/MButton/styled";
import { MText } from "../base/MText";
import { SectionWithDuration } from "../styled";

export const DataNDurationRow = ({
    name,
    subtitle,
    link,
    duration,
  }: {
    name: string;
    subtitle: string;
    duration: string;
    link?: string;
  }) => {
    return (
      <SectionWithDuration justifyContent="space-between">
        <div css={{ flex: 1, margin: "12px 0" }}>
          <MText span variant="h4" fontWeight="bold">
            {name}
          </MText>
          {link ? (
            <BSHyperlink href={link}>
              <MText span> ({subtitle}) </MText>
            </BSHyperlink>
          ) : (
            <MText span> ({subtitle}) </MText>
          )}
        </div>
        <MText fontWeight="light" css={{ alignSelf: "flex-end" }} span>
          {duration}
        </MText>
      </SectionWithDuration>
    );
  };