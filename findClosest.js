export function findClosestAsync(activeElement, candidates) {
  return new Promise((res) => {
    const io = new IntersectionObserver((entries, observer) => {
      const activeElementEntry = entries.find(
        (entry) => entry.target === activeElement
      );

      const activeElementRect = activeElementEntry.boundingClientRect;

      const activeElementCenterX =
        activeElementRect.x + activeElementRect.width / 2;

      const activeElementCenterY =
        activeElementRect.y + activeElementRect.height / 2;

      let minDistance = Infinity;
      let closestCandidate = null;

      for (const entry of entries) {
        const { x, y, width, height } = entry.boundingClientRect;

        const candidateElementCenterX = x + width / 2;

        const candidateElementCenterY = y + height / 2;

        const xx = candidateElementCenterX - activeElementCenterX;

        const yy = candidateElementCenterY - activeElementCenterY;

        const distance = Math.sqrt(xx ** 2 + yy ** 2);

        if (distance > 0 && distance < minDistance) {
          minDistance = distance;
          closestCandidate = entry.target;
        }
      }

      observer.disconnect();

      res(closestCandidate);
    });

    for (const candidate of candidates) {
      io.observe(candidate);
    }
  });
}

export function findClosest(activeElement, elements) {
  const activeElementRect = activeElement.getBoundingClientRect();

  const activeElementCenterX =
    activeElementRect.x + activeElementRect.width / 2;

  const activeElementCenterY =
    activeElementRect.y + activeElementRect.height / 2;

  let minDistance = Infinity;
  let closestCandidate = null;

  for (const candidate of elements) {
    const { x, y, width, height } = candidate.getBoundingClientRect();

    const candidateElementCenterX = x + width / 2;

    const candidateElementCenterY = y + height / 2;

    const xx = candidateElementCenterX - activeElementCenterX;

    const yy = candidateElementCenterY - activeElementCenterY;

    const distance = Math.sqrt(xx ** 2 + yy ** 2);

    if (distance > 0 && distance < minDistance) {
      minDistance = distance;
      closestCandidate = candidate;
    }
  }

  return closestCandidate;
}
