import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx'],
};
 
export default withNextIntl(nextConfig);