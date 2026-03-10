import React, { Component } from "react";
import "./AchievementBadge.css";
import { Fade } from "react-reveal";

class AchievementBadge extends Component {
  render() {
    const achievement = this.props.achievement;
    return (
      <Fade bottom duration={2000} distance="40px">
        <div
          className="achievement-badge-card"
          style={{
            backgroundColor: achievement.bgColor,
            border: `1px solid ${achievement.color}`,
          }}
        >
          <div className="achievement-badge-icon-wrapper">
            <span
              className="iconify achievement-badge-icon"
              data-icon={achievement.icon}
              style={{ color: achievement.color }}
              data-inline="false"
            ></span>
          </div>
          <div className="achievement-badge-info">
            <h3 className="achievement-badge-title">
              {achievement.title}
              {achievement.tier && (
                <span
                  className="achievement-badge-tier"
                  style={{ color: achievement.color }}
                >
                  {achievement.tier}
                </span>
              )}
            </h3>
            <p className="achievement-badge-description">
              {achievement.description}
            </p>
          </div>
        </div>
      </Fade>
    );
  }
}

export default AchievementBadge;
