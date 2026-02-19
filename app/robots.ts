import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://korba-one.vercel.app";

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/login',
        '/admin/dashboard'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
