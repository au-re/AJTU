import { Box } from "@chakra-ui/react";
import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";

const stack = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-25%);
    text-shadow: -1px 1px 0 red, 1px -1px 0 blue;
  };
  60% {
    opacity: 0.5;
    transform: translateX(25%);
  }
  80% {
    transform: none;
    opacity: 1;
    text-shadow: 1px -1px 0 red, -1px 1px 0 blue;
  }
  100% {
    text-shadow: none;
  }
`;

const glitch = keyframes`
  0% {
    text-shadow: -1px 2px 0 red, 1px -2px 0 blue;
    transform: translate(var(--glitch-translate));
  }
  2% {
    text-shadow: 1px -2px 0 red, -1px 2px 0 blue;
  }
  4%, 100% {  text-shadow: none; transform: none; }
`;

const GlitchSpan = styled.span`
  grid-row-start: 1;
  grid-column-start: 1;
  --stack-height: calc(100% / var(--stacks) - 1px);
  --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
  --clip-top: calc(var(--stack-height) * var(--index));
  --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
  clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
  animation: ${stack} 340ms cubic-bezier(0.46, 0.29, 0, 1.24) 1 backwards calc(var(--index) * 120ms),
    ${glitch} 4s ease infinite 2s alternate-reverse;

  :nth-child(odd) {
    --glitch-translate: 3px;
  }
  :nth-child(even) {
    --glitch-translate: -3px;
  }
`;

export const Glitch = ({ text }: { text: string }) => {
  return (
    <Box display={"grid"} style={{ "--stacks": 3 } as any} gridTemplateColumns={"1fr"}>
      <GlitchSpan style={{ "--index": 0 } as any}>{text}</GlitchSpan>
      <GlitchSpan style={{ "--index": 1 } as any}>{text}</GlitchSpan>
      <GlitchSpan style={{ "--index": 2 } as any}>{text}</GlitchSpan>
    </Box>
  );
};
