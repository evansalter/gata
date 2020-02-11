<p align="center">
  <img src="design/graphics_Marquee Promo Tile.png"/>
</p>

<p align="center">
  <!-- Chrome extension badge -->
  <a href="https://chrome.google.com/webstore/detail/gata/oidckhmhcapggoekanlbdgfckcjccphk">
    <img src="https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_206x58.png"/>
  </a>
  
  <!-- Firefox extension badge -->
  <!-- <a href="TODO">
    <img src="https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_1.png"/>
  </a>
</p> -->

---

gata is a dynamic shortcut manager. Dynamic shortcuts different from regular bookmarks in that you can define variables in your URL. For example, a shortcut with the URL `https://twitter.com/%s` has one variable (the `%s`) for the username. When accessing this URL, gata will ask you to provide a value for that variable. The UI looks like this:

![](design/screenshot%202.png)

## Contributing

The following information is provided in order to contribute to this project:

### Setup

The following will download, build, and install the extension in Chrome, allowing you to start developing.

1. Fork this repository and clone it to your local machine
1. Run `npm i` to install dependencies
1. Run `npm run build` to build
1. Go to `chrome://extensions` 
1. Turn on "Developer Mode" in the top-right
1. Click "Load unpacked"
1. Navigate to the `dist` directory and select it

Chrome will install the extension. After you make changes, run `npm run build` again and the extension should automatically update in Chrome. If not, just click the reload icon for gata on the extensions page.

### PRs

After you have made your change, push your branch to your forked copy and make a pull request into this repo. Make sure to reference any issues you closing with your change. I will be sure to review your change and and it integrated.

## Technologies

gata is built with:

- [Vue.js](https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_1.png)
- [Bulma](https://bulma.io/)
- [Parcel](https://parceljs.org/)
