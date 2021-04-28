import { FC } from "react"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

type typeProps = {
  settings: any;
  imgs: {
    title: string;
    src: string;
  }[]
}

const ImgSlider: FC<typeProps> = (props) => {
  const settings = props.settings
  const imgs = props.imgs
  return (
    <Slider {...settings} className="slick">
      {imgs.map((img, index) =>
        <div key={index} className='slickimg'>
          <img src={img.src} height="150px" />
          <p>{img.title}</p>
        </div>
      )}
      <style jsx>{`
        .slick {
          width: fit-content;
          margin: 0 auto;
        }
        .slickimg {
          margin: 0 auto;
          width: fit-content;
          display: flex;
        }
        .slickimg img {
          display: block;
          margin: 0 auto;
        }
        .slickimg p {
          width: fit-content;
          margin: 0 auto;
        }
      `}</style>
    </Slider>
  )
}

export default ImgSlider