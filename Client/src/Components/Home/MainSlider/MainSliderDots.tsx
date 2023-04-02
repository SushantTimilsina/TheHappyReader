import React from "react";

interface Image {
  id: number;
  image: string;
}
const MainSliderDots: React.FC<{
  index: number;
  onDotClick: (index: number) => void;
  images: Image[];
}> = (props) => {
  const { images, onDotClick, index } = props;

  return (
    <div className="flex justify-center my-4">
      {images.map((image: Image, dotIndex: number) => {
        return (
          <div
            key={dotIndex}
            className={`w-3 h-3 rounded-full bg-[#617d98] relative mx-1 b-0 l-0 cursor-pointer hover:bg-black ${
              index === dotIndex && "bg-[red]"
            }`}
            onClick={() => {
              onDotClick(dotIndex);
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default React.memo(MainSliderDots);
