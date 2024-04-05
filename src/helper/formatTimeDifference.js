import moment from 'moment';
export const formatTimeDifference = (time) => {
    const targetMoment = moment(time);
    const currentMoment = moment();

    const duration = moment.duration(targetMoment.diff(currentMoment));
    const days = Math.abs(duration.days());
    const hours = Math.abs(duration.hours());
    const minutes = Math.abs(duration.minutes());

    if (targetMoment.isAfter(currentMoment)) {
        if (days > 7) {
            return `For ${days}day`;
        } else if (days >= 1) {
            return `For ${days}day ${hours}hours ${minutes}minutes`;
        } else if (hours >= 1) {
            return `For ${hours}hours ${minutes}minutes`;
        } else {
            return `For ${minutes}minutes`;
        }
    } else {
        if (days > 7) {
            return `${days} d ago`;
        } else if (days >= 1) {
            return `${days}d ${hours}h ${minutes}m ago`;
        } else if (hours >= 1) {
            return `${hours}h ${minutes}m ago`;
        } else {
            return `${minutes}m ago`;
        }
    }
};
