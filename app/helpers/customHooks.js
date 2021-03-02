import { useEffect, useRef, useState, useCallback } from 'react';

export function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useForceUpdate() {
  const [, set] = useState(true); //boolean state
  return () => set(prevState => !prevState); // toggle the state to force render
}

export function useOddsStatus(price, prePrice, isInBetslip, locked) {
  const oddsStatus = useRef('');
  const isArrowUp = useRef('');
  const forceUpdate = useForceUpdate();
  let clearStatusTimer;
  let clearArrowTimer;
  const resetPriceChangeStateTimer = () => {
    clearStatusTimer = setTimeout(() => {
      oddsStatus.current = 'normal';
      forceUpdate();
    }, 3000);
    clearArrowTimer = setTimeout(() => {
      isArrowUp.current = '';
      forceUpdate();
    }, 60000);
  };

  useEffect(
    () => () => {
      clearTimeout(clearStatusTimer);
      clearTimeout(clearArrowTimer);
    },
    [],
  );

  if (price > prePrice && prePrice !== 0) {
    resetPriceChangeStateTimer();
    oddsStatus.current = 'up';
    isArrowUp.current = true;
  } else if (price < prePrice) {
    resetPriceChangeStateTimer();
    oddsStatus.current = 'down';
    isArrowUp.current = false;
  } else {
    oddsStatus.current = 'normal';
  }
  if (isInBetslip) {
    oddsStatus.current = 'select';
  }
  if (locked || price === 0) {
    oddsStatus.current = 'lock';
    isArrowUp.current = '';
  }

  return [oddsStatus, isArrowUp];
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => {};
  }, [delay]);
}

export function useTimeout(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, []);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
    return () => {};
  }, [delay]);
}

export function useDelayRender(render, delay) {
  const [startRender, setStartRender] = useState(false);
  useTimeout(
    () => {
      setStartRender(true);
    },
    render ? delay : null,
  );

  useEffect(() => {
    if (!render) {
      setStartRender(false);
    }
  }, [render]);

  return startRender;
}

export function useStatefulRef() {
  const [El, setEl] = useState(null);
  const onRefChange = useCallback(node => {
    setEl(node);
  }, []);
  return [El, onRefChange];
}

export function useScrollBottomHandler(onSrollButton, onLeaveButton) {
  const scrollbottomflag = useRef(false);
  const catchScrollData = ({ listHeight, scrollTop, triggerHeight }) => {
    if (listHeight - scrollTop < triggerHeight && !scrollbottomflag.current) {
      scrollbottomflag.current = true;
      onSrollButton();
    } else if (
      listHeight - scrollTop > triggerHeight * 1 &&
      scrollbottomflag.current
    ) {
      scrollbottomflag.current = false;
      onLeaveButton();
    }
  };
  return catchScrollData;
}
