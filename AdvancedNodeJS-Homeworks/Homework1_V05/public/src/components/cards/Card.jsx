import React, { useState } from 'react'

import { Col, Row } from 'react-bootstrap'
import { CardText } from 'react-bootstrap-icons'
import Card from 'react-bootstrap/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
  Keyboard,
} from 'swiper'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'

const Cards = ({ data }) => {
  const [icon, setIcon] = useState(false)

  const handleIcon = () => {
    setIcon(!icon)
  }

  const renderPopover = (object) => (
    <Popover className="bg-black " id={`popover-${object.id}`}>
      <Popover.Body>
        <ul className="list-unstyled text-white">
          <li>Color: {object?.characteristics?.color}</li>
          <li>Weight: {object?.characteristics?.weight}</li>
          <li>Is Dangerous: {object?.characteristics?.isDangerous}</li>
          <li>Enclosure: {object?.characteristics?.enclosure}</li>
          <li>
            <p className="p-0 m-0 text-center">Foods:</p>
            <ul className="list-unstyled d-flex flex-wrap justify-content-around">
              {object?.characteristics?.food.map((food) => (
                <li key={food}>{food}</li>
              ))}
            </ul>
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  )

  const renderCard = (object) => (
    <Card className="bg-black">
      <Card.Body>
        <Card.Title className="text-center">
          <h2>{object?.type}</h2>
        </Card.Title>
        <Card.Subtitle className="d-flex justify-content-between">
          <span>{object?.name ?? 'Name: ' + object.name}</span>
          <p>Age: {object?.age}</p>
        </Card.Subtitle>
        <Card.Text>
          <p>{object?.gender && 'Gender:' + object.gender}</p>
          <p>Location: {object?.location}</p>
        </Card.Text>
        {object?.characteristics ? (
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={renderPopover(object)}
            rootClose="false"
          >
            <Card.Text
              onClick={handleIcon}
              className="text-center m-0 p-0"
              style={{ cursor: 'pointer' }}
            >
              <p>
                {icon ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
                Characteristics:
                {icon ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />}
              </p>
            </Card.Text>
          </OverlayTrigger>
        ) : (
          <CardText>
            <p>{object?.location}</p>
          </CardText>
        )}
      </Card.Body>
    </Card>
  )

  return (
    <Row className="mx-0 d-flex justify-content-center ">
      <Col lg={12}>
        <Swiper
          modules={[
            Navigation,
            EffectCoverflow,
            Pagination,
            Autoplay,
            Keyboard,
          ]}
          effect={'coverflow'}
          centeredSlides={true}
          loop={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={{ enabled: true, onlyInViewport: false }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={{
            enabled: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            480: {
              slidesPerView: 2,
              navigation: {
                enabled: false,
              },
            },
            576: {
              slidesPerView: 2,
              navigation: {
                enabled: true,
              },
            },
            768: {
              slidesPerView: 3,
              navigation: {
                enabled: true,
              },
            },
            1200: {
              slidesPerView: 4,
              navigation: {
                enabled: true,
              },
            },
          }}
          className="mySwiper"
        >
          {data?.map((object) => (
            <SwiperSlide key={object.id}>{renderCard(object)}</SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </Row>
  )
}

export default Cards
