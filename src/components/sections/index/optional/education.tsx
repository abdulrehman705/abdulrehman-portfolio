// Section structure
import Section from "../../../structure/section";
import Container from "../../../structure/container";

// Section general blocks
import SectionTitle from "../../../blocks/section.title";

// Career scss
import career from "../../../../styles/scss/sections/index/career.module.scss";

export default function Education() {
  return (
    <Section classProp={`${career.section} borderBottom`}>
      <Container spacing={["verticalXXXLrg"]}>
        <SectionTitle
          title="Education"
          preTitle="Formal"
          subTitle="I am currently studying Software Engineering at the The Islamia University Bahawalpur."
        />
        <section className={career.area}>
          <article className={career.company}>
            <div className={career.companyContent}>
              <span className={career.companyHeader}>
                <h3>The Islamia University Bahawalpur</h3>
                <h5>Bahawalpur, Pakistan</h5>
              </span>
              <p>
                I am currently pursuing my Bachelors degree in Software
                Engineering at The Islamia University Bahawalpur. This four-year
                program offers a comprehensive curriculum that covers various
                aspects of software engineering and its applications.
              </p>
            </div>
            <div className={career.companyAlt}></div>
          </article>
        </section>
      </Container>
    </Section>
  );
}
