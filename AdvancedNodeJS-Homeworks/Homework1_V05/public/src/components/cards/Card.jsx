import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { CardText } from 'react-bootstrap-icons'
import Card from 'react-bootstrap/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation } from 'swiper'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs'
import { AuthContext } from '../../context/AuthContext'
import Button from 'react-bootstrap/Button'

const Cards = ({ data, onEdit }) => {
  const location = useLocation()

  const { accessToken } = useContext(AuthContext)

  const [icon, setIcon] = useState(false)

  const handleIcon = () => {
    setIcon(!icon)
  }

  const renderPopover = (item) => (
    <Popover id={`popover-${item.id}`}>
      <Popover.Body>
        <ul className="list-unstyled">
          <li>
            <p>Color: {item?.characteristics?.color}</p>
          </li>
          <li>
            <p>Weight: {item?.characteristics?.weight}kg</p>
          </li>
          <li>
            <p>Is Dangerous: {item?.characteristics?.isDangerous}</p>
          </li>
          <li>
            <p>Enclosure: {item?.characteristics.enclosure}</p>
          </li>
          <li>
            <p className="p-0 m-0 text-center">Foods:</p>
            <ul className="list-unstyled d-flex flex-wrap justify-content-around">
              {item?.characteristics?.food.map((food) => (
                <li key={food}>{food}</li>
              ))}
            </ul>
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  )

  const renderCard = (item) => (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">
          <h2>{item?.type || item?.fullName}</h2>
        </Card.Title>
        <Card.Subtitle className="d-flex justify-content-between">
          <span>
            {item?.name ? 'Name: ' + item.name : 'Email:' + item?.email}
          </span>
          <p>Age: {item?.age}</p>
        </Card.Subtitle>
        <Card.Text>
          <p>{item?.gender ? 'Gender: ' + item.gender : ''}</p>
          <p>Location: {item?.location}</p>
        </Card.Text>
        {item?.characteristics ? (
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={renderPopover(item)}
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
            <p>{item?.location}</p>
          </CardText>
        )}
      </Card.Body>

      {(accessToken?.role === 'owner' || accessToken?.role === 'zookeeper') &&
        location.pathname === '/animals' && (
          <Card.Footer className="d-flex justify-content-between align-content-center">
            <Button bg="dark" variant="secondary" onClick={onEdit}>
              Edit
            </Button>
            {accessToken?.role === 'owner' && (
              <Button variant="danger">Delete</Button>
            )}
          </Card.Footer>
        )}
    </Card>
  )

  return (
    <Row className="mx-0 d-flex justify-content-center ">
      <Col lg={12}>
        <Swiper
          effect={'coverflow'}
          centeredSlides={true}
          loop={true}
          slidesPerView={'1'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          navigation={false}
          modules={[Navigation, EffectCoverflow]}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper"
        >
          {data?.map((item) => (
            <SwiperSlide key={item.id}>{renderCard(item)}</SwiperSlide>
          ))}
        </Swiper>
      </Col>
    </Row>
  )
}

export default Cards
