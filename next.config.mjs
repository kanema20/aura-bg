/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
	if (isServer) {
    const alias = `onnxruntime-node/bin/napi-v3/${process.platform}/x64/onnxruntime_binding.node`;
    console.log("alias ", alias);
	  config.resolve.alias['onnxruntime-node'] = alias;
	}
	return config;
  },
};

export default nextConfig;
