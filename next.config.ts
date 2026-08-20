import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.100.223:3000",
    "192.168.100.223",
    "192.168.100.2:3000",
    "192.168.100.2",
    "localhost:3000",
  ],
};

export default nextConfig;
