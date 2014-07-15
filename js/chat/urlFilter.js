/**
 * Simple URL filter that converts any URIs found in the plain text message to clickable links
 *
 * @param megaChat
 * @returns {UrlFilter}
 * @constructor
 */
var UrlFilter = function(megaChat) {
    var self = this;

    megaChat.bind("onReceiveMessage", function(e, eventData) {
        self.processMessage(e, eventData);
    });

    return this;
};

UrlFilter.prototype.processMessage = function(e, eventData) {
    var self = this;

    // use the HTML version of the message if such exists (the HTML version should be generated by hooks/filters on the
    // client side.
    var message = eventData.messageHtml ? eventData.messageHtml : eventData.getContents();

    if(!message) {
        return; // ignore, maybe its a system message (or composing/paused composing notification)
    }

    eventData.messageHtml = Autolinker.link(message, {
        truncate: 25
    });
};