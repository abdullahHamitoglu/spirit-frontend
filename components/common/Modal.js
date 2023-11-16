import Image from "next/image";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Col,
  Media,
  Row,
  Modal,
  ModalBody,
  Input,
  Form,
  Button,
} from "reactstrap";

const ModalComponent = () => {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  const { t } = useTranslation()
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className="theme-modal modal-lg"
      centered
    >
      <div>
        <ModalBody className="modal1">
          <Row className="compare-modal">
            <Col lg="12">
              <div className="modal-bg">
                <Button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={toggle}
                >
                </Button>
                <div className="offer-content">
                  <Media
                    src="/assets/images/offer-banner.png"
                    alt={t('author_picture')} />
                  <h2>{t('newsletter')}</h2>
                  <Form
                    action="https://pixelstrap.us19.list-manage.com/subscribe/post?u=5a128856334b598b395f1fc9b&amp;id=082f74cbda"
                    className="auth-form needs-validation"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    target="_blank"
                  >
                    <div className="form-group mx-sm-3">
                      <Input
                        type="text"
                        className="form-control"
                        name="EMAIL"
                        id="mce-EMAIL"
                        placeholder={t('enter_your_email')}
                        required="required"
                      />
                      <Button
                        type="submit"
                        className="btn btn-solid"
                        id="mc-submit"
                      >
                        {t('subscribe')}
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </div>
    </Modal>

  );
};

export default ModalComponent;
