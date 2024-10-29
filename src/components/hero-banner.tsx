import React from "react";

export const HeroBanner: React.FC = () => {
  return (
    <div className="hero-banner">
      <h1 className="hero-banner__headline">Vibe Log</h1>
      <p className="hero-banner__description">
        <b>Vibe Log</b> lets you share emojis of your current vibe to anyone. <span className="span-disclaimer">(Emoji select feature currently a work in progress.)</span>
      </p>
    </div>
  );
};
