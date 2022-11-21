import React from "react";

const Frame = () => {
  return (
    <div className="flex-frame-container">
      <div className="frame-solid">
        <div className="global-border-style flex-frame-top"></div>
        <div className="global-border-style flex-frame-right"></div>
        <div className="global-border-style flex-frame-right-2"></div>
        <div className="global-border-style flex-frame-bottom"></div>
        <div className="global-border-style flex-frame-bottom-2"></div>
        <div className="global-border-style flex-frame-left"></div>
        <div className="global-border-style flex-frame-top-right"></div>
        <div className="global-border-style flex-frame-bottom-left">
          <div className="global-border-style flex-frame-bottom-left-child"></div>
        </div>
        <div className="global-border-style flex-frame-bottom-left-2">
          <div className="global-border-style flex-frame-bottom-left-child"></div>
        </div>
      </div>
      <div className="">
        <div className="global-border-style effect-glow flex-frame-top"></div>
        <div className="global-border-style effect-glow flex-frame-right"></div>
        <div className="global-border-style effect-glow flex-frame-right-2"></div>
        <div className="global-border-style effect-glow flex-frame-bottom"></div>
        <div className="global-border-style effect-glow flex-frame-bottom-2"></div>
        <div className="global-border-style effect-glow flex-frame-left"></div>
        <div className="global-border-style effect-glow flex-frame-top-right"></div>
        <div className="global-border-style effect-glow flex-frame-bottom-left">
          <div className="global-border-style effect-glow flex-frame-bottom-left-child"></div>
        </div>
        <div className="global-border-style effect-glow flex-frame-bottom-left-2">
          <div className="global-border-style effect-glow flex-frame-bottom-left-child"></div>
        </div>
      </div>
    </div>
  );
};

export default Frame;
