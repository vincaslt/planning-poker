function initGlobalCounters() {
  const counters: { [namespace: string]: number } = {};

  function useCounter(namespace: string) {
    if (!counters[namespace]) {
      counters[namespace] = 0;
    } else {
      counters[namespace] += 1;
    }

    return `${namespace}-${counters[namespace]}`;
  }

  return useCounter;
}

export default initGlobalCounters();
