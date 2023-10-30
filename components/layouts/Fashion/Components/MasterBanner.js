import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

const MasterBanner = ({ image, title, desc, link, classes, btn, btnClass }) => {
  return (
    <div>
      <div className={`home ${classes ? classes : "text-center"}`} style={{ backgroundImage: `url(${image})`}}>
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div>
                  <h4 dangerouslySetInnerHTML={{ __html: desc }} />
                  <h1>{title}</h1>
                  <Link
                    href={link}
                    className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                    {btn ? btn : "Shop Now"}
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
