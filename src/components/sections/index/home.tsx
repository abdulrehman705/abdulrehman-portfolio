// Core packages
import Image from "next/image";

// Imports
import Section from "../../structure/section";
import Container from "../../structure/container";

import SectionTitle from "../../blocks/section.title";

import BadgesBlock from "../../blocks/about.badges";
import CopyBlock from "../../blocks/about.copy";

import about from "../../../styles/scss/sections/index/about.module.scss";
import React from "react";

export default function Home() {
  return (
    <Section classProp={about.section}>
      <Container spacing={["verticalXXXLrg"]}>
        <SectionTitle
          title="About Me"
          preTitle="Synopsis"
          subTitle="I'm a ReactJS developer with Two year+ of Experiance at
Enigamtix.pvt. I specialize in building dynamic and responsive user
interfaces. My expertise includes efficient state management and
component architecture. I stay updated on industry trends and am
committed to delivering high-quality code for optimal user
experiences. Let's collaborate to bring your projects to life!"
        />
        <section className={about.content}>
          <div className={about.image}>
            {/* <Image
              src="https://avatars.githubusercontent.com/u/75434191?v=4"
              width={600}
              height={800}
              alt="Abdul Rehman"
              loading="eager"
            /> */}
          </div>
          <div className={about.copy}>
            <CopyBlock
              title="Softskills"
              containerClass={about.container}
              iconClass={about.icon}
              icon={["fas", "user"]}
              copy="I possesses strong soft skills that complement my technical expertise as a front-end developer. My excellent communication abilities allow me to collaborate effectively with team members and clients. I am highly adaptable and thrive in fast-paced environments, quickly learning new tools and technologies. My problem-solving skills enable me to navigate challenges with creative solutions while maintaining a focus on user experience and performance optimization. I have strong time management and organizational skills, ensuring that I meet deadlines and deliver high-quality work consistently."
            />
            <CopyBlock
              title="Development and Projects"
              containerClass={about.container}
              iconClass={about.icon}
              icon={["fas", "code"]}
              copy="I am passionate about development and project execution, thriving on the challenge of transforming ideas into reality through coding. I take pride in turning concepts into functional, reliable solutions. With careful planning, streamlined workflows, and a strong attention to detail, I ensure that projects are delivered successfully, meeting goals while often exceeding expectations."
            />
          </div>
        </section>
        <section className={about.content}>
          <div className={about.copy}>
            <CopyBlock
              title="Security and Privacy"
              containerClass={about.container}
              iconClass={about.icon}
              icon={["fas", "shield-alt"]}
              copy="In my approach to development, security and privacy are top priorities. I focus on safeguarding sensitive data by implementing strong security measures and adhering to industry best practices. By staying informed about emerging threats, I ensure that user information remains protected at all times. Trust and confidentiality are central to my work, creating secure and private experiences that users can rely on."
            />
            <CopyBlock
              title="Constant Learning and Improvements"
              containerClass={about.container}
              iconClass={about.icon}
              icon={["fas", "book"]}
              copy="I am driven by a relentless thirst for knowledge and a passion for continuous learning. Staying up-to-date with the latest industry trends and emerging technologies helps me stay ahead of the curve. I actively seek new challenges and consistently expand my skill set, pushing the limits of my abilities. This commitment allows me to deliver innovative solutions and offer valuable insights to clients, ensuring they benefit from cutting-edge developments."
            />

            <BadgesBlock
              title="Research and planning"
              containerClass={about.container}
              list={methods}
              fullContainer="fullContainer"
              block="methods"
              icon="fingerprint"
              copy="One of the most exciting parts of my creative process is diving into in-depth research and thorough planning for development projects. Whether it's Design Systems or Brand Strategy, I embrace the chance to explore every aspect of user experience. Eager to expand my knowledge, I stay ahead of industry trends by immersing myself in research. By carefully planning and executing projects, I strive to craft exceptional digital experiences that not only exceed expectations but also deliver measurable results."
              headerIcon={`${about.icon}`}
              invertedColor={undefined}
            />
          </div>
        </section>
      </Container>
    </Section>
  );
}
const methods = [
  {
    key: "frontenddeveloper",
    name: "Frontend Developer",
    type: "fad",
    icon: "devicon",
  },
  {
    key: "softwareengineer",
    name: "Software Engineer",
    type: "fad",
    icon: "devicon",
  },
  { key: "nextjs", name: "Next JS", type: "fad", icon: "devicon" },
  {
    key: "reactjs",
    name: "React JS",
    type: "fad",
    icon: "devicon",
  },
];
