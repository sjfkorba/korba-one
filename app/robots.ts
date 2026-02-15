import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/login', '/admin/dashboard'], // Security: Admin panel hide karein
    },
    sitemap: 'https://korbaone.com/sitemap.xml',
  };
}