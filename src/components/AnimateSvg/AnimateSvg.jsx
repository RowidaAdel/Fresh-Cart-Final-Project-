import Lottie from 'lottie-react';

export default function AnimatedSVG ({ animationData }) {
  return (
    <div className="w-full">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};