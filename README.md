# 2D Canvas intro screen
A starter template for 2d canvas based intro screens. [MDN has some great resources for learning about the canvas API.](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

> Confused? [Learn more about the project](https://github.com/moonscreens/info).

If you want to make something with a little more GPU acceleration or 3D elements, check out [intro-example-threejs](https://github.com/moonscreens/intro-example-threejs)

Include `?channel=moonmoon`, or `?channel=channel1,channel2,channel3...` in your URL to connect to a specific channel, great for testing!

Include `?stats=true` to enable performance stats (should pop up in the top left corner).

# Development
Before you start, you should have [NodeJS](https://nodejs.org/en/) installed.
```
npm install
npm run start
```

After running `start`, open [localhost:5173](http://localhost:5173/). The page should automatically refresh when you make a change.

# Building & Deploying
```
npm run build
```
Outputs static files to `/dist/`.

Services like [Netlify](https://www.netlify.com/) have free tiers that can easily deploy simple static webpages like this.