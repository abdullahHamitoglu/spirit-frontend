import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Col, Media, Modal } from 'reactstrap';
import Image from 'next/image';
import axios from 'axios';
import cheerio from 'cheerio';
import Head from 'next/head';

const VideoSection = ({ video }) => {

    const [open, setOpen] = useState(false);

    const onOpenModal = () => {
        setOpen(!open)
    };

    const onCloseModal = () => {
        setOpen(false)
    };

    return (
        <>{video.length > 0 &&
            <Fragment>
                <section className="video-section pt-0 mb-4">
                    {video &&
                        <div className="title1">
                            <h4>{video.title}</h4>
                            <h2 className="title-inner1">{video.description}</h2>
                        </div>
                    }
                    <Container>
                        <Row>
                            <Col md='8' className="offset-md-2">
                                <a onClick={onOpenModal}>
                                    <div className="video-img">
                                        <img src={video.image} alt="" className="img-fluid blur-up lazyload w-100" />
                                        <div className="play-btn">
                                            <span><i className="fa fa-play" aria-hidden="true"></i></span>
                                        </div>
                                    </div>
                                </a>
                                <Modal
                                    isOpen={open}
                                    toggle={onOpenModal}
                                    id="video"
                                    className="video-modal" centered size="lg">
                                    <iframe title="video" src={video.url}
                                        allowFullScreen></iframe>
                                </Modal>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Fragment>
        }</>
    );
}

export default VideoSection;