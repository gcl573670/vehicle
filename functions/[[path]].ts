import ssrHandler from './server/_ssr/ssr.mjs';

export const onRequest = async (context) => {
  const { request } = context;
  const url = new URL(request.url);

  // Let SSR handle all routes (including API routes under /api/)
  try {
    const response = await ssrHandler.default.fetch(
      request,
      context.env,
      context.executionCtx
    );
    return response;
  } catch (error) {
    console.error('SSR error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
