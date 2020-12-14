export const CDN = (path) =>
  path
    ? `${process.env.NEXT_PUBLIC_IMAGE_HOSTNAME}${
        path.startsWith("/") ? "" : "/"
      }${path}`
    : `https://placeimg.com/640/480/any?time=${Math.random()}`;

export default CDN;
