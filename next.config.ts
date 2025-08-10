import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'gyroscope=(self), accelerometer=(self), magnetometer=(self)'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
