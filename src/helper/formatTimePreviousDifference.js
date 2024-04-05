import React from 'react';
import moment from 'moment';

export const formatTimePreviousDifference = (startTime) => {
    const startMoment = moment(startTime);
    const currentMoment = moment();

    const duration = moment.duration(currentMoment.diff(startMoment));
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    if (days > 7) {
        return `${days} day ago`;
    } else if (days >= 1) {
        return `${days} day ${hours} hours ${minutes} minute ago`;
    } else if (hours >= 1) {
        return `${hours} hours ${minutes} minutes ago`;
    } else {
        return `${minutes} minute ago`;
    }
};

export const formatTimeNextDifference = (time) => {
    const targetMoment = moment(time);
    const currentMoment = moment();

    const duration = moment.duration(targetMoment.diff(currentMoment));
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();

    if (days > 7) {
        return `Trong ${days} ngày`;
    } else if (days >= 1) {
        return `Trong ${days} ngày ${hours} giờ ${minutes} phút`;
    } else if (hours >= 1) {
        return `Trong ${hours} giờ ${minutes} phút`;
    } else {
        return `Trong ${minutes} phút`;
    }
};
