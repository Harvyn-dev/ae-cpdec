/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ne bloque pas le build à cause d'ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
// (ou module.exports = nextConfig; si fichier .js)
