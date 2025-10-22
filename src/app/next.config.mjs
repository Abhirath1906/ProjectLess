/** @type {import('next').NextConfig} */
import withLess from "next-with-less";

const nextConfig = withLess({
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "@primary-color": "black", 
        "@border-radius-base": "10px",
        "@font-size-base": "16px",
      },
    },
  },
});

export default nextConfig;
