import React, { Component } from "react";
import "./GithubAchievements.css";
import { Fade } from "react-reveal";
import AchievementBadge from "../../components/achievementBadge/AchievementBadge";
import achievementsData from "../../shared/opensource/achievements.json";

class GithubAchievements extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div>
        <div className="github-achievements-header-div">
          <Fade bottom duration={2000} distance="20px">
            <h1
              className="github-achievements-header"
              style={{ color: theme.text }}
            >
              GitHub Achievements
            </h1>
          </Fade>
        </div>
        <div className="github-achievements-body-div">
          {achievementsData["data"].map((achievement, index) => {
            return (
              <AchievementBadge key={index} achievement={achievement} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default GithubAchievements;
