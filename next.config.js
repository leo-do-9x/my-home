module.exports = {
  images: {
    domains: [
      "markmanson.net",
      "img.youtube.com",
      "res.cloudinary.com",
      "s3.us-west-2.amazonaws.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/cp",
        destination: "/cp/posts",
        permanent: true,
      },
    ];
  },
};
