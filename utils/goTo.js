const goTo = (router, path, callback) => {
  const pathname = typeof path === "string" ? path : path.pathname;
  try {
    router.prefetch(pathname);
    // console.log("Prefetched", pathname);
  } catch {}
  return () => {
    const stop = callback && callback();
    if (stop) return;
    router.push(path);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 300);
  };
};

export default goTo;
