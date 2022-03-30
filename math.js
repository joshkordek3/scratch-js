Math.constrain = (val, min, max) => Math.min(max, Math.max(min, val));
Math.degToRad = (deg) => (deg * Math.PI / 180);
Math.radToDeg = (rad) => (rad * 180 / Math.PI);
export Math;
