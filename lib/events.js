// Browser events the widgets use to talk to page sections

// Review toast → reviews slider: show the review at index `event.detail`
export const SHOW_REVIEW_EVENT = 'qrs:show-review';

// Cookie notice → review toast: the visitor clicked "Got it" (remembered in localStorage under COOKIE_OK_KEY)
export const COOKIE_OK_EVENT = 'qrs:cookie-ok';
export const COOKIE_OK_KEY = 'cookieNoticeOk';


// A ZIP search (components/home/ZipSearch.jsx) → the "Roofers near you" cards and the estimate form: the looked-up result as `event.detail`
// ({ zip, pt?, status }), also kept in sessionStorage under ZIP_KEY as JSON so a section that mounts later can read it
export const ZIP_EVENT = 'qrs:zip';
export const ZIP_KEY = 'qrs-zip';
