import { getPosts } from "@/controllers/blogController";
import currencyStore from "@/helpers/Currency/CurrencyStore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Media, Row } from "reactstrap";


const BlogList = ({ posts }) => {
  const [data, setData] = useState(posts);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { selectedCurrency } = currencyStore();
  useEffect(() => {
    const updatePosts = async () => {
      const response = await getPosts(locale, selectedCurrency.code);

      setData(response);
    }
    updatePosts();
  }, [locale]);
  return (
    <>
      {data &&
        data.map((item, i) => (
          <Row className="blog-media" key={i}>
            <Col xl="6">
              <div className="blog-left">
                <Link href={`/blog/${item.slug}`}>
                  <Media
                    src={item.image}
                    className="img-fluid blur-up lazyload bg-img w-100"
                    alt={item.name}
                    onError={(e) => e.target.src = '/assets/images/logo.png'}
                  />
                </Link>
              </div>
            </Col>
            <Col xl="6">
              <div className="blog-right">
                <div>
                  <h6>{item.name}</h6>
                  <Link href={`/blog/${item.slug}`}>
                    <h4 dangerouslySetInnerHTML={{ __html: item.short_description }} />
                  </Link>
                  <ul className="post-social">
                    <li>{t('posted_by')} : {item.author}</li>
                    <li>
                      <i className="fa fa-heart"></i> {item.like_count} {t("hits")}
                    </li>
                    <li>
                      <i className="fa fa-comments"></i> {item.comments_count} {t('comment')}
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        ))}
    </>
  );
};

export default BlogList;
