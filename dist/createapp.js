// createApp Function takes in a rootComponent, this is ussually your homepage
// To mount the View / Layout, use mountView and the parameter is the id/class
// that your view will attach to.
// createApp also returns a 'usePlugin' Function, it allows you to import
// plugins and access them globaly via the set constant, this is done as
// const app = createApp(page).usePlugin(router), then use as app.navigate()
// createApp returns 'onPause' and 'onResume' Function, onPause is a setter
// it calls your function when your app is sent to the background.
// And onResume fires a function when a user returns to your app.
const createApp = function (mainComponent) {
    const app = {
        rootComponent: mainComponent,
        plugins: [],
        /*** Mounts the main component to a DOM element identified by the selector.*/
        mountView: function (selector) {
            const container = document.querySelector(selector);
            const instance = this.rootComponent;
            document.body.style.width = "100%";
            document.body.style.margin = "0";
            if (!container)
                console.error(`No element found for selector "${selector}"`);
            if (instance && instance.element && instance.type === "LAYOUT") {
                container.appendChild(instance.element);
            }
            else {
                console.error("View is not a rosana.js Component - Must be a Layout");
            }
            return this;
        },
        /** Adds a plugin to the application */
        usePlugin: function (plugin) {
            if (plugin && typeof plugin.install === "function") {
                //@ts-ignore
                plugin.install(this);
            }
            else {
                console.error("Plugin is missing install method:", plugin);
            }
            return this;
        },
        /** Call a function when the app is paused or placed in the background */
        set onPause(handler) { },
        /** Call a function when the app is resumed from incuring an onPause event */
        set onResume(handler) { },
    };
    return app;
};
export default createApp;
