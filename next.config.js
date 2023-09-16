/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**/*',
      }
    ],
  },
  env: {
    bday: process.env.BIRTHDAY,
    bdaypfp: "https://ik.imagekit.io/gdfnfpn7v/my-secret-pfp.png",
  },
}

module.exports = nextConfig;
