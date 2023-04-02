// import book1 from "../../assets/main-slider/book1.jpg";
import book1 from "../../../assets/main-slider/book1.jpg";
import book2 from "../../../assets/main-slider/book2.jpg";
import book3 from "../../../assets/main-slider/book3.jpg";
import book4 from "../../../assets/main-slider/book4.jpg";

interface Image {
  id: number;
  image: string;
}

const mainSliderData: Image[] = [
  {
    id: 1,
    image: book1,
  },
  {
    id: 2,
    image: book2,
  },
  {
    id: 3,
    image: book3,
  },
  {
    id: 4,
    image: book4,
  },
];

export default mainSliderData;
