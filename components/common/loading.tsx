import { TextShimmerWave } from "../ui/text-shimmer-wave";

const Loading = () => {
  return (
    <TextShimmerWave className="font-mono text-sm" duration={1}>
      Loading...
    </TextShimmerWave>
  );
};

export default Loading;
