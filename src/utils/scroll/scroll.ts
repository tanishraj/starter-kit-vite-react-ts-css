export type ScrollPosition = {
  x: number;
  y: number;
};

export type ScrollTarget = Window | Document | Element;

export type ScrollOffsetOptions = {
  container?: ScrollTarget;
};

export type ScrollIntoViewOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  inline?: ScrollLogicalPosition;
  container?: ScrollTarget;
  offset?: number | Partial<ScrollPosition>;
};

export type BodyScrollState = {
  x: number;
  y: number;
  overflow: string;
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
};

let activeBodyScrollLocks = 0;
let lastBodyScrollState: BodyScrollState | null = null;

function hasDom() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isWindow(target: ScrollTarget): target is Window {
  return 'scrollTo' in target && 'document' in target;
}

function isDocument(target: ScrollTarget): target is Document {
  return 'documentElement' in target;
}

function normalizeContainer(container?: ScrollTarget): ScrollTarget {
  if (!hasDom()) {
    return {} as ScrollTarget;
  }

  return container ?? window;
}

function getResolvedOffset(offset?: number | Partial<ScrollPosition>): ScrollPosition {
  if (typeof offset === 'number') {
    return { x: offset, y: offset };
  }

  return {
    x: offset?.x ?? 0,
    y: offset?.y ?? 0,
  };
}

function getViewportSize(target: ScrollTarget) {
  if (isWindow(target)) {
    return { width: target.innerWidth, height: target.innerHeight };
  }

  if (isDocument(target)) {
    return {
      width: target.documentElement.clientWidth,
      height: target.documentElement.clientHeight,
    };
  }

  return {
    width: target.clientWidth,
    height: target.clientHeight,
  };
}

function getNearestScrollPosition(
  targetStart: number,
  targetSize: number,
  viewportSize: number,
  currentScroll: number,
): number {
  const targetEnd = targetStart + targetSize;
  const viewportStart = currentScroll;
  const viewportEnd = currentScroll + viewportSize;

  if (targetStart >= viewportStart && targetEnd <= viewportEnd) {
    return currentScroll;
  }

  const alignStart = targetStart;
  const alignEnd = targetEnd - viewportSize;

  return Math.abs(alignStart - currentScroll) <= Math.abs(alignEnd - currentScroll)
    ? alignStart
    : alignEnd;
}

export function getScrollPosition(target: ScrollTarget = window): ScrollPosition {
  if (!hasDom()) {
    return { x: 0, y: 0 };
  }

  if (isWindow(target)) {
    return { x: target.scrollX, y: target.scrollY };
  }

  if (isDocument(target)) {
    return {
      x: target.defaultView?.scrollX ?? 0,
      y: target.defaultView?.scrollY ?? 0,
    };
  }

  return {
    x: target.scrollLeft,
    y: target.scrollTop,
  };
}

export function getScrollOffset(
  element: Element,
  options: ScrollOffsetOptions = {},
): ScrollPosition {
  if (!hasDom()) {
    return { x: 0, y: 0 };
  }

  const container = normalizeContainer(options.container);
  const rect = element.getBoundingClientRect();

  if (isWindow(container) || isDocument(container)) {
    const position = getScrollPosition(isDocument(container) ? container : container);

    return {
      x: rect.left + position.x,
      y: rect.top + position.y,
    };
  }

  const containerRect = container.getBoundingClientRect();

  return {
    x: rect.left - containerRect.left + container.scrollLeft,
    y: rect.top - containerRect.top + container.scrollTop,
  };
}

export function scrollIntoView(element: Element, options: ScrollIntoViewOptions = {}) {
  if (!hasDom()) {
    return;
  }

  const {
    behavior = 'smooth',
    block = 'start',
    inline = 'nearest',
    container: rawContainer,
    offset,
  } = options;

  const container = normalizeContainer(rawContainer);
  const resolvedOffset = getResolvedOffset(offset);
  const targetOffset = getScrollOffset(element, { container });
  const viewportSize = getViewportSize(container);
  const elementRect = element.getBoundingClientRect();
  const currentPosition = getScrollPosition(container);

  let nextTop = targetOffset.y - resolvedOffset.y;
  let nextLeft = targetOffset.x - resolvedOffset.x;

  if (block === 'center') {
    nextTop = targetOffset.y - viewportSize.height / 2 + elementRect.height / 2 - resolvedOffset.y;
  } else if (block === 'end') {
    nextTop = targetOffset.y - viewportSize.height + elementRect.height - resolvedOffset.y;
  } else if (block === 'nearest') {
    nextTop =
      getNearestScrollPosition(
        targetOffset.y - resolvedOffset.y,
        elementRect.height,
        viewportSize.height,
        currentPosition.y,
      ) ?? nextTop;
  }

  if (inline === 'center') {
    nextLeft = targetOffset.x - viewportSize.width / 2 + elementRect.width / 2 - resolvedOffset.x;
  } else if (inline === 'end') {
    nextLeft = targetOffset.x - viewportSize.width + elementRect.width - resolvedOffset.x;
  } else if (inline === 'nearest') {
    nextLeft =
      getNearestScrollPosition(
        targetOffset.x - resolvedOffset.x,
        elementRect.width,
        viewportSize.width,
        currentPosition.x,
      ) ?? nextLeft;
  }

  if (isWindow(container)) {
    container.scrollTo({ left: nextLeft, top: nextTop, behavior });
    return;
  }

  if (isDocument(container)) {
    container.defaultView?.scrollTo({ left: nextLeft, top: nextTop, behavior });
    return;
  }

  container.scrollTo({ left: nextLeft, top: nextTop, behavior });
}

export function lockBodyScroll(): BodyScrollState | null {
  if (!hasDom()) {
    return null;
  }

  if (activeBodyScrollLocks === 0) {
    const position = getScrollPosition(window);
    const { style } = document.body;

    lastBodyScrollState = {
      x: position.x,
      y: position.y,
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
    };

    style.overflow = 'hidden';
    style.position = 'fixed';
    style.top = `${-position.y}px`;
    style.left = `${-position.x}px`;
    style.right = '0';
    style.width = '100%';
  }

  activeBodyScrollLocks += 1;
  return lastBodyScrollState;
}

export function restoreScroll(state: BodyScrollState | null = lastBodyScrollState) {
  if (!hasDom() || !state || activeBodyScrollLocks === 0) {
    return;
  }

  activeBodyScrollLocks -= 1;

  if (activeBodyScrollLocks > 0) {
    return;
  }

  const { style } = document.body;

  style.overflow = state.overflow;
  style.position = state.position;
  style.top = state.top;
  style.left = state.left;
  style.right = state.right;
  style.width = state.width;

  window.scrollTo({ left: state.x, top: state.y, behavior: 'auto' });
  lastBodyScrollState = null;
}
