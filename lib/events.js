// Browser events the widgets use to talk to page sections

// Review toast → reviews slider: show the review at index `event.detail`
export const SHOW_REVIEW_EVENT = 'qrs:show-review';

// Cookie notice → review toast: the visitor clicked "Got it" (remembered in localStorage under COOKIE_OK_KEY)
export const COOKIE_OK_EVENT = 'qrs:cookie-ok';
export const COOKIE_OK_KEY = 'cookieNoticeOk';

// The header's chat button opens and closes the AI assistant (RoofAssistant.jsx), passing itself as `detail.opener` so focus returns to it;
// the assistant answers with ASSISTANT_STATE_EVENT ({ open }) so the button can show whether the chat is open.
export const ASSISTANT_EVENT = 'qrs:assistant';
export const ASSISTANT_STATE_EVENT = 'qrs:assistant-state';

