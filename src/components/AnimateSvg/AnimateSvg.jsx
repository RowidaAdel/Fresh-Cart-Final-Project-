import Lottie from 'lottie-react'; 

const AnimatedSVG = ({ animationData }) => {
  return (
    <div className="w-full">
      <Lottie
        animationData={animationData}
        loop={true} 
      />
    </div>
  );
};

export default AnimatedSVG;