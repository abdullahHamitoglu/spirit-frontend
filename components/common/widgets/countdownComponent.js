import React, { Fragment } from "react";
import Countdown from "react-countdown";
import { useTranslation } from 'react-i18next';

const CountdownComponent = ({ time }) => {
  const { t } = useTranslation();

  const Completionist = () => <span>{t('completion_message')}</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <div className="timer-box">
          <div className="timer">
            <div className="timer-p" id="demo">
              <span>
                {days}
                <span className="padding-l">:</span>
                <span className="timer-cal">{t('days')}</span>
              </span>
              <span>
                {hours}
                <span className="padding-l">:</span>
                <span className="timer-cal">{t('hours')}</span>
              </span>
              <span>
                {minutes}
                <span className="padding-l">:</span>
                <span className="timer-cal">{t('minutes')}</span>
              </span>
              <span>
                {seconds}
                <span className="timer-cal">{t('seconds')}</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  var d = new Date(time);
  var year = d.getFullYear();
  var month = d.getMonth();
  var day = d.getDate();
  var countdown = new Date(year, month, day).getTime();

  return (
    <Fragment>
      <Countdown date={countdown} renderer={renderer} />
    </Fragment>
  );
};

export default CountdownComponent;
