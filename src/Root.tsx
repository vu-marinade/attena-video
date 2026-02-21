import { Composition } from "remotion";
import { AttenaDemo } from "./AttenaDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AttenaDemo"
      component={AttenaDemo}
      durationInFrames={300}
      fps={30}
      width={1200}
      height={675}
    />
  );
};
