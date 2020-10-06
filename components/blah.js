Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
Components.utils.import("resource://gre/modules/Services.jsm");
let Loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"]
    .getService(Components.interfaces.mozIJSSubScriptLoader);

function Blah() {
    this.wrappedJSObject = this;
    Services.obs.addObserver(this, "zotero-loaded", false);
    Services.obs.addObserver(this, "zotero-before-reload", false);
}

Blah.prototype = {
    classDescription: "Boilerplate component",
    classID:          Components.ID("{YOUR-UUID-HERE}"),
    contractID:       "@example.com/Blah;1",

    QueryInterface: XPCOMUtils.generateQI(
        [Components.interfaces.nsIObserver,
         Components.interfaces.nsISupports]),

    observe(subject, topic, data) {
        if (topic === "zotero-loaded") {
            Loader.loadSubScript("chrome://blah/content/register.js");
        }
        else if (topic === "zotero-before-reload") {
            Loader.loadSubScript("chrome://blah/content/deregister.js");
        }
    }
};

let components = [Blah],
    NSGetFactory = XPCOMUtils.generateNSGetFactory(components);

